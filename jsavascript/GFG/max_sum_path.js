// Given two sorted arrays A and B of size M and N respectively. 
// Each array may have some elements in common with the other array. 
// Find the maximum sum of a path from the beginning of any array to the end of any of the two arrays. 
// We can switch from one array to another array only at the common elements.Both the arrays are sorted.
// Note: Only one repeated value is considered in the valid path sum.


//{ Driver Code Starts
//Initial Template for javascript

'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    
    main();    
});

function readLine() {
    return inputString[currentLine++];
}

/* Function to print an array */
function printArray(arr, size)
{
    let i;
    let s='';
    for (i=0; i < size; i++) {
        s += arr[i] + " ";
    }
    console.log(s);
}

function main() {
    let t = parseInt(readLine());
    let i = 0;
    for(;i<t;i++)
    {
        let input_ar0 = readLine().split(' ').map(x=>parseInt(x));
        let m = input_ar0[0];
        let n = input_ar0[1];
        let a = new Array(m);
        let b = new Array(n);
        let input_ar1 = readLine().split(' ').map(x=>parseInt(x));
        for(let i=0;i<m;i++)
            a[i] = input_ar1[i];
        let input_ar2 = readLine().split(' ').map(x=>parseInt(x));
        for(let i=0;i<n;i++)
            b[i] = input_ar2[i];
        let obj = new Solution();
        let res = obj.max_path_sum(a, b, m, n);
        console.log(res);
    }
}

// } Driver Code Ends


class Solution {
    
    max_path_sum(a, b, M, N)
    {
        //your code here
        let [s1,s2] = [0,0]
        let sum = 0
        let [i,j] = [0,0]
        
        while (i < M && j < N) {
            if (a[i] < b[j]){
                s1 += a[i]
                i++
            }else if (a[i] > b[j]){
                s2 += b[j]
                j++
            }else{
                s1 += a[i];
                s2 += b[j];
                sum += Math.max(s1,s2);
                [s1, s2] = [0, 0];
                i++
                j++
            }
        }
        s1 += a.slice(i).reduce((acc,currVal) => acc+currVal,0)
        s2 += b.slice(j).reduce((acc,currVal) => acc+currVal,0)
        sum += Math.max(s1,s2)
        
        return sum
    }
}