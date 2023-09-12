# JDTodo



## Table of Contents
[Project Overview](#project-overview)  
[Tech Stack](#tech-stack)  
[Installation and Setup](#installation-and-setup)     
[Features](#features)  
[Pages](#pages)  
[Technical notes](#technical-notes)  

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
In `backend/config.py`, you will need to get your own environment variables:
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
Coming soon 

## Technical Notes
Coming soon