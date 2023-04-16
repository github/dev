#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

typedef struct
{
    char nombre[50];
    int edad;
} Persona;

int main()
{
    int fd[2]; // file descriptor del pipe
    pid_t pid;
    Persona persona = {"Juan", 30};

    // crear el pipe
    if (pipe(fd) == -1)
    {
        perror("pipe");
        exit(EXIT_FAILURE);
    }

    // crear un nuevo proceso
    pid = fork();

    if (pid == -1)
    {
        perror("fork");
        exit(EXIT_FAILURE);
    }

    if (pid == 0)
    {                 // proceso hijo
        close(fd[1]); // cerrar el extremo de escritura del pipe

        Persona persona_recibida;

        // leer la estructura desde el pipe
        read(fd[0], &persona_recibida, sizeof(Persona));

        printf("Persona recibida:\n");
        printf("Nombre: %s\n", persona_recibida.nombre);
        printf("Edad: %d\n", persona_recibida.edad);

        close(fd[0]);
        exit(EXIT_SUCCESS);
    }
    else
    {                 // proceso padre
        close(fd[0]); // cerrar el extremo de lectura del pipe

        // enviar la estructura a través del pipe
        write(fd[1], &persona, sizeof(Persona));

        close(fd[1]);
        wait(NULL);
        exit(EXIT_SUCCESS);
    }

    return 0;
}