#include <stdio.h>
int main()
{
    int x, max, i;
    scanf("%d", &max);
    i = 0;
    while (i < 10)
    {
        scanf("%d", &x);
        if (x < max)
            max = x;
        i++;
    }
    printf("max=%d\n", max);
    return 0;
}