import math #importing math module

print(math.pi)
print(math.e)

x=9
result = math.sqrt(x)   #returns the square root of x
print(result)

y=9.1
result =math.ceil(y)    #returns the smallest integer greater than or equal to y
print(result)

z=9.9
result = math.floor(z)    #returns the largest integer less than or equal to z
print(result)


#Calculate circumference of a circle

radius = float(input("Enter the radius of the circle: "))
circumference = 2 * math.pi * radius
print(f"The circumference of the circle is {round(circumference,2)}")

#Calculate area of a circle

radius = float(input("Enter the radius of the circle: "))
area = math.pi * pow(radius,2)
print(f"The area of the circle is {round(area,2)}") 

#Hytothenuse of a right angled triangle

a = float(input("Enter the length of side a: "))
b = float(input("Enter the length of side b: "))
c = math.sqrt(pow(a,2) + pow(b,2))
print(f"The length of the hypotenuse is {round(c,2)}")






