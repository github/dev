#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>

static volatile sig_atomic_t got_signal = 0;

/* Handler function for the signal SIGINT. */
void handler(int sig) { got_signal = 1; }

int main(void) {
  struct sigaction act;

  act.sa_handler = handler;
  sigemptyset(&(act.sa_mask));
  act.sa_flags = 0;

  if (sigaction(SIGINT, &act, NULL) < 0) {
    perror("sigaction");
    exit(EXIT_FAILURE);
  }

  while (1) {
    printf("Waiting Ctrl+C (PID = %d)\n", getpid());
    if (got_signal) {
      got_signal = 0;
      printf("Signal received.\n");
    }
    sleep(9999);
  }
}
