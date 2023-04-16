#include "dequeue.h"
#include "types.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

//--------------------------------------------------------------------------
int int_print(FILE *f, const void *x)
{
  int *z = (int *)x;
  return fprintf(f, "%d ", *z);
}

//--------------------------------------------------------------------------
int str_print(FILE *f, const void *x)
{
  return fprintf(f, "%s ", *(char **)x);
}

void **intarray2voidarray(int elem[], int size)
{
  void **ret_array = malloc(sizeof(void *) * size);
  if (!ret_array)
    return NULL;
  int i;
  for (i = 0; i < size; i++)
  {
    ret_array[i] = elem + i;
  }
  return ret_array;
}

void **strarray2voidarray(char *elem[], int size)
{
  void **ret_array = malloc(sizeof(void *) * size);
  if (!ret_array)
    return NULL;
  int i;
  for (i = 0; i < size; i++)
  {
    ret_array[i] = elem + i;
  }
  return ret_array;
}

void print_void_array_as_int(void **varray, size_t size)
{
  if (!varray)
    return;
  int i;
  for (i = 0; i < size; i++)
  {
    printf("%d ", *(int *)(varray[i]));
  }
  printf("\n");
}

void print_void_array_as_string(void **varray, size_t size)
{
  if (!varray)
    return;
  int i;
  for (i = 0; i < size; i++)
  {
    printf("%s ", *(char **)(varray[i]));
  }
  printf("\n");
}

void print_void_array(void **array, size_t num_elem, print_elem_fn print_elem)
{
  int i;
  for (i = 0; i < num_elem; i++)
  {
    print_elem(stdout, array[i]);
  }
  printf("\n");
}

void test_conversions_to_void_arrays()
{
  int int_a[] = {1, 2, 3, 4, 5, 6};
  char *str_a[] = {"hola1", "hola2", "hola3"};
  void **varray = NULL;

  // array sizes
  int isize = sizeof(int_a) / sizeof(int_a[0]);
  int ssize = sizeof(str_a) / sizeof(str_a[0]);
  varray = intarray2voidarray(int_a, isize);
  // print_void_array_as_int(varray, isize);
  print_void_array(varray, isize, int_print);
  free(varray);
  varray = strarray2voidarray(str_a, ssize);
  // print_void_array_as_string(varray, ssize);
  print_void_array(varray, ssize, str_print);
  free(varray);
}

void test_normal_queue()
{
  int int_a[] = {1, 2, 3, 4, 5, 6};
  char *str_a[] = {"hola1", "hola2", "hola3"};
  int isize = sizeof(int_a) / sizeof(int_a[0]);
  int ssize = sizeof(str_a) / sizeof(str_a[0]);

  void *elements[100]; // store popped elements, to print them later
  int num_elements;

  Dequeue *q = NULL;

  int i;
  Status st;
  void *elem;

  printf("TEST NORMAL QUEUE\n");

  /*************************/
  /* TEST QUEUE OF INTS */

  /* create queue */
  q = dequeue_new();
  if (q == NULL)
  {
    return;
  }

  /* fill queue */
  st = OK;
  for (i = 0; i < isize && st == OK; i++)
  {
    st = dequeue_pushBack(q, int_a + i); // equiv &(int_a[i])
  }
  if (st == ERROR)
  {
    printf("Some error\n");
    dequeue_free(q);
    return;
  }

  printf("\nInitial queue:\n");
  dequeue_print(stdout, q, int_print);

  /* empty queue, storing the popped out elements*/
  num_elements = 0;
  while (dequeue_isEmpty(q) == FALSE)
  {
    elem = dequeue_popFront(q);
    elements[num_elements++] = elem;
  }
  printf("Resulting queue: \n"); // must be empty
  dequeue_print(stdout, q, int_print);
  printf("Elements were extracted in this order:\n");
  print_void_array_as_int(elements, num_elements);
  printf("---------------------\n");

  dequeue_free(q);

  /*************************/
  /* TEST QUEUE OF STRINGS */

  /* create queue */
  st = OK;
  q = dequeue_new();
  if (q == NULL)
  {
    return;
  }

  /* fill queue */
  st = OK;
  for (i = 0; i < ssize && st == OK; i++)
  {
    st = dequeue_pushBack(q, str_a + i); // equiv &(str_a[i])
  }
  if (st == ERROR)
  {
    printf("Some error\n");
    dequeue_free(q);
    return;
  }
  printf("Initial queue:\n");
  dequeue_print(stdout, q, str_print);

  /* empty queue, storing the popped out elements*/
  num_elements = 0;
  while (dequeue_isEmpty(q) == FALSE)
  {
    elem = dequeue_popFront(q);
    elements[num_elements++] = elem;
  }
  printf("Resulting queue: \n"); // must be empty
  dequeue_print(stdout, q, str_print);
  printf("Elements were extracted in this order:\n");
  print_void_array_as_string(elements, num_elements);
  printf("---------------------\n");

  dequeue_free(q);
}
//--------------------------------------------------------------------------

