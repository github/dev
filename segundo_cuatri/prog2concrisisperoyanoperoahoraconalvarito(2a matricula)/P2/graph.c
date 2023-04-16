#include "graph.h"
#include <string.h>

#define MAX_VTX 4096
#define BUFFERLEN 999

struct _Graph
{
    Vertex *vertices[MAX_VTX];
    Bool connections[MAX_VTX][MAX_VTX];
    int num_vertices;
    int num_edges;
};

int get_ind_byID(const Graph *g, int ID)
{
    if (!g || ID < 0)
    {
        return -1;
    }
    int i;

    for (i = 0; i < g->num_vertices; i++)
    {
        if (vertex_getId(g->vertices[i]) == ID)
        {
            return i;
        }
    }
    return -1;
}

int get_ind_bytag(const Graph *g, char *tag)
{
    if (!g || !tag)
    {
        return -1;
    }
    int i;

    for (i = 0; i < g->num_vertices; i++)
    {
        if (strcmp(vertex_getTag(g->vertices[i]), tag) == 0)
        {
            return i;
        }
    }
    return -1;
}

void *getvertexbyID(const Graph *g, long ID)
{
    if (!g || ID < 0)
    {
        return NULL;
    }
    int i;
    for (i = 0; i < g->num_vertices; i++)
    {
        if (vertex_getId(g->vertices[i]) == ID)
        {
            return g->vertices[i];
        }
    }
    return NULL;
}
void *getvertexbyind(const Graph *g, int ind)
{
    if (!g || ind < 0)
    {
        return NULL;
    }
    return g->vertices[ind];
}

Graph *graph_init()
{
    Graph *g;
    int i, j;
    g = (Graph *)malloc(sizeof(Graph));
    if (!g)
    {
        return NULL;
    }
    for (i = 0; i < MAX_VTX; i++)
    {
        g->vertices[i] = NULL;
    }

    for (i = 0; i < MAX_VTX; i++)
    {
        for (j = 0; j < MAX_VTX; j++)
        {
            g->connections[i][j] = FALSE;
        }
    }
    g->num_edges = 0;
    g->num_vertices = 0;

    return g;
}

void graph_free(Graph *g)
{
    int i;

    for (i = 0; i < g->num_vertices; i++)
    {
        vertex_free(g->vertices[i]);
    }
    free(g);
}

Status graph_newVertex(Graph *g, char *desc)
{
    if (!g || !desc)
    {
        return ERROR;
    }

    Vertex *v;
    int i;
    v = vertex_initFromString(desc);
    if (!v)
    {
        return ERROR;
    }
    for (i = 0; i < MAX_VTX; i++)
    {
        if (vertex_getId(g->vertices[i]) == vertex_getId(v))
        {
            vertex_free(v);
            return ERROR;
        }
    }
    vertex_setindex(v, g->num_vertices);
    g->vertices[g->num_vertices] = vertex_copy(v);
    g->num_vertices++;
    
    vertex_free(v);
    return OK;
}

Status graph_newEdge(Graph *g, long orig, long dest)
{
    if (!g || graph_contains(g, orig) == FALSE || graph_contains(g, dest) == FALSE || orig < 0 || dest < 0)
    {
        return OK;
    }
    int indice_orig, indice_dest;

    indice_orig = get_ind_byID(g, orig);
    indice_dest = get_ind_byID(g, dest);

    g->connections[indice_orig][indice_dest] = TRUE;
    g->num_edges++;
    return OK;
}

Bool graph_contains(const Graph *g, long id)
{
    if (!g || id < 0)
    {
        return FALSE;
    }
    int i;

    for (i = 0; i < g->num_vertices; i++)
    {
        if (vertex_getId(g->vertices[i]) == id)
        {
            return TRUE;
        }
    }
    return FALSE;
}

int graph_getNumberOfVertices(const Graph *g)
{
    if (!g)
    {
        return -1;
    }
    return g->num_vertices;
}

int graph_getNumberOfEdges(const Graph *g)
{
    if (!g)
    {
        return -1;
    }
    return g->num_edges;
}

Bool graph_connectionExists(const Graph *g, long orig, long dest)
{
    if (!g || orig < 0 || dest < 0)
    {
        return FALSE;
    }
    int indice_orig, indice_dest;

    indice_orig = get_ind_byID(g, orig);
    indice_dest = get_ind_byID(g, dest);

    return g->connections[indice_orig][indice_dest];
}

int graph_getNumberOfConnectionsFromId(const Graph *g, long id)
{
    if (!g || id < 0)
    {
        return -1;
    }
    int count = 0, j;
    int i = get_ind_byID(g, id);
    for (j = 0; j < g->num_vertices; j++)
    {
        if (g->connections[i][j] == TRUE)
        {
            count++;
        }
    }

    return count;
}

long *graph_getConnectionsFromId(const Graph *g, long id)
{
    if (!g || id < 0)
    {
        return NULL;
    }
    int i, j, ind = 0;
    long *array = (long *)malloc(graph_getNumberOfConnectionsFromId(g, id) * sizeof(long));

    if (!array)
    {
        return NULL;
    }

    j = get_ind_byID(g, id);

    for (i = 0; i < g->num_vertices; i++)
    {
        if (g->connections[j][i] == TRUE)
        {
            array[ind] = vertex_getId(g->vertices[i]);
            ind++;
        }
    }

    return array;
}

int graph_getNumberOfConnectionsFromTag(const Graph *g, char *tag)
{
    if (!g || !tag)
    {
        return -1;
    }
    int count = 0, j;
    int i = get_ind_bytag(g, tag);
    for (j = 0; j < MAX_VTX; j++)
    {
        if (g->connections[i][j] == TRUE)
        {
            count++;
        }
    }

    return count;
}

long *graph_getConnectionsFromTag(const Graph *g, char *tag)
{
    if (!g || !tag)
    {
        return NULL;
    }
    int i, j, ind = 0;
    long *array = (long *)malloc(graph_getNumberOfConnectionsFromTag(g, tag) * sizeof(long));

    if (!array)
    {
        return NULL;
    }

    j = get_ind_bytag(g, tag);

    for (i = 0; i < MAX_VTX; i++)
    {
        if (g->connections[j][i] == TRUE)
        {
            array[ind] = vertex_getId(g->vertices[i]);
            ind++;
        }
    }

    return array;
}

int graph_print(FILE *pf, const Graph *g)
{
    if (!pf || !g)
    {
        return -1;
    }
    int i, j, numConections, count = 0;
    long *array = NULL;

    for (i = 0; i < g->num_vertices; i++)
    {
        count += vertex_print(pf, g->vertices[i]);

        array = graph_getConnectionsFromId(g, vertex_getId(g->vertices[i]));

        numConections = graph_getNumberOfConnectionsFromId(g, vertex_getId(g->vertices[i]));
        for (j = 0; j < numConections; j++)
        {
            count += vertex_print(pf, getvertexbyID(g, array[j]));
        }
        printf("\n");
        free(array);
    }

    return count;
}

Status graph_readFromFile(FILE *fin, Graph *g)
{

    int i, numelem, orig, dest;
    char string[BUFFERLEN];
    
    fscanf(fin, "%d\n", &numelem);

    for (i = 0; i < numelem; i++)
    {
        fgets(string, BUFFERLEN, fin);
        if (graph_newVertex(g, string) == ERROR)
        {
            return ERROR;
        }
    }
    while(!feof(fin))
    {
        fscanf(fin, "%d %d\n", &orig, &dest);
        if (graph_newEdge(g, orig, dest) == ERROR)
        {
            return ERROR;
        }
    }
    return OK;
}