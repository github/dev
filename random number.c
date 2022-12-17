#include<stdio.h>
int main(){
    int a,b,c,d;
        printf("\n");
        for(a=1;a<5;a++){
            for(b=1;b<5;b++){
                for(c=1;c<5;c++){
                    if(a!=b&&a!=c&&a!=d&&b!=c&&b!=d&&c!=d){
                        printf("%d%d%d\n",a,b,c);
                }
            }
        }
    }
}