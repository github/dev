int main()
{
   int a,b,max;
	printf("请从键盘上输入两个整数：");
	scanf("%d,%d",&a,&b);
	max=a;
	if(b>max)
		max=b;
	printf("较大的数为：%d\n",max);
   return 0;
}