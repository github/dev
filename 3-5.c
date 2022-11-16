#include<stdio.h>
int main(){
    float i;
    printf("请输入购买重量：");
    scanf("%f",&i);
    if(i<=10)
        printf("付款金额为：%.2f元\n",i*12);
    else
        printf("付款金额为：%.2f元\n",i*9);
    return 0;
}