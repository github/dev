
#!/bin/bash

#compila el modulo node.c
gcc -c node.c

#compila el modulo graph.c
gcc -c graph.c

#compila el modulo p1_e1.c
gcc -c p1_e1.c

#compila el modulo p1_e2.c
gcc -c p1_e2.c

#genera un ejecutable p1_e1 después de haber generado los .c
gcc -o p1_e1 node.o p1_e1.o

#genera un ejecutable p1_e2 después de haber generado los .c
gcc -o p1_e2 node.o graph.o p1_e2.o
