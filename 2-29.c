#include<stdio.h>
int main(){
    int x,y,z;
    x=5;y=10;z=15;
    printf("%d\n",!(x-5));
    printf("%d\n",!x&&x<y&&y<z&&x>z%y);

    return 0;
}