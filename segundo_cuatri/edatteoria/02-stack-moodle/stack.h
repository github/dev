// [ALL]
/**
 * @file  stack_fDoble.h
 * @author Prog2
 * @date 8 Mar 2021
 * @version 1.0
 * @brief Stack library
 *
 * @details Stack interface
 *
 * @see http://www.stack.nl/~dimitri/doxygen/docblocks.html
 * @see http://www.stack.nl/~dimitri/doxygen/commands.html
 */

#ifndef STACK_FDOBLE_H
#define STACK_FDOBLE_H

#include "file_utils.h"
#include "types.h"
#include <stdio.h>

/**
 * @brief Structure to implement a stack. To be defined in stack_fp.c
 *
 **/
typedef struct _Stack Stack;

/**
 * @brief Typedef for a function pointer to print a stack element at stream
 **/
typedef int (*print_elem_fn)(FILE *, const void *);

/**
 * @brief This function initializes an empty stack.
 *
 * @return   This function returns a pointer to the stack or a null pointer
 * if insufficient memory is available to create the stack.
 *  */
Stack *stack_init();

/**
 * @brief  This function frees the memory used by the stack.
 * @param s A pointer to the stack
 *  */
void stack_free(Stack *s);

/**
 * @brief This function is used to insert a element at the top of the stack.
 *
 * A reference of the element is added to the stack container and the size of
 * the stack is increased by 1. Time complexity: O(1). This function reallocate
 * the stack capacity when it is full.
 * @param s A pointer to the stack.
 * @param ele A pointer to the element to be inserted
 * @return This function returns OK on success or ERROR if the stack is full.
 *  */
Status stack_push(Stack *s, const void *ele);

/**
 * @brief  This function is used to extract a element from the top of the stack.
 *
 * The size of the stack is decreased by 1. Time complexity: O(1).
 * @param s A pointer to the stack.
 * @return This function returns a pointer to the extracted element on success
 * or null when the stack is empty.
 * */
void *stack_pop(Stack *s);

/**
 * @brief  This function is used to reference the top (or the newest) element of
 * the stack.
 *
 * @param s A pointer to the stack.
 * @return This function returns a pointer to the newest element of the stack.
 * */
void *stack_top(const Stack *s);

/**
 * @brief Returns whether the stack is empty
 * @param s A pointer to the stack.
 * @return TRUE or FALSE
 */
Bool stack_isEmpty(const Stack *s);

/**
 * @brief This function returns the size of the stack.
 *
 * Time complexity: O(1).
 * @param s A pointer to the stack.
 * @return the size
 */
size_t stack_size(const Stack *s);

/**
 * @brief  This function writes the elements of the stack to the stream.
 * @param fp A pointer to the stream
 * @param s A pointer to the element to the stack
 * @return Upon successful return, these function returns the number of
 * characters writted. The function returns a negative value if there was a
 * problem writing to the file.
 *  */
int stack_print(FILE *fp, const Stack *s, print_elem_fn f);

#endif /* STACK_FDOBLE_H */
