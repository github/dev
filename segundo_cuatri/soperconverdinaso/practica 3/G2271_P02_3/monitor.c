#include "monitor.h"

/*
El proceso Monitor:
• Abrira el segmento de memoria compartida.
• Extraera un bloque.
• Lo mostrara por pantalla, con la sintaxis "Solution accepted: %08ld --> %08ld" (el primer numero es el objetivo y el segundo la solucion) para los bloques correctos, y "Solution rejected: %08ld !-> %08ld" para los incorrectos.
• Realizara una espera de <LAG> milisegundos.
• Repetira el ciclo de extraccion/muestra hasta que reciba un bloque especial que indique la finalizacion del sistema.
• Cuando reciba el bloque de finalizacion, liberara los recursos y terminara.
*/

int monitor(int lag)
{
    printf("Monitor\n");
    /*
    //abre el segmento de memoria compartida
    int fd;
    fd = shm_open(SHM_NAME, O_RDWR, 0666);
    if (fd == -1)
    {
        perror("Error opening the shared memory");
        exit(EXIT_FAILURE);
    }
    //mapea el segmento de memoria compartida
    char *ptr;
    ptr = mmap(NULL, SHM_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    if (ptr == MAP_FAILED)
    {
        perror("Error mapping the shared memory");
        exit(EXIT_FAILURE);
    }
    //recibe un bloque y lo muestra
    int *puntero = (int *)ptr;
    while (1)
    {
        if (puntero[0] == -1)
        {
            break;
        }
        if (puntero[0] == puntero[1])
        {
            printf("Solution accepted: %08d --> %08d\n", puntero[0], puntero[1]);
        }
        else
        {
            printf("Solution rejected: %08d !-> %08d\n", puntero[0], puntero[1]);
        }
        puntero += 2;
        usleep(lag * 1000);
    }
    //libera los recursos
    if (munmap(ptr, SHM_SIZE) == -1)
    {
        perror("Error unmapping the shared memory");
        exit(EXIT_FAILURE);
    }
    if (close(fd) == -1)
    {
        perror("Error closing the shared memory");
        exit(EXIT_FAILURE);
    }
    if (shm_unlink(SHM_NAME) == -1)
    {
        perror("Error unlinking the shared memory");
        exit(EXIT_FAILURE);
    }*/
    return 0;
}
