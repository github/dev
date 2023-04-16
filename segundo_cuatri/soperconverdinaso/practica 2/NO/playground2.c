#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <string.h>
#include <time.h>
#include <semaphore.h>
#include <fcntl.h>


#define MAX_PROCS 100
#define MAX_SECS 10
#define VOTE_FILE "vote.txt"
#define PID_FILE "pids.txt"
#define MAX_VOTES 10
#define SIG_BLOCK 0

// Variables globales
int n_procs;
int n_secs;
pid_t pids[MAX_PROCS];
sem_t *sem;

// Funciones
void handle_sigint(int signo);
void handle_sigterm(int signo);
void handle_sigusr1(int signo);
void handle_sigusr2(int signo);
void child_job();
int getVotes();
void printResult(int accepted);

int main(int argc, char **argv)
{
    // Comprobamos los argumentos
    if (argc != 3)
    {
        printf("Error en el numero de argumentos\n");
        exit(-1);
    }
    n_procs = atoi(argv[1]);
    n_secs = atoi(argv[2]);
    if (n_procs <= 0 || n_procs > MAX_PROCS)
    {
        printf("Error en el numero de procesos\n");
        exit(-1);
    }
    if (n_secs <= 0 || n_secs > MAX_SECS)
    {
        printf("Error en el numero de segundos\n");
        exit(-1);
    }

    // Creamos el fichero de PIDs
    FILE *fp = fopen(PID_FILE, "w");
    if (fp == NULL)
    {
        printf("Error al abrir el fichero de PIDs\n");
        exit(-1);
    }
    int i;
    for (i = 0; i < n_procs; i++)
    {
        // Creamos procesos
        pid_t pid = fork();
        if (pid == 0)
        {
            // Proceso hijo
            child_job();
            exit(0);
        }
        else if (pid > 0)
        {
            // Proceso padre
            pids[i] = pid;
            fprintf(fp, "%d\n", pid);
        }
        else
        {
            printf("Error al crear proceso\n");
            exit(-1);
        }
    }
    fclose(fp);

    // Creamos el semaforo para sincronizar
    sem = sem_open("sem", O_CREAT, 0600, 1);
    if (sem == SEM_FAILED)
    {
        printf("Error al crear el semaforo\n");
        exit(-1);
    }

    // Establecemos los manejadores de señales
    signal(SIGINT, handle_sigint);
    signal(SIGTERM, handle_sigterm);
    signal(SIGUSR1, handle_sigusr1);
    signal(SIGUSR2, handle_sigusr2);

    // Enviamos la señal de que el sistema esta listo
    for (i = 0; i < n_procs; i++)
    {
        kill(pids[i], SIGUSR1);
    }

    // Establecemos la temporizacion
    alarm(n_secs);

    // Esperamos a que terminen los procesos
    for (i = 0; i < n_procs; i++)
    {
        waitpid(pids[i], NULL, 0);
    }

    // Liberamos los recursos del sistema
    sem_close(sem);
    sem_unlink("sem");
    remove(PID_FILE);
    remove(VOTE_FILE);

    printf("Finishing by signal\n");
    exit(0);
}

void handle_sigint(int signo)
{
    int i;
    for (i = 0; i < n_procs; i++)
    {
        kill(pids[i], SIGTERM);
    }
    printf("Finishing by signal\n");
    exit(0);
}

void handle_sigterm(int signo)
{
    // Liberamos los recursos
    sem_close(sem);
    exit(0);
}

void handle_sigusr1(int signo)
{
    // Esperamos a que el candidato se establezca
    sem_wait(sem);

    // Esperamos a que todos los procesos voten
    int votes = getVotes();
    while (votes != n_procs)
    {
        usleep(1000);
        votes = getVotes();
    }

    // Mostramos el resultado
    int accepted = 0;
    FILE *fp = fopen(VOTE_FILE, "r");
    if (fp == NULL)
    {
        printf("Error al abrir el fichero de votos\n");
        exit(-1);
    }
    int vote;
    while (fscanf(fp, "%d", &vote) > 0)
    {
        if (vote == 1)
        {
            accepted++;
        }
    }
    printResult(accepted);
    fclose(fp);
    kill(getpid(), SIGUSR1);
}

void handle_sigusr2(int signo)
{
    sem_post(sem);

    // Generamos el voto y lo almacenamos en el fichero
    int vote = 0;
    if (rand() % 2 == 0)
    {
        vote = 1;
    }
    FILE *fp = fopen(VOTE_FILE, "a");
    if (fp == NULL)
    {
        printf("Error al abrir el fichero de votos\n");
        exit(-1);
    }
    fprintf(fp, "%d\n", vote);
    fclose(fp);
}

void child_job()
{
    // Bloqueamos las señales
    sigset_t mask;
    sigfillset(&mask);
    sigprocmask(SIG_BLOCK, &mask, NULL);

    // Esperamos a que el sistema este listo
    sigemptyset(&mask);
    sigsuspend(&mask);

    // Iteramos
    while (1)
    {
        // Esperamos a que se establezca el candidato
        sem_wait(sem);

        // Esperamos a que todos los procesos voten
        int votes = getVotes();
        while (votes != n_procs)
        {
            usleep(1000);
            votes = getVotes();
        }
        // Generamos el voto y lo almacenamos en el fichero
        int vote = 0;
        if (rand() % 2 == 0)
        {
            vote = 1;
        }
        FILE *fp = fopen(VOTE_FILE, "a");
        if (fp == NULL)
        {
            printf("Error al abrir el fichero de votos\n");
            exit(-1);
        }
        fprintf(fp, "%d\n", vote);
        fclose(fp);

        // Esperamos al siguiente ciclo
        usleep(250000);
        kill(getpid(), SIGUSR1);
    }
}

int getVotes()
{
    int votes = 0;
    FILE *fp = fopen(VOTE_FILE, "r");
    if (fp == NULL)
    {
        printf("Error al abrir el fichero de votos\n");
        exit(-1);
    }
    int vote;
    while (fscanf(fp, "%d", &vote) > 0)
    {
        votes++;
    }
    fclose(fp);
    return votes;
}

void printResult(int accepted)
{
    char result[50];
    if (accepted > (n_procs / 2))
    {
        sprintf(result, "Candidate %d => [", getpid());
        FILE *fp = fopen(VOTE_FILE, "r");
        if (fp == NULL)
        {
            printf("Error al abrir el fichero de votos\n");
            exit(-1);
        }
        int vote;
        while (fscanf(fp, "%d", &vote) > 0)
        {
            if (vote == 1)
            {
                strcat(result, " Y");
            }
            else
            {
                strcat(result, " N");
            }
        }
        strcat(result, " ] => Accepted");
    }
    else
    {
        sprintf(result, "Candidate %d => [", getpid());
        FILE *fp = fopen(VOTE_FILE, "r");
        if (fp == NULL)
        {
            printf("Error al abrir el fichero de votos\n");
            exit(-1);
        }
        int vote;
        while (fscanf(fp, "%d", &vote) > 0)
        {
            if (vote == 1)
            {
                strcat(result, " Y");
            }
            else
            {
                strcat(result, " N");
            }
        }
        strcat(result, " ] => Rejected");
    }
    printf("%s\n", result);
}
