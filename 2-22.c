#include<stdio.h>
int main()
{
    int x, y, z;
    x = y = 5;
    printf("x=%d\n", x);
    x = 15 - (y = 10);
    printf("x=%d\n", x);
    x = 15 - (y = 10) / (z = 5);
    printf("x=%d\n", x);
    return 0;
}