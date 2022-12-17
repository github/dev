#include<stdio.h>
int main(){
    int n=0,sum=0;
    do{
        n++;
        sum+=n;
    }
    while(sum<500);
    printf("n=%d,sum=%d\n",n-1,sum-n);
    return 0;
}