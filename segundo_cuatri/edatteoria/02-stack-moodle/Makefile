CC=gcc
CFLAGS=-Wall -g  
LDFLAGS=-L./
LDLIBS=-lstack

HDR=types.h stack.h expressions.h
SRC=expressions.c
MAIN=test_expr.c

TARGET=test_expr

all: $(TARGET)

test_expr: $(HDR) $(MAIN) $(SRC) libstack.a
	$(CC) $(CFLAGS) -o $(TARGET) $(MAIN) $(SRC) $(LDFLAGS) $(LDLIBS)

clean:
	rm  -f $(TARGET)
