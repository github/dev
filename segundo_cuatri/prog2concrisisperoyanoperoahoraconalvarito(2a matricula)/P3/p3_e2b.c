#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "stack.h"
#include "graph.h"
#include "vertex.h"
#include "types.h"

int main(int argc, char *argv[])
{
    if (argc != 4)
    {
        printf("Usage: %s <file> <origin> <destination>\n", argv[0]);
        return 1;
    }
    Status st;
    int ini, fin;
    ini = atoi(argv[2]);
    fin = atoi(argv[3]);
    FILE *f = fopen(argv[1], "r");
    if (!f)
    {
        printf("Error opening file %s\n", argv[1]);
        return 1;
    }
    Graph *g = graph_init();
    if (!g)
    {
        printf("Error creating graph\n");
        return 1;
    }
    if (graph_readFromFile(f, g) == ERROR)
    {
        printf("Error reading graph\n");
        return 1;
    }

    fclose(f);
    graph_print(stdout, g);
    Vertex *v1 = getvertexbyID(g, ini);
    Vertex *v2 = getvertexbyID(g, fin);
    printf("\n--------DFS------------\n");
    st = graph_depthSearch(g, v1, v2);
    if (st == ERROR)
    {
        printf("Error searching path\n");
    }
    printf("\n--------BFS------------\n");
    st = graph_breathSearch(g, ini, fin);
    if (st == ERROR)
    {
        printf("Error searching path\n");
    }
    graph_free(g);
    return 0;
}