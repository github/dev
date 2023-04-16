//--------------------------------------------------------------------------
// Dequeue implementation with (void *)
//--------------------------------------------------------------------------

#ifndef DEQUEUE_H
#define DEQUEUE_H

#include "types.h"
#include <stdio.h>
#include <stdlib.h>

/**
 * @brief Data type to declare a Dequeue variable.
 *
 **/
typedef struct _Dequeue Dequeue;

/**
 * @brief Data type for a pointer to a function that prints a Dequeue element.
 **/
typedef int (*print_elem_fn)(FILE *, const void *);

/**
 * @brief This function creates and initializes a Dequeue.
 *
 * @return A pointer to the Dequeue if it could be created or NULL in case of
 * error.
 *  */
Dequeue *dequeue_new();

/**
 * @brief This function frees the memory used by the Dequeue, but not the
 * elements that it may contain.
 *
 * @param q A pointer to the Dequeue to be freed.
 *  */
void dequeue_free(Dequeue *q);

/**
 * @brief Checks whether the Dequeue is empty or not.
 *
 * @param q A pointer to the Dequeue.
 *
 * @return TRUE if the Dequeue is empty, FALSE if it is not.
 */
Bool dequeue_isEmpty(const Dequeue *q);

/**
 * @brief This function is used to insert an element at the back position of a
 * Dequeue. A reference to the element is added to the Dequeue container and the
 * size is increased by 1. Time complexity: O(1).
 *
 * @param q A pointer to the Dequeue.
 * @param ele A pointer to the element to be inserted.
 *
 * @return OK on success, ERROR otherwise.
 *  */
Status dequeue_pushBack(Dequeue *q, const void *ele);

/**
 * @brief This function is used to extract an element from the front position of
 * a Dequeue. A reference to the element is returned and the size is decreased
 * by 1. Time complexity: O(1).
 *
 * @param s q pointer to the Dequeue.
 *
 * @return A pointer to the extracted element on success, NULL in case of error.
 * */
void *dequeue_popFront(Dequeue *q);

/**
 * @brief This function is used to get a reference to the element in the front
 * position of a Dequeue.
 *
 * @param q A pointer to the Dequeue.
 *
 * @return A pointer to the element in the front position, NULL in case of
 * error.
 * */
void *dequeue_getFront(const Dequeue *q);

/**
 * @brief This function is used to get a reference to the element in the back
 * position of a Dequeue.
 *
 * @param q A pointer to the Dequeue.
 *
 * @return A pointer to the element in the back position, NULL in case of error.
 * */
void *dequeue_getBack(const Dequeue *q);

/**
 * @brief This function is used to insert an element at the front position of a
 * Dequeue. A reference to the element is added to the Dequeue container and the
 * size is increased by 1. Time complexity: O(1).
 *
 * @param q A pointer to the Dequeue.
 * @param ele A pointer to the element to be inserted.
 *
 * @return OK on success, ERROR otherwise.
 *  */
Status dequeue_pushFront(Dequeue *q, const void *ele);

/**
 * @brief This function is used to extract an element from the rear position of
 * a Dequeue. A reference to the element is returned and the size is decreased
 * by 1. Time complexity: O(1).
 *
 * @param s q pointer to the Dequeue.
 *
 * @return A pointer to the extracted element on success, NULL in case of error.
 * */
void *dequeue_popBack(Dequeue *q);

/**
 * @brief This function returns the size of a Dequeue. Note that the function
 * returns 0 if it is called with a NULL pointer. Time complexity: O(1).
 *
 * @param q A pointer to the Dequeue.
 *
 * @return The Dequeue size, 0 in case of error.
 */
size_t dequeue_size(const Dequeue *q);

/**
 * @brief  This function prints the Dequeue content to an output stream.
 *
 * @param fp A pointer to the stream.
 * @param q A pointer to the Dequeue to be printed.
 * @param f A pointer to the function that must be used to print the Dequeue
 * elements.
 *
 * @return On success this function returns the number of characters printed. In
 * case of error it returns a negative value.
 *  */
int dequeue_print(FILE *fp, const Dequeue *q, print_elem_fn print_elem);

#endif /* DEDequeue_H */
