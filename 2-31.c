#include<stdio.h>
int main(){
    int n;
    printf("请输入一个整数n:");
    scanf("%d",&n);
    printf("整数%d是一个:%s\n",n,(n%2==0?"偶数":"奇数"));
    return 0;


}