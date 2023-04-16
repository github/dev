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


void llama_minero(int fd_read[2], int fd_write[2], int pid, int target, int num_rounds, int num_threads);
void llama_monitor(int fd_read[2], int fd_write[2]);
void llamada_padre(int pid);

void llama_monitor(int fd_read[2], int fd_write[2])
{
    int mon;
    close(fd_read[1]);
    close(fd_write[0]);

    mon = monitor(fd_write[1], fd_read[0]);

    close(fd_write[1]);
    close(fd_read[0]);

    exit(mon);
}

void llama_minero(int fd_read[2], int fd_write[2], int pid, int target, int num_rounds, int num_threads)
{

    int min, status;

    close(fd_write[0]);
    close(fd_read[1]);

    min = minero(fd_write[1], fd_read[0], target, num_rounds, num_threads);

    close(fd_write[1]);
    close(fd_read[0]);

    waitpid(pid, &status, 0);

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

void llamada_padre(int pid)
{
    int status;

    waitpid(pid, &status, 0);
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

    if (argc != 4)
    {
        return EXIT_FAILURE;
    }

    long int target = atoi(argv[1]);
    int num_rounds = atoi(argv[2]);
    int num_threads = atoi(argv[3]);

    pid = fork();

    if (pid < 0)
    {
        perror("fork");
        exit(EXIT_FAILURE);
    }
    else if (pid == 0)
    {
        pipe(fd1_mon);
        pipe(fd2_min);
        pid = fork();
        if (pid < 0)
        {
            perror("fork");
            exit(EXIT_FAILURE);
        }
        if (pid > 0)
        {

            llama_minero(fd2_min, fd1_mon, pid, target, num_rounds, num_threads);
        }
        else if (pid == 0)
        {

            llama_monitor(fd1_mon, fd2_min);
        }
    }
    else
    {
        llamada_padre(pid);
    }
    exit(EXIT_FAILURE);
}
