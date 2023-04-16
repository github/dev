#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <unistd.h>

int main(void) {
  char *argv[3] = {"ls", "./", NULL};
  pid_t pid;

  pid = fork();
  if (pid < 0) {
    perror("fork");
    exit(EXIT_FAILURE);
  } else if (pid == 0) {
    if (execvp("ls", argv)) {
      perror("execvp");
      exit(EXIT_FAILURE);
    }
  } else {
    wait(NULL);
  }
  exit(EXIT_SUCCESS);
}