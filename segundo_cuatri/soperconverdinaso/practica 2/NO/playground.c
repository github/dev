
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

#define N_PROCS 2 // Numero de procesos a crear
#define N_SECS 5 // Numero de segundos que estara activo el sistema
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

int main(int argc, char *argv[]) {
    int i;
    n_procs = atoi(argv[1]);
    n_secs = atoi(argv[2]);

    // Inicializamos los semaforos
    inicializar_semaforos();

    // Creamos los procesos
    for (i = 0; i < n_procs; i++) {
        pid = fork();
        if (pid == 0) { // Proceso hijo
            votante(i);
            exit(0);
        } else { // Proceso padre
            pids[i] = pid;
        }
    }

    principal();

    exit(0);
}

// Funcion del proceso principal
void principal() {
    int i;
    int status;
    int alarm_status;
    int accepted;

    // Activamos la alarma
    alarm_status = alarm(n_secs);
    if (alarm_status != 0) {
        fprintf(stderr, "Error: no se ha podido activar la alarma\n");
    }

    // Almacenamos en el fichero los PIDs de los procesos votantes
    FILE *fp;
    fp = fopen(FNAME1, "w");
    if (fp == NULL) {
        fprintf(stderr, "Error: no se ha podido crear el fichero\n");
        exit(1);
    }
    for (i = 0; i < n_procs; i++) {
        fprintf(fp, "%d\n", pids[i]);
    }
    fclose(fp);

    // Enviamos la señal SIGUSR1 a los procesos votantes
    for (i = 0; i < n_procs; i++) {
        kill(pids[i], SIGUSR1);
    }

    // Esperamos a que los procesos votantes terminen
    for (i = 0; i < n_procs; i++) {
        waitpid(pids[i], &status, 0);
    }

    // Leemos los resultados de la votacion
    fp = fopen(FNAME1, "r");
    if (fp == NULL) {
        fprintf(stderr, "Error: no se ha podido leer el fichero\n");
        exit(1);
    }
    accepted = 0;
    while (fgets(buffer, 1024, fp) != NULL) {
        accepted += atoi(buffer);
    }
    fclose(fp);

    fprintf(stdout, "Finishing by signal\n");
}

// Funcion del proceso votante
void votante(int pid) {
    int status;
    int accepted;
    int voto;
    struct sembuf sops;

    // Esperamos a recibir la señal SIGUSR1 del proceso principal
    pause();

    // Leemos el fichero para ver si ya hay un proceso candidato
    FILE *fp;
    fp = fopen(FNAME1, "r");
    if (fp == NULL) {
        fprintf(stderr, "Error: no se ha podido leer el fichero\n");
        exit(1);
    }
    fgets(buffer, 1024, fp);
    accepted = atoi(buffer);
    fclose(fp);

    // Si no hay candidato, solicitamos el cargo
    if (accepted == 0) {
        // Bloqueamos el semaforo
        sops.sem_num = 0;
        sops.sem_op = -1;
        sops.sem_flg = 0;
        if (semop(semid, &sops, 1) == -1) {
            fprintf(stderr, "Error: no se ha podido bloquear el semaforo\n");
            exit(1);
        }

        // Si somos el primero en llegar, nos convertimos en candidato
        if (accepted == 0) {
            accepted = getpid();
        }

        // Desbloqueamos el semaforo
        sops.sem_num = 0;
        sops.sem_op = 1;
        sops.sem_flg = 0;
        if (semop(semid, &sops, 1) == -1) {
            fprintf(stderr, "Error: no se ha podido desbloquear el semaforo\n");
            exit(1);
        }
    }

    // Si somos el candidato, enviamos la señal SIGUSR2 para que los votantes voten
    if (accepted == getpid()) {
        for (int i = 0; i < n_procs; i++) {
            kill(pids[i], SIGUSR2);
        }
    }

    // Esperamos a recibir la señal SIGUSR2
    pause();

    // Generamos un voto aleatorio
    srand(time(NULL));
    voto = rand() % 2;

    // Bloqueamos el semaforo
    sops.sem_num = 0;
    sops.sem_op = -1;
    sops.sem_flg = 0;
    if (semop(semid, &sops, 1) == -1) {
        fprintf(stderr, "Error: no se ha podido bloquear el semaforo\n");
        exit(1);
    }

    // Guardamos nuestro voto en el fichero
    fp = fopen(FNAME, "w");
    if (fp == NULL) {
        fprintf(stderr, "Error: no se ha podido escribir el fichero\n");
        exit(1);
    }
    fprintf(fp, "%d\n", voto);
    fclose(fp);

    // Desbloqueamos el semaforo
    sops.sem_num = 0;
    sops.sem_op = 1;
    sops.sem_flg = 0;
    if (semop(semid, &sops, 1) == -1) {
        fprintf(stderr, "Error: no se ha podido desbloquear el semaforo\n");
        exit(1);
    }

    // Esperamos a recibir la señal SIGTERM para terminar
    pause();
}

// Inicializacion del semaforo
void inicializar_semaforos() {
    key_t clave;

    clave = ftok("/bin/ls", 33);
    if (clave == (key_t) -1) {
        fprintf(stderr, "Error: no se ha podido obtener la clave para el semaforo\n");
        exit(1);
    }

    semid = semget(clave, 1, 0666 | IPC_CREAT);
    if (semid == -1) {
        fprintf(stderr, "Error: no se ha podido crear el semaforo\n");
        exit(1);
    }

    // Inicializamos el semaforo
    if (semctl(semid, 0, SETVAL, 1) == -1) {
        fprintf(stderr, "Error: no se ha podido inicializar el semaforo\n");
        exit(1);
    }
}