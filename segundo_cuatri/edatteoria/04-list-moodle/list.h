/**
 * @file list.h
 * @brief Minimal implementation of a simple linked list. Only adds/removes
 * elements to/from front position
 *
 * IMPORTANT NOTE: Data structure definition included in this header so that it
 * can be used by other files
 * => NO ENCAPSULATION - IMPLEMENTATION IS NOT PRIVATE
 */

#ifndef LIST_H
#define LIST_H

#include "elements.h"
#include "types.h"
#include <stdio.h>
#include <stdlib.h>

/**
 * Node definition:
 * The node's info field is a pointer to void, so that the list can contain
 * generic elements.
 *
 */

struct _Node {
  void *info;
  struct _Node *next;
};

typedef struct _Node Node;

/* Function that creates a node (should be private, but it's not for this
 * assignment, so that it can be used by the requested functions)*/
Node *node_new();

/**
 * List definition:
 * It contains a pointer to the first node.
 */
struct _List {
  Node *first;
};

typedef struct _List List;

/**
 * @brief Public function that creates a new List
 *
 * Allocates memory for the new List.
 *
 * @return Returns the address of the new list, or NULL in case of error.
 */

List *list_new();

/**
 * @brief Public function that checks if a List is empty.
 *
 * Note that the return value is TRUE for a NULL List.
 *
 * @param pl Pointer to the List.
 *
 * @return Boolean value TRUE if the list is empty or NULL, Boolean value
 * FALSE otherwise.
 */
Boolean list_isEmpty(const List *pl);

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
Status list_pushFront(List *pl, const void *elem);

/**
 * @brief Public function that pops the front element from a sorted List
 * (the maximum).
 *
 * Extracts the front element from the List, returning it.
 *
 * @param pl Pointer to the List.
 *
 * @return Extracted element, NULL if the List is empty or NULL.
 */
void *list_popFront(List *pl);

/**
 * @brief Public function that frees a List.
 *
 * Frees the memory allocated for the List.
 *
 * @param pl Pointer to the List.
 */
void list_free(List *pl);

/**
 * @brief Public function that prints a list using a print function for the
 * elements of the list.
 *
 *
 * @param pl Pointer to the List.
 */
int list_print(FILE *pf, const List *pl, elem_print_fn print_elem);

#endif /* LIST_H */
