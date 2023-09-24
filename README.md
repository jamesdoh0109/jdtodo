<h1 align="center">JDTodo</h1>
<div align="center">
  <h3>Need to manage projects and tasks? You've come to the right place.</h3>
</div>
<div align="center">

<a href="">[![GitHub Repo stars](https://img.shields.io/github/stars/jihundoh0109/jdtodo?logo=github&color=green)](https://github.com/jihundoh0109/jdtodo)</a>
&nbsp;
<a href="">[![Stack Overflow Badge](https://img.shields.io/badge/tweet-%2523F7DF1E?style=social&logo=twitter&logoColor=%231D9BF0&color=blue)](https://twitter.com/intent/tweet?text=&url=https%3A%2F%2Fgithub.com%2Fjihundoh0109%2Fjdtodo)</a>

</div>

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
  - [Frontend](#frontend-1)
  - [Backend](#backend-1)
  - [Github Codespace users ONLY](#github-codespace-users-only)
- [Pages](#pages)
  - [/](#home)
  - [/signup](#signup)
  - [/login](#login)
  - [/dashboard](#dashboard)
  - [/dashboard/<project_id>](#dashboardproject_id)
  - [/forgot-password](#forgot-password)
  - [/reset-password/<reset_password_token>](#reset-passwordreset_password_token)
- [Implementation Details/Technical Notes](#implementation-detailstechnical-notes)
  - [API Documentation](#api-documentation)
    - [`User` endpoints](#user-endpoints)
    - [`Project` endpoints](#project-endpoints)
    - [`Task` endpoints](#task-endpoints)
  - [Data Models](#data-models)
  - [Authentication](#authentication)
    - [Sign Up](#sign-up)
    - [Log In](#log-in)
  - [Form Handling and Validation](#form-handling-and-validation)
  - [State Management](#state-management)
    - [Client states](#client-states)
    - [Server states](#server-states)
  - [Data Fetching and Modifying Server Data](#data-fetching-and-modifying-server-data)
- [Get in Touch](#get-in-touch)

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

## Features

JDTodo is more than just a simple todo list application. With JDTodo, you can:

- Create a project (e.g. "Final exam prep")
- Update a project with a new name (e.g. "Final exam prep" -> "CIS 121 exam prep")
- Delete a project
- Create tasks for a given project (e.g. "Review ch.9 and do 20 exercises on pg. 257") with a deadline, status (Not started, In progress, Finished), and description
- Update tasks (e.g. marking it as "Finished", changing the deadline, etc.)
- Delete tasks
- See which tasks are overdue
- Create an account with your email address
- Log in to retrieve your project/task data
- Reset your password via email when forgotten
- Update your information (email, name, password)
- Delete your account

## Installation and Setup

### Frontend

Follow these steps to run the frontend development server:

1. `cd frontend`
2. `npm install`
3. `npm start`

### Backend

In `backend/config.py`, it initializes 4 environment variables, which you will need to set up on your own:

- `SQLALCHEMY_DATABASE_URI`
  - URI used to connect to the database (e.g. sqlite:////tmp/test.db, mysql://username:password@server/db). You will first need to create your own
- `JWT_SECRET_KEY`
  - Secret key used for signing and verifying JWTs. A good rule of thumb is to use a secret key with a length of at least 256 bits (32 bytes) or longer and also a random, unique string generated cryptographically (e.g. `secrets.token_hex(32)`).
- `MAIL_USERNAME`
  - Username for your Gmail account
- `MAIL_PASSWORD`
  - Password for your Gmail account

Once these have been set, then follow these steps to run the backend development server:

1. `cd backend`
2. `pipenv shell`
3. `pipenv install`
4. `flask --app app run`

### Github Codespace users ONLY

If you are using [Github Codespaces](https://github.com/features/codespaces), you can define each enviornment variable by navigating to Github -> Settings -> Codespaces -> New Secret (selecting the cloned repository).

Please also navigate to line 5 in `frontend/src/hooks/useDataOperations.js` as well as line 3 and line 17 in `frontend/src/util/auth.js` to change `localhost:5000` to the url corresponding to your Codespace url.

## Pages

### /

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

## Implementation Details/Technical Notes

### API Documentation

Here are the Flask API endpoints for managing users, projects, and tasks (these can be found in modules in `backend/routes`):

#### `User` endpoints
<details>
   <summary>
    <code>POST</code>
    <code><b>/api/login</b></code>
    (authenticates the user given his/her log-in credentials)
  </summary>

  ##### Parameters

  > | name       | type       | data type   | description                  |
  > | ---------- | ---------- | ----------- | ---------------------------- |
  > | `email` | required | String | the email of the user attempting to log in |
  > | `password` | required | String | the password of the user attempting to log in |               

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | <code>{ 'user': {<br>&nbsp;&nbsp;&nbsp;&nbsp;'id': user.id,<br>&nbsp;&nbsp;&nbsp;&nbsp;'firstname': user.firstname,<br>&nbsp;&nbsp;&nbsp;&nbsp;'lastname': user.lastname,<br>&nbsp;&nbsp;&nbsp;&nbsp;'email': user.email<br>},<br>'message': 'Login success' }</code> |  
  > | `400` | <code>{ 'error': 'Missing request body' } OR <br> { 'error': 'Please fill in all the required field(s)' } OR <br> { 'error': 'Email is not valid' }</code> |              
  > | `401` | `{ 'error': 'Invalid credentials' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |

</details>
<details>
   <summary>
    <code>POST</code>
    <code><b>/api/logout</b></code>
    (terminates the user's active session)
  </summary>

  ##### Parameters

  None             

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | `{ 'message': 'Logout success' }` |               
      
</details>
<details>
   <summary>
    <code>POST</code>
    <code><b>/api/signup</b></code>
    (creates the user given his/her registration information)
  </summary>

  ##### Parameters

  > | name       | type       | data type   | description                  |
  > | ---------- | ---------- | ----------- | ---------------------------- |
  > | `firstname` | required | String | the first name of the user attempting to sign up |
  > | `lastname` | required | String | the last name of the user attempting to sign up |
  > | `email` | required | String | the email of the user attempting to sign up |
  > | `password` | required | String the password of the user attempting to sign up |
  > | `passwordConfirm` | required | String | the confirmed password of the user attempting to sign up |              

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `201` | `{ 'message': 'User successfully created' }`|
  > | `400` | <code>{ 'error': 'Missing request body' } OR <br> { 'error': 'Please fill in all the required field(s)' } OR <br> { 'error': 'Email is not valid' } OR <br> { 'error': 'Password must match' } OR <br>{ 'error': 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number' }</code> | 
  > | `409` | `{ 'error': 'Email already exists' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |    

</details>
<details>
   <summary>
    <code>GET</code>
    <code><b>/api/user</b></code>
    (retrieves information about a logged-in user using his/her JSON Web Token(JWT))
  </summary>

  ##### Parameters

  None               

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | <code>{ 'user': {<br>&nbsp;&nbsp;&nbsp;&nbsp;'id': user.id,<br>&nbsp;&nbsp;&nbsp;&nbsp;'firstname': user.firstname,<br>&nbsp;&nbsp;&nbsp;&nbsp;'lastname': user.lastname,<br>&nbsp;&nbsp;&nbsp;&nbsp;'email': user.email<br>},<br>'message': 'User successfully fetched' }</code> |
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |               

</details>
<details>
   <summary>
    <code>PATCH</code>
    <code><b>/api/user/&lt;user_id&gt;</b></code>
    (modifies the user's firstname, lastname, and/or email)
  </summary>

  ##### Parameters

  > | name       | type       | data type   | description                  |
  > | ---------- | ---------- | ----------- | ---------------------------- |
  > | `firstname` | required | String | the new first name of the user  |
  > | `lastname` | required | String | the new last name of the user  |
  > | `email` | required | String | the new email of the user  |            

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | <code>{ 'user': {<br>&nbsp;&nbsp;&nbsp;&nbsp;'id': user.id,<br>&nbsp;&nbsp;&nbsp;&nbsp;'firstname': user.firstname,<br>&nbsp;&nbsp;&nbsp;&nbsp;'lastname': user.lastname,<br>&nbsp;&nbsp;&nbsp;&nbsp;'email': user.email<br>},<br>'message': 'User successfully modified' }</code> |
  > | `400` | <code>{ 'error': 'Missing request body' } OR <br> { 'error': 'Please fill in all the required field(s)' } OR <br> { 'error': 'Email is not valid' }</code> | 
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |
  > | `403` | `{ 'error': 'Access denied' }` |
  > | `404` | `{ 'error': 'User not found' }` |
  > | `409` | `{ 'error': 'Email already exists' }` |
  > | `500` | `{  'error': 'Server error: please try again' }` |                 

</details>
<details>
   <summary>
    <code>DELETE</code>
    <code><b>/api/user/&lt;user_id&gt;</b></code>
    (deletes the user's account)
  </summary>

  ##### Parameters

  None          

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | `{ 'message': 'User successfully deleted' }` |
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |
  > | `403` | `{ 'error': 'Access denied' }` |
  > | `404` | `{ 'error': 'User not found' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |            

</details>
<details>
   <summary>
    <code>PATCH</code>
    <code><b>/api/change_password/&lt;user_id&gt;</b></code>
    (modifies the user's password)
  </summary>

  ##### Parameters

  > | name       | type       | data type   | description                  |
  > | ---------- | ---------- | ----------- | ---------------------------- |
  > | `passwordCurrent` | required | String | the current password of the user |
  > | `passwordNew` | required | String | the new password of the user |
  > | `passwordConfirm` | required | String | the confirmed new password of the user  |                   

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | `{ 'message': 'Password successfully updated' }` |
  > | `400` | <code>{ 'error': 'Missing request body' } OR <br> { 'error': 'Please fill in all the required field(s)' } OR <br> { 'error': 'Email is not valid' } OR <br> { 'error': 'Passwords must match' } OR <br> { 'error': 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number'} OR <br> { 'error': 'New password must be different from your current one' }</code> | 
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |
  > | `403` | <code>{ 'error': 'Access denied' } OR <br> { 'error': 'Incorrect password' }</code> |
  > | `404` | `{ 'error': 'User not found' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |                  

</details>
<details>
   <summary>
    <code>POST</code>
    <code><b>/api/forgot_password</b></code>
    (sends to the user an email with a link to a page for resetting passwords)
  </summary>

  ##### Parameters

  > | name       | type       | data type   | description                  |
  > | ---------- | ---------- | ----------- | ---------------------------- |
  > | `email` | required | String | the email of the user with forgotten password  |                

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | `{ 'message': 'Email successfully sent' }` |
  > | `400` | <code>{ 'error': 'Missing request body' } OR <br> { 'error': 'Please fill in all the required field(s)' } OR <br> { 'error': 'Email is not valid' } |
  > | `404` | `{ 'error': 'User not found' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |              

</details>
<details>
   <summary>
    <code>PATCH</code>
    <code><b>/api/reset_password/&lt;token&gt;</b></code>
    (resets the password for the user identified by the <code>token</code> for resetting passwords)
  </summary>

  ##### Parameters

  > | name       | type       | data type   | description                  |
  > | ---------- | ---------- | ----------- | ---------------------------- |
  > | `password` | required | String | the new password of the user |
  > | `passwordConfirm` | required | String | the confirmed new password of the user |                            

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | `{ 'message': 'Password successfully updated' }` |
  > | `400` | <code>{ 'error': 'Missing request body' } OR <br> { 'error': 'Please fill in all the required field(s)' } OR <br> { 'error': 'Passwords must match' } OR <br> { 'error': 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number'} OR <br> { 'error': 'New password must be different from your original one' }</code> | 
  > | `404` | `{ 'error': 'User not found' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |              

</details>
<details>
   <summary>
    <code>GET</code>
    <code><b>/api/verify_reset_password_token/&lt;token&gt;</b></code>
    (verifies if the <code>token</code> in the request URI is valid or not)
  </summary>

  ##### Parameters

  None          

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | `{ 'message': 'Token found for {user.id}' }` |
  > | `403` | `{ 'error': 'Token expired' }` | 
  > | `404` | `{ 'error': 'Token not found' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |                   

</details>
<details>
   <summary>
    <code>GET</code>
    <code><b>/api/protected</b></code>
    (returns whether user has access to protected pages (i.e. whether user is logged-in or not))
  </summary>

  ##### Parameters

  None

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | `{ 'message': 'User authorized' }` | 
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |             

</details>

#### `Project` endpoints
<details>
   <summary>
    <code>GET</code>
    <code><b>/api/projects/&lt;project_id&gt;</b></code>
    (retrieves the project with <code>project_id</code>)
  </summary>

  ##### Parameters

  None              

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | <code>{ 'project': {<br>&nbsp;&nbsp;&nbsp;&nbsp;'proj_id': project.id,<br>&nbsp;&nbsp;&nbsp;&nbsp;'proj_name': project.name,<br>&nbsp;&nbsp;&nbsp;&nbsp;'date_updated': project.updated_at<br>},<br>'message': 'Project successfully fetched' }</code> |
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |
  > | `403` | `{ 'error': 'Access denied' }` |
  > | `404` | `{ 'error': 'Project not found' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |                 

</details>
<details>
   <summary>
    <code>PATCH</code>
    <code><b>/api/projects/&lt;project_id&gt;</b></code>
    (modifies the name of the project with <code>project_id</code>)
  </summary>

  ##### Parameters

  > | name       | type       | data type   | description                  |
  > | ---------- | ---------- | ----------- | ---------------------------- |
  > | `name` | required | String | the name of the project being modified |               

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | <code>{ 'project': {<br>&nbsp;&nbsp;&nbsp;&nbsp;'proj_id': project.id,<br>&nbsp;&nbsp;&nbsp;&nbsp;'proj_name': project.name,<br>&nbsp;&nbsp;&nbsp;&nbsp;'date_updated': project.updated_at<br>},<br>'message': 'Project successfully modified' }</code> |
  > | `400` | <code>{ 'error': 'Missing request body' } OR <br> { 'error': 'Please fill in all the required field(s)' } OR <br> { 'error': 'Project name must be less than 25 characters' }</code> | 
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |
  > | `403` | `{ 'error': 'Access denied' }` |
  > | `404` | `{ 'error': 'Project not found' }` |
  > | `409` | `{ 'error': 'Project with the same name already exists' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |               

</details>
<details>
   <summary>
    <code>DELETE</code>
    <code><b>/api/projects/&lt;project_id&gt;</b></code>
    (deletes the project with <code>project_id</code>)
  </summary>

  ##### Parameters

  None            

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | `{ 'message': 'Project successfully deleted' }` |
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |
  > | `403` | `{ 'error': 'Access denied' }` |
  > | `404` | `{ 'error': 'Project not found' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |                        

</details>
<details>
   <summary>
    <code>GET</code>
    <code><b>/api/projects</b></code>
    (retrieves a list of all projects for user identified by his/her JSON Web Token(JWT))
  </summary>

  ##### Parameters

  None             

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | <code>{ 'project': &lsqb;<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'proj_id': project.id,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'proj_name': project.name,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'date_updated': project.updated_at<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&rsqb;,<br>'message': 'Projects successfully fetched' }</code> |
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |                  

</details>
<details>
   <summary>
    <code>POST</code>
    <code><b>/api/projects</b></code>
    (creates a project with given the project name)
  </summary>

  ##### Parameters

  > | name       | type       | data type   | description                  |
  > | ---------- | ---------- | ----------- | ---------------------------- |
  > | `name` | required | String | the name of the project being created |                  

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `201` | <code>{ 'project': {<br>&nbsp;&nbsp;&nbsp;&nbsp;'proj_id': project.id,<br>&nbsp;&nbsp;&nbsp;&nbsp;'proj_name': project.name,<br>&nbsp;&nbsp;&nbsp;&nbsp;'date_updated': project.updated_at<br>},<br>'message': 'Project successfully created' }</code> |
  > | `400` | <code>{ 'error': 'Missing request body' } OR <br> { 'error': 'Please fill in all the required field(s)' } OR <br> { 'error': 'Project name must be less than 25 characters' }</code> | 
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |
  > | `409` | `{ 'error': 'Project with the same name already exists' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |                

</details>

#### `Task` endpoints
<details>
   <summary>
    <code>GET</code>
    <code><b>/api/&lt;project_id&gt;/&lt;tasks&gt;</b></code>
    (retrieves a list of tasks for project with <code>project_id</code>)
  </summary>

  ##### Parameters

  None               

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | <code>{ 'tasks': &lsqb;<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'task_id': task.id,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'task_name': task.name,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'task_description': task.description,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'task_deadline': task.deadline,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'task_status': task.status<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&rsqb;,<br>'message': 'Tasks successfully fetched' }</code> | 
  > | `403` | `{ 'error': 'Access denied' }` |
  > | `404` | `{ 'error': 'Project not found' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |               

</details>
<details>
   <summary>
    <code>POST</code>
    <code><b>/api/&lt;project_id&gt;/&lt;tasks&gt;</b></code>
    (creates a task with given task info for project with <code>project_id</code>)
  </summary>

  ##### Parameters

  > | name       | type       | data type   | description                  |
  > | ---------- | ---------- | ----------- | ---------------------------- |
  > | `name` | required | String | the name of the task being created |                  
  > | `deadline` | required | DateTime | the deadline of the task being created |                  
  > | `status` | required | String | the status of the task being created |                  
  > | `description` | optional | String | the description of the task being created |                  
               

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `201` | <code>{ 'task': {<br>&nbsp;&nbsp;&nbsp;&nbsp;'task_id': task.id,<br>&nbsp;&nbsp;&nbsp;&nbsp;'task_name': task.name,<br>&nbsp;&nbsp;&nbsp;&nbsp;'task_description': task.description,<br>&nbsp;&nbsp;&nbsp;&nbsp;'task_deadline': task.deadline,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;'task_status': task.status},<br>'message': 'Task successfully created' }</code> |
  > | `400` | <code>{ 'error': 'Missing request body' } OR <br> { 'error': 'Please fill in all the required field(s)' } OR <br> { 'error': 'Task name must be less than 60 characters' } OR <br> { 'error': 'Task deadline cannot be in the past' }</code> | 
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |
  > | `403` | `{ 'error': 'Access denied' }` |
  > | `404` | `{ 'error': 'Project not found' }` |
  > | `409` | `{ 'error': 'Task with the same name already exists' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |                

</details>
<details>
   <summary>
    <code>PATCH</code>
    <code><b>/api/tasks/&lt;task_id&gt;</b></code>
    (modifies the task info for task with <code>task_id</code>)
  </summary>

  ##### Parameters

  > | name       | type       | data type   | description                  |
  > | ---------- | ---------- | ----------- | ---------------------------- |
  > | `name` | required | String | the name of the task being modified |                  
  > | `deadline` | required | DateTime | the deadline of the task being modified |                  
  > | `status` | required | String | the status of the task being modified |                  
  > | `description` | optional | String | the description of the task being modified |                    

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | <code>{ 'task': {<br>&nbsp;&nbsp;&nbsp;&nbsp;'task_id': task.id,<br>&nbsp;&nbsp;&nbsp;&nbsp;'task_name': task.name,<br>&nbsp;&nbsp;&nbsp;&nbsp;'task_description': task.description,<br>&nbsp;&nbsp;&nbsp;&nbsp;'task_deadline': task.deadline,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;'task_status': task.status},<br>'message': 'Task successfully modified' }</code> |
  > | `400` | <code>{ 'error': 'Missing request body' } OR <br> { 'error': 'Please fill in all the required field(s)' } OR <br> { 'error': 'Task name must be less than 60 characters' } OR <br> { 'error': 'Task deadline cannot be in the past' } OR <br> { 'error': 'Task description must be less than 300 characters' }</code> | 
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |
  > | `403` | `{ 'error': 'Access denied' }` |
  > | `404` | `{ 'error': 'Task not found' }` |
  > | `409` | `{ 'error': 'Task with the same name already exists' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |                      

</details>
<details>
   <summary>
    <code>DELETE</code>
    <code><b>/api/tasks/&lt;task_id&gt;</b></code>
    (deletes the task with <code>task_id</code>)
  </summary>

  None              

  ##### Response
  
  > | http code  | response                                                |
  > | ---------- | ------------------------------------------------------- |
  > | `200` | `{ 'message': 'Task successfully deleted' }` |
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |
  > | `403` | `{ 'error': 'Access denied' }` |
  > | `404` | `{ 'error': 'Task not found' }` |
  > | `500` | `{ 'error': 'Server error: please try again' }` |               

</details>

### Data Models

In `backend/models`, you will find 3 modules, `user.py`, `project.py`, `task.py`, each of which represents data for the 3 entities in this project: user, project, and task. Here is the Entry Relationship Diagram (ERD) that shows each field for each model, and how the 3 models work together:

<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1GKigIupkcTXZS7lQ8y6aGdR1YPNKY3VS" width="800">
  </div>
</div>

### Authentication

Authentication is probably one the most critical features, which when implemented correctly, can help us ensure security and privacy of users. While the popular phrase "don't roll your own crypto" implies the need to use reliable, existing packages and libraries (such as [Auth0](https://auth0.com/) and [Okta](https://www.okta.com/)) for maximizing safety, I decided to implement authentication on my own just for the sake of practice and understadning what really goes behind the scenes.

Here's the general flow of authentication in this project:

#### Sign Up

1. The user fills out the sign-up form with their credentials (name, email, and password).
2. The frontend validates the user input (e.g. check valid email) and sends the data to the sign-up API.
3. The API performs its server-side validation (e.g. check if email already exists) and creates a new row in the database if all the inputs are valid.

#### Log In

1. The user fills out the log-in form with their credentials (email and password)
2. The frontend validates the user input (e.g. check valid email) and sends the data to the log-in API.
3. The API performs its server-side validation (e.g. check if user with the input email exists, check if password is correct).
4. If the user is authenticated, the server generates a JSON Web Token (JWT), which is then returned back to the browser through a secure HTTP-only cookie (using the Set-Cookie header).
5. The frontend receives this cookie and sends it along with future requests to the API (using the cookie header) to access protected resources.

If an unauthenticated user (thus without a valid JWT) attempts to access protected pages (e.g. /dashboard), the API will return 401 unauthorized. The frontend will then use this status code to redirect the user back to the log in page.

### Form Handling and Validation

To simplify the process of handling forms, [React Hook Form](https://www.react-hook-form.com/) and [`yup`](https://github.com/jquense/yup) are used in this project. React Hook Form combined with `yup` reduces the amount of boilerplate code needed for form management and validation. With `yup`, in particular, defining validation rules becomes straightforward:

```javascript
// frontend/util/validator.js
export const createPasswordValidator = yup
  .string()
  .min(8, "Password must contain at least 8 characters")
  .matches(
    /^(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least 1 uppercase letter and 1 number"
  )
  .required("Password is required");
```

### State Management

In this fullstack application, we need to manage both the client and server states:

#### Client states

For client states, such as modal, dropdown, and form states, we use [Redux](https://redux.js.org/) as well as [React Redux](https://react-redux.js.org/) to help simplify the integration between React and Redux. The `<Provider />` component wraps our entire application, which allows the app to have access to the Redux store.

#### Server states

For server states, such as the `id` and `email` of the logged-in user, we use [React Query](https://tanstack.com/query/v3/). When the user attempts to access the Account page (where user can view and edit his or her profile), `useQuery` hook is used to fetch and cache the relevant user data. Although this sounds more like [data fetching](#data-fetching-and-modifying-server-data) (discussed in next section) than maintaining state, React Query excels in efficiently managing and preserving this server state by allowing you to cache and retrieve the logged-in user's data, ensuring that the application remains synchronized with the server's state without the need for redundant network requests.

It is important to keep in mind that whether it is a client or server state, no state should be managed by more than one tool, which can lead to synchronization issues (e.g. maintaining user state through React Query's caching mechanism but also dispatch this to the Redux store). It also makes it difficult to determine what the source of truth is. If React Query has one set of state and Redux has the other, which do you trust and which do you use?

### Data Fetching and Modifying Server Data

Instead of using React's built-in `fetch` API or `axios`, I decided to use [React Query](https://tanstack.com/query/v3/). To fetch data, we use the `useQuery` hook, and to modify server data, such as posting or deleting data (create, update, and delete operations), we use the `useMutation` hook.

There are many benefits to using these two hooks from React Query. As opposed to using the built-in `fetch` API and `useEffect` for data fetching (which can get pretty cumbersome especially with caching and handling side effects), React Query gives us an out-of-box tool to manage all of these with simpler, easier-to-read/write code. Using React Query, we can, for example, fetch the user's list of projects, cache them with a key, and re-access them using this key--all without having to define a React state or a global Redux store. When mutating data, we can leverage `useMutation` hook to modify the server data and reflect these changes back to the cached data at one go. We can also optimistically update data in the browser before the mutation occurs, which can give a better, faster user experience. Optimistic update is implemented for operations like deleting project and task as well as marking task as "Finished," so that the user doesn't have to wait for the server to see the changes in the browser. Here's an example code that optimistically deletes a project:

```javascript
// frontend/project/ProjectDeleteIcon.js
const { mutate: deleteProject } = useMutateData(requestConfig, {
  onMutate: async () => {
    // cancel any outgoing refetches to prevent overwriting optimistic update
    await queryClient.cancelQueries(["projects"]);

    // snapshot the previous value
    const oldProjects = queryClient.getQueryData(["projects"]);

    // optimistically delete a project
    queryClient.setQueryData(["projects"], (oldQueryData) => {
      return oldQueryData.filter((project) => project.id !== projectId);
    });

    // return the snapshot in case mutation fails
    return {
      oldProjects,
    };
  },
  onError: (_err, _variables, context) =>
    // if mutation fails, use the context returned from onMutate to roll back
    queryClient.setQueryData(["projects"], context.oldProjects),
  onSettled: () =>
    // refetch regardless of success or error to match with server state
    queryClient.invalidateQueries({ queryKey: ["projects"] }),
});
```

Please note that optimistic update is not implemented for operations like creating/editing projects because the the created/edited timestamp is generated in the backend, and the frontend requires them for display purposes (i.e. we need to get the project data from the backend after creation/modification to display it in the frontend).

## Get in Touch

If you have any questions or want to contribute, feel free to reach out to jdtodo.help@gmail.com!
