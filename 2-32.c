#include<stdio.h>
void main(){
    char ch;
    ch=getchar();
    ch=(ch>='A'&&ch<='Z')?ch+32:ch;
    putchar(ch);
    putchar('\n');

}