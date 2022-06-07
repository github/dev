/*
 * :Date: 2022-06-07 14:09:40
 * :LastEditTime: 2022-06-07 14:09:43
 * :Description: 
 */
#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
using namespace std;

int nums[10];
int n;
void merge_sort(int i, int j)
{
    if (i >= j)
        return;
    // form i to j sort
    // divid and conquer
    merge_sort(i,i+(j-i)/2);
    merge_sort(i+(j-i)/2+1,j);
    
    int s1 = i;
    int s2 = i+(j-i)/2+1;
    cout << "i:"<<i<<"j:"<<j<<endl;
    // storage data
    int lenL = s2-1-s1+1;
    int lenR = j-s2+1;
    int* dataL = (int*)malloc((lenL)*sizeof(int));
    int* dataR = (int*)malloc((lenR)*sizeof(int));
    cout << "lenL:"<<lenL<<"lenR:"<<lenR<<endl;
    memcpy(dataL,&nums[s1],lenL*sizeof(int));
    memcpy(dataR,&nums[s2],lenR*sizeof(int));
    for(int i = 0;i<lenL;i++)
        cout << dataL[i] << " ";
    cout << endl;
    for(int i = 0;i<lenR;i++)
        cout << dataR[i] << " ";
    cout << endl;
    int pt1 = 0;
    int pt2 = 0;
    while (pt1 < lenL && pt2 < lenR)
    {
        // exchange
        if(dataL[pt1] > dataR[pt2])
        {
            nums[s1+pt1+pt2] = dataR[pt2];
            pt2+=1;
        }
        else
        {
            nums[s1+pt1+pt2] = dataL[pt1];
            pt1+=1;
        }
    }
    while(pt1 < lenL)
    {
        nums[s1+pt1+pt2] = dataL[pt1];
        pt1+=1;
    }
    while(pt2 < lenR)
    {
        nums[s1+pt1+pt2] = dataR[pt2];
        pt2+=1;
    }
    cout << "n: "<<n << endl;
    for(int i = 0;i<n;i++)
        cout << nums[i] << " ";
    cout << endl;
}

int main()
{
    cin >> n;
    for(int i = 0;i<n;i++)
        cin >> nums[i];
    // sort
    merge_sort(0,n-1);
    for(int i = 0;i<n;i++)
        cout << nums[i] << " ";
    cout << endl;
    return 0;
}