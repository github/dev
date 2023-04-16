#include "list.h"
#include "file_utils.h"
#include <stdio.h>
#include <stdlib.h>



int main(int argc, char *argv[])
{
    if (argc != 3)
    {
        fprintf(stderr, "Error en la linea de comandos: se debe indicar el orden de insercion\n");
        return 1;
    }
    
    int order = atoi(argv[2]);
    if (order != 1 && order != -1)
    {
        fprintf(stderr, "Error en la linea de comandos: el orden de insercion debe ser 1 o -1\n");
        return 1;
    }
    List *l = list_new();
    List *aux1 = list_new();
    List *sorted_list = list_new();
    FILE *fp = fopen(argv[1], "r");
    int i = 0, j;
    fscanf(fp, "%d", &j);
    float note[j], aux[j];
    while(fscanf(fp, "%f", &note[i]) != EOF)
    {
        if (i % 2 == 0)
        {
            list_pushBack(l, &note[i]);
            list_pushBack(aux1, &note[i]);
        }
        else
        {
            list_pushFront(l, &note[i]);
            list_pushFront(aux1, &note[i]);
        }
        i++;
    }

    
    fclose(fp);
    printf("SIZE: %d\n", j);
    list_print(stdout, l, float_print);
    printf("\nFinished inserting. Now we extract from the beginning and insert in order: \n");

    
    for(i = 0; i < j/2; i++){
        aux[i] = *(float *)list_popFront(l);
        printf("%f  ", aux[i]);
        list_pushInOrder(sorted_list, &aux[i], float_cmp, order);
    }
    printf("\nNow we extract from the end and insert in order: \n");
    for(i = j-1; i >= j/2; i--){
        aux[i] = *(float *)list_popBack(aux1);
        printf("%f  ", aux[i]);
        list_pushInOrder(sorted_list, &aux[i], float_cmp, order);
    }
    printf("\nSIZE: %d\n", j);
    list_print(stdout, sorted_list, float_print);
    printf("\n");
    

    list_free(l);
    list_free(sorted_list);
    list_free(aux1);

    return 0;
}