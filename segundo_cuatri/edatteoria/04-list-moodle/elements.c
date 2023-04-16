
#include "elements.h"
#include <errno.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/********* INT  *********/

int int_cmp(const void *c1, const void *c2) {
  if (!c1 || !c2)
    return 0;

  return (*(int *)c1 - *(int *)c2);
}

int int_print(FILE *pf, const void *a) { return fprintf(pf, "%d", *(int *)a); }

/************  CHAR **********/

int char_cmp(const void *c1, const void *c2) {
  if (!c1 || !c2)
    return 0;

  return (*(char *)c1 - *(char *)c2);
}

int char_print(FILE *pf, const void *a) {
  if (!pf || !a)
    return -1;

  return fprintf(pf, "%c", *(char *)a);
}

/*************** String ************************/

int string_cmp(const void *c1, const void *c2) {
  if (!c1 || !c2)
    return 0;

  return strcmp(*(char **)c1, *(char **)c2);
}

int string_print(FILE *pf, const void *src) {
  if (!pf || !src)
    return -1;
  return fprintf(pf, "%s", *(char **)src);
}
