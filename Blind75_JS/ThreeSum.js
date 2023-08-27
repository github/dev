var threeSum = function(nums) {
    const list = [];
    nums.sort();
    for(let i = 0; i<= nums.length-3; i++){
        if(i != 0 && nums[i] == nums[i-1]){
            continue;
        }
        let targetSum = 0 - nums[i];
        let left = i+1;
        let right = nums.length-1;
        while(left<right){
            if(targetSum == (nums[left] + nums[right])){
                const l = [nums[left], nums[right], nums[i]];
                list.push(l);
                while(left < nums.length-1 && nums[left] == nums[left+1]) left++;
                while(right > 0 && nums[right] == nums[right-1]) right--;
                left++;
                right--;
            }else if(targetSum > (nums[left] + nums[right])){
                left++;
            } else{
                right--;
            }
        }
        
        }
        return list;
};