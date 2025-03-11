def merge_sort(A):
    if len(A) > 1:
        mid = len(A) // 2
        B = A[:mid]
        C = A[mid:]
        merge_sort(B)
        merge_sort(C)

        i = j = k = 0

        while i < len(B) and j < len(C):
            if B[i] < C[j]:
                A[k] = B[i]
                i += 1
            else:
                A[k] = C[j]
                j +=1
            k += 1

        while i < len(B):
            A[k] = B[i]
            i += 1
            k += 1

        while j < len(C):
            A[k] = C[j]
            j += 1
            k += 1

A = [9,8,7,6,5,4,3,2,1]
merge_sort(A)
print(A)