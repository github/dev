CC=gcc
CFLAGS=-Wall -g
AR=ar 
# IFLAGS=-I./
# LDFLAGS=-L./
# LDLIBS=-lqueue

# USAGE:
# The code must be organized in the following way:
# - a driver program $(MAIN) which contains the main() function, and runs the desired tests
# - files $(SRC) and headers $(HDR) common to our solution and student submissions
# - file(s) $(FUNCTIONS) containing the functions required in the assignment
# 
# See examples below
#
# Use IFLAGS, LDFLAGS and LDLIBS as needed

# file with main() - driver for test program 
# - different test driver programs can be used by changing this var 

MAIN=main.c

# additional source files needed for all programs
# SRC=
# header files needed
HDR=dequeue.h types.h
# File with the submitted exercises
FUNCTIONS=dequeue.c 
TARGET=$(MAIN:.c=)-$(FUNCTIONS:.c=)

all: $(MAIN) $(SRC) $(HDR) $(FUNCTIONS) $(LIBS)
	$(CC) $(CFLAGS) -o $(TARGET) $(MAIN) $(FUNCTIONS) $(SRC)
