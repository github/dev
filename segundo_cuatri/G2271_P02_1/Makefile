########################################################
CC=gcc
CFLAGS= -g -Wall
EJS = mrush
########################################################
OBJECTSP1E1 = mrush.o pow.o minero.o monitor.o
########################################################

all: $(EJS) clear

mrush: $(OBJECTSP1E1)
	$(CC) $(CFLAGS) -o $@ $(OBJECTSP1E1) -pthread

mrush.o: mrush.c
	$(CC) $(CFLAGS) -c $^

pow.o: pow.c pow.h
	$(CC) $(CFLAGS) -c $<

minero.o: minero.c minero.h
	$(CC) $(CFLAGS) -c $<

monitor.o: monitor.c monitor.h
	$(CC) $(CFLAGS) -c $<

clear:
	rm -rf *.o 

clean:
	rm -rf *.o $(EJS)