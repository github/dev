#if=Do some code if a condition is true
#Else=Do some code if a condition is false

age = int(input("Enter your age: "))
if age > 100:
    print("You are too old to sign up.")
elif age <0:
    print("You are not born yet.")
elif age >= 18:
    print("You are now signed up!")
else:
    print("You are not old enough to sign up.")


#Use == for comparison
response = input("Would you like food (yes/no): ")
if response == "yes":
    print("Here is your food.")
else:
    print("Okay, no food for you.") 


name = input("What is your name: ")

if name == "":
    print("You did not enter a name.")
else:
 print(f"Hello, {name}!")   

#Boolean
for_sale = True
if for_sale:
    print("Item is for sale.")
else:
    print("Item is not for sale.")

#Boolean
online = False

if online:
    print("User is online.")    
else:
    print("User is offline.")   

