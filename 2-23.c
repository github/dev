#include<stdio.h>
int main(){
    int x,y;
    x=5,y=10;
    printf("x=%d\n",x+=5);
    x=5,y=10;
    printf("x=%d\n",x*=y/y-x);

    x=5;y=10;
    printf("x=%d\n",x+=x-=y%3);
/*  int x=5,y=10
    printf("%d,%d,%d\n",x+=5,x*=y/y-x,x+=x-=y%3);   另一种方法 */
    return 0;
}