#include<stdio.h>
int main()
{
    int i;
    printf("请输入一个正整数：");
    scanf("%d",&i);
    if(i%2==0)
        printf("%d是偶数。\n",i);
    else
        printf("%d是奇数.\n",i);
    return 0;
}