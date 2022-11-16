#include <stdio.h>
int main()
{
    float score;
    printf("请输入学生成绩："); 
    scanf("%f", &score);
    if (score >= 90 && score <= 100)
        printf("成绩为：优！\n");
    else if (score >= 80 && score <= 89)
        printf("成绩为：良！\n");
    else if (score >= 70 && score <= 79)
        printf("成绩为：中！\n");
    else if (score >= 60 && score <= 69)
        printf("成绩为：及格！\n");
    else if (score >= 0 && score <= 59)
        printf("成绩为：不及格!\n");
    else
        printf("输入错误信息\n");
    return 0;
}