#include<stdio.h>
int main(){
    float c,f;
    printf("请输入摄氏温度c:");
    scanf("%f",&c);
    f=9*c/5+32;
    printf("%f\n",f);
    return 0;
}