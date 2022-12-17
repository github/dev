#include <stdio.h>
int main()
{
    int a, b, c, d,sum;
    printf("请输入一个三位数\n");
    scanf("%d", &d);
    a = d / 100;
    b = (d / 10) % 10;
    c = d % 10;
    printf("该三位数百位为%d,十位为%d,个位为%d\n", a, b, c);
    sum  = a + b + c;
    printf("位数的相加的和为：%d\n",sum);
    return 0;
}
