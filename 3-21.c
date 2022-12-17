#include<stdio.h>
int main(){
	int m,n,r;
    printf("请输入两个正整数：");
	scanf("%d,%d",&m,&n);
	do
    {
        r=m%n;
        m=n;
        n=r;
    }while(n!=0);
    printf("以上两数的最大公因子：%d\n",m);
    

}