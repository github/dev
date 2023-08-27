// calculate prefix product and suffix product then multiply each element of prefix and suffix array 

var productExceptSelf = function(nums) {
    
    const prefixProductCumResult = [];
    const suffixProduct = [];

    prefixProductCumResult[0] = 1;
    suffixProduct[nums.length-1] = 1;

    for(let i = 1, j = nums.length-2; i< nums.length && j >=0; i++ , j--){
        prefixProductCumResult[i] = prefixProductCumResult[i-1] * nums[i-1];
        suffixProduct[j] = suffixProduct[j+1] * nums[j+1];
    }

    for(let i = 0 ; i< nums.length; i++){
        prefixProductCumResult[i] = prefixProductCumResult[i] * suffixProduct[i];
    }

    return prefixProductCumResult;
};