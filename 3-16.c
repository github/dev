#include<stdio.h>
int main(){
    int n,i=1,s=1;
    printf("请输入一个整数n:");
    scanf("%d",&n);
    while(i<=n){
        s=s*i;
        i++;
    }
printf("s=%d\n",s);
}