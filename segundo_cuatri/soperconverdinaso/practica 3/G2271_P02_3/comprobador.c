/*
El proceso Comprobador:
• Creara e inicializara un segmento de memoria compartida.
• A continuacion, recibira un bloque (a traves de la cola de mensajes, ver "minero.c") y lo comprobara, anadiendole una bandera que indique si es correcto o no.
• Una vez comprobado, lo introducira en memoria compartida para que lo lea Monitor.
• Realizara una espera de <LAG> milisegundos.
• Repetira el proceso de recepcion/comprobacion/escritura hasta que reciba un bloque especial que indique la finalizacion del sistema.
• Cuando reciba el bloque de finalizacion, lo introducira en memoria compartida para notificar al Monitor de la finalizacion del sistema, liberara los recursos y terminara.
*/

#include "comprobador.h"
#include "monitor.h"
#define SHM_KEY 123

int comprobador(int lag){
    printf("Comprobador\n");
    // Crea e inicializa un segmento de memoria compartida utilizando la funcion shmget
    int fd_shm;
    fd_shm = shmget(SHM_KEY, sizeof(int), IPC_CREAT | 0666);
    if (fd_shm == -1){
        perror("Error creating the shared memory");
        exit(EXIT_FAILURE);
    }else{
        printf("Shared memory created\n");
    }

    close(fd_shm);
    shmctl(fd_shm, IPC_RMID, NULL);

    /*
    if (ftruncate(fd_shm, SHM_SIZE) == -1){
        perror("Error truncating the shared memory");
        exit(EXIT_FAILURE);
    }*/
    // Mapea el segmento de memoria compartida
    /*char *ptr;
    ptr = mmap(NULL, SHM_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd_shm, 0);
    if (ptr == MAP_FAILED){
        perror("Error mapping the shared memory");
        exit(EXIT_FAILURE);
    }
    // Recibe un bloque y lo muestra
    int *puntero = (int *)ptr;
    while (1){
        if (puntero[0] == -1){
            break;
        }
        if (puntero[0] == puntero[1]){
            printf("Solution accepted: %08d --> %08d\n", puntero[0], puntero[1]);
        }else{
            printf("Solution rejected: %08d !-> %08d\n", puntero[0], puntero[1]);
        }
        puntero += 2;
        usleep(lag * 1000);
    }
    // Cierra el segmento de memoria compartida
    if (munmap(ptr, SHM_SIZE) == -1){
        perror("Error unmapping the shared memory");
        exit(EXIT_FAILURE);
    }
    if (close(fd_shm) == -1){
        perror("Error closing the shared memory");
        exit(EXIT_FAILURE);
    }
    if (shm_unlink(SHM_NAME) == -1){
        perror("Error unlinking the shared memory");
        exit(EXIT_FAILURE);
    }*/
    return 0;
}