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
 * @brief Realiza las rondas de minado con el objetivo de resolver el problema dado
 *
 * Para cada ronda del proceso, divide el espacio de búsqueda en tantos hilos
 * como se haya especificado. Cuando un hilo encuentra la solución, terminan todos
 * los hilos y se devuelve la solución al hilo principal.
 *
 * @param fd_write int
 * @param fd_read int
 * @param target long int; Objetivo del problema inicial que debe resolver.
 * @param num_rounds int; Número de rondas de minado
 * @param num_threads int; Número de hilos que debe utilizar.
 *
 * @return Returns EXIT_SUCCESS if there are not errors, EXIT_FAILURE otherwise.
 **/
int minero(int fd_write, int fd_read, long int target, int num_rounds, int num_threads);

/**
 * @brief Rángo de búsqueda
 *
 *
 * @param data void
 **/
void *search_range(void *data);