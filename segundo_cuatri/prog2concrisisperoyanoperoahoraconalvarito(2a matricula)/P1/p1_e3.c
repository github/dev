#include <stdio.h>
#include "vertex.h"
#include "graph.h"


int main(int argc, char *argv[])
{
    FILE* f;
    Graph *g;

    if(argc != 2){
        printf("No ha introducido ningun fichero.\n");
        return 0;
    }

    g = graph_init();

    f = fopen(argv[1], "r");
    if(!f){
        return -1;
    }

    graph_readFromFile(f, g);

    fclose(f);
    graph_print(stdout, g);
    graph_free(g);
    return 0;
}
