#include<stdio.h>
int main(){
    int data1,data2;
    char op;/*输入的符号*/
    printf("请输入一个表达式:");
    scanf("%d%c%d",&data1,&op,&data2);
    switch(op)
    {
        case'+':printf("%d + %d =%d\n",data1,data2,data1+data2);
            break;
        case'-':printf("%d-%d=%d\n",data1,data2,data1-data2);
            break;
        case'*':printf("%d*%d=%d",data1,data2,data1*data2);
            break;
        case'/':if(data2==0)
            printf("分母不能为0!请重新输入");
            else
            printf("%d/%d=%d",data1,data2,data1/data2);
            break;
        default:printf("本程序中不能参与此运算\n");
    }
    return 0;
}