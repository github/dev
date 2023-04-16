#include "elements.h"
#include "list.h"
#include "list_exercises.h"
#include "types.h"

void swap(int *x, int *y) {
  int temp = *x;
  *x = *y;
  *y = temp;
}

void random_ordering(int *array, size_t size) {
  // generate a random ordering of integers from 0 to size-1
  int i, j;
  for (i = 0; i < size; i++) {
    array[i] = i;
  }

  for (i = size - 1; i > 0; i--) {
    j = rand() % (i + 1);
    swap(array + i, array + j);
  }
}

void print_void_array(void **array, size_t num_elem, elem_print_fn print_elem) {
  int i;
  for (i = 0; i < num_elem; i++) {
    print_elem(stdout, array[i]);
  }
  printf("\n");
}

List *list_from_array(void *array, size_t size, size_t num_elem) {
  // create a list from an array using list_pushFront
  // size is the size of each of the elements in the array, e.g. sizeof(int)
  // the info field of each node contains pointers to the array
  int i;
  List *pl = NULL;
  Status st = OK;

  pl = list_new();
  if (!pl)
    return NULL;
  for (i = 0; i < num_elem && st == OK; i++) {
    // cast (void *) as (char*) so as to get the number of bytes right
    // example: if size=sizeof(int) and i=4, this will get you to the address
    // that is 4*sizeof(int) bytes from the start of the array, i.e to
    // &((int*)array[4])
    st = list_pushFront(pl, ((char *)array) + (i * size));
  }
  if (st == ERROR) {
    list_free(pl);
    return NULL;
  }
  return pl;
}

void test_list_delete_basic() {
  int i;
  int array_size;
  // int ai[] = {3, 5, 7, 6, 1, 0};
  // char ac[] = {'z', 'A', 'a', 'b', 'd'};
  // char *as[] = {"the", "snow", "is", "white"};
  // char *as[] = {"BB", "EE", "CC", "AA"};
  int ai[] = {2, 7, 6, 11, 0, 4};
  char ac[] = {'e', 'd', 'c', 'b', 'a'};
  char *as[] = {"blue", "is", "sky", "the"};
  int ordering[20];
  void *delete;
  elem_print_fn elem_print;
  elem_cmp_fn elem_cmp;

  printf("\nTESTING LIST DELETION\n\n");

  int i_size = sizeof(ai) / sizeof(ai[0]);
  int c_size = sizeof(ac) / sizeof(ac[0]);
  int s_size = sizeof(as) / sizeof(as[0]);

  List *pl1 = NULL;

  // If you want to see what random_ordering does, uncomment this.
  // array_size = i_size;
  // random_ordering(ordering, array_size, 1);
  // for (i = 0; i < array_size; i++)
  //   printf("%d ", ordering[i]);
  // printf("\n");

  // TEST INTS

  array_size = i_size;
  elem_print = int_print;
  elem_cmp = int_cmp;

  pl1 = list_from_array(ai, sizeof(int), array_size);
  list_print(stdout, pl1, elem_print);
  printf("\n");

  random_ordering(ordering, array_size);
  for (i = 0; i < array_size; i++) {
    delete = ai + ordering[i];
    printf("Deleting %d, list now: ", *(int *)delete);
    list_delete(pl1, delete, elem_cmp);
    list_print(stdout, pl1, elem_print);
    printf("\n");
  }

  list_free(pl1);

  // TEST CHARS

  array_size = c_size;
  elem_print = char_print;
  elem_cmp = char_cmp;

  pl1 = list_from_array(ac, sizeof(char), array_size);
  list_print(stdout, pl1, elem_print);
  printf("\n");

  random_ordering(ordering, array_size);
  for (i = 0; i < array_size; i++) {
    delete = ac + ordering[i];
    printf("Deleting %c, list now: ", *(char *)delete);
    list_delete(pl1, delete, elem_cmp);
    list_print(stdout, pl1, elem_print);
    printf("\n");
  }
  list_free(pl1);

  // TEST STRINGS

  array_size = s_size;
  elem_print = string_print;
  elem_cmp = string_cmp;

  pl1 = list_from_array(as, sizeof(char *), array_size);
  list_print(stdout, pl1, elem_print);
  printf("\n");

  random_ordering(ordering, array_size);
  for (i = 0; i < array_size; i++) {
    delete = as + ordering[i];
    printf("Deleting %s, list now: ", *(char **)delete);
    list_delete(pl1, delete, elem_cmp);
    list_print(stdout, pl1, elem_print);
    printf("\n");
  }

  list_free(pl1);
}

Boolean verify_list_copies(List *pl1, List *pl2, elem_cmp_fn elem_cmp) {
  Node *pn1, *pn2;
  Boolean ok = TRUE;

  if (!pl1 || !pl2 || !elem_cmp)
    return FALSE;

  // check not the same pointers
  if (pl1 == pl2) {
    printf("ERROR: pl1 %p and pl2 %p should not be the same pointer\n", pl1,
           pl2);
    ok = FALSE;
  }

  pn1 = pl1->first;
  pn2 = pl2->first;
  while (pn1 && pn2) {
    if (pn1 == pn2) {
      printf("ERROR: Lists should not share any nodes\n");
      ok = FALSE;
    }
    if (elem_cmp(pn1->info, pn2->info) != 0) {
      printf("ERROR: elements are not equal\n");
      ok = FALSE;
    }
    if (pn1->info != pn2->info) {
      printf("ERROR: info fields %p and %p should be the same\n", pn1->info,
             pn2->info);
      ok = FALSE;
    }
    pn1 = pn1->next;
    pn2 = pn2->next;
  }

  if (pn1 || pn2) {
    printf("ERROR: lists are not the same length\n");
    ok = FALSE;
  }
  return ok;
}

