#include<stdio.h>
int main(){
    int day,month,year,loop,sum;
    printf("Please input the year, the month, the day:");
    scanf("%d%d%d",&year,&month,&day);
    switch(month)
    {
        case 1:sum=0;break;
        case 2:sum=31;break;
        case 3:sum=59;break;
        case 4:sum=90;break;
        case 5:sum=120;break;
        case 6:sum=151;break;
        case 7:sum=181;break;
        case 8:sum=212;break;
        case 9:sum=243;break;
        case 10:sum=273;break;
        case 11:sum=304;break;
        case 12:sum=334;break;/*判断选取第一月到第十二月的条件*/
        default:printf("data error");
    }
    sum = sum + day;
    if (year%400==0||(year%4==0&&year%100!=0))
    {
        loop = 1;//一眼丁真鉴定为真
    }
        else
    {
        loop = 0;
    }
    if(loop==1&&month>2)
    {
        sum++;//闰年数天数加一
    }
    printf("It is the %dth day of %d.",sum,year);
    printf("\n");
}