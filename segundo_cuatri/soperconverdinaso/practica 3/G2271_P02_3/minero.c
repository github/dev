#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <sys/sem.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <mqueue.h>

#include "pow.h"
/*
El programa se debe ejecutar con dos parametros:
./ miner < ROUNDS > <LAG >
donde miner es el nombre del ejecutable, <ROUNDS> el numero de rondas que se va a realizar y <LAG> es el retraso en milisegundos entre cada ronda.
El proceso resultante de ejecutar este programa, Minero:
• Creara una cola de mensajes con capacidad para 7 mensajes.
• Establecera un objetivo inicial fijo para la POW (por ejemplo, 0).
• Para cada ronda, resolvera la POW; en el caso de que no se tenga un minero funcional capaz de generar una secuencia de bloques encadenados, se puede utilizar el fichero con la secuencia de 200 rondas proporcionado para ✭✭falsear✮✮ el minero.
• Enviara un mensaje por la cola de mensajes que contenga, al menos, el objetivo y la solucion hallada.
• Realizara una espera de <LAG> milisegundos.
• Establecera como siguiente objetivo la solucion anterior, y repetira la ronda.
• Una vez terminadas las rondas, enviara un bloque especial con algun codigo que permita saber al proceso Comprobador que el sistema esta finalizando.
• Liberara los recursos y terminara.
*/
#define QUEUE_NAME "/cola"

int pow_search(int objetivo)
{
    int i = 0;
    for (i = 0; i < POW_LIMIT; i++)
    {
        if (pow_hash(i) == objetivo)
        {
            return i;
        }
    }
    return -1;
}
int main(int argc, char *argv[])
{
    if (argc != 3)
    {
        printf("Usage: %s n_rounds lag\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    //crea la cola de mensajes
    mqd_t mq;
    struct mq_attr attr;
    attr.mq_maxmsg = 7;
    attr.mq_msgsize = sizeof(int) * 2;
    mq = mq_open(QUEUE_NAME, O_CREAT | O_RDWR, 0666, &attr);
    if (mq == -1)
    {
        perror("Error creating the message queue");
        exit(EXIT_FAILURE);
    }
 
    int n_rounds, lag;
    n_rounds = atoi(argv[1]);
    lag = atoi(argv[2]);

        
    int objetivo = 0;
    int i;
    for (i = 0; i < n_rounds; i++)
    {
        int res = pow_search(objetivo);
        if (res == -1)
        {
            printf("Solution rejected: %08d !-> %08d", objetivo, res);
            exit(EXIT_FAILURE);
        }
        else
        {
            printf("Solution accepted: %08d --> %08d\n", objetivo, res);
        }
        /* Enviara un mensaje por la cola de mensajes que contenga, al menos, el objetivo y la solucion hallada. */
        int msg[2];
        msg[0] = objetivo;
        msg[1] = res;
        if (mq_send(mq, (char *)msg, sizeof(msg), 0) == -1)
        {
            perror("Error sending message");
            exit(EXIT_FAILURE);
        }
        objetivo = res;
        sleep(lag);
    }

    /*
    Una vez terminadas las rondas, enviara un bloque especial con algun codigo que permita saber al proceso Comprobador que el sistema esta finalizando.
    */
    int msg[2];
    msg[0] = -1;
    msg[1] = -1;
    if (mq_send(mq, (char *)msg, sizeof(msg), 0) == -1)
    {
        perror("Error sending message");
        exit(EXIT_FAILURE);
    }
    /*
    liberara los recursos y terminara.
    */
    mq_close(mq);   
    mq_unlink(QUEUE_NAME);
    exit(EXIT_SUCCESS);
    

}

