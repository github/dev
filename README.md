# What is this?

MVF Tech Test to test a Github API with an arbitrary Github username, and be presented with a best guess of the Github user's favourite programming language.
This is computed by using the Github API to fetch all of the user's public Github repos, each of which includes the name of the dominant language for the repository.

# Instalation

- Java version 16 and up: [for mac](https://www.java.com/en/download/apple.jsp), [for windows](https://www.java.com/en/download/help/windows_manual_download.html)
- Install [IntelliJ for mac](https://www.jetbrains.com/idea/download/#section=mac) & [Documentation](https://www.jetbrains.com/help/idea/getting-started.html) 
- Install [Gradle](https://gradle.org/install/) (version 6.9 and up)
- Install [Maven](https://www.baeldung.com/install-maven-on-windows-linux-mac)
- Maven/Gradle dependencies with Versions can be found [here](https://mvnrepository.com/)

# Test Scenario 

Scenario Outline: Get the favourite/mostly used language by a Github user
Given I send a request to get the "<user>" information
Then I can print the favourite language of that "<user>"

Expected Result:

- I am able to fetch user's Github repository; 
- I am able to list all languages Github user used for all of their public projects;
- I am able to filter and print the favourite language if it exists;
- I am able to filter and print "has no Languages available" if there are no languages used.

# Running & Testing
 
To run the test select the file GetLanguages.feature BDD and run it.

# Test result

![Successful test result](https://drive.google.com/uc?export=view&id=10lA1HmIZ3VO7hhSXgzM6LwWQcsZyolIV)