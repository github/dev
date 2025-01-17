#conditional expressions = A one-line shortcut for the if-else statement (ternary operator)
# Print or assign one of the two values based on a condition
# X if condition else Y


num = 5 
print("Positive" if num > 0 else "Negative") # Positive

results = "EVEN" if num % 2 == 0 else "ODD"
print(results) # ODD

a=6
b=5
age = 25
temperature = 30
user_role = "admin"


#Age
max_num = a if a>b else b
min_num = a if a < b else b
status = "Adult" if age >= 18 else "Child"
print (status) # Adult

#Weather    
weather = "HOT" if temperature > 20 else "COLD"
print(weather) # HOT

#Access Level
access_level = "Full Access" if user_role == "admin" else "Limited Access"
print(access_level) # Full Access
