#include <pthread.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "types.h"
#include "pow.h"

/**
 * @brief Verifica las soluciones encontradas por el proceso minero.
 *
 *
 * @param fd_write int
 * @param fd_read int
 *
 * @return Returns EXIT_SUCCESS if there are not errors, EXIT_FAILURE otherwise.
 **/
int monitor(int fd_write, int fd_read);
