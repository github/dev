/**
 * @file minero.c
 * @author Cristina Rodríguez & Santiago Fernández
 * @brief El proceso minero, se encargará de buscar la solución al problema propuesto
 * @version -1.0
 * @date 2023-03-05
 * 
 * @copyright Copyright (c) 2023
 * 
 */
#include "pow.h"
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>

/**
 * @brief Estas dos variables se declaran como globales para que puedan ser 
 * modificadas por todos los hilos del minero así como que sirvan de flag para determinar 
 * si se ha terminado la búsqueda o no.
 */
long int solution = 0;
char	found = 0;

/**
 * @brief Esta función define el comportameinto de búsqueda que seguirá cada hilo minero.
 * Recibe un valor de inicio de búsqueda y un valor máximo, y su objetivo es determinar si el valor
 * que se solicita es objetible con algún número de su rango.
 * 
 * @param arg Un array de punteros void, que se casteará a long int. Contendrá los valores de inicio, 
 * final y objetivo a encontrar para cada mhilo de minería.
 * 
 * @return void* Siempre devuelve NULL por la simplicidad en el trato de este dato
 */
void *thread_miner(void *arg);

/**
 * @brief El proceso minero iterará tantas veces como número de rondas se haya solicitado.
 * En cada ronda. Creará el proceso monitor y los hilos que tratarán de buscar la solución.
 * 
 * @note Los comentarios // han sido empleados para la depuración de errores durante el desarrollo del programa.
 * 
 * @param argc El número de argumentos que recibirá el programa.
 * @param argv El array de strings con los valores de lso argumentos.
 * 
 * @return int 0 si ha salido correctamente o 1 si ha habido algún error.
 */
