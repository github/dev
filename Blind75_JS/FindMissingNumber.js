var missingNumber = function(nums) {
    let n = nums.length;

    let expectedSum = n*(n+1)/2;
    let actualSum = 0;

    nums.forEach((num)=>{
        actualSum= actualSum + num;
    });
    
    return expectedSum - actualSum;
};