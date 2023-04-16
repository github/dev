#include <fcntl.h>
#include <semaphore.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/wait.h>
#include <unistd.h>

#define SEM_NAME "/example_sem"

void sem_print(sem_t *sem) {
  int sval;
  if (sem_getvalue(sem, &sval) == -1) {
    perror("sem_getvalue");
    sem_unlink(SEM_NAME);
    exit(EXIT_FAILURE);
  }
  printf("Semaphore value: %d\n", sval);
  fflush(stdout);
}

int main(void) {
  sem_t *sem = NULL;
  pid_t pid;

  if ((sem = sem_open(SEM_NAME, O_CREAT | O_EXCL, S_IRUSR | S_IWUSR, 0)) ==
      SEM_FAILED) {
    perror("sem_open");
    exit(EXIT_FAILURE);
  }

  sem_print(sem);
  sem_post(sem);
  sem_print(sem);
  sem_post(sem);
  sem_print(sem);
  sem_wait(sem);
  sem_print(sem);

  pid = fork();
  if (pid < 0) {
    perror("fork");
    exit(EXIT_FAILURE);
  }

  if (pid == 0) {
    sem_wait(sem);
    printf("Critical region (child)\n");
    sleep(5);
    printf("End of critical region (child)\n");
    sem_post(sem);
    sem_close(sem);
    exit(EXIT_SUCCESS);
  } else {
    sem_wait(sem);
    printf("Critical region (parent)\n");
    sleep(5);
    printf("End of critical region (parent)\n");
    sem_post(sem);
    sem_close(sem);
    sem_unlink(SEM_NAME);

    wait(NULL);
    exit(EXIT_SUCCESS);
  }
}
