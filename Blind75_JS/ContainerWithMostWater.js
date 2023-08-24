var maxArea = function(height) {
    let max = 0;
    let right = height.length-1;
    let left = 0;

    while(left < right){
        let area = Math.min(height[left], height[right]) * (right-left);
        max = Math.max(area, max);

        if(height[left] < height[right]){
            left++;
        }else {
            right--;
        }
    }

    return max;
};