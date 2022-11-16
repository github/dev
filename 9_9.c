#include<stdio.h>
int main(){
 int x,y,z;
 	printf("\n");
	for(x=1;x<10;x++)
    {
        for(y=1;y<10;y++)
        {
            z=x*y;
            printf("%d*%d=%d\t",x,y,z);
        }
	printf("\n");
    }
}