/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-11-11 10:20:21
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-11-11 10:24:05
 * @FilePath: \C\3-14.c
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#
 */
#include<stdio.h>
int main(){
    int i = 1 ,sum = 0;
    while(i<=100){
        sum += i;
        i++;
    }
    printf("sum = %d",sum);
    return 0;
    }