#include<stdio.h>
#define PI 3.14
int main(){
    float r,area;
    printf("请输入圆的半径：");
    scanf("%f",&r);/*&连接符 %f浮点数输出*/
    area=PI*r*r;
    printf("area=%f\n",area);
}