#include "vertex.h"
#include "graph.h"
#include "stack.h"
#include "file_utils.h"
#include <stdio.h>
#include <stdlib.h>


Status graph_depthSearch(Graph *g, Vertex *vi, Vertex *vf);

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

Status graph_depthSearch(Graph *g, Vertex *vi, Vertex *vf)
{
    if (g == NULL || vi == NULL || vf == NULL)
    {
        return ERROR;
    }
    Status st = OK;
    long *conections;
    Vertex *v = NULL;
    Vertex *v0 = NULL;
    Vertex *vaux = NULL;

    Stack *s;

    for(int i = 0; i < graph_getNumberOfVertices(g); i++)
    {
        vaux = getvertexbyind(g, i);
        Vertexsetlabel(vaux, WHITE);
    }
    s = stack_init();

    stack_push(s, vi);
    if(s == NULL)
    {
        return ERROR;
    }

    while (stack_isEmpty(s) == FALSE && st == OK)
    {
        v0 = stack_pop(s);
        if(v0 == NULL)
        {
            st = ERROR;
        }
        vertex_print(stdout, v0);
        printf("\n");

        if (vertex_cmp(v0, vf) == 0)
        {
            st = ERROR;
        }
        else
        {
            if (Vertexgetlabel(v0) == WHITE)
            {
                Vertexsetlabel(v0, BLACK);
                conections = graph_getConnectionsFromId(g, vertex_getId(v0));
                if(conections == NULL)
                {
                    st = ERROR;
                }
                for (int i = 0; i < graph_getNumberOfConnectionsFromId(g, vertex_getId(v0)); i++)
                {
                    v = getvertexbyID(g, conections[i]);
                    if(v == NULL)
                    {
                        st = ERROR;
                    }
                    if (Vertexgetlabel(v) == WHITE)
                    {
                        stack_push(s, v);
                        if(s == NULL)
                        {
                            st = ERROR;
                        }
                    }
                }
                free(conections);
            }
        }
    }
    stack_free(s);
    return st;
}