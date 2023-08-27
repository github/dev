var search = function(nums, target) {

    if(nums.length == 1 && target == nums[0]) return 0;
    if(nums[0] == target) return 0;
    if(nums[nums.length-1] == target) return nums.length-1;

    let left = 0;
    let right = nums.length - 1;
    while(left <= right){
        let mid = Math.floor((right + left)/2);
        if(nums[mid] == target) return mid;

        if(nums[left] <= nums[mid]){
            if(target < nums[mid] && target >= nums[left]){
                right = mid-1;
            }else{
                left = mid+1;
            }
        }else {
            if(target > nums[mid] && target <= nums[right]){
                left = mid+1;
            }else{
                right = mid-1;
            }
        }
    }

    return -1;
};