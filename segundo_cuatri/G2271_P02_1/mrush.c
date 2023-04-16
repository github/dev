#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include "pow.h"
#include "types.h"
#include "minero.h"
#include "monitor.h"

typedef struct
{
    int thread_id;   /*!< The ID of the thread. */
    int num_threads; /*!< The total number of threads. */
    long int target; /*!< The target value to find. */
    long int result; /*!< The result found by the thread. */
} ThreadData;

/* Cierra los pipes, llama al minero y comprueba el estado de finalización del monitor: */
void llama_minero(int fd_read[2], int fd_write[2], int pid, int target, int num_rounds, int num_threads);
/* Cierra los pipes y llama al monitor: */
void llama_monitor(int fd_read[2], int fd_write[2]);
/* Comprueba el estado de finalización de minero: */
void llamada_padre(int pid);

/**
 * @brief Llama a monitor
 *
 * Cierra los pipes y llama al monitor
 *
 * @param fd_write int
 * @param fd_read int
 *
 * @return Returns EXIT_SUCCESS if there are not errors, EXIT_FAILURE otherwise.
 **/
void llama_monitor(int fd_read[2], int fd_write[2])
{
    int mon;

    /* Cierra los pipes: */
    close(fd_read[1]);
    close(fd_write[0]);

    /* Llama a monitor: */
    mon = monitor(fd_write[1], fd_read[0]);

    /* Cierra los pipes: */
    close(fd_write[1]);
    close(fd_read[0]);

    exit(mon);
}

/**
 * @brief Llama a minero
 *
 * Cierra los pipes, llama al minero y comprueba el estado
 * de finalización.
 *
 * @param fd_write int
 * @param fd_read int
 * @param pid int; Id del proceso.
 * @param target long int; Objetivo del problema inicial que debe resolver.
 * @param num_rounds int; Número de rondas de minado que debe realizar.
 * @param num_threads int; Número de hijos que debe utilizar.
 *
 * @return Returns EXIT_SUCCESS if there are not errors, EXIT_FAILURE otherwise.
 **/
void llama_minero(int fd_read[2], int fd_write[2], int pid, int target, int num_rounds, int num_threads)
{

    int min, status;

    /* Cierra los pipes: */
    close(fd_write[0]);
    close(fd_read[1]);

    /* Llama a minero: */
    min = minero(fd_write[1], fd_read[0], target, num_rounds, num_threads);

    /* Cierra los pipes: */
    close(fd_write[1]);
    close(fd_read[0]);

    /* Wait del pid: */
    waitpid(pid, &status, 0);

    /* Comprobamos el valor de status: */
    if (WIFEXITED(status))
    {
        printf("Monitor exited with status %d\n", WEXITSTATUS(status));
    }
    else
    {
        printf("Monitor exited unexpectedly\n");
    }

    exit(min);
}

/**
 * @brief Comprueba el estado de finalización del minero
 *
 * @param pid int; Id del proceso
 *
 * @return Returns EXIT_SUCCESS if there are not errors, EXIT_FAILURE otherwise.
 **/
void llamada_padre(int pid)
{
    int status;

    /* Wait del pid: */
    waitpid(pid, &status, 0);

    /* Comprobamos el valor del status: */
    if (WIFEXITED(status))
    {
        printf("Miner exited with status %d\n", WEXITSTATUS(status));
    }
    else
    {
        printf("Miner exited unexpectedly\n");
        exit(EXIT_FAILURE);
    }
    exit(EXIT_SUCCESS);
}

int main(int argc, char *argv[])
{
    int pid;
    int fd1_mon[2];
    int fd2_min[2];

    /* Comprobamos los argumentos: */
    if (argc != 4)
    {
        return EXIT_FAILURE;
    }

    long int target = atoi(argv[1]);
    int num_rounds = atoi(argv[2]);
    int num_threads = atoi(argv[3]);

    /* Fork! */
    pid = fork();

    if (pid < 0) /* Ha ocurrido un error */
    {
        perror("fork");
        exit(EXIT_FAILURE);
    }
    else if (pid == 0) /* Es hijo */
    {
        /* Creamos los pipes: */
        pipe(fd1_mon);
        pipe(fd2_min);
        pid = fork(); /* Fork! */
        if (pid < 0) /* Ha ocurrido un error */
        {
            perror("fork");
            exit(EXIT_FAILURE);
        }
        if (pid > 0) /* Es padre */
        {
            /* Llamada a minero: */
            llama_minero(fd2_min, fd1_mon, pid, target, num_rounds, num_threads);
        }
        else if (pid == 0) /* Es hijo */
        {
            /* Llamada a monitor: */
            llama_monitor(fd1_mon, fd2_min);
        }
    }
    else /* Es padre */
    {
        /* Llamada a padre: */
        llamada_padre(pid);
    }
    exit(EXIT_FAILURE);
}
