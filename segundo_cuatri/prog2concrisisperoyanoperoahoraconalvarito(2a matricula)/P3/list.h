/**
 * @file list.h
 * @author Programming II Teaching Team
 * @date 6 April 2020
 * @brief Public interface for a Linked List implementation.
 *
 * The List admits arbitrary elements, received as pointers to void. It is
 * necessary to provide functions to free, copy and print an element,
 * and a function to compare two elements when
 * creating the List (see documentation).
 *
 * This List implementation currently provides the following functionality:
 *
 * - Create and destroy a List.
 * - Check if a List is empty.
 * - Push an element into the front or back positions.
 * - Push an element in an ordered list.
 * - Pop an element from the front or back positions.
 * - Get the number of elements in a List.
 * - Print a List.
 *
 */

#ifndef LIST_H
#define	LIST_H

#include "types.h"
#include <stdio.h>
#include <stdlib.h>


/**
 * List type definition: a list of arbitrary elements.
 */
typedef struct _List List;

typedef struct _NodeList NodeList;

/**
 * P_ele_print type definition: pointer to a function that prints a List element to
 * an output stream. It is assumed that this function returns:
 * (1) the number of characters printed upon success; or
 * (2) a negative number in case of error.
 */
typedef int (*P_ele_print)(FILE *, const void *);
/**
 * P_ele_cmp type definition: pointer to a function that compares two elements of a List
 *  It returns an integer less than, equal to, or greater than zero if s1 is found,
 * respectively, to be less than, to match, or  be greater than s2.
 */
typedef int (*P_ele_cmp)(const void *, const void *);


/**
 * @brief Public function that creates a new List.
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
 * @return Bool value TRUE if the list is empty or NULL, Bool value FALSE
 * otherwise.
 */
Bool list_isEmpty(const List *pl);

/**
 * @brief Public function that pushes an element into the front position of a
 * List.
 *
 * Inserts into the front position a reference of the element received as argument.
 *
 * @param pl Pointer to the List.
 * @param e Pointer to the element to be inserted into the List.
 *
 * @return Status value OK if the insertion could be done, Status value ERROR
 * otherwise.
 */
Status list_pushFront(List *pl, void *e);

/**
 * @brief Public function that pushes an element into the back position of a
 * List.
 *
 * Inserts into the back position a reference of the element received as argument.
 *
 * Note that it is necessary to traverse the list in order to obtain the
 * insert position, so this operation is linear in the number of List elements.
 *
 * @param pl Pointer to the List.
 * @param e Pointer to the element to be inserted into the List.
 *
 * @return Status value OK if the insertion could be done, Status value ERROR
 * otherwise.
 */
Status list_pushBack(List *pl, void *e);

/**
 * @brief Public function that pushes an element into an ordered list.
 *
 * Inserts in its position a reference of the element received as argument.
 *
 * Note that it is necessary to traverse the list in order to obtain the
 * insert position, so this operation is linear in the number of List elements.
 *
 * @param pl Pointer to the List.
 * @param e Pointer to the element to be inserted into the List.
 * @param f A pointer to the function that must be used to compare the elements.
 * @param order Must takes a positive value for a crescent list and negative
 *  value for decrescent list.
 *
 * @return Status value OK if the insertion could be done, Status value ERROR
 * otherwise.
 */
Status list_pushInOrder (List *pl, void *e, P_ele_cmp f, int order);


/**
 * @brief Public function that pops the front element from a List.
 *
 * Extracts the front element from the List, returning a pointer to it.
 *
 * @param pl Pointer to the List.
 *
 * @return Pointer to the extracted element, or NULL in case of error.
 */
void *list_popFront(List *pl);

/**
 * @brief Public function that pops the back element from a List.
 *
 * Extracts the element element from the List, returning a pointer to it.
 *
 * Note that it is necessary to traverse the list in order to obtain the
 * extract position, so this operation is linear in the number of List elements.
 *
 * @param pl Pointer to the List.
 *
 * @return Pointer to the extracted element, NULL if the List is empty or NULL.
 */
void *list_popBack(List *pl);

/**
 * @brief Public function that frees a List.
 *
 * Frees all the memory allocated for the List.
 *
 * @param pl Pointer to the List.
 */
void list_free(List *pl);

/**
 * @brief Public function that returns the number of elements in a List.
 *
 * Note that the number of elements is not stored in the data structure, and the
 * List must be traversed in order to obtain its size. So this operation is linear
 * in the number of List elements.
 *
 * @param pl Pointer to the List.
 *
 * @return Returns the number of elements in the List, or -1 if the List is NULL.
 */
size_t list_size(const List *pl);

/**
 * @brief Public function that prints the content of a List.
 *
 * Prints all the elements in the List, from front to rear, to an output stream.
 *
 * Note that this function simply calls the P_ele_print function for each List
 * element, also printing the size of this list at the beginning and an additional blank space 
 * between elements.
 * Any other desired format must be included in the P_ele_print function.
 *
 * @param fp Output stream.
 * @param pl Pointer to the List.
 * @param f A pointer to the function that must be used to print the list elements.
 *
 * @return The sum of the return values of all the calls to P_ele_print if these
 * values are all positive; the first negative value encountered otherwise. If the
 * function P_ele_print is well constructed, this means that, upon successful return,
 * this function returns the number of characters printed, and a negative value if
 * an error occurs.
 */
int list_print(FILE *fp, const List *pl, P_ele_print f);

#endif	/* LIST_H */
