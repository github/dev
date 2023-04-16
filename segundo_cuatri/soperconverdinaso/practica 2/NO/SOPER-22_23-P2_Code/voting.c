/*Sistema de votacion multiproceso.
Escribir un programa en C que implemente un sistema de votacion multiproceso.
El ejercicio se divide en distintas partes diferenciadas, de manera que se puedan ir implementado y probando secuencialmente.

a) Arranque del sistema y proceso Principal:

    El sistema se debe ejecutar con dos parametros:
    ./ voting < N_PROCS > < N_SECS >
    donde voting es el nombre del ejecutable, <N_PROCS> es el numero de procesos que participaran en la votacion y <N_SECS> es el numero maximo de segundos que estara activo el sistema.
    El proceso Principal creara tantos procesos Votante como se haya especificado, y almacenara la informacion del sistema (al menos los PID de los procesos Votante) en un fichero.
    Cuando el sistema este listo, el proceso Principal enviara la señal SIGUSR1 a todos los procesos Votante.
    Cuando Principal reciba la señal de interrupcion SIGINT, enviara a los procesos Votante la señal SIGTERM para que terminen liberando sus recursos. Cuando terminen, liberara los recursos del sistema y terminara su ejecucion mostrando el mensaje "Finishing by signal".

b) Procesos Votante:

    Al arrancar, los procesos Votante quedaran en espera de que el proceso Principal les avise de que el sistema esta listo.
    Cuando reciban la señal SIGUSR1 leeran la informacion del sistema para poder enviar señales a todos los procesos implicados, y comenzaran a iterar:
        • Los procesos competiran por convertirse en el proceso Candidato (en una suerte de condicion de carrera), de forma que el primero que lo solicite a traves de señales sera el proceso Candidato.
        • El resto de procesos Votante quedaran en espera de que arranque la votacion, para elegir si aceptan o no al candidato. Esta votacion se realizara a traves de un fichero compartido por todos los procesos.
        • Cuando la votacion este lista, el proceso Candidato enviara la señal SIGUSR2 a los procesos Votante para que registren su voto. Tras esto, esperara a que finalice la votacion (es decir, a que se hayan registrado todos los votos en el fichero) alternando la comprobacion del fichero con esperas no activas de 1 ms.
        • Cuando los procesos Votante reciban la señal de votar, generaran un voto aleatorio (sı o no) y lo registraran en el fichero. Una vez votado, entraran en una espera no activa hasta la siguiente ronda.
        • Una vez finalice la votacion, el proceso Candidato mostrara los resultados con una cadena con el formato "Candidate %d => [ Y Y N Y N ] => Accepted"/"Candidate %d => [ Y N N N Y ] => Rejected", donde el numero indica el PID del proceso candidato, las letras 'Y'/'N' el sentido del voto de cada proceso, y la candidatura se acepta en el caso de que el numero de votos positivos sea mayor que el de negativos. Tras esto, realizara una espera no activa de 250 ms y arrancara una nueva ronda enviando la señal SIGUSR1.
    Los procesos Votante terminaran, liberando todos los recursos necesarios, cuando reciban la señal SIGTERM.

c) Proteccion de zonas crıticas:

    Es necesario garantizar que el sistema es robusto, de manera que no se pierda ninguna señal.
    Para ello, se deberan bloquear las señales (puede que tambien durante la ejecucion del manejador) y realizar las esperas no activas con sigsuspend.

d) Temporizacion:

    En el caso de que transcurra el numero maximo de segundos especificados como argumento del programa, el proceso Principal procedera a terminar el sistema enviando la señal SIGTERM a los procesos Votante, y terminara su ejecucion con el mensaje "Finishing by alarm".

e) Analisis de la ejecucion:

    ¿Se produce algun problema de concurrencia en el sistema descrito? ¿Es sencillo, o siquiera factible, organizar un sistema de este tipo usando unicamente señales?

f) Sincronizacion con semaforos:

    Añadir los mecanismos necesarios, usando semaforos, para que no se produzcan problemas de concurrencia, de forma que solo haya un proceso Candidato, y que no se pierda informacion en los accesos al fichero.
*/
/*
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <semaphore.h>
#include <sys/stat.h>
#include <signal.h>
#include <fcntl.h>
#include <string.h>
#include <time.h>
#include <errno.h>
#include <sys/sem.h>

#define MAX_VOTANTES 50
#define FNAME1 "voting1.txt"
#define FNAME2 "voting2.txt"
#define SEM_NAME "/votacion_sem"

pid_t pid_votantes[MAX_VOTANTES];
int n_votantes;

void votante(int n_procs);


void handler(int sig)
{
    int pid;
    FILE *f;
    f = fopen(FNAME1, "r");
    if (sig == SIGUSR1)
    {
        for (int i = 0; i < n_votantes; i++)
        {
            fscanf(f, "%d\n", &pid);
            kill(pid, SIGUSR1);
        }
        exit(0);
    }
    else if (sig == SIGINT)
    {
        // enviar señal SIGTERM a los votantes
        for (int i = 0; i < n_votantes; i++)
        {
            fscanf(f, "%d\n", &pid);
            kill(pid, SIGTERM);
        }
        // esperar a que los votantes terminen
        for (int i = 0; i < n_votantes; i++)
        {
            fscanf(f, "%d\n", &pid);
            waitpid(pid, NULL, 0);
        }
        // liberar recursos
        printf("Finishing by signal\n");
        fclose(f);
        exit(0);
    }
    else if (sig == SIGALRM)
    {
        for (int i = 0; i < n_votantes; i++)
        {
            fscanf(f, "%d\n", &pid);
            kill(pid, SIGALRM);
        }
        for (int i = 0; i < n_votantes; i++)
        {
            fscanf(f, "%d\n", &pid);
            waitpid(pid, NULL, 0);
        }
        printf("Finishing by alarm\n");
        fclose(f);
        exit(0);
    }
    fclose(f);
}

int main(int argc, char *argv[])
{
    if (argc != 3)
    {
        fprintf(stderr, "Uso: %s <N_PROCS> <N_SECS>\n", argv[0]);
        exit(1);
    }
    int n_procs = atoi(argv[1]);
    int n_secs = atoi(argv[2]);
    FILE *f;
    int pid;

    struct sigaction act;
    act.sa_handler = handler;
    sigemptyset(&act.sa_mask);
    act.sa_flags = 0;

    if (n_procs > MAX_VOTANTES)
    {
        fprintf(stderr, "Error: el número máximo de procesos votantes es %d\n", MAX_VOTANTES);
        exit(1);
    }

    // crear procesos votantes
    // el codigo debe guardar los pids de los votantes en un fichero
    f = fopen(FNAME1, "w");
    if(f == NULL)
    {
        perror("Error al abrir el fichero");
        exit(1);
    }
    fclose(f);
    for (int i = 0; i < n_procs; i++)
    {

        pid_t pid = fork();
        if (pid == -1)
        {
            perror("Error en fork");
            exit(1);
        }
        else if (pid == 0)
        {
            votante(n_procs);
            exit(0);
        }
        else
        {
            int status;
            waitpid(pid, &status, 0);
        }
    }

    n_votantes = n_procs;

    // esperar n_secs segundos antes de enviar la señal SIGUSR1
    sleep(n_secs);

    // enviar señal SIGUSR1 a los votantes
    f = fopen(FNAME1, "r");
    if(f == NULL)
    {
        perror("Error al abrir el fichero");
        exit(1);
    }

    for (int i = 0; i < n_votantes; i++)
    {
        fscanf(f, "%d\n", &pid);
        kill(pid, SIGUSR1);
    }
    fclose(f);

    if (sigaction(SIGINT, &act, NULL) < 0)
    {
        perror("sigaction error");
        exit(1);
    }

    // bucle principal
    while (1)
    {
        pause();

    }
    return 0;
}*/

