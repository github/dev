CC=gcc
CFLAGS= -g -Wall 

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
MAIN=test_list.c 

# additional source and header files needed for all programs
SRC = list.c elements.c  
HDR = list_exercises.h list.h elements.h types.h

# source file with additional functions, either our solution or the student solution
FUNCTIONS=list_exercises.c 
TARGET=$(MAIN:.c=)-$(FUNCTIONS:.c=)

all: $(MAIN) $(SRC) $(HDR) $(FUNCTIONS)
	$(CC) $(CFLAGS) -o $(TARGET) $(MAIN) $(SRC) $(FUNCTIONS)

solution: FUNCTIONS=list_exercises-solution.c
solution: all

clean:
	rm $(TARGET)