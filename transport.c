#include <stdio.h>
int main()
{
    int s, w, g;
    float p, t;
    printf("请输入运输距离(km):");
    scanf("%d", &s);
    printf("请输入运输重量（吨）:");
    scanf("%d", &w);
    g = s / 500;
    switch (g)
    {
    case 0:
        p = 5;
        break;
    case 1:
        p = 5 * 0.98;
        break;
    case 2:
        p = 5 * 0.95;
        break;
    case 3:
        p = 5 * 0.95;
        break;
    case 4:
        p = 5 * 0.92;
        break;
    case 5:
        p = 5 * 0.92;
        break;
    default:
        p = 5 * 0.9;
        break;
    }
    t = p * w * s;
    printf("单价是:%.2f(元/吨.公里），总额是:%.2f(元）\n", p, t);
    return 0;
}