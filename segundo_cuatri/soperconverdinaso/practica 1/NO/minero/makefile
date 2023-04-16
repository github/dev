all: main minero monitor

exec: main minero monitor
	./main 50 3 10
	./main 0 5 3
	./main -1 2 100

valgrind: main minero monitor
	valgrind --leak-check=full -s ./main "4150" "1" "3"
	valgrind --leak-check=full -s ./main 50 3 10
	valgrind --leak-check=full -s ./main 0 5 3
	valgrind --leak-check=full -s ./main -1 1 100

main: main.o
	gcc -o main main.o -lpthread

minero: pow.o minero.o
	gcc -o minero minero.o pow.o -lpthread

monitor: pow.o monitor.o
	gcc -o monitor monitor.o pow.o


main.o: main.c
	gcc -Wall -Wextra -Werror -c main.c

minero.o: minero.c
	gcc -Wall -Wextra -Werror -c minero.c

monitor.o: monitor.c
	gcc -Wall -Wextra -Werror -c monitor.c

pow.o: pow.c
	gcc -Wall -Wextra -Werror -c pow.c


clean:
	rm -f pow.o minero.o monitor.o main.o

fclean: clean
	rm -f minero monitor main
