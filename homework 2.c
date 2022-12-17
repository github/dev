#include<stdio.h>
int main()
{
    int a=2,b=2,c;
    c=(a+=b*=a);/*a+=b意思是左右两值计算赋值给左值，其他计算式等效*/
    printf("%d,%d,%d\n",a,b,c);
    return 0;
}