#ifndef _ELEMENTS_H
#define _ELEMENTS_H

#include <stdio.h>
#include <stdlib.h>

/* function types to use to compare and print elements*/
typedef int (*elem_cmp_fn)(const void *c1, const void *c2);
typedef int (*elem_print_fn)(FILE *pf, const void *c1);

/********* INT  *********/

/**
 * @brief  This function compares two integers c1 and c2.
 * @param c1 Pointer to the first integer
 * @param c2 Pointer to the second integer
 * @return  It returns an integer less than, equal to, or greater than zero
 *if c1  is  found, respectively, to be less than, to match, or be greater
 *than c2.
 **/
int int_cmp(const void *c1, const void *c2);

/**
 * @brief  This function writes the content of the pointer to integer to the
 * stream.
 * @param pf A pointer to the stream
 * @param a A pointer to the element
 * @return Upon successful return, these function return the number of
 * characters. If an output error is encountered, a negative value is returned.
 *  */
int int_print(FILE *pf, const void *a);

/*******************CHAR **********/

/**
 * @brief  This function compares two chars c1 and c2.
 * @param c1 Pointer to the first char
 * @param c2 Pointer to the second char
 * @return  It returns an integer less than, equal to, or greater than zero if
 *c1  is  found, respectively, to be less than, to match, or be greater than c2.
 **/
int char_cmp(const void *c1, const void *c2);

/**
 * @brief  This function writes the content of the pointer to char to the
 * stream.
 * @param pf A pointer to the stream
 * @param a A pointer to the element
 * @return Upon successful return, these function return the number of
 * characters. If an output error is encountered, a negative value is returned.
 *  */
int char_print(FILE *pf, const void *a);

/****************** String  **********************************/

/**
 * @brief  This function compares two strings c1 and c2.
 *
 * This is a wrapper function of the function strcmp included in the library
 *string.h
 * @param c1 Pointer to the first string
 * @param c2 Pointer to the second string
 * @return  It returns an integer less than, equal to, or greater than zero if
 *c1  is  found, respectively, to be less than, to match, or be greater than c2.
 **/
int string_cmp(const void *c1, const void *c2);

/**
 * @brief  This function writes a string to the stream.
 * @param pf A pointer to the stream
 * @param str A pointer to the string
 * @return Upon successful return, the function returns the number of
 * characters. If an output error is encountered, a negative value is returned.
 *  */
int string_print(FILE *pf, const void *str);

#endif /* _ELEMENTS_H */
