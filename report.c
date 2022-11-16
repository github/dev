#include<stdio.h>
void main()
{
    char ch;    
    printf("请输入一个小写英文字母：");
    ch = getchar();
    if(ch>='a'&& ch <='z')
{
    ch = ch - 32;
    printf("%c\n",ch);
}
    else
{
    printf("这不是一个小写英文字母");
}
}


