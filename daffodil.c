/*#include <stdio.h>
int main()
{
    int x, a, b, c;
    printf("请输入一个三位数整数：");
    scanf("%d", &x);
    a = x / 100;
    b = x / 10 % 10;
    c = x % 10;
    if (x == a * a + b * b + c * c)
        printf("%d是一个水仙花数\n", x);
    else
        printf("%d不是一个水仙花数\n", x);
    return 0;
}*/

#include <stdio.h>
int main()
{
    int m=100,a,b,c;
    while(m<1000){
        a=m/100;
        b=m/10%10;
        c=m%10;
        if(m==a*a*a+b*b*b+c*c*c)
            printf("%d\n",m);
        m++;
    }
}
