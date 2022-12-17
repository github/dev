#include<stdio.h>
int main(){
    int n,i=1,s=1;
    printf("请输入n的值:");
    scanf("%d",&n);
    do{
        s=s*i;
        i++;
    }
    while(i<=n);
    printf("s=%d\n",s);
}