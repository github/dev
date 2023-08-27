var maxProduct = function(nums) {
    let ans = nums[0];
    let min = nums[0], max = nums[0];

    for(let i = 1; i < nums.length; i++){
        if(nums[i] == 0){
            min = 0;
            max = 0;
            ans = Math.max(nums[i], ans);
            continue;
        }

        let temp = min;
        min = Math.min(nums[i], min*nums[i], max*nums[i]);
        max = Math.max(nums[i], temp*nums[i], max*nums[i]);
        ans = Math.max(max,ans);
    }

    return ans;
};