#python calculator  


operator = input("Enter the operator (+ - * /): ")
num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))

if operator == "+":
    result = num1 + num2
    print(round(result,3))
elif operator == "-":
    result = num1 - num2
    print(round(result,3)) 
elif operator == "*":
    result = num1 * num2
    print(round(result,3))
elif operator == "/":
    result = num1 / num2
    print(round(result,3))
else:
    print(f"Invalid operator: {operator}")


# Python weight converter

weight = float(input("Enter your Weight: "))
unit = input("Kilograms or Pounds? (K or L): ")

if unit == "K":
    weight = weight * 2.205
    unit = "Lbs"
    print(f"Your weight is {weight} and unit is {unit}")
elif unit == "L":
    weight = weight / 2.205
    unit = "Kg"
    print(f"Your weight is {weight} and unit is {unit}")
else:
    print('Invalid unit')


#Temperature Converter

unit = input("Is this temperature in Celsius or Fahrenheit? (C/F): ")
temp = float(input("Enter the temperature: "))

if unit == "C":
   temp = round((9*temp) /5 + 32,1)
   print(f"The temperature is {temp} degrees Fahrenheit.")
elif unit == "F":
   temp = round((5*(temp-32))/9,1)
   print(f"The temperature is {temp} degrees Celsius.")
else:
   print(f"Invalid unit: {unit}")
