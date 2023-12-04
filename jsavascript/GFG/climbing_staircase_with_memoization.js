// problem link ==>  https://leetcode.com/problems/climbing-stairs/


let memo = {}
var climbStairs = function(n) {
    if (n < 3){
        return n
    }if (memo[n]){
        return memo[n]
    }
    memo[n] = climbStairs(n-1) + climbStairs(n-2)
    return memo[n]
};


// more memory efficinet way


var climbStairs = function(n) {
    noOfWays = [1,2]
    for (let i = 2; i < n; i++){
        noOfWays[i] = noOfWays[i-1] + noOfWays[i-2]
    }
    return noOfWays[n-1]
};