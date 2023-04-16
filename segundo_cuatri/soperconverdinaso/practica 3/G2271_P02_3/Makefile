CC=gcc
CFLAGS= -g -Wall
LRT = -lrt
EJS = minero main
########################################################
OBJECTMAIN = main.o comprobador.o monitor.o
OBJECTMINERO = minero.o pow.o
########################################################

all: $(EJS) clear


main: $(OBJECTMAIN)
	$(CC) $(CFLAGS) -o monitor $(OBJECTMAIN) $(LRT)

minero: $(OBJECTMINERO)
	$(CC) $(CFLAGS) -o minero $(OBJECTMINERO) $(LRT)



main.o: main.c
	$(CC) $(CFLAGS) -c main.c

monitor.o: monitor.c monitor.h
	$(CC) $(CFLAGS) -c monitor.c 

minero.o: minero.c
	$(CC) $(CFLAGS) -c minero.c 

comprobador.o: comprobador.c comprobador.h
	$(CC) $(CFLAGS) -c comprobador.c

pow.o: pow.c
	$(CC) $(CFLAGS) -c pow.c




clear:
	rm -rf *.o 

clean:
	rm -rf *.o $(EJS)
