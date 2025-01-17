#Typecasting = process of converting a variable from one data type to another data type
name= "Rakesh Tiwarekar"
age = 40
gpa = 3.5
is_student = True
type(name)
print(type(name))
print(type(age))
print(type(gpa))
print(type(is_student))

gpa=int(gpa)
print(type(gpa))
age=float(age)
print(type(age))

age=str(age)    #age is now a string
print(type(age))    
print(age)    #age is now a string

age += "1"
print(age)    #age is now a string

name = bool(name)
print(type(name))   #name is now a boolean
print(name)    #name is now a boolean


