#include <stdio.h>

int main()
{
    int x;
    printf("请输入要到达的层数：");
    scanf("%d", &x);
    if (x < 1 || x > 50)
        printf("输入了一个错误的楼层。\n");
    if (x >= 1 && x <= 10)
        printf("楼层较少，请走楼梯。\n");
    if (x > 10 && x <= 50)
        switch (x)
        {
        case 13:
        case 17:
        case 21:
        case 39:
        case 47:
        case 49:
        case 50:
            printf("电梯可到达，请走电梯。\n");
            break;
        default:
            printf("本电梯到不了该层请走楼梯。\n");
        }
    return 0;
}