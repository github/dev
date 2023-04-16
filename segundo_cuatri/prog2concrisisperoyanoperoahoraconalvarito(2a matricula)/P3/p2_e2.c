#include "vertex.h"
#include "graph.h"
#include "stack.h"
#include "file_utils.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[])
{
    if (argc != 4)
    {
        fprintf(stderr, "Usage: %s <file>\n", argv[0]);
        return EXIT_FAILURE;
    }
    Vertex *v1 = NULL;
    Vertex *v2 = NULL;
    Graph *g = graph_init();

    FILE *f;
    f = fopen(argv[1], "r");
    if (!f)
    {
        printf("Error opening file");
        return -1;
    }
    if(graph_readFromFile(f, g) == ERROR)
    {
        printf("Error reading file");
        return -1;
    }
    fclose(f);
    graph_print(stdout, g);
    if(graph_getNumberOfVertices(g) == 0)
    {
        printf("Error, no vertices");
        return -1;
    }
    printf("From Vertex id: %ld\n", atol(argv[2]));
    printf("To Vertex id: %ld\n", atol(argv[3]));
    v1 = getvertexbyID(g, atol(argv[2]));
    if(v1 == NULL)
    {
        printf("Error getting vertex");
        return -1;
    }
    

    v2 = getvertexbyID(g, atol(argv[3]));

    graph_depthSearch(g, v1, v2);
    
    graph_free(g);
    

    return 0;
}
