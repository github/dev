#include "list.h"
#include "types.h"
#include <stdio.h>
#include <stdlib.h>

/**
 * @brief Function that creates a new node.
 *
 * Allocates memory and sets the info and next pointers to NULL. Note that there
 * is no Node destructor, the destruction of a Node must be done by directly
 * calling the free function of the standard library.
 *
 * @return Returns the address of the new node, or NULL in case of error.
 */
Node *node_new() {
  Node *pn = NULL;

  pn = malloc(sizeof(Node));
  if (!pn) {
    return NULL;
  }

  pn->info = NULL;
  pn->next = NULL;

  return pn;
}

/**
 * @brief Public function that creates a new List.
 *
 * Allocates memory for the new List.
 *
 * @return Returns the address of the new list, or NULL in case of error.
 */

List *list_new() {
  List *pl = NULL;

  pl = malloc(sizeof(List));
  if (pl == NULL) {
    return NULL;
  }

  pl->first = NULL;

  return pl;
}

/**
 * @brief Public function that checks if a List is empty.
 *
 * @param pl Pointer to the List.
 *
 * @return Boolean value TRUE if the list is empty or NULL, Boolean value FALSE
 * otherwise.
 */
Boolean list_isEmpty(const List *pl) {
  return (pl == NULL || pl->first == NULL);
}

/**
 * @brief Public function that pushes an element into the front position of a
 * List.
 *
 * Inserts into the front position the element received as argument.
 *
 * @param pl Pointer to the List.
 * @param e Element to be inserted into the List.
 *
 * @return Status value OK if the insertion could be done, Status value ERROR
 * otherwise.
 */
Status list_pushFront(List *pl, const void *elem) {
  Node *pn = NULL;

  if (pl == NULL || elem == NULL) {
    return ERROR;
  }

  pn = node_new();
  if (pn == NULL) {
    return ERROR;
  }

  pn->info = (void *)elem;
  pn->next = pl->first;
  pl->first = pn;

  return OK;
}

/**
 * @brief Public Function that pops the front element from a sorted List (the
 * maximum).
 *
 * Extracts the front element from the List, returning it.
 *
 * @param pl Pointer to the List.
 *
 * @return Extracted element, NULL if the List is empty or NULL.
 */

void *list_popFront(List *pl) {
  Node *pn = NULL;
  void *elem = NULL;

  if (pl == NULL || list_isEmpty(pl) == TRUE) {
    return NULL;
  }

  pn = pl->first;
  elem = pn->info;
  pl->first = pn->next;

  free(pn);

  return elem;
}

/**
 * @brief Public function that frees a List.
 *
 * Frees the memory allocated for the List.
 *
 * @param pl Pointer to the List.
 */

void list_free(List *pl) {
  Node *pn, *qn;

  if (pl == NULL) {
    return;
  }

  pn = pl->first;

  while (pn != NULL) {
    qn = pn->next;
    free(pn);
    pn = qn;
  }

  free(pl);
}

int list_print(FILE *fp, const List *pl, elem_print_fn print_elem) {
  Node *pn = NULL;
  int return_value = 0;
  int val = 0;

  if (pl == NULL || fp == NULL) {
    return -1;
  }

  pn = pl->first;
  while (pn != NULL) {
    val = print_elem(fp, pn->info);
    if (val < 0) {
      return val;
    }
    fprintf(fp, " ");
    return_value += val + 1;
    pn = pn->next;
  }

  return return_value;
}
