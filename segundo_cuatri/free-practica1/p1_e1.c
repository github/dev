#include <stdio.h>
#include <stdlib.h>
#include "node.h"

int main(int argc, char** argv) {
  Node * n1 = NULL;
  Node *n2 = NULL;
  n1 = node_init();
  node_setName(n1, "first");
  node_setId(n1, 111);
  node_setLabel(n1, WHITE);

  n2 = node_init();
  node_setName(n2, "second");
  node_setId(n2, 222);
  node_setLabel(n2, WHITE);

  if(node_print(stdout, n1)==0){
    printf("Error al imprimir el primer nodo. \n");
    return 0;
  }
  if(node_print(stdout, n2)==0){
    printf("Error al imprimir el segundo nodo. \n");
    return 0;
  }

  printf("\n");
  printf("Son iguales? ");
  if(node_cmp(n1, n2) == 0){
    printf("Si. \n");
  }else{
    printf("No. \n");
  }

  printf("Id del primer nodo: %ld. \n", node_getId(n1));
  printf("Nombre del segundo nodo es: %s. \n", node_getName(n2));

  node_free(n2);
  n2 = node_copy(n1);

  if(node_print(stdout, n1)==0){
    printf("Error al imprimir el primer nodo. \n");
    return 0;
  }
  if(node_print(stdout, n2)==0){
    printf("Error al imprimir el segundo nodo. \n");
    return 0;
  }

  printf("\n");
  printf("Son iguales? ");
  if(node_cmp(n1,n2)==0){
    printf("Si. \n");
  }else{
    printf("No. \n");
  }

  node_free(n1);
  node_free(n2);

  return 1;
}
