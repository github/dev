#include <stdio.h>
#include <stdlib.h>
#include "graph.h"

int main(int argc, char** argv) {
  Node * n1 = NULL;
  Node * n2 = NULL;
  Graph * g = NULL;

  n1 = node_init();
  node_setName(n1, "first");
  node_setId(n1, 111);
  node_setLabel(n1, WHITE);

  n2 = node_init();
  node_setName(n2, "second");
  node_setId(n2, 222);
  node_setLabel(n2, WHITE);

  g = graph_init();


  printf("Insertando nodo 1...resultado...:");
  if(graph_insertNode (g, n1)==OK){
    printf("1\n");
  }else{
    printf("0\n");
  }

  printf("Insertando nodo 2...resultado...:");
  if(graph_insertNode (g, n2)==OK){
    printf("1\n");
  }else{
    printf("0\n");
  }



  if(graph_insertEdge(g, node_getId(n2),node_getId(n1)) == OK){
      printf("Insertando edge: nodo 2 ---> nodo 1 ");
      printf("\n");
    }

  if(graph_areConnected(g, node_getId(n1), node_getId(n2)) == TRUE){
      printf("Conectados nodo 1 y nodo 2? Si ");
      printf("\n");
    }else{
      printf("Conectados nodo 1 y nodo 2? No ");
      printf("\n");
    }



    if(graph_areConnected(g, node_getId(n2), node_getId(n1)) == TRUE){
      printf("Conectados nodo 2 y nodo 1? Si ");
      printf("\n");
    }else{
      printf("Conectados nodo 2 y nodo 1? No ");
      printf("\n");
    }

    printf("Insertando nodo 2...resultado...:");
    if(graph_insertNode (g, n2)==OK){
      printf("1\n");
    }else{
      printf("0\n");
    }



    graph_print(stdout, g);

    node_free(n1);
    node_free(n2);
    graph_free (g);

    return 1;
}
