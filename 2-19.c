#include<stdio.h>
#include<math.h>
int main(){
    float a,b,c,s,area;
    printf("请输入三边：");
    scanf("%f,%f,%f",&a,&b,&c);
    s=(a+b+c)/2;
    area=sqrt((s-a)*(s-b)*(s-c)*s);
    printf("area=%.2f\n",area);
    return 0;
}