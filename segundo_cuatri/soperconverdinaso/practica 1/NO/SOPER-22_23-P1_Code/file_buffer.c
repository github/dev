#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int main(void) {
  pid_t pid;

  printf("I am your father");

  pid = fork();
  if (pid < 0) {
    perror("fork");
    exit(EXIT_FAILURE);
  } else if (pid == 0) {
    printf("Noooooo");
    exit(EXIT_SUCCESS);
  }

  wait(NULL);
  exit(EXIT_SUCCESS);
}
