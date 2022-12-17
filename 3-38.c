#include<stdio.h>
int main(){
	int ,g,m,x;
    for(g=0;g<20;g++){
        for(m=0;m<33;m++){
            x=100-g-m;
            if(5*g+3*m/3==100)
            printf("公鸡:%d,母鸡:%d,小鸡:%d\n",g,m,x)
        }
    }
}