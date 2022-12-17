#include<stdio.h>
int main(){
    char ch1,ch2,ch3;
    ch1=getchar();//getchar()要输入值，与python的input功能相似
    ch2=getchar();
    ch3=getchar();
    putchar(ch1);
    putchar('\n');
    putchar(ch2);
    putchar('\n');
    putchar(ch3);
    putchar('\n');
    return 0;
}