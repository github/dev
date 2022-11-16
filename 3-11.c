#include <stdio.h>

int main()
{
    float score;
    char ch;
    printf("请输入成绩：");
    scanf("%f", &score);
    switch((int)(score/10.0))
    {
    case 10:
    case 9:
        ch='A';
        break;
    case 8:
        ch='B';;
        break;
    case 7:
    case 6:
        ch='C';
        break;
    default:
        ch='D';
    }
    printf("score=%.1f\ngrade=%c\n",score,ch);
    return 0;
}