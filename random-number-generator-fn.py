
# Random-number-generator
#     Sockets
#     Exceptions
# ---------------------------------------------------------------------

# IMPORTS
import random
import datetime

# VARIABLES
todayDateTime = datetime.datetime.now().date()
todayDate = datetime.datetime.now().date()
breaks = "*" * 25

#Random function gererator
intRandom = random.randint(1,100)
intGuess = 0
guessCounter = 0
intGuessMax = 7
outputFile = "jp_output.txt"
        
with open (outputFile,"w") as f:
    f.writelines("Jhanvi Prajapati\n")
    f.writelines(breaks + "\n")
    f.writelines("random number is "+str(intRandom)+ "\n")

# Logic goes here
while True:
    try:
        guessCounter += 1
        if (guessCounter > intGuessMax):
            print("Sorry ! Guess exceeded")
            print("Random number is ",intRandom)
            
            with open(outputFile, "a") as f:
                f.writelines("\nGuess Exceeded")
                f.writelines("\nRandom Number is "+ str(intRandom))
            break
        intGuess = int(input("Enter a Random interger (1 to 100):"))
        if(intGuess == intRandom):
            print("\nNumber guessed is Correct")
            with open(outputFile,"a") as f:
                f.writelines("\nGuess Correct Count: " + str(guessCounter) + " Guessed # "+str(intGuess))
            break
        if(intGuess > intRandom):
            print("Number guessed is Greater than random")
            with open(outputFile,"a") as f:
                f.writelines("\nGuess LT Random Count "+str(guessCounter)+" Guessed # "+str(intGuess))
            
        else:
            print("Number is less than random")
            with open (outputFile,"a" )as f:
                f.writelines("\nGuess GT Random Count "+str(guessCounter)+" Guessed # "+str(intGuess))
        
    except:
        print("Number must be an integer")
        print("Please try Again")
    
# CODE END