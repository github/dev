var findMin = function(nums) {
    
    if(nums.length == 1) return nums[0];
    if(nums.length == 2) return Math.min(nums[0], nums[1]);
    if(nums[0] < nums[nums.length-1]) return nums[0];

    let left = 0;
    let right = nums.length - 1;
    while(left <= right){
        let mid = Math.floor((right + left)/2);

        if(nums[mid] > nums[mid+1]) return nums[mid+1];

        if(nums[mid-1] > nums[mid]) return nums[mid];

        if(nums[left] < nums[mid]){
            left = mid+1;
        } else {
            right = mid-1;
        }
    }

    return 0;
};