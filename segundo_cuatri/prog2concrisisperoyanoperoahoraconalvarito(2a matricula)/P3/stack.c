#include <stdlib.h>
#include <stdio.h>
#include "stack.h"


#define INIT_CAPACITY 2 // init stack capacity
#define FCT_CAPACITY 2 // multiply the stack capacity


struct _Stack
{
    void **item;  /*!<Dynamic array of elements*/
    int top;      /*!<index of the top element in the stack*/
    int capacity; /*!<xcapacity of the stack*/
};


Stack *stack_init()
{
    Stack *p = NULL;
    p = (Stack *)calloc(1, sizeof(Stack));

    if (p == NULL)
    {
        return NULL;
    }
    p->capacity = INIT_CAPACITY;
    p->item = (void **)calloc(INIT_CAPACITY, sizeof(void *));
    p->top = 0;

    return p;
}

void stack_free(Stack *s)
{
    if (s == NULL)
    {
        return;
    }
            free(s->item);

    free(s);
}

Status stack_push(Stack *s, const void *ele)
{
    if (s == NULL || ele == NULL)
    {
        return ERROR;
    }
    s->capacity++;
    s->item = realloc(s->item, sizeof(ele) * FCT_CAPACITY * s->capacity);
    s->item[s->top] = (void *)ele;
    s->top++;

    return OK;
}

void *stack_pop(Stack *s)
{
    if (s == NULL || stack_isEmpty(s) == TRUE)
    {
        return NULL;
    }
    void *x = NULL;

    s->top--;
    x = s->item[s->top];
    s->item[s->top] = NULL;
    s->capacity--;
    s->item = realloc(s->item, sizeof(x) * FCT_CAPACITY * s->capacity);

    return (void *)x;
}

void *stack_top(const Stack *s)
{
    if (s == NULL || stack_isEmpty(s) == TRUE)
    {
        return NULL;
    }
    void *x = NULL;

    x = s->item[s->top-1];

    return x;
}

Bool stack_isEmpty(const Stack *s)
{
    if (s == NULL || s->top == 0)
    {
        return TRUE;
    }
    else
    {
        return FALSE;
    }
}

size_t stack_size(const Stack *s)
{
    if (s == NULL)
    {
        return -1;
    }
    return s->top;
}

int stack_print(FILE *fp, const Stack *s, P_stack_ele_print f)
{
    if (fp == NULL || s == NULL || f == NULL)
    {
        return -1;
    }
    int i, sum_ele = 0;
    for (i = 0; i < stack_size(s); i++)
    
    {
        sum_ele += f(stdout, s->item[i]);
        printf("\n");
    }
    return sum_ele;
}
