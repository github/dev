/**
 * @file  delivery.h
 * @author Profesores EDAT
 * @date 10 March 2023
 * @version 1.0
 * @brief Library to manage ADT Delivery
 *
 * @details 
 * 
 * @see
 */
#ifndef DELIVERY_H
#define DELIVERY_H

#include <stdio.h>
#include "types.h"
#include "queue.h"

/** 
 * @brief Data structure to implement the ADT Delivery. 
 *
 **/
/* START [Delivery] */
typedef struct _Delivery Delivery;
/* END [Delivery] */

/**
 * @brief Data type for a pointer to a function that prints a element in the delivery. 
 **/
typedef int (*p_element_print)(FILE *, const void *);

/**
 * @brief Data type for a pointer to a function that frees a element in the delivery. 
 **/
typedef void (*p_element_free)(void *);

/**
 * @brief Constructor. Initialize a delivery plan.
 * 
 * This function allocates memory for a delivery (including its plan, i.e., a Queue) and sets its fields to 
 * their default values.
 *
 * @param name Name for this delivery
 * @param productName Name of the products managed by this delivery
 * 
 * @code
 * // Example of use
 * Delivery * d;
 * d = delivery_init("", "");
 * @endcode
 *
 * @return Return the initialized delivery if it was done correctly, 
 * otherwise return NULL.
*/
Delivery *delivery_init (char *name, char *productName);

/**
 * @brief Destructor. Free the dynamic memory reserved for a delivery, including its Queue.
 *
 * @param d Delivery to free
 */
void delivery_free (void *d);

/**
 * @brief Destructor of the content. Free the dynamic memory reserved for the products inside the plan.
 * @param ffree Function pointer to free elements in the delivery plan
 *
 * @param d Delivery to free
 */
void delivery_free_products (Delivery *d, p_element_free ffree);

/**
 * @brief Gets the name associated to this delivery.
 *
 * @param d Delivery pointer
 *
 * @return Returns a pointer to the name of the delivery, or NULL in 
 * case of error.
 */
const char *delivery_getName (const Delivery *d);

/**
 * @brief Gets the name associated to the products of this delivery.
 *
 * @param d Delivery pointer
 *
 * @return Returns a pointer to the name of the product of this delivery, or NULL in 
 * case of error.
 */
const char *delivery_getProductName (const Delivery *d);

/**
 * @brief Gets the plan (as a queue) associated to this delivery.
 *
 * @param d Delivery pointer
 *
 * @return Returns a pointer to the queue that represents the plan of this delivery, or NULL in 
 * case of error.
 */
Queue *delivery_getPlan (Delivery *d);

/**
 * @brief Adds a product to a delivery.
 *
 * @param pf File descriptor where the added product information will be printed.
 * @param d Delivery pointer
 * @param p A pointer to a generic product
 * @param f Function pointer to print elements in the delivery plan
 *
 * @return Returns OK or ERROR.
 */
Status delivery_add (FILE *pf, Delivery *d, void *p, p_element_print f);

/**
 * @brief Simulates running the plan associated to a delivery.
 *
 * @param pf File descriptor where the simulation will be shown.
 * @param d Delivery pointer
 * @param fprint Function pointer to print elements in the delivery plan
 * @param ffree Function pointer to free elements in the delivery plan
 *
 * @return Returns OK or ERROR.
 */
Status delivery_run_plan (FILE *pf, Delivery *d, p_element_print fprint, p_element_free ffree);

/**
 * @brief Compares two deliveries.
 *
 * @param d1,d2 Deliveries to compare.
 *
 * @return It returns an integer less than, equal, or greater than zero
 * if d1 is considered smaller, equal, or larger than d2.
 */
int delivery_cmp (const void *d1, const void *d2);

/**
 * @brief Allocates memory for a delivery where it copies the data from
 * the delivery in src.
 * 
 * @param src Original delivery pointer
 *
 * @return Returns the pointer of the copied delivery if everything 
 * went well, or NULL otherwise.
 */
void *delivery_copy (const void *src);

/** 
 * @brief Prints in pf the data of a delivery.
 * 
 * @code
 * Delivery * d;
 * d = delivery_init("", "");
 * delivery_print (stdout, d);
 * @endcode
 *
 * @param pf File descriptor
 * @param d Delivery to be printed
 * @param f Function pointer to print elements in the delivery plan
 *
 * @return Returns the number of characters that have been written 
 * successfully. If there have been errors returns -1.
 */
int delivery_print (FILE *pf, const void *d, p_queue_ele_print f);

#endif
