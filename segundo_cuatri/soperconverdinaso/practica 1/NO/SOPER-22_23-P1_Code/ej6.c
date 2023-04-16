#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

#define NUM_PROC 3

int main(void)
{
    int i;
    pid_t pid;
    for (i = 0; i < NUM_PROC; i++)
    {
        pid = fork();
        /* printf("%d\n", pid); */
        if (pid < 0)
        {
            perror(" fork ");
            exit(EXIT_FAILURE);
        }
        else if (pid == 0)
        {
            printf(" PID Child %d\n", pid);
            exit(EXIT_SUCCESS);
        }
        else if (pid > 0)
        {
            printf(" Parent %d\n", i);
            printf(" PID Parent %d\n", pid);
        }
    }
    wait(NULL);
    exit(EXIT_SUCCESS);
}