
# String functions

name = input("Enter your full name: ")
phone_number = input("Enter your phone number: ")

result = len(name)
print(result)


result = name.find("T")
print(result)

#Reverse find
result = name.rfind("T")
print(result)

name = name.capitalize()  # First letter capital
print(name)

name = name.upper()  # All letters capital
print(name)

name = name.lower()  # All letters small
print(name)

result = name.isdigit()  # Check if all letters are digits
print(result)

result = name.isalpha()  # Check if all letters are alphabets
print(result)

result = phone_number.count("-")  # Count the number of times "-" appears in the phone number
print(result)

phone_number = phone_number.replace("-", " ")  # Replace "-" with " "
print(phone_number)


print(help(str))  # Get help on string functions