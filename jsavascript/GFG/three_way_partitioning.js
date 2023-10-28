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

function main() {
    let t = parseInt(readLine());
    let i = 0;
    for(;i<t;i++)
    {
        let n = parseInt(readLine());
        let array = new Array(n);
        let mp = new Map();
        let input_ar1 = readLine().split(' ').map(x=>parseInt(x));
        for(let i=0; i<n; i++){
            array[i] = input_ar1[i];
            mp.set(array[i], 0);
        }
        for(let i=0; i<n; i++){
            mp.set(array[i], mp.get(array[i]) + 1);
        }
        let input_ar2 = readLine().split(' ').map(x=>parseInt(x));
        let a = input_ar2[0];
        let b = input_ar2[1];
        
        let original = array;
        let k1=0, k2=0, k3=0, kk1=0, kk2=0, kk3=0;
        for(let i=0; i<n; i++){
            if(original[i]>b)
                k3++;
            else if(original[i]<=b && original[i]>=a)
                k2++;
            else if(original[i]<b)
                k1++;
        }
        
        let obj = new Solution();
        obj.threeWayPartition(array, a, b);
        
        for(let i=0; i<k1; i++){
            if(array[i]<b)
                kk1++;
        }
        for(let i=k1; i<k1+k2; i++){
            if(array[i]<=b && array[i]>=a)
                kk2++;
        }
        for(let i=k1+k2; i<k1+k2+k3; i++){
            if(array[i]>b)
                kk3++;
        }
        let ok = 0;
        if(k1==kk1 && k2 ==kk2 && k3 == kk3)
            ok = 1;
        for(let i=0; i<array.length; i++)
            mp.set(array[i], mp.get(array[i]) - 1);
        for(let i=0; i<array.length; i++)
            if(mp.get(array[i]) !== 0)
                ok = 0;
        if(ok)
            console.log("1");
        else
            console.log("0");
        
    }
}
// } Driver Code Ends


//User function Template for javascript

/**
 * @param {number[]} array
 * @param {number} a
 * @param {number} b
*/

class Solution {
    //Function to partition the array around the range such 
    //that array is divided into three parts.
    threeWayPartition(arr, a, b)
    {
        //your code here
        let low = 0; // Initialize the low pointer for elements smaller than 'a'
        let high = arr.length - 1; // Initialize the high pointer for elements greater than 'b'
        let i = 0; // Initialize a loop pointer
    
        while (i <= high) {
            if (arr[i] < a) {
                // Element is smaller than 'a', swap it with the element at the 'low' pointer
                [arr[i], arr[low]] = [arr[low], arr[i]];
                low++;
                i++;
            } else if (arr[i] > b) {
                // Element is greater than 'b', swap it with the element at the 'high' pointer
                [arr[i], arr[high]] = [arr[high], arr[i]];
                high--;
            } else {
                // Element is in the range [a, b], keep it in its place
                i++;
            }
        }
    
        return arr;
        
        // return array.sort((a1,b1) => a1-b1 ) brute force solution
    }
}