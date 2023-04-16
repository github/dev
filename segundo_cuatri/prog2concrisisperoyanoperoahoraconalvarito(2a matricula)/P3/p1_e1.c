#include <stdio.h>
#include "vertex.h"

int main()
{
    /*
        Crear e inicializar dos vértices.
        El primero tendrá id 10, tag one y estado WHITE.
        El segundo tendrá id 20, tag two y estado BLACK.
        Imprimir ambos vértices y después un salto de línea.
        Comparar ambos vértices y mostrar un mensaje que diga el resultado.
        Imprimir el tag del segundo vértice.
        Copiar el primer vértice en un tercero.
        Imprimir el id del tercer vértice.
        Imprimir el primer y el tercer vértice y después un salto de línea.

        Comparar el primer y tercer vértices y mostrar un mensaje que diga el resultado.
        Liberar memoria
    */
    Vertex *v1, *v2, *v3;
    char *str1 = "id:10 tag:one state:0";
    char *str2 = "id:20 tag:two state:1";

    if ((v1 = vertex_initFromString(str1)) == NULL)
    {
        return -1;
    }
    if ((v2 = vertex_initFromString(str2)) == NULL)
    {
        vertex_free(v1);
        return -1;
    }
    vertex_print(stdout, v1);
    vertex_print(stdout, v2);
    fprintf(stdout, "\n");

    if (vertex_cmp(v1, v2) == 0)
    {
        fprintf(stdout, "Equals? Yes\n");
    }
    else
        fprintf(stdout, "Equals? No\n");

    fprintf(stdout, "Vertex 2 tag: %s\n",vertex_getTag(v2));

    
    v3 = vertex_copy(v1);

    fprintf(stdout, "Vertex 3 id: %ld\n",vertex_getId(v3));

    vertex_print(stdout, v1);
    vertex_print(stdout, v3);
    fprintf(stdout, "\n");

    if (vertex_cmp(v1, v3) == 0)
    {
        fprintf(stdout, "Equals? Yes\n");
    }
    else
        fprintf(stdout, "Equals? No\n");

    vertex_free(v1);
    vertex_free(v2);
    vertex_free(v3);

    return 0;
}
