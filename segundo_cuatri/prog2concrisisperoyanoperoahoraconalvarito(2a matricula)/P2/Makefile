########################################################
CC=gcc
CFLAGS= -g -Wall
EJS = p1_e1 p1_e2 p1_e3 p2_e1a p2_e2 p2_e1b
########################################################
OBJECTSP1E1 = p1_e1.o vertex.o
OBJECTSP1E2 = p1_e2.o graph.o vertex.o
OBJECTSP1E3 = p1_e3.o graph.o vertex.o
OBJECTSP2E1A = p2_e1a.o libstack.a
OBJECTSP2E1B = p2_e1b.o libstack.a vertex.o
OBJECTSP2E2 = p2_e2.o graph.o vertex.o stack.o
########################################################

all: $(EJS) clear

p1_e1: $(OBJECTSP1E1)
	$(CC) $(CFLAGS) -o p1_e1 $(OBJECTSP1E1)

p1_e2: $(OBJECTSP1E2)
	$(CC) $(CFLAGS) -o p1_e2 $(OBJECTSP1E2)

p1_e3: $(OBJECTSP1E3)
	$(CC) $(CFLAGS) -o p1_e3 $(OBJECTSP1E3)

p2_e1a: $(OBJECTSP2E1A)
	$(CC) $(CFLAGS) -o p2_e1a $(OBJECTSP2E1A)

p2_e1b: $(OBJECTSP2E1B)
	$(CC) $(CFLAGS) -o p2_e1b $(OBJECTSP2E1B)

p2_e2: $(OBJECTSP2E2)
	$(CC) $(CFLAGS) -o p2_e2 $(OBJECTSP2E2)




p1_e1.o: p1_e1.c vertex.h
	$(CC) $(CFLAGS) -c p1_e1.c

p1_e2.o: p1_e2.c vertex.h graph.h
	$(CC) $(CFLAGS) -c p1_e2.c

p1_e3.o: p1_e3.c vertex.h graph.h
	$(CC) $(CFLAGS) -c p1_e3.c

p2_e1a.o: p2_e1a.c vertex.h graph.h
	$(CC) $(CFLAGS) -c p2_e1a.c

p2_e1b.o: p2_e1b.c vertex.h graph.h
	$(CC) $(CFLAGS) -c p2_e1b.c

p2_e2.o: p2_e2.c vertex.h graph.h
	$(CC) $(CFLAGS) -c p2_e2.c




vertex.o: vertex.c vertex.h
	$(CC) $(CFLAGS) -c vertex.c

graph.o: graph.c graph.h vertex.h
	$(CC) $(CFLAGS) -c graph.c

stack.o: stack.c stack.h
	$(CC) $(CFLAGS) -c stack.c




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
