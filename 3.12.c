#include<stdio.h>
int main(){
    /*
    int year;
    float money,r,s;
    printf("请输入本金和存款年限:");
    scanf("%f%d",&money,&year);
    if(year==1)r=0.005;
        else if(year==2)r=0.006;
        else if(year>=3&&year<5)r=0.0065;
        else if(year>=5&&year<8)r=0.008;
        else if(year>=8)r=0.01;
        else r=0;
    s=money+money*r*12*year;
    printf("s=%.2f\n",s);
    return 0;
    */

    int year;
    float money,r,s;
    printf("请输入本金和存款年限:");
    scanf("%f%d",&money,&year);
        switch(year)
        {
            case 0: r=0;break;
            case 1: r=0.005;break;
            case 2: r=0.006;break;
            case 3:
            case 4: r=0.0065;break;
            case 5:
            case 6:
            case 7:r=0.005008;break;
            default: r=0.01;
        }
        s=money+money*12*year*r;
        printf("s=%.2f\n",s);
        return 0;

}