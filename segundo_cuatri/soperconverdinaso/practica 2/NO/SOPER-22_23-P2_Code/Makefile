########################################################
CC=gcc
CFLAGS= -g -Wall
PTHREAD = -pthread
EJS = voting
########################################################
OBJECTSVOTING = voting.o votante.o 
########################################################

all: $(EJS) clear



voting: $(OBJECTSVOTING)
	$(CC) $(CFLAGS) -o voting $(OBJECTSVOTING) $(PTHREAD)



voting.o: voting.c
	$(CC) $(CFLAGS) -c voting.c

votante.o: votante.c
	$(CC) $(CFLAGS) -c votante.c



clear:
	rm -rf *.o 

clean:
	rm -rf *.o $(EJS)
