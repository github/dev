#include <pthread.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "types.h"
#include "pow.h"

int minero(int fd_write, int fd_read, long int target, int num_rounds, int num_threads);
void *search_range(void *data);