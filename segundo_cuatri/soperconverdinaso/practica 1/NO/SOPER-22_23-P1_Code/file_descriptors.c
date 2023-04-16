#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>

#define MESSAGE "Hello"

#define FILE1 "file1.txt"
#define FILE2 "file2.txt"
#define FILE3 "file3.txt"

int main(void) {
  int file1, file2, file3, file4;
  size_t target_size;
  ssize_t size_written, total_size_written;

  fprintf(stderr, "PID = %d\nStop 1\n", getpid());
  getchar();

  if ((file1 = open(FILE1, O_CREAT | O_TRUNC | O_RDWR,
                    S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP)) == -1) {
    perror("open");
    exit(EXIT_FAILURE);
  }

  /* Write message. */
  total_size_written = 0;
  target_size = sizeof(MESSAGE);
  do {
    size_written = write(file1, MESSAGE + total_size_written,
                         target_size - total_size_written);
    if (size_written == -1) {
      perror("write");
      exit(EXIT_FAILURE);
    }
    total_size_written += size_written;
  } while (total_size_written != target_size);

  fprintf(stderr, "Stop 2\n");
  getchar();

  if ((file2 = open(FILE2, O_CREAT | O_TRUNC | O_RDWR,
                    S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP)) == -1) {
    perror("open");
    exit(EXIT_FAILURE);
  }

  fprintf(stderr, "Stop 3\n");
  getchar();

  if (unlink(FILE1) != 0) {
    perror("unlink");
    exit(EXIT_FAILURE);
  }

  fprintf(stderr, "Stop 4\n");
  getchar();

  close(file1);

  fprintf(stderr, "Stop 5\n");
  getchar();

  if ((file3 = open(FILE3, O_CREAT | O_TRUNC | O_RDWR,
                    S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP)) == -1) {
    perror("open");
    exit(EXIT_FAILURE);
  }

  fprintf(stderr, "Stop 6\n");
  getchar();

  if ((file4 = open(FILE3, O_RDONLY, S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP)) ==
      -1) {
    perror("open");
    exit(EXIT_FAILURE);
  }

  fprintf(stderr, "Stop 7\n");
  getchar();

  close(file2);
  close(file3);
  close(file4);

  if (unlink(FILE2) != 0) {
    perror("unlink");
    exit(EXIT_FAILURE);
  }

  if (unlink(FILE3) != 0) {
    perror("unlink");
    exit(EXIT_FAILURE);
  }

  exit(EXIT_SUCCESS);
}
