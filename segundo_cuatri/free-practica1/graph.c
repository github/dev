#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include "graph.h"

#define MAX_NODES 1064


struct _Graph {
  Node *nodes[MAX_NODES];                   /*!<Array with the graph nodes */
  Bool connections[MAX_NODES][MAX_NODES];   /*!<Adjacency matrix */
  int num_nodes;                            /*!<Total number of nodes in te graph */
  int num_edges;                            /*!<Total number of connection in the graph */
};

/*Private functions*/
int find_node_index(const Graph * g, long nId1);
int* graph_getConnectionsIndex(const Graph * g, int index);



Graph * graph_init (){
  Graph* graph;
  int i,j;

  graph=(Graph*)malloc(sizeof(Graph));

  if(graph==NULL){
    fprintf(stderr, "Error: %s.", strerror(errno));
    return NULL;
  }

  for(i=0;i<MAX_NODES;i++){
    graph->nodes[i]=NULL;
  }

  for(i=0;i<MAX_NODES;i++){
    for(j=0;j<MAX_NODES;j++){
      graph->connections[i][j]=FALSE;
    }
  }

  graph->num_nodes=0;
  graph->num_edges=0;

  return graph;

}


void graph_free (Graph *g){
  int i;

  if(!g){
    return;
  }

  for(i=0;i<MAX_NODES;i++){
    node_free(g->nodes[i]);
  }

  free(g);
}


int find_node_index(const Graph * g, long nId1){
  int i;
  if (!g) return -1;
  for(i=0; i < g->num_nodes; i++) {
      if (node_getId (g->nodes[i]) == nId1){
        return i;
      }
}
  return -1;
}


int* graph_getConnectionsIndex(const Graph * g, int index){
  int *array = NULL, i, j = 0, size;
    if (!g) return NULL;

    if (index < 0 || index >g->num_nodes) return NULL;

    size = node_getNConnect (g->nodes[index]);
    array = (int *) malloc(sizeof (int) * size);

    if (!array) {
      fprintf (stderr, "%s\n", strerror(errno));
      return NULL;
    }

    for(i = 0; i< g->num_nodes; i++) {
      if (g->connections[index][i] == TRUE) {
        array[j++] = i;
      }
    }
    return array;
}


Status graph_insertNode (Graph *g, const Node *n){
  if(!g||!n){
    return ERROR;
  }

  if(find_node_index(g,node_getId(n))!=-1){
      return ERROR;
  }

  g->nodes[g->num_nodes]=node_copy(n);
  g->num_nodes++;
  return OK;
}


Status graph_insertEdge (Graph *g, const long nId1, const long nId2){
int aux1,aux2;
  if(!g){
    return ERROR;
  }
  aux1=find_node_index(g,nId1);
  aux2=find_node_index(g,nId2);


  g->connections[aux1][aux2]=TRUE;
  g->num_edges++;

  return OK;
}



Node *graph_getNode (const Graph *g, long nId){
  Node* node=NULL;
  int aux;
  aux=find_node_index(g,nId);
  if(!g){
    return ERROR;
  }

  node=node_copy(g->nodes[aux]);
  return node;
}



Status graph_setNode (Graph *g, const Node *n){
  int aux;
  if(!g||!n){
    return ERROR;
  }
  aux=find_node_index(g,node_getId(n));

  g->nodes[aux]=node_copy(n);

  return OK;
}


long * graph_getNodesId (const Graph *g){
  long* array=NULL;
  int i;
  int j;

  if(!g){
    return NULL;
  }

  i=g->num_nodes;

  array=(long*)malloc(i*sizeof(long));

  if(array==NULL){
    return NULL;
  }

  for(j=0;j<(g->num_nodes);j++){
    array[j]=node_getId(g->nodes[j]);
  }

  return array;
}


int graph_getNumberOfNodes (const Graph *g){

  if(!g){
    return -1;
  }

  return g->num_nodes;
}


int graph_getNumberOfEdges (const Graph *g){

  if(!g){
    return -1;
  }

  return g->num_edges;
}



Bool graph_areConnected (const Graph *g, const long nId1, const long nId2){
  int aux1,aux2;

  if(!g){
    return FALSE;
  }

  aux1=find_node_index(g,nId1);
  aux2=find_node_index(g,nId2);

  if(g->connections[aux1][aux2] == 1){
    node_setNConnect(g->nodes[aux1],1);
    return TRUE;
  }

  return FALSE;

}


int graph_getNumberOfConnectionsFrom (const Graph *g, const long fromId){
  int i;

  if(!g){
    return -1;
  }

  i=find_node_index(g,fromId);

  return node_getNConnect(g->nodes[i]);

}


long* graph_getConnectionsFrom (const Graph *g, const long fromId){
  int i,j,aux=0;
  long* array=NULL;
  if(!g){
    return NULL;
  }

  i=find_node_index(g, fromId);

  array=(long*)malloc(node_getNConnect(g->nodes[i])*sizeof(long));

  for(j=0;j<node_getNConnect(g->nodes[i]);j++){
    if(g->connections[i][j]==1){
      array[aux]=node_getId(g->nodes[j]);
      aux++;
    }
  }
  return array;
}



int graph_print (FILE *pf, const Graph *g){

  int num,i,j,total=0;
  long* array=NULL;

  if(!g||!pf){
    return -1;
  }

  num=graph_getNumberOfNodes(g);

  fprintf(pf,"Grafo\n");
  total++;

  for(i=0;i<num;i++){
    fprintf(pf,"[%s, ",node_getName(g->nodes[i]));
    total++;
    fprintf(pf,"%ld, ",node_getId(g->nodes[i]));
    total++;
    fprintf(pf,"%d, ",node_getLabel(g->nodes[i]));
    total++;
    fprintf(pf,"%d]",node_getNConnect(g->nodes[i]));
    total++;
    array=graph_getConnectionsFrom(g,node_getId(g->nodes[i]));

      for(j=0;j<node_getNConnect(g->nodes[i]);j++){
        fprintf(pf,"%ld ",array[j]);
        total++;
      }
      fprintf(pf,"\n");
      free(array);
    }
    return total;
}
