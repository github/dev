#include<stdio.h>
int main(){
	int x,y,z,t;
    printf("请输入三个数字:\n");
    scanf("%d%d%d",&x,&y,&z);
    if(x>y){
	t=x;
    x=y;//x,y交换值,使得x<y
    y=t;
    }
	if(x>z){
	t=x;
    x=z;
    z=x;
    }
    if(y>z){
    t=y;
    y=z;
    z=y;
    }
	printf("从小到大的顺序为:%d %d %d",x,y,z);
    return 0;
}