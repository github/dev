#include <errno.h>
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "file_utils.h"

#define BUFFER_SIZE 512

//---------------------------------------------------------
// functions to manage pointer types
//---------------------------------------------------------

// INT
int *int_init(int a) {
  int *r = NULL;

  r = (int *)malloc(sizeof(int));
  if (!r) {
    fprintf(stderr, "%s", strerror(errno));
    return NULL;
  }
  *r = a;
  return r;
}

int int_cmp(const void *c1, const void *c2) {
  if (!c1 || !c2)
    return 0;

  return (*(int *)c1 - *(int *)c2);
}

void *int_copy(const void *a) {
  int *c = NULL;

  if (!a)
    return NULL;

  c = int_init(*(int *)a);
  return (void *)c;
}

void int_free(void *a) { free((int *)a); }

int int_print(FILE *pf, const void *a) { return fprintf(pf, "%d", *(int *)a); }

// CHAR
char *char_init(char a) {
  char *r = NULL;

  r = (char *)malloc(sizeof(char));
  if (!r) {
    fprintf(stderr, "%s", strerror(errno));
    return NULL;
  }
  *r = a;
  return r;
}

void *char_copy(const void *a) {
  char *c = NULL;

  if (!a)
    return NULL;

  c = char_init(*(char *)a);
  return (void *)c;
}

int char_cmp(const void *c1, const void *c2) {
  if (!c1 || !c2)
    return 0;

  return (*(char *)c1 - *(char *)c2);
}

void char_free(void *a) { free((char *)a); }

int char_print(FILE *pf, const void *a) {
  if (!pf || !a)
    return -1;

  return fprintf(pf, "%c", *(char *)a);
}

// FLOAT
float *float_init(float a) {
  float *r = NULL;

  r = (float *)malloc(sizeof(float));
  if (!r) {
    fprintf(stderr, "%s", strerror(errno));
    return NULL;
  }
  *r = a;
  return r;
}

void *float_copy(const void *a) {
  float *c = NULL;

  if (!a)
    return NULL;

  c = float_init(*(float *)a);
  return (void *)c;
}

int float_cmp(const void *c1, const void *c2) {
  if (!c1 || !c2)
    return 0;
  if (*(float *)c1 > *(float *)c2)
    return 1;
  else if (*(float *)c2 > *(float *)c1)
    return -1;
  else
    return 0;
}

void float_free(void *a) { free((float *)a); }

int float_print(FILE *pf, const void *a) {
  if (!pf || !a)
    return -1;
  return fprintf(pf, "%f", *(float *)a);
}

//  String
void *string_copy(const void *src) { return strdup(src); }

int string_cmp(const void *c1, const void *c2) {
  if (!c1 || !c2)
    return 0;

  return (strcmp(*(char **)c1, *(char **)c2));
}

void string_free(void *src) { free((char *)src); }

int string_print(FILE *pf, const void *src) {
  if (!pf || !src)
    return -1;
  return fprintf(pf, "%s", (char *)src);
}

//---------------------------------------------------------
//---------------- conversion functions -------------------
//---------------------------------------------------------

/**  Convert string to integer pointer
 *
 * error handling as in
 * https://wiki.sei.cmu.edu/confluence/display/c/ERR34-C.+Detect+errors+when+converting+a+string+to+a+number
 **/
void *str2int(const char *str) {
  char *end;
  int *si = malloc(sizeof(int));

  if (!si)
    return NULL;

  errno = 0;
  const long sl = strtol(str, &end, 10);

  if (end == str) {
    fprintf(stderr, "%s: not a decimal number\n", str);
  } else if ('\0' != *end) {
    fprintf(stderr, "%s: extra characters at end of input: %s\n", str, end);
  } else if ((LONG_MIN == sl || LONG_MAX == sl) && ERANGE == errno) {
    fprintf(stderr, "%s out of range of type long\n", str);
  } else if (sl > INT_MAX) {
    fprintf(stderr, "%ld greater than INT_MAX\n", sl);
  } else if (sl < INT_MIN) {
    fprintf(stderr, "%ld less than INT_MIN\n", sl);
  } else {
    *si = (int)sl;
    return si;
  }

  free(si);
  return NULL;
}

