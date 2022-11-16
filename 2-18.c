#include<stdio.h>
int main(){
    int a,b,c;
    float average;
    printf("请随机输入三个整数：\n");
    scanf("%d%d%d",&a,&b,&c);
    printf("a=%d,b=%d,c=%d\n",a,b,c);
    average=(a+b+c)/3;
    printf("average=%.2f\n",average);
    return 0;
}