#include "list.h"
#include "file_utils.h"

struct _List
{
    NodeList *last;
};

struct _NodeList
{
    void *data;
    struct _NodeList *next;
};

NodeList *node_new();

NodeList *node_new()
{
    NodeList *pn = NULL;
    pn = (NodeList *)malloc(sizeof(NodeList));
    if (!pn)
    {
        return NULL;
    }
    pn->data = NULL;
    pn->next = NULL;
    return pn;
}
List *list_new()
{
    List *pl = NULL;
    pl = (List *)malloc(sizeof(List));
    if (pl == NULL)
    {
        return NULL;
    }
    pl->last = NULL;

    return pl;
}

Bool list_isEmpty(const List *pl)
{
    if (pl == NULL)
    {
        return TRUE;
    }
    if (pl->last == NULL)
    {
        return TRUE;
    }
    return FALSE;
}

Status list_pushFront(List *pl, void *e)
{
    NodeList *pn = NULL;
    if (pl == NULL || e == NULL)
    {
        return ERROR;
    }
    pn = node_new();
    if (pn == NULL)
    {
        return ERROR;
    }
    pn->data = (void *)e;
    pn->next = pl->last;
    pl->last = pn;
    return OK;
}

Status list_pushBack(List *pl, void *e)
{
    NodeList *pn = NULL, *qn = NULL;
    if (pl == NULL || e == NULL)
    {
        return ERROR;
    }
    pn = node_new();
    if (pn == NULL)
    {
        return ERROR;
    }
    pn->data = (void *)e;
    /* Case 1: empty List - insert at initial position: */
    if (list_isEmpty(pl) == TRUE)
    {
        pl->last = pn;
        return OK;
    }
    /* Case 2: non empty List - traverse the List and insert: */
    qn = pl->last;
    while (qn->next != NULL)
    {
        qn = qn->next;
    }
    qn->next = pn;
    return OK;
}
void *list_getLast(List *pl);
void *list_getLast(List *pl)
{
    return pl->last;
}
void *list_getFront(List *pl);
void *list_getFront(List *pl)
{
    return pl->last->next;
}

Status list_pushInOrder(List *pl, void *e, P_ele_cmp f, int order)
{
    List *aux = list_new();
    void *ele = NULL;

    if (list_isEmpty(pl) == TRUE)
    {
        list_pushBack(pl, e);
        list_free(aux);
        return OK;
    }
    else
    {
        while (list_isEmpty(pl) == FALSE)
        {
            list_pushBack(aux, list_popFront(pl));
        }
        while (list_isEmpty(aux) == FALSE)
        {
            ele = list_popFront(aux);
            if ((f(ele, e) * order) > 0)
            {
                list_pushBack(pl, e);
                list_pushBack(pl, ele);
                while (list_isEmpty(aux) == FALSE)
                {
                    list_pushBack(pl, list_popFront(aux));
                }
                list_free(aux);
                return OK;
            }
            else
            {
                list_pushBack(pl, ele);
            }
            if (list_isEmpty(aux) == TRUE)
            {
                list_pushBack(pl, e);
            }
        }
    }

    while (list_isEmpty(aux) == FALSE)
    {
        list_pushFront(pl, list_popFront(aux));
    }
    list_free(aux);
    return OK;
}

void *list_popFront(List *pl)
{
    NodeList *pn = NULL;
    void *pe = NULL;
    if (pl == NULL || list_isEmpty(pl) == TRUE)
    {
        return NULL;
    }
    pn = pl->last;
    pe = pn->data; /* Equivalently: pe = pl->first ->info */
    pl->last = pn->next;
    free(pn);
    return pe;
}

void *list_popBack(List *pl)
{
    NodeList *pn = NULL;
    void *pe = NULL;

    if (pl == NULL || list_isEmpty(pl) == TRUE)
    {
        return NULL;
    }

    /* Case 1: List with one single element - extract the first element: */
    if (pl->last->next == NULL)
    {
        pe = pl->last->data;
        free(pl->last);
        pl->last = NULL;

        return pe;
    }

    /* Case 2: List with more than one element - traverse the List
      and extract: */
    pn = pl->last;
    while (pn->next->next != NULL)
    {
        pn = pn->next;
    }

    pe = pn->next->data;
    free(pn->next);
    pn->next = NULL;

    return pe;
}

void list_free(List *pl)
{
    if (pl == NULL)
    {
        return;
    }
    while (list_isEmpty(pl) == FALSE)
    {
        list_popFront(pl);
    }
    free(pl);
}

size_t list_size(const List *pl)
{
    if (!pl)
        return 0;
    if (list_isEmpty(pl) == TRUE)
        return 0;

    NodeList *n;
    n = pl->last;
    size_t s;

    for (s = 1; n->next != pl->last; s++)
    {
        if (s == 1 && n->next == NULL)
            return 1;
        n = n->next;
    }

    return s;
}

int list_print(FILE *fp, const List *pl, P_ele_print f)
{
    NodeList *pn = NULL;
    int return_value = 0;
    int val = 0;

    if (pl == NULL || fp == NULL)
    {
        return -1;
    }

    pn = pl->last;
    while (pn != NULL)
    {
        val = f(fp, pn->data);
        if (val < 0)
        {
            return val;
        }
        fprintf(fp, " ");
        return_value += val + 1;
        pn = pn->next;
    }

    return return_value;
}