#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include "node.h"

#define NAME_L 64   /*!< Maximum node name length */

struct _Node {
char name[NAME_L];    /*!<Node name */
long id;              /*!<Node id */
int nConnect;         /*!<Node number of connections */
Label label;          /*!<Node state */
};


Node * node_init (){
  Node *node;
  node = (Node*)malloc(sizeof(Node));
  if(node==NULL){
    fprintf(stderr, "Error: %s.", strerror(errno));
    return NULL;
  }

  node->id= -1;
  node->nConnect= 0;
  node->label= WHITE;
  strcpy(node->name,"");
  return node;
}


void node_free (void * n){
  Node * node = NULL;
  node = (Node *) n;

  free(node);
}

long node_getId (const Node * n){
  if(!n){
    return -1;
  }
  return n->id;
}


const char* node_getName (const Node * n){
  if(!n){
    return NULL;
  }
  return n->name;
}


int node_getNConnect (const Node * n){
  if(!n){
    return -1;
  }
  return n->nConnect;
}


Label node_getLabel (const Node* n){
  if(!n){
    return ERROR_NODE;
  }
  return n->label;
}


Status node_setLabel (Node *n, const Label l){
  if(!n || !l){
    return ERROR;
  }
  n->label= l;
  return OK;
}


Status node_setId (Node * n, const long id){
  if(!n || !id){
    return ERROR;
  }
  n->id = id;
  return OK;
}


Status node_setName (Node *n, const char *name){
  if(!n || !name){
    return ERROR;
  }
  strcpy(n->name, name);
  return OK;
}


Status node_setNConnect (Node *n, const int cn){
  if(!n || !cn){
    return ERROR;
  }
  n->nConnect += cn;
  return OK;
}


int node_cmp (const void *n1, const void *n2){
  const Node * node1 = NULL;
  const Node * node2 = NULL;
  node1 = (const Node*) n1;
  node2 = (const Node*) n2;

  if(!n1 || !n2){
    return ERROR;
  }

  if(node1->id > node2->id){
    return 1;
  }
  else if(node1->id == node2->id){
    return strcmp(node1->name, node2->name);
  }
  else
  return -1;
}


void * node_copy (const void *src){
  const Node * node = NULL;
  Node * n = NULL;

  node = (const Node*) src;

  if(!src){
    return NULL;
  }
  n = node_init();
  node_setId(n, node->id);
  node_setName(n,node->name);
  node_setLabel(n, node->label);
  node_setNConnect(n, node->nConnect);

  return n;

}

int node_print (FILE *pf, const void *n){
  const Node * node = NULL;
  node = (const Node*) n;

  if(!pf || !n){
    fprintf(stderr ,"Error: %s.", strerror(errno));
    return -1;
  }
  return fprintf(pf, "[%ld, %s, %d, %d]", node->id, node->name, node->label, node->nConnect);
}
