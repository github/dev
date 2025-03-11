def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    mid = left + (right - left) // 2
    print("left: ", left)
    print("right: ", right)
    print("mid: ", mid)
    while left <= right:
        if arr[mid] ==  target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
        mid = left + (right - left) // 2
        # print("left: ", left)
        # print("right: ", right)
        # print("mid: ", mid)
    return -1

arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
target = 4
mid = binary_search(arr, target)
print("target index: ", mid)
