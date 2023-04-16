#include <fcntl.h>
#include <semaphore.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/wait.h>
#include <unistd.h>

#define SEM_NAME "/example_sem"

void handler(int sig) { return; }

int main(void) {
  sem_t *sem = NULL;
  struct sigaction act;

  if ((sem = sem_open(SEM_NAME, O_CREAT | O_EXCL, S_IRUSR | S_IWUSR, 0)) ==
      SEM_FAILED) {
    perror("sem_open");
    exit(EXIT_FAILURE);
  }

  sigemptyset(&(act.sa_mask));
  act.sa_flags = 0;

  /* The handler for SIGINT is set. */
  act.sa_handler = handler;
  if (sigaction(SIGINT, &act, NULL) < 0) {
    perror("sigaction");
    exit(EXIT_FAILURE);
  }

  printf("Starting wait (PID=%d)\n", getpid());
  sem_wait(sem);
  printf("Finishing wait\n");
  sem_unlink(SEM_NAME);
}
