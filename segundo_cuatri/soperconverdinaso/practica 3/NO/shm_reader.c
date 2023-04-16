#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <unistd.h>

#include "shm_rdwr.h"

int main(void) {
  int i, fd_shm;
  ShmExampleStruct *shm_struct = NULL;

  /* Open of the shared memory. */
  if ((fd_shm = shm_open(SHM_NAME, O_RDONLY, 0)) == -1) {
    perror("shm_open");
    exit(EXIT_FAILURE);
  }

  /* Mapping of the memory segment. */
  shm_struct = mmap(NULL, sizeof(ShmExampleStruct), PROT_READ, MAP_SHARED, fd_shm, 0);
  close(fd_shm);
  if (shm_struct == MAP_FAILED) {
    perror("mmap");
    exit(EXIT_FAILURE);
  }
  printf("Pointer to shared memory segment: %p\n", (void *)shm_struct);

  /* Reading of the memory. */
  printf("%s\n", shm_struct->message);
  for (i = 0; i < INT_LIST_SIZE; i++) {
    printf("%d\n", shm_struct->integer_list[i]);
  }

  /* Unmapping of the shared memory */
  munmap(shm_struct, sizeof(ShmExampleStruct));

  exit(EXIT_SUCCESS);
}