/* int votante(){
    int pid = getpid();
    pause();
    printf("Proceso votante %d: recibida señal SIGUSR1\n", pid);
    printf("Proceso votante %d: esperando señal SIGALRM...\n", pid);
    if (sigaction(SIGALRM, &act, NULL) < 0)
    {
        perror("sigaction error");
        exit(1);
    }
    pause();
    printf("Proceso votante %d: recibida señal SIGALRM\n", pid);
    printf("Proceso votante %d: terminando...\n", pid);
    return 0;
} */
/*
void votante(int n_procs)
{
    int accepted;
    int voto;
    int pid;
    char buffer[1024];
    struct sembuf sops;
    FILE *f;

    struct sigaction act;
    act.sa_handler = handler;
    sigemptyset(&act.sa_mask);
    act.sa_flags = 0;

    // Creamos el semaforo
    int semid = semget(IPC_PRIVATE, 1, IPC_CREAT | 0600);
    if (semid == -1)
    {
        fprintf(stderr, "Error: no se ha podido crear el semaforo\n");
        exit(1);
    }

    printf("Proceso votante %d: esperando señal SIGUSR1...\n", getpid());
    if (sigaction(SIGUSR1, &act, NULL) < 0)
    {
        perror("sigaction error");
        exit(1);
    }

    // Esperamos a recibir la señal SIGUSR1 del proceso principal

    pause();

    f = fopen(FNAME2, "aw");
    if (f == NULL)
    {
        perror("Error al abrir el fichero");
        exit(1);
    }
    fprintf(f, "%d\n", getpid());
    fclose(f);



    // Leemos el fichero para ver si ya hay un proceso candidato
    f = fopen(FNAME1, "r");
    if (f == NULL)
    {
        fprintf(stderr, "Error: no se ha podido leer el fichero\n");
        exit(1);
    }
    fgets(buffer, 1024, f);
    accepted = atoi(buffer);
    fclose(f);

    // Si no hay candidato, solicitamos el cargo
    if (accepted == 0)
    {
        // Bloqueamos el semaforo
        sops.sem_num = 0;
        sops.sem_op = -1;
        sops.sem_flg = 0;
        if (semop(semid, &sops, 1) == -1)
        {
            fprintf(stderr, "Error: no se ha podido bloquear el semaforo\n");
            exit(1);
        }

        // Si somos el primero en llegar, nos convertimos en candidato
        if (accepted == 0)
        {
            accepted = getpid();
        }

        // Desbloqueamos el semaforo
        sops.sem_num = 0;
        sops.sem_op = 1;
        sops.sem_flg = 0;
        if (semop(semid, &sops, 1) == -1)
        {
            fprintf(stderr, "Error: no se ha podido desbloquear el semaforo\n");
            exit(1);
        }
    }

    // Si somos el candidato, enviamos la señal SIGUSR2 para que los votantes voten
    f = fopen(FNAME1, "r");
    if (accepted == getpid())
    {
        for (int i = 0; i < n_procs; i++)
        {
            fscanf(f, "%d\n", &pid);
            kill(pid, SIGUSR2);
        }
    }
    fclose(f);

    // Esperamos a recibir la señal SIGUSR2
    pause();

    // Generamos un NUMERO ALEATORIO ENTRE 0 Y 1
    srand(time(NULL));
    voto = rand() % 2;

    // Bloqueamos el semaforo
    sops.sem_num = 0;
    sops.sem_op = -1;
    sops.sem_flg = 0;
    if (semop(semid, &sops, 1) == -1)
    {
        fprintf(stderr, "Error: no se ha podido bloquear el semaforo\n");
        exit(1);
    }

    // Guardamos nuestro voto en el fichero
    f = fopen(FNAME2, "w");
    if (f == NULL)
    {
        fprintf(stderr, "Error: no se ha podido escribir el fichero\n");
        exit(1);
    }
    fprintf(f, "%d\n", voto);
    fclose(f);

    // Desbloqueamos el semaforo
    sops.sem_num = 0;
    sops.sem_op = 1;
    sops.sem_flg = 0;
    if (semop(semid, &sops, 1) == -1)
    {
        fprintf(stderr, "Error: no se ha podido desbloquear el semaforo\n");
        exit(1);
    }

    // Esperamos a recibir la señal SIGTERM para terminar
    pause();
}

#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <signal.h>
#include <stdlib.h>
#include <sys/ipc.h>
#include <sys/sem.h>
#include <time.h>

#define N_PROCS 2            // Numero de procesos a crear
#define N_SECS 5             // Numero de segundos que estara activo el sistema
#define FNAME1 "voting1.txt" // Nombre del fichero
#define FNAME2 "voting2.txt" // Nombre del fichero

// Variables globales
int n_procs;
int n_secs;
int pid;
pid_t pids[N_PROCS];
char buffer[1024];
int semid;

// Funciones
void votante(int pid);
void principal();
void inicializar_semaforos();

int main(int argc, char *argv[])
{
    int i;
    n_procs = atoi(argv[1]);
    n_secs = atoi(argv[2]);

    // Inicializamos los semaforos
    inicializar_semaforos();

    // Creamos los procesos
    for (i = 0; i < n_procs; i++)
    {
        pid = fork();
        if (pid == 0)
        { // Proceso hijo
            votante(i);
            exit(0);
        }
        else
        { // Proceso padre
            pids[i] = pid;
            wait(NULL);
        }
        wait(NULL);
    }

    principal();

    exit(0);
}

// Funcion del proceso principal
void principal()
{
    int i;
    int status;
    int alarm_status;
    int accepted;

    // Activamos la alarma
    alarm_status = alarm(n_secs);
    if (alarm_status != 0)
    {
        fprintf(stderr, "Error: no se ha podido activar la alarma\n");
    }

    // Almacenamos en el fichero los PIDs de los procesos votantes
    FILE *fp;
    fp = fopen(FNAME1, "w");
    if (fp == NULL)
    {
        fprintf(stderr, "Error: no se ha podido crear el fichero\n");
        exit(1);
    }
    for (i = 0; i < n_procs; i++)
    {
        fprintf(fp, "%d\n", pids[i]);
    }
    fclose(fp);

    // Enviamos la señal SIGUSR1 a los procesos votantes
    for (i = 0; i < n_procs; i++)
    {
        kill(pids[i], SIGUSR1);
    }

    // Esperamos a que los procesos votantes terminen
    for (i = 0; i < n_procs; i++)
    {
        waitpid(pids[i], &status, 0);
    }

    // Leemos los resultados de la votacion
    fp = fopen(FNAME1, "r");
    if (fp == NULL)
    {
        fprintf(stderr, "Error: no se ha podido leer el fichero\n");
        exit(1);
    }
    accepted = 0;
    while (fgets(buffer, 1024, fp) != NULL)
    {
        accepted += atoi(buffer);
    }
    fclose(fp);

    fprintf(stdout, "Finishing by signal\n");
}

// Funcion del proceso votante
void votante(int pid)
{
    int accepted;
    int voto;
    struct sembuf sops;

    printf("Soy el proceso %d", pid);

    // Esperamos a recibir la señal SIGUSR1 del proceso principal

    pause();

    // Leemos el fichero para ver si ya hay un proceso candidato
    FILE *fp;
    fp = fopen(FNAME1, "r");
    if (fp == NULL)
    {
        fprintf(stderr, "Error: no se ha podido leer el fichero\n");
        exit(1);
    }
    fgets(buffer, 1024, fp);
    accepted = atoi(buffer);
    fclose(fp);

    // Si no hay candidato, solicitamos el cargo
    if (accepted == 0)
    {
        // Bloqueamos el semaforo
        sops.sem_num = 0;
        sops.sem_op = -1;
        sops.sem_flg = 0;
        if (semop(semid, &sops, 1) == -1)
        {
            fprintf(stderr, "Error: no se ha podido bloquear el semaforo\n");
            exit(1);
        }

        // Si somos el primero en llegar, nos convertimos en candidato
        if (accepted == 0)
        {
            accepted = getpid();
        }

        // Desbloqueamos el semaforo
        sops.sem_num = 0;
        sops.sem_op = 1;
        sops.sem_flg = 0;
        if (semop(semid, &sops, 1) == -1)
        {
            fprintf(stderr, "Error: no se ha podido desbloquear el semaforo\n");
            exit(1);
        }
    }

    // Si somos el candidato, enviamos la señal SIGUSR2 para que los votantes voten
    if (accepted == getpid())
    {
        for (int i = 0; i < n_procs; i++)
        {
            kill(pids[i], SIGUSR2);
        }
    }
    printf("||||||||||||||||||||||||||||||||||||1|\n");
    // Esperamos a recibir la señal SIGUSR2
    pause();

    // Generamos un voto aleatorio
    srand(time(NULL));
    voto = rand() % 2;

    // Bloqueamos el semaforo
    sops.sem_num = 0;
    sops.sem_op = -1;
    sops.sem_flg = 0;
    if (semop(semid, &sops, 1) == -1)
    {
        fprintf(stderr, "Error: no se ha podido bloquear el semaforo\n");
        exit(1);
    }

    // Guardamos nuestro voto en el fichero

    printf("|||||||||||||||||||||||||||||||||||||||||||||11Voto: %d", voto);
    fp = fopen(FNAME2, "w");
    if (fp == NULL)
    {
        fprintf(stderr, "Error: no se ha podido escribir el fichero\n");
        exit(1);
    }
    fprintf(fp, "%d\n", voto);
    fclose(fp);

    // Desbloqueamos el semaforo
    sops.sem_num = 0;
    sops.sem_op = 1;
    sops.sem_flg = 0;
    if (semop(semid, &sops, 1) == -1)
    {
        fprintf(stderr, "Error: no se ha podido desbloquear el semaforo\n");
        exit(1);
    }

    // Esperamos a recibir la señal SIGTERM para terminar
    pause();
}

// Inicializacion del semaforo
void inicializar_semaforos()
{
    key_t clave;

    clave = ftok("/bin/ls", 33);
    if (clave == (key_t)-1)
    {
        fprintf(stderr, "Error: no se ha podido obtener la clave para el semaforo\n");
        exit(1);
    }

    semid = semget(clave, 1, 0666 | IPC_CREAT);
    if (semid == -1)
    {
        fprintf(stderr, "Error: no se ha podido crear el semaforo\n");
        exit(1);
    }

    // Inicializamos el semaforo
    if (semctl(semid, 0, SETVAL, 1) == -1)
    {
        fprintf(stderr, "Error: no se ha podido inicializar el semaforo\n");
        exit(1);
    }
}*/

