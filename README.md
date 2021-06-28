# MAIL-BOX
### Carried out by - display : flex;

Deployment is [live](https://displayflex-mail-box.herokuapp.com/).

 #### Overview 
   In the project 'MAIL-BOX', a full-stack web application is built, allows user to log in and send the mails to recurring recipients. 

#### Goals
1. Login and sign up via <br>
    - Username - password <br>
     - Gmail Sync (Login with Gmail option) <br>
  
2. Create/Edit the mail features.
3. History Page - The list of mails sent till now

#### Specifications
   Frontend - Html, CSS, Bootstrap <br>
   Backend - Nodejs,JavaScript, ejs, Mongoose<br>
   Database - MongDB, MongoDB Atlas<br>
   Hosted on Heroku<br>
#### Developers
   <li> Mayank Shrivastava
   <li> Anshul Prasad
   <li> Sharvani Nepal
     
     
#### Aspects
  Home Page consists of two options: ‘Sign up’ and ‘Log in’ into the application. It can be done through following ways: <br>
      1.Username-password <br>
      2.Gmail Sync, that is, login with gmail option. <br>

The **Home page** have the list of mails schedule for future.

The **History page** consists of mails sent till the date.

The application also includes the general mailing features,

1. To : holds email of recipients.
2. CC : sends the additional copy of  mail to other.
3. Subject : Indicates the tagline of entire mail.
4. Schedule Selector
5. Mail body: stores the text of the mail.
6. Send mail button : sends the mail to given mail address.

Schedule Selector will have more features of,

A. Recurring Schedule
	This feature allows to sent the mail automatically to the recipient after certain interval.

B. Weekly Schedule
	Using this feature, the user can sent the mail to recipient on any particular day and time of every week automatically.

C. Monthly Schedule
	Mails are sent automatically to the recipient on any particular date and time of every month. 

D. Yearly Schedule
	Unlike other schedule, this feature allows to sent mail on particular date and time every year automatically.

<br>
<br>
	   
## How to run 

Step 1. Clone the repo

Step 2. Type in cmd / terminal :- `npm install`

Step 3. Type in cmd / terminal :- `node index.js`

Step 4. Open `http://127.0.0.1:4000/`







