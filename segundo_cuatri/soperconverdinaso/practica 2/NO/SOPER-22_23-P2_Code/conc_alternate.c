#include <fcntl.h>
#include <semaphore.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/wait.h>
#include <unistd.h>

#define SEM_NAME_A "/example_sem_1"
#define SEM_NAME_B "/example_sem_2"

int main(void) {
  sem_t *sem1 = NULL;
  sem_t *sem2 = NULL;
  pid_t pid;

  if ((sem1 = sem_open(SEM_NAME_A, O_CREAT | O_EXCL, S_IRUSR | S_IWUSR, 0)) ==
      SEM_FAILED) {
    perror("sem_open");
    exit(EXIT_FAILURE);
  }
  if ((sem2 = sem_open(SEM_NAME_B, O_CREAT | O_EXCL, S_IRUSR | S_IWUSR, 0)) ==
      SEM_FAILED) {
    perror("sem_open");
    exit(EXIT_FAILURE);
  }

  pid = fork();
  if (pid < 0) {
    perror("fork");
    exit(EXIT_FAILURE);
  }

  if (pid == 0) {
    /* Insert code A. */
    printf("1\n");
    /* Insert code B. */
    printf("3\n");
    /* Insert code C. */

    sem_close(sem1);
    sem_close(sem2);
  } else {
    /* Insert code D. */
    printf("2\n");
    /* Insert code E. */
    printf("4\n");
    /* Insert code F. */

    sem_close(sem1);
    sem_close(sem2);
    sem_unlink(SEM_NAME_A);
    sem_unlink(SEM_NAME_B);
    wait(NULL);
    exit(EXIT_SUCCESS);
  }
}
