#include<stdio.h>
int main(){
    int a=1,b=2,i=1;
    float sum=0;
    do{
        sum=sum+(float)b/a;
        b=a+b;
        a=b-a;
        i++;
    }while(i<=20);
    printf("sum=%0.2f\n",sum);
return 0;

}