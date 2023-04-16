/**
 * @file monitor.c
 * @author Cristina Rodríguez & Santiago Fernández
 * @brief El proceso monitor, que se encargará validar la solución al problema propuesto.
 * @version 1.0
 * @date 2023-03-05
 * 
 * @copyright Copyright (c) 2023
 * 
 */
#include "pow.h"
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>

/**
 * @brief El proceso monitor se encarga de validar la solución de cada ronda
 * 
 * @note Los comentarios // han sido empleados para la depuración de errores durante el desarrollo del programa.
 * 
 * @param argc El número de argumentos que recibirá el programa.
 * @param argv El array de strings con los valores de lso argumentos.
 * 
 * @return int 0 si ha salido correctamente o 1 si ha habido algún error.
 */
int main(int argc, char *argv[]) {

	int		fdWrite;
	int		fdRead;
	long int	objective;
	long int	solution;
	int		veredict;

	/*Comprobar que el número de argumentos es el correcto*/
	if (argc != 3)
		exit(EXIT_FAILURE);
	//printf("Argumentos recibidos por monitor: %s, %s\n", argv[1], argv[2]);
	//fflush(stdout);

	/*Rescatar los fileDescriptors de las Tuberías*/
	fdRead = atoi(argv[1]);
	fdWrite = atoi(argv[2]);

	/*Leer el valor solución propuesto y el objetivo*/
	read(fdRead, &solution, sizeof(solution));
	read(fdRead, &objective, sizeof(objective));
	close(fdRead);
	//printf("He recibido %ld - %ld\n", solution, objective);

	/*Comprobar si la solución es válida*/
	if (pow_hash(solution) == objective){
		printf("Solution accepted : %08ld --> %08ld\n", objective, solution);
		fflush(stdout);
		veredict = 0;
		write(fdWrite, &veredict, 4);
		close(fdWrite);
	}
	else{
		printf("Solution rejected : %08ld !-> %08ld\n", objective, solution);
		fflush(stdout);
		veredict = 1;
		write(fdWrite, &veredict, 4);
		close(fdWrite);
		exit(EXIT_SUCCESS);
	}
	exit(EXIT_SUCCESS);
}
