# Validate user input exercise
# 1. username is no more than 12 characters
# 2. username must not contain spaces
# 3. username must not contain digits

username = input("Enter your username: ")
username.find(" ")  



if len(username) > 12:
    print("Username can't be long than 12 characters")
elif not username.find(" ") == -1:
        print("Username can't contain spaces")
elif username.isdigit():
        print("Username can't contain digits")
elif not username.isalpha():
        print("Username can't contain numbers")
else:
    print(f"Welcome {username}")    


