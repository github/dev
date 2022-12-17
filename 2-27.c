#include<stdio.h>
int main(){
    int a,b,c;
    a=3;
    b=4;
    c=5;
    printf("%d\n",a>b);
    printf("%d\n",(a>b)!=c);
    printf("%d\n",a<b<c);
    printf("%d\n",(a<b)+c);
    return 0;
}