void test_queue_reverse()
{
  // same as test_normal_queue, but uses pushFront and porpBack instead.
  //  is this similar to something you've seen before?

  int int_a[] = {1, 2, 3, 4, 5, 6};
  char *str_a[] = {"hola1", "hola2", "hola3"};
  int isize = sizeof(int_a) / sizeof(int_a[0]);
  int ssize = sizeof(str_a) / sizeof(str_a[0]);

  void *elements[100]; // store popped elements, to print them later
  int num_elements;

  Dequeue *q = NULL;

  int i;
  Status st;
  void *elem;

  printf("TEST REVERSE QUEUE\n");

  /*************************/
  /* TEST QUEUE OF INTS */

  /* create queue */
  q = dequeue_new();
  if (q == NULL)
  {
    return;
  }

  /* fill queue */
  st = OK;
  for (i = 0; i < isize && st == OK; i++)
  {
    st = dequeue_pushFront(q, int_a + i); // equiv &(int_a[i])
  }
  if (st == ERROR)
  {
    printf("Some error\n");
    dequeue_free(q);
    return;
  }

  printf("\nInitial queue:\n");
  dequeue_print(stdout, q, int_print);

  /* empty queue, storing the popped out elements*/
  num_elements = 0;
  while (dequeue_isEmpty(q) == FALSE)
  {
    elem = dequeue_popBack(q);
    elements[num_elements++] = elem;
  }
  printf("Resulting queue: \n"); // must be empty
  dequeue_print(stdout, q, int_print);
  printf("Elements were extracted in this order:\n");
  print_void_array_as_int(elements, num_elements);
  printf("---------------------\n");

  dequeue_free(q);

  /*************************/
  /* TEST QUEUE OF STRINGS */

  /* create queue */
  st = OK;
  q = dequeue_new();
  if (q == NULL)
  {
    return;
  }

  /* fill queue */
  st = OK;
  for (i = 0; i < ssize && st == OK; i++)
  {
    st = dequeue_pushFront(q, str_a + i); // equiv &(str_a[i])
  }
  if (st == ERROR)
  {
    printf("Some error\n");
    dequeue_free(q);

    return;
  }
  printf("Initial queue:\n");
  dequeue_print(stdout, q, str_print);

  /* empty queue, storing the popped out elements*/
  num_elements = 0;
  while (dequeue_isEmpty(q) == FALSE)
  {
    elem = dequeue_popBack(q);
    elements[num_elements++] = elem;
  }
  printf("Resulting queue: \n"); // must be empty
  dequeue_print(stdout, q, str_print);
  printf("Elements were extracted in this order:\n");
  print_void_array_as_string(elements, num_elements);
  printf("---------------------\n");
  dequeue_free(q);
}

int main(int argc, char **argv)
{
  // ALWAYS fflush stdout when running the tests, so that as much output as
  // possible is captured
  // setvbuf(stdout, NULL, _IONBF, 0);
  // test_conversions_to_void_arrays();
  test_normal_queue();
  test_queue_reverse();

  return EXIT_SUCCESS;
}

// possible is captured
