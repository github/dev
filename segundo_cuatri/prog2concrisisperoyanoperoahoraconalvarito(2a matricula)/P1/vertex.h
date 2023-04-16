

/**
 * @file  vertex.h
 * @author Profesores Programación 2
 * @date 2 February 2021
 * @version 1.0
 * @brief Library to manage ADT Vertex
 *
 * @details 
 * 
 * @see
 */




#ifndef VERTEX_H_
#define VERTEX_H_

#include "types.h"
#include <stdio.h>
#include <stdlib.h>

/** 
 * @brief Label to characterize the vertex state (to be used in P2)
 *
 **/
typedef enum {
    WHITE, /*!< vertex not visited */
    BLACK,  /*!< vertex visited */
    ERROR_VERTEX   /*!< not valid vertex */   
} Label;

/** 
 * @brief Data structure to implement the ADT Vertex. To be defined 
 * in vertex.c
 *
 **/
/* START [Vertex] */
typedef struct _Vertex Vertex;
/* END [Vertex] */


/**
 * @brief Constructor. Initialize a vertex.
 * 
 * This function allocates memory for a vertex and sets its fields to 
 * id to 0, tag to "" and state to WHITE.
 *
 * @code
 * // Example of use
 * Vertex * v;
 * v = vertex_init();
 * @endcode
 *
 * @return Return the initialized vertex if it was done correctly, 
 * otherwise return NULL.
*/
Vertex * vertex_init ();


/**
 * @brief Constructor. Initialize a vertex from its description.
 * 
 * This function allocates memory for a vertex and sets its fields  
 * according to the description provided. A description string is 
 * a set of key:value pairs separated by any amount of whitespace, 
 * where the key can be any of id, tag or state. 
 * No space is allowed in the definition of a key:value pair.
 * The key:value pairs can be provided in any order.
 * 
 * Examples
 *
 * vertex_initFromString("id:1 tag:Toledo state:1");
 * vertex_initFromString("tag:Toledo state:1 id:1");
 * vertex_initFromString("tag:Toledo state:1");
 * vertex_initFromString("id:1 state:1");
 *
 * @param descr String describing the vertex.
 *
 * @return Return the initialized vertex if it was done correctly, 
 * otherwise return NULL.
*/
Vertex *vertex_initFromString(char *descr);

/**
 * @brief Destructor. Free the dynamic memory reserved for a vertex .
 *
 * @param v Vertex to free
 */
void vertex_free (void * v);


/**
 * @brief  Gets the vertex id.
 *
 * @param v Vertex pointer
 *
 * @return  Returns the id of the given vertex, or -1 in case of error.
 */
long vertex_getId (const Vertex * v);


/**
 * @brief Gets the vertex tag.
 *
 * @param v Vertex pointer
 *
 * @return Returns a pointer to the tag of the vertex, or NULL in 
 * case of error.
 */
const char* vertex_getTag (const Vertex * v);


/**
 * @brief Gets the state of a given vertex.
 *
 * @param Vertex pointer
 *
 * @return Returns the state of a given vertex, or ERROR_VERTEX in 
 * case of error.
 */
Label vertex_getState (const Vertex * v);



/**
 * @brief Modifies the id of a given vertex.
 *
 * @param v Vertex pointer
 * @param id New vertex id, must be equal or greater than 0
 *
 * @return Returns OK or ERROR in case of error 
 */
Status vertex_setId (Vertex * v, const long id);


/**
 * @brief Modifies the tag of a given vertex
 *
 * @param v Vertex pointer
 * @param id New vertex tag, must fit in the Vertex
 *
 * @return  Returns OK or ERROR in case of error.
 */
Status vertex_setTag (Vertex * v, const char * tag);


/**
 * @brief Modifies the state of a given vertex
 *
 * @param v Vertex pointer
 * @param state New vertex state
 *
 * @return Returns OK or ERROR in case of error.
 */
Status vertex_setState (Vertex * v, const Label state);



/**
 * @brief Compares two vertices.
 *
 * First it compares their ids. If they are equal, then compares
 * their tags.
 * 
 * @param v1,v2 Vertices to compare.
 *
 * @return It returns an integer less than or greater than zero if
 * id of v1 is found,  respectively, to be less than or be greater 
 * than id of v2. If their are equal, then returns the result of 
 * comparing their tags. In case of error, returns 0. 
 */
int vertex_cmp (const void * v1, const void * v2);


/**
 * @brief Reserves memory for a vertex where it copies the data from
 * the vertex src.
 * 
 * @code
 * // Example of use
 * Vertex *trg, *src;
 * src = vertex_init();
 * trg = vertex_copy(src);
 * // .... aditional code ...
 * // free vertexs
 * vertex_free(src);
 * vertex_free(trg);
 * @endcode
 * 
 * @param src Original vertex pointer
 *
 * @return Returns the pointer of the copied vertex if everything 
 * went well, or NULL otherwise.
 */
void * vertex_copy (const void * src);


/** 
 * @brief Prints in pf the data of a vertex.
 * 
 * The format will be: [id, tag, state], without line break at the 
 * end. The type Label is an enumeration so it can be printed as an
 * int. 
 *
 * @code
 * Vertex * v;
 * v = vertex_init();
 * vertex_print (stdout, v);
 * @endcode
 *
 * @param pf File descriptor
 * @param v Vertex to be printed
 *
 * @return Returns the number of characters that have been written 
 * successfully. If there have been errors returns -1.
 */
int vertex_print (FILE * pf, const void * v);

#endif /* VERTEX_H_ */
