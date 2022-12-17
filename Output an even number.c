#include <stdio.h>

int main()
{
    int i;

    for (i = 1; i <= 600; i++)
    {
        if (i % 2 == 0)
            printf(" %2d", i);
    }
    return 0;
}