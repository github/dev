#Name:Melanie Cruz
#Email: melanie.cruz21@myhunter.cuny.edu
#:Date: November 9, 2023
# errors.py is based on dateconvert2.py from Chapter 5 of the Zelle textbook
#Converts day month and year numbers into two date formats

def main():
     # get the day month and year
     day, month, year = eval(input("Please enter day, month, and year numbers: "))
     date1 = str(month)+"/"+str(day)+"/"+str(year)
     months = ["January", "February", "March", "April", 
              "May", "June", "July", "August", 
              "September", "October", "November", "December"]
     monthStr = months[month-1]
     date2 = monthStr+" " + str(day) + ","+ str(year)
     print("The date is", date1, "or", date2+".")

main()