int main (int argc, char *argv[]){
	long int	target;
	int		rounds;
	int		nThreads;
	int		error;
	int		pipeToMonitor[2];
	int		pipeFromMonitor[2];
	pid_t		pid = 0;
	pthread_t	*threads;
	long int	**arguments;
	char		*monitorArgv[4];
	int		veredict = 0;
	int		i = 0;
	int		j = 0;
	int		n = 0;
	int		status;
	long int	comms[2];

	/*Comprobar que el número de argumentos es el correcto*/
	if (argc != 4)
		exit(EXIT_FAILURE);

	/*Recuperar los valores del número de rondas a calcular y el número de 
	hilos a usar*/
	rounds = atoi(argv[2]);
	nThreads = atoi(argv[3]);

	/*iniciamos un bucle que se repetirá hasta alcanzar el número de rondas deseado*/
	for(n = 0; n < rounds; n++){
		/*En la primera ronda, el target viene de los argumentos*/
		if (n == 0){
			target = atol(argv[1]);
		}
		/*Pero para las siguientes, la solución anterior es el nuevo targer*/
		else{
			target = solution;
			found = 0;
		}
		//printf("Argumentos main: %ld, %d, %d\n", target, rounds, nThreads);
		//fflush(stdout);

		/*Inicializar las tuberías para comunicarse con el Monitor*/
		error = pipe(pipeToMonitor);
		if (error == -1) {
			perror("pipe");
			printf("Miner exited unexpectedly\n");
			fflush(stdout);
			exit(EXIT_FAILURE);
		}
		error = pipe(pipeFromMonitor);
		if (error == -1) {
			close(pipeToMonitor[0]);
			close(pipeToMonitor[1]);
			perror("pipe");
			printf("Miner exited unexpectedly\n");
			fflush(stdout);
			exit(EXIT_FAILURE);
		}

		/*Se intenta crear el proceso monitor*/
		pid = fork();
		if (pid < 0){
			/*Si ha habido algún error, se han de liberar los recursos*/
			close(pipeToMonitor[0]);
			close(pipeToMonitor[1]);
			close(pipeFromMonitor[0]);
			close(pipeFromMonitor[1]);
			perror("fork");
			printf("Miner exited unexpectedly\n");
			fflush(stdout);
			exit(EXIT_FAILURE);
		} else if (pid == 0) {
			/*Cerrar los extremos de las tuberías que no se van a usar. Siendo [0] la de lectura y [1] la de escritura*/
			close(pipeToMonitor[1]);
			close(pipeFromMonitor[0]);
			
			/*Preparamos un array con los argumentos que serán necesarios en el monitor*/
			monitorArgv[0] = "./monitor";
			monitorArgv[1] = malloc(sizeof(int) + 1);
			sprintf(monitorArgv[1], "%d", pipeToMonitor[0]);
			monitorArgv[2] = malloc(sizeof(int) + 1);
			sprintf(monitorArgv[2], "%d", pipeFromMonitor[1]);
			monitorArgv[3] = NULL;
			//printf("Argumentos antes de entrar: %s, %s, %s, %s\n", monitorArgv[0], monitorArgv[1], monitorArgv[2], monitorArgv[3]);
			//fflush(stdout);

			/*Si ha habido algún error, se han de liberar los recursos*/
			if (execvp("./monitor", monitorArgv)) 
			{
				close(pipeToMonitor[0]);
				close(pipeFromMonitor[1]);
				perror("execvp");
				printf("Monitor exited unexpectedly\n");
				fflush(stdout);
				exit(EXIT_FAILURE);
			}
		} else{
			/*Cerrar los extremos de las tuberías que no se van a usar. Siendo [0] la de lectura y [1] la de escritura*/
			close(pipeToMonitor[0]);
			close(pipeFromMonitor[1]);
			for(i = 0; i < nThreads; i++){
				/*Para evitar warnings al compilar, por el realloc. El primer caso se inicializa con mallocs*/
				if (i == 0){
					/*Se inicializa un array de arrays, que guardará los argumentos de cada thread.
					 Si ha habido algún error, se han de liberar los recursos*/
					arguments = malloc(sizeof(arguments[0]));
					if (arguments == NULL){
						close(pipeToMonitor[1]);
						close(pipeFromMonitor[0]);
						printf("Miner exited unexpectedly\n");
						fflush(stdout);
						exit(EXIT_FAILURE);
					}
					/*Se inicializa un array de threads, que guardará los identificadores de los threads.
					 Si ha habido algún error, se han de liberar los recursos*/
					threads = malloc(sizeof(threads[0]));
					if (threads == 0) {
						close(pipeToMonitor[1]);
						close(pipeFromMonitor[0]);
						free(arguments);
						printf("Miner exited unexpectedly\n");
						fflush(stdout);
						exit(EXIT_FAILURE);
					}
					/*Se inicializa un array que contendrá el valor de los argumentos para el nuevo thread de esta iteración.
					 Si ha habido algún error, se han de liberar los recursos*/
					arguments[i] = malloc(sizeof(arguments[0][0]) * 3);
					if (arguments[i] == 0) {
						close(pipeToMonitor[1]);
						close(pipeFromMonitor[0]);
						free(arguments);
						free(threads);
						printf("Miner exited unexpectedly\n");
						fflush(stdout);
						exit(EXIT_FAILURE);
					}

					/*Se dan los valores de los argumentos para este thread y se crea*/
					arguments[i][0] = 0;
					arguments[i][1] = POW_LIMIT / nThreads;
					arguments[i][2] = target;
					error = pthread_create(&threads[0], NULL, thread_miner, arguments[0]);

					/*Si ha habido algún error, se han de liberar los recursos*/
					if (error != 0) {
						close(pipeToMonitor[1]);
						close(pipeFromMonitor[0]);
						fprintf(stderr, "pthread_create: %s\n", strerror(error));
						free(arguments[i]);
						free(threads);
						free(arguments);
						printf("Miner exited unexpectedly\n");
						fflush(stdout);
						exit(EXIT_FAILURE);
					}
				} else {
					/*Se redimensiona el array de arrays.
					 Si ha habido algún error, se han de liberar los recursos*/
					arguments = realloc(arguments, sizeof(arguments[0]) * (i + 1));
					if (arguments == NULL){
						close(pipeToMonitor[1]);
						close(pipeFromMonitor[0]);
						printf("Miner exited unexpectedly\n");
						fflush(stdout);
						exit(EXIT_FAILURE);
					}
					
					/*Se redimensiona el array de threads, que guardará los identificadores de los threads.
					 Si ha habido algún error, se han de liberar los recursos*/
					threads = realloc(threads, sizeof(threads[0]) * (i + 1));
					if (threads == NULL){
						close(pipeToMonitor[1]);
						close(pipeFromMonitor[0]);
						for(j = 0; j < i; j++){
							free(arguments[i]);
						}
						free(arguments);
						printf("Miner exited unexpectedly\n");
						fflush(stdout);
						exit(EXIT_FAILURE);
					}

					/*Se inicializa un array que contendrá el valor de los argumentos para el nuevo thread de esta iteración.
					Si ha habido algún error, se han de liberar los recursos*/
					arguments[i] = malloc(sizeof(arguments[0][0]) * 3);
					if (arguments[i] == NULL){
						close(pipeToMonitor[1]);
						close(pipeFromMonitor[0]);
						for(j = 0; j < i; j++){
							free(arguments[i]);
						}
						free(arguments);
						free(threads);
						printf("Miner exited unexpectedly\n");
						fflush(stdout);
						exit(EXIT_FAILURE);
					}

					/*Se dan los valores de los argumentos para este thread y se crea*/
					arguments[i][0] = (POW_LIMIT / nThreads) * i + 1;
					arguments[i][1] = (POW_LIMIT / nThreads) * (i + 1);
					arguments[i][2] = target;
					error = pthread_create(&threads[i], NULL, thread_miner, arguments[i]);

					/*Si ha habido algún error, se han de liberar los recursos*/
					 if (error != 0) {
						close(pipeToMonitor[1]);
						close(pipeFromMonitor[0]);
						fprintf(stderr, "pthread_create: %s\n", strerror(error));
						for(j = 0; j < i; j++){
							free(arguments[i]);
						}
						free(arguments);
						free(threads);
						printf("Miner exited unexpectedly\n");
						fflush(stdout);
						exit(EXIT_FAILURE);
					}
				}
			}

			/*Esperamos a la finalización de los procesos y liberamos su memoria asociada*/
			for(i = 0; i < nThreads; i++){
				error = pthread_join(threads[i], NULL);
				/*Si ha habido algún error, se han de liberar los recursos*/
				if (error != 0) {
					close(pipeToMonitor[1]);
					close(pipeFromMonitor[0]);
					fprintf(stderr, "pthread_join: %s\n", strerror(error));
					for(j = i; j < nThreads; j++){
						free(arguments[i]);
					}
					free(arguments);
					free(threads);
					printf("Miner exited unexpectedly\n");
					fflush(stdout);
					exit(EXIT_FAILURE);
				}
				free(arguments[i]);
			}

			/*Liberamos memoria*/
			free(threads);
			free(arguments);

			/*Comunicar el resultado al monitor*/
			comms[0] = solution;
			comms[1] = target;
			write(pipeToMonitor[1], comms, sizeof(comms[0]) * 2);
			close(pipeToMonitor[1]);

			/*Esperar la respuesta del monitor*/
			waitpid(pid, &status, 0);
			if(status != 0){
				printf("Monitor exited unexpectedly\n");
				exit(EXIT_FAILURE);
			}
			read(pipeFromMonitor[0], &veredict, 4);
			close(pipeFromMonitor[0]);

			/*Si la respuesta ha sido invalidada, se ha de terminar la ejecución*/
			if (veredict == 1){
				waitpid(pid, &status, 0);
				printf("The solution has been invalidated\n");
				fflush(stdout);
				printf("Monitor exited with status %d\n", status);
				fflush(stdout);
				exit(EXIT_FAILURE);
			}
		}
	}
	/*Finalmente, se muestra el estatus del monitor y se retorna al proceso principal*/
	printf("Monitor exited with status %d\n", status);
	fflush(stdout);
	exit(EXIT_SUCCESS);
}

void *thread_miner(void *arg){
	const long int	*args = arg;
	long int	x = args[0];
	long int	limit = args[1];

	//printf("Argumentos despues de entrar: %ld, %ld, %ld\n", args[0], args[1], args[2]);
	//fflush(stdout);

	/*Mientras que no se haya llegado al límite y no haya sido encontrada la solucioón
	(por cualquier hilo), se seguirá buscando*/
	for ( ; (found == 0) && (x <= limit); x++){
		//printf("Valor de x: %ld -- valor de powHash: %ld\n", x, pow_hash(x));
		//fflush(stdout);

		/*Comprobar si la solución obtenida es la deseada
		En caso de serlo, finalizar el hilo*/
		if (args[2] == pow_hash(x)){
			//printf("Encontrado\n");
			//fflush(stdout);
			found = 1;
			solution = x;
			return NULL;
		}
	}
	return NULL;
}
