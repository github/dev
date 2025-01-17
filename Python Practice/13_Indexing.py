#indexing = accessing elements of a sequence using [] (Indexing operator)
# [start : end : step] - slicing operator

credit_number = "1234-5678-9013-4567"
credit_number[0] # 1
print(credit_number[2]) # 1
print(credit_number[0:4] ) # 1234
print(credit_number[5:9]) # 5678
print(credit_number[5:]) # 5678-9013-4567
print(credit_number[-2]) # 6

print(credit_number[::4]) # 1-7-0-6


last_digits  = credit_number[-4:]   
print(f"XXXX-XXXX-XXXX-{last_digits}") # XXXX-XXXX-XXXX-4567

credit_number = credit_number[::-1]
print(credit_number) # 7654-3109-8765-4321