void test_list_copy_basic() {
  int i;
  int array_size;
  int ai[] = {2, 4, 6, 8, 10, 12};
  char ac[] = {'e', 'd', 'c', 'b', 'a'};
  char *as[] = {"white", "is", "snow", "the"};
  elem_print_fn elem_print;
  elem_cmp_fn elem_cmp;

  int i_size = sizeof(ai) / sizeof(ai[0]);
  int c_size = sizeof(ac) / sizeof(ac[0]);
  int s_size = sizeof(as) / sizeof(as[0]);

  List *pl1 = NULL, *pl2 = NULL;

  printf("\nTESTING LIST COPY\n\n");

  // TEST INTS

  array_size = i_size;
  elem_print = int_print;
  elem_cmp = int_cmp;

  pl1 = list_from_array(ai, sizeof(int), array_size);
  printf("Original list: ");
  list_print(stdout, pl1, elem_print);
  printf("\n");

  pl2 = list_copy(pl1);

  printf("Copied list: ");
  list_print(stdout, pl2, elem_print);
  printf("\n");
  if (!verify_list_copies(pl1, pl2, elem_cmp)) {
    printf("ERROR: VERIFICATION OF COPIES FAILED\n");
  } else {
    printf("VERIFICATION OF COPIES OK\n");
  };

  // check that both lists are different after a deletion
  // (that is, deleting an element in one does not delete an element in the
  // other)

  i = rand() % array_size;
  printf("Deleting %d from original list\n", ai[i]);
  list_delete(pl1, ai + i, elem_cmp);
  printf("Original list: ");
  list_print(stdout, pl1, elem_print);
  printf("\nCopied list: ");
  list_print(stdout, pl2, elem_print);
  printf("\n");

  i = rand() % array_size;
  printf("Deleting %d from copied list\n", ai[i]);
  list_delete(pl2, ai + i, elem_cmp);
  printf("Original list: ");
  list_print(stdout, pl1, elem_print);
  printf("\nCopied list: ");
  list_print(stdout, pl2, elem_print);
  printf("\n");

  list_free(pl1);
  list_free(pl2);

  // TEST CHARS

  array_size = c_size;
  elem_print = char_print;
  elem_cmp = char_cmp;

  pl1 = list_from_array(ac, sizeof(char), array_size);
  printf("Original list: ");
  list_print(stdout, pl1, elem_print);
  printf("\n");

  pl2 = list_copy(pl1);

  printf("Copied list: ");
  list_print(stdout, pl2, elem_print);
  printf("\n");
  if (!verify_list_copies(pl1, pl2, elem_cmp)) {
    printf("ERROR: VERIFICATION OF COPIES FAILED\n");
  } else {
    printf("VERIFICATION OF COPIES OK\n");
  };

  // check that both lists are different after a deletion
  // (that is, deleting an element in one does not delete an element in the
  // other)

  i = rand() % array_size;
  printf("Deleting %c from original list\n", ac[i]);
  list_delete(pl1, ac + i, elem_cmp);
  printf("Original list: ");
  list_print(stdout, pl1, elem_print);
  printf("\nCopied list: ");
  list_print(stdout, pl2, elem_print);
  printf("\n");

  i = rand() % array_size;
  printf("Deleting %c from copied list\n", ac[i]);
  list_delete(pl2, ac + i, elem_cmp);
  printf("Original list: ");
  list_print(stdout, pl1, elem_print);
  printf("\nCopied list: ");
  list_print(stdout, pl2, elem_print);
  printf("\n");

  list_free(pl1);
  list_free(pl2);

  // TEST STRINGS

  array_size = s_size;
  elem_print = string_print;
  elem_cmp = string_cmp;

  pl1 = list_from_array(as, sizeof(char *), array_size);
  printf("Original list: ");
  list_print(stdout, pl1, elem_print);
  printf("\n");

  pl2 = list_copy(pl1);

  printf("Copied list: ");
  list_print(stdout, pl2, elem_print);
  printf("\n");
  if (!verify_list_copies(pl1, pl2, elem_cmp)) {
    printf("ERROR: VERIFICATION OF COPIES FAILED\n");
  } else {
    printf("VERIFICATION OF COPIES OK\n");
  };

  // check that both lists are different after a deletion
  // (that is, deleting an element in one does not delete an element in the
  // other)

  i = rand() % array_size;
  printf("Deleting %s from original list\n", as[i]);
  list_delete(pl1, as + i, elem_cmp);
  printf("Original list: ");
  list_print(stdout, pl1, elem_print);
  printf("\nCopied list: ");
  list_print(stdout, pl2, elem_print);
  printf("\n");

  i = rand() % array_size;
  printf("Deleting %s from copied list\n", as[i]);
  list_delete(pl2, as + i, elem_cmp);
  printf("Original list: ");
  list_print(stdout, pl1, elem_print);
  printf("\nCopied list: ");
  list_print(stdout, pl2, elem_print);
  printf("\n");

  list_free(pl1);
  list_free(pl2);
}

int main(int argc, char **argv) {
  srand(1); // initialize random seed
  test_list_delete_basic();
  test_list_copy_basic();
}
