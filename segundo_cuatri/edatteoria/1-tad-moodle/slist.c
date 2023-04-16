#include "slist.h"
#include "types.h"
#include <stdio.h>
#include <stdlib.h>

#define INIT_SIZE 4
#define GROWTH_FACTOR 2

/* SList: an ordered list of strings */
/* Note: ordered by position in list, not by any ordering criterion */
/* - data is an array of strings of size capacity: the number of strings it
 * *can* fit */
/* - capacity is that size */
/* - num_elem is the number of strings it actually contains */
struct _SList {
  char **data;
  int capacity;
  int num_elem;
};

SList *sl_new() {
  SList *lst = malloc(sizeof(SList));
  if (!lst)
    return NULL;
  lst->data = malloc(sizeof(char *) * INIT_SIZE);
  if (!lst->data) {
    free(lst);
    return NULL;
  }
  lst->capacity = INIT_SIZE;
  lst->num_elem = 0;
  return lst;
}

void sl_free(SList *lst) {
  if (lst) {
    free(lst->data);
    free(lst);
  }
}

int sl_capacity(SList *lst) {
  if (!lst)
    return 0;
  return lst->capacity;
}

int sl_size(SList *lst) {
  if (!lst)
    return 0;
  return lst->num_elem;
}

/* _sl_is_full: private function */
/* detects whether you need to make lst->data bigger */
Bool _sl_isfull(SList *lst) {
  if (!lst)
    return TRUE;
  return lst->capacity == lst->num_elem;
}

/* _sl_grow: private function */
/* makes lst->data bigger to be able to store more strings */
Status _sl_grow(SList *lst) {
  int new_size;
  char **aux;

  if (!lst || !lst->data)
    return ERROR;
  new_size = lst->capacity * GROWTH_FACTOR;
  aux = realloc(lst->data, sizeof(char *) * new_size);

  if (!aux) {
    return ERROR;
  }
  /* update SList fields */
  lst->capacity = new_size;
  lst->data = aux;
  return OK;
}

/* add str to the end of SList l */
/* returns OK or ERROR depending on whether the addition was successful*/
/* inserts str in position lst->num_elem and increments lst->num_elem */
/* before doing so, */
Status sl_append(SList *l, char *str)
{
  if (!l || !str)
  {
    return ERROR;
  }
  if(_sl_isfull(l) == TRUE)
  {
    _sl_grow(l);
  }
  l->data[l->num_elem] = str;
  l->num_elem++;
  return OK;
}

/* remove last string from SList */
/* str contains that string, if any, at the end*/
/* returns OK if successful, ERROR otherwise (e.g. if the list is empty) */
Status sl_removeLast(SList *l, char **str)
{
  if (!l || !str)
  {
    return ERROR;
  }
  *str = l->data[l->num_elem - 1];
  l->data[l->num_elem - 1] = NULL;
  l->num_elem--;
  return OK;
}

/* returns in arg str the string in position pos in SList */
Status sl_get(SList *lst, int pos, char **str) {
  /* check all arguments */
  if (!lst || !(pos > -1) || !str || !(lst->data))
    return ERROR;
  /* check position is ok (within bounds)*/
  if (pos >= lst->num_elem)
    return ERROR;
  *str = lst->data[pos];
  return OK;
};

/* returns true of SList l is empty */
Bool sl_empty(SList *lst) {
  if (!lst || !(lst->data))
    return TRUE;
  return (lst->num_elem == 0);
};

/*prints all strings in SList l */
void sl_print(SList *lst) {
  int i;
  if (!lst || !(lst->data))
    return;
  for (i = 0; i < lst->num_elem; i++) {
    printf("%s ", lst->data[i]);
  }
};
