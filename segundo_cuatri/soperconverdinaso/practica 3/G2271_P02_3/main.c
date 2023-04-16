/*
Escribir dos programas en C para implementar un sistema de monitoreo de bloques del sistema Blockchain. El ejercicio se divide en varias partes diferenciadas:

a) Programa de monitoreo:
El programa se debe ejecutar con un parametro:
./ monitor <LAG >
donde monitor es el nombre del ejecutable y <LAG> es el retraso en milisegundos entre cada monitorizacion.
Se deberan lanzar dos procesos correspondientes a este programa:
• El primer proceso detectara que la memoria compartida no esta creada y se convertira en el proceso Comprobador, encargado de verificar los bloques recibidos.
• El segundo proceso detectara que la memoria compartida esta creada y se convertira en el proceso Monitor, encargado de mostrar los resultados por pantalla.

b) Comunicacion desde Comprobador a Monitor usando productor–consumidor:
El proceso Comprobador:
• Creara e inicializara un segmento de memoria compartida.
• A continuacion, recibira un bloque (a traves de la cola de mensajes, ver
Apartado c)) y lo comprobara, anadiendole una bandera que indique si es correcto o no.
• Una vez comprobado, lo introducira en memoria compartida para que lo lea Monitor.
• Realizara una espera de <LAG> milisegundos.
• Repetira el proceso de recepcion/comprobacion/escritura hasta que reciba un bloque especial que indique la finalizacion del sistema.
• Cuando reciba el bloque de finalizacion, lo introducira en memoria compartida para notificar al Monitor de la finalizacion del sistema, liberara los recursos y terminara.
El proceso Monitor:
• Abrira el segmento de memoria compartida.
• Extraera un bloque.
• Lo mostrara por pantalla, con la sintaxis "Solution accepted: %08ld --> %08ld" (el primer numero es el objetivo y el segundo la solucion) para los bloques correctos, y "Solution rejected: %08ld !-> %08ld" para los incorrectos.
• Realizara una espera de <LAG> milisegundos.
• Repetira el ciclo de extraccion/muestra hasta que reciba un bloque especial que indique la finalizacion del sistema.
• Cuando reciba el bloque de finalizacion, liberara los recursos y terminara.
La introduccion/extraccion de bloques en memoria compartida seguira el esquema de productor–consumidor:
Productor
{
    Down(sem_empty);
    Down(sem_mutex);
    A ~n adirElemento();
    Up(sem_mutex);
    Up(sem_fill);
}
Consumidor
{
    Down(sem_fill);
    Down(sem_mutex);
    ExtraerElemento();
    Up(sem_mutex);
    Up(sem_empty);
}
• Se garantizara que no se pierde ningun bloque con independencia del retraso que se introduzca en cada proceso.
• Se usara un buffer circular de 6 bloques en el segmento de memoria compartida.
• Se alojaran en el segmento de memoria compartida tres semaforos sin nombre para implementar el algoritmo de productor–consumidor.
Nota. Se puede comprobar que este apartado es correcto enviando bloques aleatorios generados por el proceso Comprobador.

c) Programa de mineria:
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

d) En base al funcionamiento del sistema anterior:
¿Es necesario un sistema tipo productor–consumidor para garantizar que el
sistema funciona correctamente si el retraso de Comprobador es mucho mayor
que el de Minero? ¿Por que? ¿Y si el retraso de Comprobador es muy inferior al de Minero? ¿Por que?
¿Se simplifcarıa la estructura global del sistema si entre Comprobador y Monitor hubiera tambien una cola de mensajes? ¿Por que?
Se deberan tener en cuenta los siguientes aspectos: (a) entrega de la documentacion en formato .pdf requerida en la normativa de practicas y con las respuestas a las cuestiones planteadas, (b) control de errores, (c) eliminacion de la cola, (d) eliminacion del segmento
de memoria compartida, y (e) garantizar que no se producen bloqueos ni se pierden mensajes con independencia del retraso introducido en cada proceso.
A continuacion se muestran dos ejemplos de ejecucion del sistema final.
En el primer ejemplo, el proceso Minero seras mas rapido que Monitor, que sera mas rapido que Comprobador:

$ ./ miner 15 0
[21901] Generating blocks ...
[21901] Finishing
$
$ ./ monitor 500
[21902] Checking blocks ...
[21902] Finishing
$
$ ./ monitor 100
[21903] Printing blocks ...
Solution accepted : 00000000 --> 38722988
Solution accepted : 38722988 --> 82781454
Solution accepted : 82781454 --> 59403743
Solution accepted : 59403743 --> 44638907
Solution accepted : 44638907 --> 98780967
Solution accepted : 98780967 --> 49574592
Solution accepted : 49574592 --> 16391022
Solution accepted : 16391022 --> 41194344
Solution accepted : 41194344 --> 61259182
Solution accepted : 61259182 --> 18852291
Solution accepted : 18852291 --> 74660642
Solution accepted : 74660642 --> 59894312
Solution accepted : 59894312 --> 55978326
Solution accepted : 55978326 --> 18633092
Solution accepted : 18633092 --> 61031588
[21903] Finishing

En el segundo ejemplo, el proceso Comprobador seras mas rapido que Minero, que sera mas rapido que Monitor:

$ ./ miner 8 100
[21942] Generating blocks ...
[21942] Finishing
$
$ ./ monitor 0
[21943] Checking blocks ...
[21943] Finishing
$
$ ./ monitor 500
[21945] Printing blocks ...
Solution accepted : 00000000 --> 38722988
Solution accepted : 38722988 --> 82781454
Solution accepted : 82781454 --> 59403743
Solution accepted : 59403743 --> 44638907
Solution accepted : 44638907 --> 98780967
Solution accepted : 98780967 --> 49574592
Solution accepted : 49574592 --> 16391022
Solution accepted : 16391022 --> 41194344
[21945] Finishing
*/

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
#include "comprobador.h"
#include "monitor.h"

#define SHM_KEY 123
#define INT_LIST_SIZE 10
#define MSG_MAX 100

typedef struct
{
    int integer_list[INT_LIST_SIZE];
    char message[MSG_MAX];
} ShmExampleStruct;

int main(int argc, char *argv[])
{    
    int lag = atoi(argv[1]);

    
    int fd_shm_get = shmget(SHM_KEY, sizeof(int), IPC_EXCL | 0666);
    
    if (fd_shm_get == -1)
    {
        if(errno == ENOENT)
        {
            comprobador(lag);
            
        }
        else
        {
            printf("Error: %s\n", strerror(errno));
            perror("shmget");
            exit(EXIT_FAILURE);
        }
    }
    else
    {
        monitor(lag);
    }

    close(fd_shm_get);
    shmctl(fd_shm_get, IPC_RMID, NULL);

    return 0;
}