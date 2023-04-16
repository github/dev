/**
 * @file main.c
 * @author Cristina Rodríguez & Santiago Fernández
 * @brief El progrmama principal del minero.
 * @version 1.0
 * @date 2023-03-05
 * 
 * @copyright Copyright (c) 2023
 * 
 */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

/**
 * @brief El proceso principal del minero. Su objetivo es asegurarse de que 
 * el proceso minero se crea correctamente y quedar a la espera de la 
 * finalización de su ejecución.
 * 
 * @param argc El número de argumentos que recibirá el programa.
 * @param argv El array de strings con los valores de lso argumentos.
 *
 * @return int 0 si ha salido correctamente o 1 si ha habido algún error.
 */
int main (int argc, char *argv[]){
	pid_t	pid = 0;
	int	status;

	/*Si el número de argumentos no es el esperado
	se finalizará inmediatamente la ejecución del programa*/
	if (argc != 4)
		exit(EXIT_FAILURE);

	/*Intentamos crar un proceso hijo, con su control de errores*/
	pid = fork();
	if (pid < 0){
		perror("fork");
		printf("Miner exited unexpectedly\n");
		exit(EXIT_FAILURE);
	} else if (pid == 0){
		/*Si se ha podido crear el proceso, será el proceso minero*/
		argv[0] = "./minero";
		argv[argc] = NULL;
		if (execvp("./minero", argv))
		{
			perror("execvp");
			exit(EXIT_FAILURE);
		}
	} else{
		/*Y el proceso padre tendrá que esperar a que termine*/
		waitpid(pid, &status, 0);
		printf("Miner exited with status %d\n", status);
	}
	exit(EXIT_SUCCESS);
}
