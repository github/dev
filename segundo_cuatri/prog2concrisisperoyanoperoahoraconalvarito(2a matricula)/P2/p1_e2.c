/*
Inicializar un Graph.
Insertar un vértice con tag Madrid, id 111 y state WHITE, y verificar si la inserción se realizó
correctamente.
Insertar un vértice con tag Toledo, id 222 y state WHITE, y verificar si la inserción se realizó
correctamente.
Insertar una arista desde el vértice con id 222 hasta el vértice con id 111.
Comprobar si el vértice con id 111 está conectado con el vértice con id 222 (ver salida esperada más
abajo).
Comprobar si el vértice con id 222 está conectado con el vértice con id 111 (ver salida esperada más
abajo).
Obtener e imprimir el número de conexiones desde el vértice con id 111.
Obtener e imprimir el número de conexiones desde el vértice con tag Toledo.
Obtener e imprimir la lista de conexiones del vértice con tag Toledo.
Imprimir el grafo.
Liberar todos los recursos y salir.
*/

#include <stdio.h>
#include "vertex.h"
#include "graph.h"

int main()
{
    Graph *g;
    Vertex *v1, *v2;
    long *array = NULL;
    int i;

    char *str1 = "id:111 tag:Madrid state:0";
    char *str2 = "id:222 tag:Toledo state:0";

    g = graph_init();
    if (!g)
    {
        return -1;
    }

    if ((v1 = vertex_initFromString(str1)) == NULL)
    {
        return -1;
    }
    if ((v2 = vertex_initFromString(str2)) == NULL)
    {
        vertex_free(v1);
        return -1;
    }

    printf("Inserting %s... result...: %d\n", vertex_getTag(v1), graph_newVertex(g, str1));

    printf("Inserting %s... result...: %d\n", vertex_getTag(v2), graph_newVertex(g, str2));

    if (graph_newEdge(g, vertex_getId(v2), vertex_getId(v1)) == ERROR)
    {
        return ERROR;
    }

    if (graph_connectionExists(g, vertex_getId(v1), vertex_getId(v2)) == TRUE)
    {
        printf("%ld --> %ld? Yes\n", vertex_getId(v1), vertex_getId(v2));
    }
    else
    {
        printf("%ld --> %ld? No\n", vertex_getId(v1), vertex_getId(v2));
    }

    if (graph_connectionExists(g, vertex_getId(v2), vertex_getId(v1)) == TRUE)
    {
        printf("%ld --> %ld? Yes\n", vertex_getId(v2), vertex_getId(v1));
    }
    else
    {
        printf("%ld --> %ld? No\n", vertex_getId(v2), vertex_getId(v1));
    }
    printf("Number of connections from %ld: %d\n", vertex_getId(v1), graph_getNumberOfConnectionsFromId(g, vertex_getId(v1)));
    printf("Number of connections from %s: %d\n", vertex_getTag(v2), graph_getNumberOfConnectionsFromId(g, vertex_getId(v2)));
    array = graph_getConnectionsFromId(g, vertex_getId(v2));

    printf("Connections from %s: ", vertex_getTag(v2));

        for (i = 0; i < graph_getNumberOfConnectionsFromId(g, vertex_getId(v2)); i++)
    {
        printf("%ld\n", array[i]);
    }
    
    graph_print(stdout, g);
    graph_free(g);
    vertex_free(v1);
    vertex_free(v2);
    free(array);
    
    
    return 0;
}