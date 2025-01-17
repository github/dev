#Exercise 1 - Rectangle Area calculation

length = float(input("Enter the length of the rectangle: "))
width = float(input("Enter the width of the rectangle: "))

Area = length * width
print("The area of the rectangle is: ", Area)

print(f"The area of the rectangle is: {Area} cm2")


#Execise 2 - Shopping cart program

item = input("What item would you like to buy? ")
price=float(input("What is the price of the item? "))

quantity = int(input("How many would you like to buy? "))
total  = price * quantity

print(f"The total price of {quantity} {item} is: {total} ")

print(f"You have purchased {quantity} {item} at {price} each for a total of ${total} ")  


#Madlibs Game
adjective1 = input("Enter an adjective(description): ")
noun1 = input("Enter a noun(person, place, thing): ")
adjective2= input("Enter an adjective(description): ")
verb1 = input("Enter a verb ending with 'ing': ")
adjective3 = input("Enter an adjective(description): ")


print(f"Today I went to a {adjective1} zoo.")
print(f"In an exibit, I saw a {noun1}.")
print(f"{noun1} was {adjective2} and {verb1}.")
print(f"I was {adjective3}.")












