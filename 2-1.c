#include<stdio.h>
int main()
{
    printf("char    %d字节\n", sizeof(char)); /*%d表示整型输出，sizeof操作符以字节形式给出了其操作数的存储大小*/
    printf("int:    %d字节\n", sizeof(int));
    printf("short:    %d字节\n", sizeof(short));
    printf("long:    %d字节\n", sizeof(long));
    printf("float:    %d字节\n", sizeof(float));
    printf("double:    %d字节\n", sizeof(double));
    return 0;
}