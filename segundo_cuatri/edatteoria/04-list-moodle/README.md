# Notas de implementación

(Si usas Visual Code, busca como visualizar markdown: icono de páginas con una lupa a la derecha de las pestañas de documentos)

## list_delete
Si el elemento elem se encuentra en la lista, `compare(elem,pn->info)` retorna 0, donde `pn` es el "nodo actual". Es necesario modificar el nodo *anterior* a `pn` para que su `next` apunte al nodo *siguiente* a `pn`. Hay varias maneras alternativas de hacerlo:

* Podemos usar una variable auxiliar `previous` que guarda el nodo anterior al que estamos considerando (inicialmente NULL). Esto nos permite hacer `previous->next = pn->next` para eliminar el nodo `pn`

* O podemos usar dobles punteros: iteramos sobre las *direcciones* de los punteros a nodos, es decir, usamos un `Node **ppn`. En este caso, el elemento a comparar está en `(*ppn)->info`; la forma de iterar es asignando `ppn = &((*ppn)->next)`; y el reajuste de punteros puede hacerse modificando `*ppn`. El valor de `ppn` es desde donde se apunta al nodo que estamos considerando, es decir, la dirección del `next` del nodo *anterior* (o de `first` inicialmente); cambiando el valor contenido en esta dirección, podemos hacer que apunte, en vez de al nodo actual (`*ppn`), al siguiente nodo (`(*ppn)->next`)

* O podemos, como última alternativa, iterar sobre `pn->next`, como hemos visto en alguna otra función, comprobando el valor de `pn->next->info` 

Recuerda que en el depurador puedes añadir las expresiones que desees en el panel de Watch (Inspección), con los castings necesarios, por ej. `*(int*)elem`, `*(int*)(pn->info)`, `*(int*)((*ppn)->info)`, etc.  

## list_copy

Para copiar una lista, necesitas iterar sobre la lista original y la copia simultáneamente, en paralelo. Para copiar un nodo `pn`, creas un nuevo nodo `node_copy`, que debes asignar como `next` del *último* nodo copiado (inicialmente, el `first` de la nueva lista); y le asignas el elemento a su campo `info`. Esto significa que debes tener una variable que te apunte al último nodo copiado, a actualizar en cada iteración.

Notas:
* la lista y los nodos son nuevos, los elementos son los mismos (y en el mismo orden). Es decir, se copian simplemente los punteros `info` con una asignación, pero no se reserva nueva memoria para los `info`.

* ambas listas no comparten ninguna estructura, es decir, si se cambia a posteriori una de ellas (por ejemplo, se añaden o quitan elementos), ese cambio no afecta a la otra.

* una implementación alternativa sería ir recorriendo la lista original y copiar cada nodo en un nuevo nodo que se inserta con `list_pushBack` en la nueva lista. Esta implementación **no** es aceptable, puesto que tiene un coste cuadrático, en vez del coste lineal de la implementación descrita. 

## Ejemplo de salida del programa proporcionado

```
TESTING LIST DELETION

4 0 11 6 7 2 
Deleting 2, list now: 4 0 11 6 7 
Deleting 6, list now: 4 0 11 7 
Deleting 11, list now: 4 0 7 
Deleting 0, list now: 4 7 
Deleting 4, list now: 7 
Deleting 7, list now: 
a b c d e 
Deleting b, list now: a c d e 
Deleting d, list now: a c e 
Deleting a, list now: c e 
Deleting c, list now: e 
Deleting e, list now: 
the sky is blue 
Deleting blue, list now: the sky is 
Deleting the, list now: sky is 
Deleting sky, list now: is 
Deleting is, list now: 

TESTING LIST COPY

Original list: 12 10 8 6 4 2 
Copied list: 12 10 8 6 4 2 
VERIFICATION OF COPIES OK
Deleting 6 from original list
Original list: 12 10 8 4 2 
Copied list: 12 10 8 6 4 2 
Deleting 4 from copied list
Original list: 12 10 8 4 2 
Copied list: 12 10 8 6 2 
Original list: a b c d e 
Copied list: a b c d e 
VERIFICATION OF COPIES OK
Deleting b from original list
Original list: a c d e 
Copied list: a b c d e 
Deleting d from copied list
Original list: a c d e 
Copied list: a b c e 
Original list: the snow is white 
Copied list: the snow is white 
VERIFICATION OF COPIES OK
Deleting white from original list
Original list: the snow is 
Copied list: the snow is white 
Deleting snow from copied list
Original list: the snow is 
Copied list: the is white 

```
