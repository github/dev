########################################################
CC=gcc
CFLAGS= -g -Wall
EJS =  p3_e3 #p1_e1 p1_e2 p1_e3 p2_e1a p2_e2 p2_e1b p3_e1 p3_e2a p3_e2b
########################################################
OBJECTSP1E1 = p1_e1.o vertex.o
OBJECTSP1E2 = p1_e2.o graph.o vertex.o queue.o stack.o
OBJECTSP1E3 = p1_e3.o graph.o vertex.o queue.o stack.o
OBJECTSP2E1A = p2_e1a.o vertex.o graph.o queue.o stack.o file_utils.o 
OBJECTSP2E1B = p2_e1b.o vertex.o graph.o queue.o stack.o file_utils.o
OBJECTSP2E2 = p2_e2.o graph.o vertex.o stack.o queue.o file_utils.o
OBJECTSP3E1 = p3_e1.o graph.o vertex.o delivery.o libqueue.a stack.o
OBJECTSP3E2A = p3_e2a.o graph.o vertex.o delivery.o queue.o stack.o
OBJECTSP3E2B = p3_e2b.o graph.o vertex.o queue.o stack.o
OBJECTSP3E3 = p3_e3.o list.o file_utils.o
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

p3_e1: $(OBJECTSP3E1)
	$(CC) $(CFLAGS) -o p3_e1 $(OBJECTSP3E1)

p3_e2a: $(OBJECTSP3E2A)
	$(CC) $(CFLAGS) -o p3_e2a $(OBJECTSP3E2A)

p3_e2b: $(OBJECTSP3E2B)
	$(CC) $(CFLAGS) -o p3_e2b $(OBJECTSP3E2B)

p3_e3: $(OBJECTSP3E3)
	$(CC) $(CFLAGS) -o p3_e3 $(OBJECTSP3E3)




p1_e1.o: p1_e1.c vertex.h
	$(CC) $(CFLAGS) -c p1_e1.c

p1_e2.o: p1_e2.c vertex.h graph.h queue.h stack.h
	$(CC) $(CFLAGS) -c p1_e2.c

p1_e3.o: p1_e3.c vertex.h graph.h queue.h stack.h
	$(CC) $(CFLAGS) -c p1_e3.c

p2_e1a.o: p2_e1a.c vertex.h graph.h queue.h stack.h file_utils.h
	$(CC) $(CFLAGS) -c p2_e1a.c

p2_e1b.o: p2_e1b.c vertex.h graph.h queue.h stack.h file_utils.h
	$(CC) $(CFLAGS) -c p2_e1b.c

p2_e2.o: p2_e2.c vertex.h graph.h stack.h queue.h file_utils.h
	$(CC) $(CFLAGS) -c p2_e2.c

p3_e1.o: p3_e1.c graph.h vertex.h delivery.h stack.o
	$(CC) $(CFLAGS) -c p3_e1.c

p3_e2a.o: p3_e2a.c graph.h vertex.h delivery.h stack.o
	$(CC) $(CFLAGS) -c p3_e2a.c

p3_e2b.o: p3_e2b.c graph.h vertex.h queue.o stack.o
	$(CC) $(CFLAGS) -c p3_e2b.c

p3_e3.o: p3_e3.c list.h file_utils.h
	$(CC) $(CFLAGS) -c p3_e3.c




vertex.o: vertex.c vertex.h
	$(CC) $(CFLAGS) -c vertex.c

graph.o: graph.c graph.h vertex.h stack.h queue.h
	$(CC) $(CFLAGS) -c graph.c

delivery.o: delivery.c delivery.h
	$(CC) $(CFLAGS) -c delivery.c

stack.o: stack.c stack.h
	$(CC) $(CFLAGS) -c stack.c

queue.o: queue.c queue.h
	$(CC) $(CFLAGS) -c queue.c

file_utils.o: file_utils.c file_utils.h
	$(CC) $(CFLAGS) -c file_utils.c



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
