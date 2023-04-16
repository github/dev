#ifndef EXPRESSIONS_H
#define EXPRESSIONS_H

#include "stack.h"
#include "types.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
Bool balancedParens(char *str);
Status evalPostfix(char *str, int *result);

#endif