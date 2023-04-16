#include <stdio.h>
#include <errno.h>
int main()
{
    FILE * f;
    f = fopen("texto.txt", "r");
    printf("%d", errno);
    perror("fopen");

    return 0;
}