/* convert string to string, i.e duplicate string*/
void *str2str(const char *str) { return strdup(str); }

/* convert string to char pointer */
void *str2chr(const char *str) {
  char *c = malloc(sizeof(char));
  if (!c)
    return NULL;
  *c = str[0];
  return c;
}

/**  convert string to float pointer
 *
 * If error return NULL and print message in stderror
 */
void *str2float(const char *str) {
  char *endptr;
  float *f;

  f = malloc(sizeof(float));
  if (!f)
    return NULL;

  *f = strtof(str, &endptr);

  if (endptr != NULL) {
    fprintf(stderr, "%s: not a float number\n", str);
    free(f);
    f = NULL;
  }

  return f;
}

//-----------------------------------------------------------
//------- file functions utilities
//-----------------------------------------------------------

/* read line from file and strip newline */
/* note it doesn't strip any additional whitespace */
int read_line(FILE *fp, char *buffer) {
  int len;
  if (fgets(buffer, BUFFER_SIZE, fp)) {
    len = strlen(buffer);
    if (buffer[len - 1] == '\n')
      buffer[--len] = '\0'; // remove '\n' from end of buffer
    if (buffer[len - 1] == '\r')
      buffer[--len] =
          '\0'; // hopefully this handles '\r\n' for files created in Windows.
    // printf("Buffer %d: --%s--\n", len - 1, buffer);
    return len; // will return 0 for empty line
  }
  return 0;
}

/**
 * Builds a tree from a previously allocated empty collection TaD and a
 * file containing one element per line, using the convert function to create
 * the elements*

Example:
 *
 * Status _w_stack_push (void *tad, const void *ele) {
    return  stack_push (tad, ele);
}

Bool _w_main_stack_isEmpty (const void *tad) {
    return stack_isEmpty (tad);
}

 a = read_tad_from_file (stack, int2string, _w_stack_push, w_stack_isEmpty);
 *
 **/
Status read_tad_from_file(void *tad, char *filename, elem_from_string convert,
                          tad_insert f_insert, tad_isEmpty f_isEmpty) {

  FILE *fp;
  char buffer[BUFFER_SIZE];
  void *elem = NULL;
  Status ret = OK;

  if (!tad || !f_isEmpty(tad)) {
    printf("Something's wrong with the tree\n");
    return ERROR;
  }

  fp = fopen(filename, "r");
  if (!fp) {
    printf("Error opening %s\n", filename);
    return ERROR;
  }

  while (read_line(fp, buffer) && ret == OK) {
    elem = convert(buffer);
    ret = f_insert(tad, elem);
  }

  fclose(fp);
  return ret;
}

/* creates and returns a newly allocated tree from a file containing one element
 * per line, using the convert function to create the elements */
/**
BSTree *create_tree_from_file(char *filename, char type) {
  BSTree *tree = NULL;
  elem_from_string convert;
  Status st = OK;

  switch (type) {
  case 'i':
    tree = tree_init(int_free, int_copy, int_print, int_cmp);
    convert = str2int;
    break;
  case 's':
    tree = tree_init(string_free, string_copy, string_print, string_cmp);
    convert = str2str;
    break;
  case 'c':
    tree = tree_init(char_free, char_copy, char_print, char_cmp);
    convert = str2chr;
    break;
  case 'f':
    tree = tree_init(float_free, float_copy, float_print, float_cmp);
    convert = str2float;
    break;
  default:
    printf("Unrecognized type when creating a tree\n");
    return NULL;
  }

  if (!tree) {
    printf("Error creating tree from %s\n", filename);
    return NULL;
  }

  st = read_tree_from_file(tree, filename, convert);

  if (st == ERROR) {
    tree_destroy(tree);
    tree = NULL;
  }

  return tree;
}
*/
