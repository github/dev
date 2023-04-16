/* This is only a code fragment, not a complete program... */
fd_shm = shm_open(SHM_NAME, O_RDWR | O_CREAT | O_EXCL, S_IRUSR | S_IWUSR);
if (fd_shm == -1) {
  if (errno == EEXIST) {
    fd_shm = shm_open(SHM_NAME, O_RDWR, 0);
    if (fd_shm == -1) {
      perror("Error opening the shared memory segment");
      exit(EXIT_FAILURE);
    } else {
      printf("Shared memory segment open\n");
    }
  } else {
    perror("Error creating the shared memory segment\n");
    exit(EXIT_FAILURE);
  }
} else {
  printf("Shared memory segment created\n");
}
