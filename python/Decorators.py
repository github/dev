class Data:
    def __init__(self):
        self._password = 'jatin123'  # Use an underscore to indicate it's a protected attribute

    @property
    def password(self):
        print('i am here')
        return self._password

    @password.setter
    def password(self, value):
        # You can add logic here to control how the password is set, e.g., validation
        raise AttributeError("Password is read-only")
        
    @password.getter
    def password(self):
        # You can add logic here to control how the password is set, e.g., validation
        return 'bulli'

# Create an instance of the Data class
x = Data()

# Access the password
print(x._password)  # Output: 'jatin123'

# Try to change the password
x.password = 'new_password'  # This will raise an AttributeError

print(x.password)



# ----------- Function based decorator --------------------

# # Define a basic decorator function
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()  # Call the original function
        print("Something is happening after the function is called.")
    return wrapper

# Define a function and apply the decorator using the "@" symbol
@my_decorator
def say_hello():
    print("Hello!")

# Call the decorated function
say_hello()


# Define a decorator function for logging
def log_function_call(func):
    def wrapper(*args, **kwargs):
        # Log information before calling the function
        print(f"Calling {func.__name__} with arguments: {args}, {kwargs}")
        result = func(*args, **kwargs)
        # Log information after the function is called
        print(f"{func.__name__} returned: {result}")
        return result
    return wrapper

# Apply the decorator to a function
@log_function_call
def add(a, b,e):
    print('lulli')
    return a + b

@log_function_call
def subtract(a, b):
    return a - b

# Call the decorated functions
result1 = add(5, 3,e = '5')
result2 = subtract(10, 4)




# ------------------ class based decorator -------------------

# Define a class-based decorator
class MyDecorator:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        print("Something is happening before the function is called.")
        result = self.func(*args, **kwargs)
        print("Something is happening after the function is called.")
        return result

# Apply the class-based decorator to a function
@MyDecorator
def say_hello():
    print("Hello!")

# Call the decorated function
say_hello()
