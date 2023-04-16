########################################################
CC=gcc
CFLAGS= -g -Wall
EJS = p1_e1 p1_e2 p1_e3
########################################################
OBJECTSP1E1 = p1_e1.o vertex.o
OBJECTSP1E2 = p1_e2.o graph.o vertex.o
OBJECTSP1E3 = p1_e3.o graph.o vertex.o
########################################################

all: $(EJS) clear

p1_e1: $(OBJECTSP1E1)
	$(CC) $(CFLAGS) -o p1_e1 $(OBJECTSP1E1)

p1_e2: $(OBJECTSP1E2)
	$(CC) $(CFLAGS) -o p1_e2 $(OBJECTSP1E2)

p1_e3: $(OBJECTSP1E3)
	$(CC) $(CFLAGS) -o p1_e3 $(OBJECTSP1E3)

p1_e3.o: p1_e3.c vertex.h graph.h
	$(CC) $(CFLAGS) -c p1_e3.c

p1_e2.o: p1_e2.c vertex.h graph.h
	$(CC) $(CFLAGS) -c p1_e2.c

p1_e1.o: p1_e1.c vertex.h
	$(CC) $(CFLAGS) -c p1_e1.c

vertex.o: vertex.c vertex.h
	$(CC) $(CFLAGS) -c vertex.c

graph.o: graph.c graph.h vertex.h
	$(CC) $(CFLAGS) -c graph.c

clear:
	rm -rf *.o 

clean:
	rm -rf *.o $(EJS)

run:
	@echo ">>>>>>Running p1_e1"
	./p1_e1
	@echo ">>>>>>Running p1_e2"
	./p1_e2 
	@echo ">>>>>>Running p1_e3"
	./p1_e3 g1.txt

runv:
	@echo ">>>>>>Running p1_e1 with valgrind"
	valgrind --leak-check=full ./p1_e1
	@echo ">>>>>>Running p1_e2 with valgrind"
	valgrind --leak-check=full --track-origins=yes ./p1_e2 
	@echo ">>>>>>Running p1_e3 with valgrind"
	valgrind --leak-check=full ./p1_e3 g1.txt
