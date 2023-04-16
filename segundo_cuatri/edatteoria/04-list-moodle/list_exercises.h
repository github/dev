#ifndef LIST_EXER_H
#define LIST_EXER_H

#include "elements.h"
#include "list.h"
#include "types.h"

// Remove the first occurrence of element elem from list, if any,
// using the elem_cmp_fn function compare.
void list_delete(List *pl, const void *elem, elem_cmp_fn compare);

// Copy list pl, returning a newly created list which is a copy of pl.
// The copy is a new list with new nodes, with the elements of the original list
// in the same order.
// The elements themselves are not copied, i.e. the info fields of the new nodes
// point to the same elements as in the original list.

List *list_copy(List *pl);
#endif