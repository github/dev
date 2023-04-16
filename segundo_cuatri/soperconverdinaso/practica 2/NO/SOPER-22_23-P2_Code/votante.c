#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <time.h>
#include <stdbool.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <string.h>

#define MAX_VOTANTES 10
#define MAX_SECS 60
#define ARCHIVO_VOTOS "votos.txt"

/*
b) Procesos Votante:

    Al arrancar, los procesos Votante quedaran en espera de que el proceso Principal les avise de que el sistema esta listo.
    Cuando reciban la señal SIGUSR1 leeran la informacion del sistema para poder enviar señales a todos los procesos implicados, y comenzaran a iterar:
        • Los procesos competiran por convertirse en el proceso Candidato (en una suerte de condicion de carrera), de forma que el primero que lo solicite a traves de señales sera el proceso Candidato.
        • El resto de procesos Votante quedaran en espera de que arranque la votacion, para elegir si aceptan o no al candidato. Esta votacion se realizara a traves de un fichero compartido por todos los procesos.
        • Cuando la votacion este lista, el proceso Candidato enviara la señal SIGUSR2 a los procesos Votante para que registren su voto. Tras esto, esperara a que finalice la votacion (es decir, a que se hayan registrado todos los votos en el fichero) alternando la comprobacion del fichero con esperas no activas de 1 ms.
        • Cuando los procesos Votante reciban la señal de votar, generaran un voto aleatorio (sı o no) y lo registraran en el fichero. Una vez votado, entraran en una espera no activa hasta la siguiente ronda.
        • Una vez finalice la votacion, el proceso Candidato mostrara los resultados con una cadena con el formato "Candidate %d => [ Y Y N Y N ] => Accepted"/"Candidate %d => [ Y N N N Y ] => Rejected", donde el numero indica el PID del proceso candidato, las letras 'Y'/'N' el sentido del voto de cada proceso, y la candidatura se acepta en el caso de que el numero de votos positivos sea mayor que el de negativos. Tras esto, realizara una espera no activa de 250 ms y arrancara una nueva ronda enviando la señal SIGUSR1.
    Los procesos Votante terminaran, liberando todos los recursos necesarios, cuando reciban la señal SIGTERM.

*/

int votante(int n_secs, int n_votantes, int *pids);



