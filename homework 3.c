#include<stdio.h>
int main(){
    int a=1,b=1,c;
    c=a++-1;
    printf("%d,%d\n",a,c);
    c+=-a+++(++b||++c);
    printf("%d,%d\n",a,c);
    return 0;
}