#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <signal.h>
#include <stdlib.h>
#include <sys/ipc.h>
#include <sys/sem.h>
#include <time.h>

#define N_PROCS 2            // Numero de procesos a crear
#define N_SECS 5             // Numero de segundos que estara activo el sistema
#define FNAME1 "voting1.txt" // Nombre del fichero
#define FNAME2 "voting2.txt" // Nombre del fichero

// Variables globales
int n_procs;
int n_secs;
int pid;
pid_t pids[N_PROCS];
char buffer[1024];
int semid;
int candidato;
int procListos = 0;

// Prototipos de funciones
void inicializar_semaforos();
int votante(int pid);
void votacion(int pid);
void handler(int sig);
void quiero_ser_candidato();

int main(int argc, char *argv[])
{
    // Comprobamos los argumentos
    if (argc != 3)
    {
        fprintf(stderr, "Error: numero de argumentos incorrecto\n");
        exit(1);
    }

    // Guardamos los argumentos
    n_procs = atoi(argv[1]);
    n_secs = atoi(argv[2]);

    FILE *fp;
    fp = fopen(FNAME1, "w");

    struct sigaction act;
    act.sa_handler = handler;
    sigemptyset(&act.sa_mask);
    act.sa_flags = 0;

    sigaction(SIGUSR1, &act, NULL);
    sigaction(SIGINT, &act, NULL);
    sigaction(SIGALRM, &act, NULL);
    sigaction(SIGUSR2, &act, NULL);
    sigaction(SIGSTOP, &act, NULL);
    sigaction(SIGCHLD, &act, NULL);

    // Creamos los procesos
    for (int i = 0; i < n_procs; i++)
    {
        pid = fork();
        if (pid == 0)
        {
            // Proceso votante

            printf("Soy el proceso votanteee %d\n", getpid());
            fprintf(fp, "%d\n", getpid());

            votante(getpid());
            exit(0);
        }
        else if (pid > 0)
        {
            // Proceso principal

            printf("Soy el proceso principal %d\n", getpid());
        }
    }
    if (pid > 0)
    {
        fclose(fp);
        printf("PASA POR EL SCANF\n");
        fp = fopen(FNAME1, "r");
        for (int i = 0; i < n_procs; i++)
        {
            fscanf(fp, "%d\n", &pids[i]);
        }
        fclose(fp);
    }
    
    while (procListos < n_procs)
    {
        printf("PASA POR EL WHILE\n");
        sleep(1);
    }

    for (int i = 0; i < n_procs; i++)
    {
        printf("pids[%d] = %d\n", i, pids[i]);
    }

    printf("mando señal SIGUSR1 a los votantes\n");
    sleep(1);
    alarm(n_secs);
    kill(-getpid(), SIGUSR1);

    return 0;
}

