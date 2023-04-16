
#ifndef NODE_H_
#define NODE_H_
#include <stdio.h>
#include "types.h"
/**
* @brief Label to characterize the node state (to be used in P2)
*
**/
typedef enum {
WHITE, /*!< node not visited */
BLACK, /*!< nodo visited */
ERROR_NODE /*!< not valid node */
} Label;
/**
* @brief Data structure to implement the ADT node. To be defined in node.c
*
**/
typedef struct _Node Node;
/**
* @brief Constructor. Initialize a node, reserving memory.
*
* This function initiates the node structure fields to "", -1, 0 and WHITE
* respectively
* @code
* Node *n;
* n = node_init ();
* @endcode
* @return Return the initialized node if
* it was done correctly, otherwise return NULL and print the corresponding
* string to the error in stderror
*/
Node * node_init ();
/**
* @brief Destructor. Free the dynamic memory reserved for a node
* @param n Node to free
*/
void node_free (void * n);
/**
* @brief Gets the node id
* @param n Node address
* @return Returns the id of a given node, or -1 in case of error
* */
long node_getId (const Node * n);
/**
* @brief Gets the node name
* @param n Node address
* @return Returns a pointer to the name of the node, or NULL in case of error
*/
const char* node_getName (const Node * n);
/**
* @brief Gets the number of connections of a given node.
* @param n Node address
* @return Returns the number of connections of a given node, or -1 in case
* of error
*/
int node_getNConnect (const Node * n);
/**
* @brief Gets the label of a given node.
* @param Node address
* @return Returns the label of a given node, or ERROR_NODE in case of error
*/
Label node_getLabel (const Node* n);
/**
* @brief Modifies the label of a given node
* @param n Node address
* @param id New node label
* @return Returns OK or ERROR in case of error
*/
Status node_setLabel (Node *n, const Label l);
/**
* @brief Modifies the id of a given node
* @param n Node address
* @param id New node id
* @return Returns OK or ERROR in case of error
*/
Status node_setId (Node * n, const long id);
/**
* @brief Modifies the name of a given node
* @param n Node address
* @param id New node name
* @return Returns OK or ERROR in case of error
*/
Status node_setName (Node *n, const char *name);
/**
* @brief Modifies the number of connections of a given node
* @param n Node address
* @param id Number of connections for the node
* @return Returns OK or ERROR in case of error
*/
Status node_setNConnect (Node *n, const int cn);
/**
* @brief Compares two nodes by id and then by name.
* @param n1,n2 Nodes to compare.
* @return return an integer less than, equal to, or greater than zero
* depending on their ids. If they are the same, then their names must
* be compared.
*/
int node_cmp (const void *n1, const void *n2);
/**
* @brief Reserves memory for a node where it copies the data from the node src.
* @code
* Node *trg, *src;
* src = node_init ();
* trg = node_copy(src);
* // .... aditional code ...
* // free nodes
* node_free (src);
* node_free (trg);
* @endcode
* @param Original node
* @return Returns the address of the copied node if everything went well,
* or NULL otherwise
*/
void * node_copy (const void *src);
/**
* @brief Prints in pf the data of a node
*
* The format will be: [id, name, label, nConnect]
* @code
* Node *n;
* n = node_init ();
* node_print (stdout, n);
* @endcode
* @param pf File descriptor
* @param n Node to be printed
* @return Returns the number of characters that have been written successfully.
* Checks if there have been errors in the output flow, in that case prints
* an error message in stderror and returns -1.
*/
int node_print (FILE *pf, const void *n);
#endif /* NODE_H_ */
