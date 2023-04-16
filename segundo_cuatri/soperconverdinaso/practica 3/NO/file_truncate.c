#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <unistd.h>

#define SHM_NAME "/shm_example"
#define MESSAGE "Test message"

int main(int argc, char *argv[]) {
  int fd;
  struct stat statbuf;

  if (argc != 2) {
    fprintf(stderr, "Usage: %s <FILE>\n", argv[0]);
    exit(EXIT_FAILURE);
  }

  fd = open(argv[1], O_RDWR | O_CREAT | O_EXCL, S_IRUSR | S_IWUSR);
  if (fd == -1) {
    perror("open");
    exit(EXIT_FAILURE);
  }
  dprintf(fd, "%s", MESSAGE);
  /* Get size of the file. */
  if (fstat(fd, &statbuf) == -1) {
    perror("fstat");
    exit(EXIT_FAILURE);
  }

  /* Truncate the file to size 5. */
  if (ftruncate(fd, 5) == -1) {
    perror("ftruncate");
    exit(EXIT_FAILURE);
  }

  close(fd);
  exit(EXIT_SUCCESS);
}
