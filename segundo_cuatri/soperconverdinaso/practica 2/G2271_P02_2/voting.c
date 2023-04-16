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

void crear_procesos(int n_proc);
void handler_sig1(int sig);
void handler_sigalarm(int sig);
int votante(int pid);
void serCandidato(int pid);
void solicitarVoto(int pid);
void votar(int pid);

int n_procs;
int n_secs;
FILE *f;
int hayCandidato = 0;

int main(int argc, char *argv[])
{
    int pid;

    if (argc != 3)
    {
        printf("Error: ./voting numero de argumentos incorrecto\n");
    }

    f = fopen("voting.txt", "w");
    fclose(f);
    int n_proc = atoi(argv[1]);
    int n_secs = atoi(argv[2]);

    crear_procesos(n_proc);

    f = fopen("voting.txt", "r");
    while (!feof(f))
    {
        fscanf(f, "%d", &pid);
        kill(pid, SIGUSR1);
    }
    return 0;
}

void crear_procesos(int n_proc)
{
    int i;
    pid_t pid;

    struct sigaction sig1;
    sig1.sa_handler = handler_sig1;
    sigemptyset(&sig1.sa_mask);
    sig1.sa_flags = 0;

    struct sigaction sigalarm;
    sigalarm.sa_handler = handler_sigalarm;
    sigemptyset(&sigalarm.sa_mask);
    sigalarm.sa_flags = 0;

    sigaction(SIGUSR1, &sig1, NULL);

    for (i = 0; i < n_proc; i++)
    {
        pid = fork();
        if (pid == 0)
        {
            printf("Soy el proceso hijo %d y mi padre es %d\n", getpid(), getppid());
            sigaction(SIGUSR1, &sig1, NULL);
            printf("PREPAUSE\n");
            pause();
            printf("POSTPAUSE\n");
            votante(getpid());
            exit(0);
        }
        else if (pid > 0)
        {
            printf("Soy el proceso padre %d y mi hijo es %d\n", getpid(), pid);
        }
        else
        {
            printf("Error al crear el proceso hijo %d\n", i);
        }
        f = fopen("voting.txt", "a");
        fprintf(f, "%d\n", pid);
        fclose(f);
    }
    sigaction(SIGALRM, &sigalarm, NULL);
    alarm(n_secs);
}

void handler_sig1(int sig)
{
    printf("Soy el proceso %d y he recibido la señal %d\n", getpid(), sig);

    if (sig == SIGUSR1)
    {
        kill(getpid(), SIGCONT);
    }
}

void handler_sig2(int sig)
{
    int pid;
    printf("Soy el proceso %d y he recibido la señal %d\n", getpid(), sig);
    f = fopen("voting.txt", "r");
    for (int i = 0; i < n_procs; i++)
    {
        fscanf(f, "%d\n", &pid);
        kill(pid, SIGCONT);
    }
    fclose(f);
}
void handler_sigalarm(int sig)
{
    int pid;
    f = fopen("voting.txt", "r");
    for (int i = 0; i < n_procs; i++)
    {
        fscanf(f, "%d\n", &pid);
        kill(pid, SIGTERM);
    }
    for (int i = 0; i < n_procs; i++)
    {
        fscanf(f, "%d\n", &pid);
        waitpid(pid, NULL, 0);
    }
    fclose(f);

    printf("Finishing by alarm\n");
    exit(0);
}

int votante(int pid)
{
    printf("llamando a serCandidato\n");
    serCandidato(pid);
    return 0;
}

void serCandidato(int pid)
{
    if (hayCandidato == 1)
    {
        printf("Soy el proceso %d y ya hay candidato activo\n", pid);
        pause();
        votar(pid);
    }
    printf("Soy el proceso %d y SOY EL CANDIDATO\n", getpid());
    hayCandidato = 1;
    solicitarVoto(pid);
}

void solicitarVoto(int pid)
{
    int pidCandidato;
    struct sigaction sig2;
    sig2.sa_handler = handler_sig2;
    sigaction(SIGUSR2, &sig2, NULL);
    printf("Soy el proceso %d y solicito voto\n", pid);
    sleep(1);
    f = fopen("voting.txt", "r");
    for (int i = 0; i < 10; i++)
    {
        fscanf(f, "%d", &pidCandidato);
        if (pidCandidato != pid)
        {
            printf("Soy el proceso %d y le envio la señal SIGUSR2 al proceso %d\n", getpid(), pidCandidato);
            kill(pidCandidato, SIGUSR2);
        }
        sleep(1);
    }
    hayCandidato = 0;
    printf("Soy el proceso %d y ya no soy candidato\n", pid);
    exit(0);
}

void votar(int pid)
{
    printf("Soy el proceso %d y voy a votar al proceso %d\n", getpid(), pid);
    // genera un numero aleatorio entre 0 y 1
    int voto = rand() % 2;
    f = fopen("votos.txt", "a");
    fprintf(f, "%d %d\n", getpid(), voto);
    fclose(f);
}