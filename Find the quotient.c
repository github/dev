#include <stdio.h>
int main()
{
    int m, n, r, t;
    scanf("%d,%d", &m, &n);
    if (m > n)
    {
        t = m;
        m = n;
        n = t;
    }
    r = m % n;
    while (r != 0)
    {
        m = n;
        n = r;
        r = m % n;
    }
    printf("%d", n);
    return 0;
}