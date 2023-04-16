#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <unistd.h>
#include "pow.h"
#include "types.h"


long int pminero(long int target, int nthreads);

Status minero(int fd_write, int fd_read, long int target, int num_rounds, int num_threads);

int main(int argc, char *argv[])
{
    pid_t pid, pid2;
    int fd1[2];
    int fd2[2];

    if (argc != 4)
    {
        printf("Usage: %s < TARGET_INI > < ROUNDS > < N_THREADS >\n", argv[0]);
        return EXIT_FAILURE;
    }

    long int target = atoi(argv[1]);
    int num_rounds = atoi(argv[2]);
    int num_threads = atoi(argv[3]);

    printf("Target: %ld - Round: %d - Thread: %d\n", target, num_rounds, num_threads);
    pipe(fd1);
    pipe(fd2);
    pid = fork();

    if (pid < 0)
    {
        perror("fork");
        exit(EXIT_FAILURE);
    }
    else if (pid == 0)
    {
        pid2 = fork();
        if (pid2 < 0)
        {
            perror("fork");
            exit(EXIT_FAILURE);
        }
        else if (pid2 == 0)
        {
            monitor();
        }
        else
        {
            close(fd1[0]);
            close(fd2[1]);
            minero(fd1[1], fd2[0], target, num_rounds, num_threads);
            wait();
        }
        
    }
    else{
        wait();
    }
    
}

Status minero(int fd_write, int fd_read, long int target, int num_rounds, int num_threads)
{

    int res;

    for (int i = 0; i < num_rounds; i++)
    {
        printf("Round %d - Target: %ld\n", i + 1, target);

        pthread_t threads[num_threads];

        for (int j = 0; j < num_threads; j++)
        {
            res = pminero(target, num_threads);
            write(fd_write, res, sizeof(res));
        }

        for (int j = 0; j < num_threads; j++)
        {
            pthread_join(threads[j], NULL);
        }

        int found = 0;
        for (int j = 0; j < num_threads; j++)
        {
            if (thread_data[j].result != -1)
            {
                printf("Result found by thread %d: %ld\n", j, thread_data[j].result);
                target = thread_data[j].result;
                found = 1;
                break;
            }
        }

        if (!found)
        {
            printf("Target not found!\n");
            return EXIT_FAILURE;
        }
    }

    printf("All targets found successfully!\n");

    return EXIT_SUCCESS;
}

long int pminero(long int target, int nthreads)
{
    pthread_t threads[nthreads];
    int j;
    long int start, end;
    

    for(j = 0; j < nthreads; j ++){
        start = (long int)j * (long int)POW_LIMIT / (long int)nthreads;
        end = (long int)(j + 1) * (long int)POW_LIMIT / (long int)nthreads;
        pthread_create(threads[j],NULL, )
    }

    for (long int i = start; i < end; i++)
    {
        if (pow_hash(i) == target)
        {
            return i;
        }
    }
    return -1;
}