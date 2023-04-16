#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>

#include "shm_rdwr.h"

#define MESSAGE "Hello world shared memory!"

int main(void) {
  int i, fd_shm;
  ShmExampleStruct *shm_struct = NULL;

  /* Creation of the shared memory. */
  if ((fd_shm = shm_open(SHM_NAME, O_RDWR | O_CREAT | O_EXCL, S_IRUSR | S_IWUSR)) == -1) {
    perror("shm_open");
    exit(EXIT_FAILURE);
  }

  /* Resize of the memory segment. */
  if (ftruncate(fd_shm, sizeof(ShmExampleStruct)) == -1) {
    perror("ftruncate");
    shm_unlink(SHM_NAME);
    exit(EXIT_FAILURE);
  }

  /* Mapping of the memory segment. */
  shm_struct = mmap(NULL, sizeof(ShmExampleStruct), PROT_READ | PROT_WRITE, MAP_SHARED, fd_shm, 0);
  close(fd_shm);
  if (shm_struct == MAP_FAILED) {
    perror("mmap");
    shm_unlink(SHM_NAME);
    exit(EXIT_FAILURE);
  }
  printf("Pointer to shared memory segment: %p\n", (void *)shm_struct);

  /* Initialization of the memory. */
  memcpy(shm_struct->message, MESSAGE, sizeof(MESSAGE));
  for (i = 0; i < INT_LIST_SIZE; i++) {
    shm_struct->integer_list[i] = i;
  }

  /* The daemon executes until some character is pressed. */
  getchar();

  /* Unmapping and freeing of the shared memory */
  munmap(shm_struct, sizeof(ShmExampleStruct));
  shm_unlink(SHM_NAME);

  exit(EXIT_SUCCESS);
}