int votante(int pid)
{
    printf("Soy el proceso votante %d y me han parado\n", pid);
    kill(getpid(), SIGSTOP);
    printf("Soy el proceso votante %d y me han reanudado\n", pid);
    printf("Soy el proceso votante %d\n", pid);

    quiero_ser_candidato();

    exit(0);
}

void quiero_ser_candidato()
{
    if (candidato == 0)
    {
        candidato = 1;
        printf("Soy el candidato %d\n", getpid());
        for (int i = 0; i < n_procs; i++)
        {
            kill(pids[i], SIGUSR2);
        }
    }
    else
    {
        printf("No soy el candidato %d\n", getpid());
    }
}

void handler(int sig)
{
    if (sig == SIGUSR1)
    {
        for (int i = 0; i < n_procs; i++)
        {
            printf("Soy el proceso %d y me han reanudado\n", getpid());
            kill(pids[i], SIGCONT);
        }
        exit(0);
    }
    else if (sig == SIGINT)
    {
        // enviar señal SIGTERM a los votantes
        for (int i = 0; i < n_procs; i++)
        {
            kill(pids[i], SIGTERM);
        }
        // esperar a que los votantes terminen
        for (int i = 0; i < n_procs; i++)
        {
            waitpid(pids[i], NULL, 0);
        }
        // liberar recursos
        printf("Finishing by signal\n");
        exit(0);
    }
    else if (sig == SIGALRM)
    {
        for (int i = 0; i < n_procs; i++)
        {
            kill(pids[i], SIGTERM);
        }
        for (int i = 0; i < n_procs; i++)
        {
            waitpid(pids[i], NULL, 0);
        }
        printf("Finishing by alarm\n");
        exit(0);
    }
    else if (sig == SIGUSR2)
    {
        printf("Soy el proceso %d y me toca ser votado\n", getpid());
        for (int i = 0; i < n_procs; i++)
        {
            kill(pids[i], SIGCONT);
        }
        printf("se ha mandado la señal para que se realicen los votos\n");
        exit(0);
    }
    else if (sig == SIGSTOP)
    {
        printf("Soy el proceso %d y me han paradoooooooooo\n", getpid());
        kill(getppid(), SIGCHLD);
        procListos++;
        pause();
    }
    else if (sig == SIGCHLD)
    {

        printf("Soy el proceso %d y \n", getpid());

        exit(0);
    }
}