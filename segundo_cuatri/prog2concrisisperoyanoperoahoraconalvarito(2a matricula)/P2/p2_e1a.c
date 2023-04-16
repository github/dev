#include <stdio.h>
#include <stdlib.h>
#include "stack.h"
#include "file_utils.h"

#define MAX_SIZE 128

/**
 * @brief: Merges two stacks
 *
 * @param sin1, first input stack
 * @param sin2, second input stack
 * @param sout, result stack
 * @return The function returns OK or ERROR
 **/
Status mergeStacks(Stack *sin1, Stack *sin2, Stack *sout)
{
    Status st = OK;
    Stack *ps;
    float e1, e2;
    void *e;

    if (!sin1 || !sin2)
        return ERROR;

    while (!stack_isEmpty(sin1) && !stack_isEmpty(sin2))
    {
        e1 = *((float *)stack_top(sin1));
        e2 = *((float *)stack_top(sin2));
        if (e1 > e2)
            e = stack_pop(sin1);
        else
            e = stack_pop(sin2);

        if (!e)
            return ERROR;
        st = stack_push(sout, e);
        if (!st)
            return ERROR;
    }

    if (stack_isEmpty(sin1))
        ps = sin2;
    else
        ps = sin1;

    while (!stack_isEmpty(ps))
    {
        e = stack_pop(ps);
        if (!e)
            return ERROR;
        st = stack_push(sout, e);
    }

    return st;
}

int main(int argc, char *argv[])
{

    Stack *s1, *s2, *s;
    FILE *f;
    float aux;
    float *e1[MAX_SIZE], *e2[MAX_SIZE];
    int n_elems1, n_elems2, i = 0, j = 0, k = 0, h = 0;

    if (!argv[0] || !argv[1] || !argv[2] || argv[3] != NULL)
        return -1;

    /*initialize s1*/
    s1 = stack_init();
    if (!s1)
        return -1;

    f = fopen(argv[1], "r");
    if (!f)
    {
        stack_free(s1);
        return -1;
    }

    fscanf(f, "%d", &n_elems1);

    for (i = 0, k = 0; i < n_elems1; i++)
    {
        fscanf(f, "%f", &aux);

        e1[k] = float_init(aux);
        if (!e1[k])
        {
            stack_free(s1);
            fclose(f);
            for (j = 0; j < k; j++)
            {
                float_free(e1[j]);
            }
            return -1;
        }

        if (!stack_push(s1, e1[k]))
        {
            stack_free(s1);
            fclose(f);
            for (j = 0; j < k; j++)
            {
                float_free(e1[j]);
            }
            return -1;
        }
        k++;
    }
    fclose(f);

    /*print s1*/
    fprintf(stdout, "Ranking 0:\n");
    stack_print(stdout, s1, float_print);

    /*initialize s2*/
    s2 = stack_init();
    if (!s2)
    {
        stack_free(s1);
        return -1;
    }

    f = fopen(argv[2], "r");
    if (!f)
    {
        stack_free(s1);
        stack_free(s2);
        return -1;
    }

    fscanf(f, "%d", &n_elems2);

    for (i = 0, h = 0; i < n_elems2; i++)
    {
        fscanf(f, "%f", &aux);

        e2[h] = float_init(aux);
        if (!e2[h])
        {
            stack_free(s2);
            fclose(f);
            for (j = 0; j < h; j++)
            {
                float_free(e2[j]);
            }
            return -1;
        }

        if (!stack_push(s2, e2[h]))
        {
            stack_free(s2);
            fclose(f);
            for (j = 0; j < h; j++)
            {
                float_free(e2[j]);
            }
            return -1;
        }
        h++;
    }
    fclose(f);

    /*print s2*/
    fprintf(stdout, "Ranking 1:\n");
    stack_print(stdout, s2, float_print);

    /*initialize s*/
    s = stack_init();
    if (!s)
    {
        stack_free(s1);
        stack_free(s2);
    }

    if (!mergeStacks(s1, s2, s))
    {
        stack_free(s);
        stack_free(s1);
        stack_free(s2);
    }

    /*printf s*/
    fprintf(stdout, "Joint Ranking:\n");
    stack_print(stdout, s, float_print);

    /*free allocated memory*/
    for (j = 0; j < k; j++)
    {
        float_free(e1[j]);
    }
    for (j = 0; j < h; j++)
    {
        float_free(e2[j]);
    }
    stack_free(s);
    stack_free(s1);
    stack_free(s2);

    return 0;
}