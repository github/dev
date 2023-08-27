var twoSum = function(nums, target) {
    const map = new Map();
    for(let i = 0; i<nums.length; i++){
        let remainingSum = target-nums[i];
        if(map.has(remainingSum))
        {
            return [i,map.get(remainingSum)];
        }
        else map.set(nums[i],i);
    }
};