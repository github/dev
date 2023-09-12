HOW TO RUN THE EAGLERX 1.8.8 SERVER ON YOUR OWN HARDWARE!
---------------------------------------------------------------

Step 1: Download the full server zip to the host PC and extract it.

Step 2: Install tmux and Java.

Step 3: Enter a new tmux window by using the command "tmux", and navigate to the "bungee" folder.

Step 4. Execute the command: "java -jar bungee.jar".

Step 5: Press ctrl+b and then d to detatch from the tmux window.

Step 6: Navigate back to the project root, and open a new tmux window by using the command "tmux" once again.

Step 7: Navigate to the "server" folder.

Step 8: Excute the command: "java -jar server.jar".

Step 9: You are done! The server is running. Follow the DNS Configuration steps below to be able to access the server from the web.



DNS CONFIGURATION STEPS
----------------------------

Step 1: Determine the public IP address of the host PC.

Step 2: The ports you will need to forward, open and make public are as follows: 8081, 25565, 25577.

Step 3: Make sure there are no other records in the DNS settings of your domain before continuing. If there are, delete them. (WARNING! THIS WILL RESULT IN THE
PERMANENT LOSS OF THE PREEXISTING RECORDS. DO NOT CONTINUE IF YOU ARE ALREADY HOSTING SOMETHING ON THAT DOMAIN.)

Step 4: Create an "A" record containing the public IP address of the host PC in the DNS settings of your domain to host the Eaglercraft server on that domain.

Step 5: Wait for the changes to be applied, and test the link. If you are sent to an EaglercraftX 1.8 page, you have succeeded! If not, reread the instructions
to check if you might have missed any steps. If it still doesn't work, go to Troubleshooting.



TROUBLESHOOTING
---------------------------

If you are having trouble with the DNS configuration, go to 1.0.

If you are having trouble with the server setup, go to 1.1.

If you are not having trouble with either of these options, go to 1.2.


1.0
------

If you are trying to view the site, and nothing appears, there may be an issue with your domain.
Try viewing the site directly by visiting the IP address of the host PC in a web browser.
If you are still unable to resolve your issue, please go to 1.2.

If you are unable to join the server via the browser, but the Eaglercraft page still appears,
please go to 1.2.



1.1
------

If you are having trouble installing tmux, you may be using an unsupported operating system.
Please consult the tmux Wiki here: https://tinyurl.com/tmux-help
If you are still having issues, please go to 1.2.

If you are having trouble with the Java installation, you may be using an unsupported operating system.
Please consult the Java System Requirements page here: https://tinyurl.com/java-sysreq
