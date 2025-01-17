#Logical operators = evaluate multiple conditions (or, and, not)
#                   or = either condition is true
#                   and = both conditions are true  
#                   not = reverse the result, returns False if the result is true


temp = 20
is_raining = True

if temp >  35 or temp < 0 or is_raining:
    print("The outdoor event is cancelled")
else:
    print("The outdoor event is not cancelled")


temp = 20
is_sunny = False

if temp >= 28 and is_sunny:
    print("It is HOT outside")
elif temp <= 0 and is_sunny:   
    print("It is COLD outside") 
elif 28 > temp > 0 and is_sunny:
    print("It is WARM outside")
elif 28 > temp > 0 and not is_sunny:
    print("It is CLOUDY outside")
else:
    print("It is neither hot nor cold outside") 