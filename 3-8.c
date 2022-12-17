#include <stdio.h>
int main()
{
    int x, y;
    printf("请输入x的值:");
    scanf("%d", &x);
    if (x < 0)
        y = -1;
    else if (x == 0)
        y = 0;
    else
        y = 1;
    printf("y=%d\n", y);
    return 0;
}