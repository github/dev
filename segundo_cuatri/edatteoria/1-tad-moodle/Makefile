CC = gcc
CFLAGS = -g -Wall

HDR = types.h slist.h
SRC = slist.c
MAIN = test_slist.c
TARGET = test_slist

all: $(TARGET) 

solution: SRC=slist_solution.c
solution: all

test_slist: $(HDR) $(MAIN) $(SRC)
	$(CC) $(CFLAGS) -o $(TARGET) $(MAIN) $(SRC) 

#test_slist_solution: $(HDR) slist_solution.c
#	$(CC) $(CFLAGS) -o test_slist $(MAIN) slist_solution.c 

clean:
	rm -f $(TARGET)