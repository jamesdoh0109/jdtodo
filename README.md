# JDTodo

## Table of Contents
- [Project Overview](#project-overview)   
- [Tech Stack](#tech-stack)  
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
- [Installation and Setup](#installation-and-setup)  
  - [Frontend](#frontend-1)
  - [Backend](#backend-1)   
  - [Github Codespace users ONLY](#github-codespace-users-only)
- [Features](#features)  
- [Pages](#pages)  
  - [/](#home)
  - [/signup](#signup)
  - [/login](#login)
  - [/dashboard](#dashboard)
  - [/dashboard/<project_id>](#dashboardproject_id)
  - [/forgot-password](#forgotpassword)
  - [/reset-password/<reset_password_token>](#reset-passwordreset_password_token)
- [Technical notes](#technical-notes)  

## Project Overview
JDTodo is a web application designed for managing projects and tasks. It uses a React for the frontend and Python Flask for the backend to provide a user-friendly and efficient project/task management system. 

## Tech stack
### Frontend
<p>
  <img alt="Javascript" src="https://img.shields.io/badge/Javascript-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img alt="React" src="https://img.shields.io/badge/React-%2361DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img alt="Redux" src="https://img.shields.io/badge/Redux-%23764ABC?style=for-the-badge&logo=redux">
  <img alt="React Query" src="https://img.shields.io/badge/react--query-%23FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
  <img alt="React Hook Form" src="https://img.shields.io/badge/react--hook--form-%23EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-%2306B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
</p>

### Backend 
<p>
  <img alt="Python" src="https://img.shields.io/badge/python-%233776AB?style=for-the-badge&logo=python&logoColor=white">
  <img alt="Flask" src="https://img.shields.io/badge/flask-%23000000?style=for-the-badge&logo=flask&logoColor=white">
</p>

### Database
<p>
  <img alt="MySQL" src="https://img.shields.io/badge/mysql-%234479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img alt="Amazon RDS" src="https://img.shields.io/badge/Amazon%20RDS-%23527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">
</p>

## Installation and Setup
### Frontend
Follow these steps to run the frontend development server:
1. `cd frontend`
2. `npm install`
3. `npm start`

### Backend
In `backend/config.py`, it initializes 4 environment variables, which you will need to set up on your own:
* `SQLALCHEMY_DATABASE_URI`
  * URI used to connect to the database (e.g. sqlite:////tmp/test.db, mysql://username:password@server/db). You will first need to create your own 
* `JWT_SECRET_KEY`  
  * Secret key used for signing and verifying JWTs. A good rule of thumb is to use a secret key with a length of at least 256 bits (32 bytes) or longer and also a random, unique string generated cryptographically (e.g. `secrets.token_hex(32)`). 
* `MAIL_USERNAME` 
  * Username for your Gmail account
* `MAIL_PASSWORD`
  * Password for your Gmail account  

Once these have been set, then follow these steps to run the backend development server:
1. `cd backend`
2. `pipenv shell`
3. `pipenv install`
4. `flask --app app run`

### Github Codespace users ONLY
If you are using [Github Codespaces](https://github.com/features/codespaces), you can define each enviornment variable by navigating to Github -> Settings -> Codespaces -> New Secret (selecting the cloned repository). 

Please also navigate to line 5 in `frontend/src/hooks/useDataOperations.js` as well as line 3 and line 17 in `frontend/src/util/auth.js` to change `localhost:5000` to the url corresponding to your Codespace url. 

## Features
JDTodo is more than just a simple todo list application. With JDTodo, you can:
* Create a project (e.g. "Final exam prep")
* Update a project with a new name (e.g. "Final exam prep" -> "CIS 121 exam prep")
* Delete a project 
* Create tasks for a given project (e.g. "Review ch.9 and do 20 exercises on pg. 257") with a deadline, status (Not started, In progress, Finished), and description 
* Update tasks (e.g. marking it as "Finished", changing the deadline, etc.)
* Delete tasks
* See which tasks are overdue 
* Create an account with your email address
* Log in to retrieve your project/task data 
* Reset your password via email when forgotten
* Update your information (email, name, password)
* Delete your account 

## Pages
### / (home)
This is the home page from which you can navigate to the login page or signup page:
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1skfqoH1wU0GR8koa0Mt01vQNrPZDeqMb" width="800">
  </div>
  Desktop
</div>
<br/>
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1rLoEo737Fc-VyNxP1W4fl8HE1HTdhqCk" width="200">
  </div>
  Mobile
</div>

### /signup
Here, you can create your account using your first and last names, email address, and password. Your password must be at least 8 characters long and contain at least one number and an uppercase letter:
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=17-mVUOP9dt_qCkHk2qw1LrnWXVrpTIQZ" width="800">
  </div>
  Desktop
</div>
<br/>
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1dD1mkn4V5bWV1pXj-lcBvVLvtTQ_oYs2" width="200">
  </div>
  Mobile
</div>

### /login
This is the login page where you log into your account using your email and password:
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1ECDWLWlhH_LGX0JyUmHBv8hGRf5VTUKx" width="800">
  </div>
  Desktop
</div>
<br/>
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1aEWl3wNx0s2artR-KoJ4V7wdhJ4bvDiU" width="200">
  </div>
  Mobile
</div>

### /dashboard 
On the dasboard page, you can view and create/edit/delete projects, and also navigate to the project detail page by clicking on a project card:
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1vfya2EDFczbUx1Sv9ygJ-BWMPk93c49o" width="800">
  </div>
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1IiCEqITi-wSKElrCpYGxwzZXS-gy5Kkx" width="800">
  </div>
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1mh2DHcaJ4W1ctAF9wAanqvoI5ezZlkB2" width="800">
  </div>
  Desktop
</div>
<br/>
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1Qn9NDAmjkwBUVAN3TuoNyd5Ly4TzzcMz" width="200">
    <img src="https://drive.google.com/uc?export=view&id=1KQ8PwB8ykCEL9hYxfvCovc_oQU4HVzlb" width="200">
    <img src="https://drive.google.com/uc?export=view&id=1Im1J_oSROErEu3vPgJ37szIXD9zE519t" width="200">
  </div>
  Mobile
</div>

### /dashboard/<project_id>
Once you click on one of your project cards, you will be on the project detail page, where you can view and create/edit/delete tasks. You can also click on each task to view its detail:
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1-uIo2S1y8z8nLgTt-ZEb3rFPtpPUtbMf" width="800">
  </div>
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1TUmlBo6ov7L7l4q8UfY91y7aovekbH8P" width="800">
  </div>
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1WCzDmwNE0KPy59GfkLzmbZTM3QxHkYnu" width="800">
  </div>
  <div>
    <img src="https://drive.google.com/uc?export=view&id=13gdPDGInDJVCbQeecozcNwsAaBT7ZLqU" width="800">
  </div>
  Desktop
</div>
<br/>
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1QqVPlwgcgI78v1QEYtykHCLnWxN73uvm" width="200">
    <img src="https://drive.google.com/uc?export=view&id=1AMbWlESSE_aXZa5aMMceOFMsUHuXtJpi" width="200">
    <img src="https://drive.google.com/uc?export=view&id=1oHLfbeu1_yXj5XpxlObBip6N_Hmrh9Th" width="200">
    <img src="https://drive.google.com/uc?export=view&id=10bIoOBuoI37QEx9hzyE9CpuI_yEzN6rQ" width="200">
  </div>
  Mobile
</div>

### /dashboard/account
If you need to make changes to your profile, visit the account page, where you can modify your name, email, and password, and also delete your account:
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1-RzgBrKFZugCW37D_koQlTT0l-suUhcY" width="800">
  </div>
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1APQ1AzGIEW9pWGhA3aHZIN55_GWGxR30" width="800">
  </div>
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1qyw57qEtKJ5rR0G2SZVhEMnl7eZeT8U1" width="800">
  </div>
  Desktop
</div>
<br/>
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1SSWro_-_cLMJ4OKcxtJ3jSPWSlod7hlR" width="200">
    <img src="https://drive.google.com/uc?export=view&id=1SSWro_-_cLMJ4OKcxtJ3jSPWSlod7hlR" width="200">
    <img src="https://drive.google.com/uc?export=view&id=1_W8dcw8Unsyr047P99nPFjofzl5wy7N3" width="200">
  </div>
  Mobile
</div>

### /forgot-password
If you have forgotten your password, you can visit the forgot password page to enter your email address, to which a link will be sent, where you can create your new password: 
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1I1htcvZFjGtdlPz5PWeaUKXArfZ0C2Af" width="800">
  </div>
  Desktop
</div>
<br/>
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1pC7ydOvJcqjR_4Hjy4EpGe2gGOxHKzFX" width="200">
  </div>
  Mobile
</div>

### /reset-password/<reset_password_token>
This is the reset password page where you can create your new password: 
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=152K9TaV0fGgDXKEpDCMPexq3wvqIWLxL" width="800">
  </div>
  Desktop
</div>
<br/>
<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1ixkXeQJPrmN6n2rx6v4s5RfNAUtJ2TKu" width="200">
  </div>
  Mobile
</div>

## Technical Notes
Coming soon