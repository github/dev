# Time Complexity O(NlogN)


def mergeSort(arr):
    if len(arr) < 2 :
        return arr
    middle = len(arr)//2
    leftArr = arr[0:middle]
    rightArr = arr[middle:]
    
    return merge(mergeSort(leftArr),mergeSort(rightArr))


def merge(leftArr,rightArr):
    sortedArr = []
    
    while len(leftArr) and len(rightArr):
        if leftArr[0] < rightArr[0]:
            sortedArr.append(leftArr.pop(0))
        else:
            sortedArr.append(rightArr.pop(0))
    
    return sortedArr + leftArr + rightArr
    
a = [5,4,3,2,1,90,-90,100,40]

print(mergeSort(a))