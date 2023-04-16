CC=gcc
CFLAGS= -Wall -ansi -pedantic -c -g

all:p1_e1 p1_e2

p1_e2: graph.o p1_e2.o node.o
	$(CC) -op1_e2 graph.o node.o p1_e2.o

p1_e1: node.o p1_e1.o
	$(CC) -op1_e1 node.o p1_e1.o

p1_e2.o: p1_e2.c graph.h
	$(CC) $(CFLAGS) p1_e2.c

p1_e1.o: p1_e1.c node.h
	$(CC) $(CFLAGS) p1_e1.c

node.o: node.c node.h
	$(CC) $(CFLAGS) node.c

graph.o: graph.c graph.h
	$(CC) $(CFLAGS) graph.c

ej1_test:
	valgrind --leak-check=full ./p1_e1

ej2_test:
	valgrind --leak-check=full ./p1_e2

clean:
	@echo "borrando..."
	rm -rf *.o p1_e2
	rm -rf *.o p1_e1
