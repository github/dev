#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>

int main(void) {
  sigset_t set, oset;

  /* Mask to block signals SIGUSR1 and SIGUSR2. */
  sigemptyset(&set);
  sigaddset(&set, SIGUSR1);
  sigaddset(&set, SIGUSR2);

  /* Blocking of signals SIGUSR1 and SIGUSR2 in the process. */
  if (sigprocmask(SIG_BLOCK, &set, &oset) < 0) {
    perror("sigprocmask");
    exit(EXIT_FAILURE);
  }

  printf("Waiting signals (PID = %d)\n", getpid());
  printf("SIGUSR1 and SIGUSR2 are blocked\n");
  pause();

  printf("End of program\n");
  exit(EXIT_SUCCESS);
}
