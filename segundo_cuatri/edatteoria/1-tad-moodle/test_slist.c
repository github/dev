#include "slist.h"
#include "types.h"
#include <stdio.h>
#include <stdlib.h>

/* OUTPUT ESPERADO PARA UNA IMPLEMENTACIÓN CORRECTA, SI SE LLAMA SIN ARGUMENTOS
 */
/* $ ./test_slist
hola1 hola2
hola1 hola2 hola3 hola4 hola5 adios
Removing last:
Removed adios
List now:
hola1 hola2 hola3 hola4 hola5
*/

int main(int argc, char **argv) {
  int i = 0;
  SList *lst = NULL;
  char *str[] = {"hola1", "hola2"};
  char *str2[] = {"hola3", "hola4", "hola5", "adios"};
  char *removed = NULL;

  lst = sl_new();
  if (!lst)
    exit(EXIT_FAILURE);

  if (argc == 1) {
    // run with no arguments
    for (i = 0; i < 2; i++) {
      // printf("Adding %s\n", str[i]);
      sl_append(lst, str[i]);
    }
    sl_print(lst);
    printf("\n");
    for (i = 0; i < 4; i++) {
      // printf("Adding %s\n", str2[i]);
      sl_append(lst, str2[i]);
    }
    sl_print(lst);
    printf("\n");
    printf("Removing last:\n");
    sl_removeLast(lst, &removed);
    printf("Removed %s\nList now:\n", removed);
    sl_print(lst);
    printf("\n");
    sl_free(lst);
    exit(EXIT_SUCCESS);
  }

  if (argc > 1) {
    // run it with arguments
    for (i = 1; i < argc; i++) {
      sl_append(lst, argv[i]);
    }
    sl_print(lst);
    printf("\n");
    // for (i = 1; i < argc / 2; i++)
    sl_free(lst);
    exit(EXIT_SUCCESS);
  }
}