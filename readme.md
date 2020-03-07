# Chatterfly (Web-based Chatting application)
Chatterfly is a simple online chat application where users can connect with each other using just their mobile numbers.
## Technologies and Services used
  - React.JS with Redux
  - Node JS with Express JS
  - Socket.IO
  - Rethink DB
  - SASS
  - Twilio (for mobile number verification)
### Setting up the application on your end

##### Setting up the database
*  Install RethinkDB
*  Create a database by the name 'chatterfly'
*  Create a table by the name 'users' in the newly created database
*  The database client driver connection runs on port 28015 by default
    * In case the client driver connection is not running on port 28015, change the defined port in the server (/server/setup/rethinkDBSetup.js) to the port on which the connection is running. 
##### Starting the server
* run the command 'npm install' to install all the dependencies of the project and then 'npm start' to simply start the server
* The server runs on port 7000, feel free to change it.
##### Setting up your Twilio account
* This application uses Twilio for mobile number validility checking
* Twilio is not not necessary and you are free to remove it by editing the code
* In case you want to go ahead with twilio, you can add the SID and token in the twilio-keys.json located in the config file in the server file
##### Starting the client
* You can simply run the client on your computer or build it and place the built files in the server and serve it via the server. Depends on you.
##### Making changes to the styling
* The styling for this application were entirely custom, written with the help of SASS.
* You can simply can changes to it in the SASS file located in the main folder and rebuilding the styles.css.
* Place the styles.css in the public folder in the client folder

#### Disclaimer
This application is not perfect, it was build for a university course project. Although I have tried my best to make sure the application is bug-free, you might still face a few, you are most welcomed to fix any errors you face.
##### ---
##### THANK YOU FOR SHOWING INTEREST IN MY PROJECT :)