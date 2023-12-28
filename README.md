<h1 align="center">JDTodo</h1>
<div align="center">
  <h3>A simple tool for managing projects and tasks</h3>
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
  - [Environment Variables](#environment-variables)
  - [Frontend](#frontend-1)
  - [Backend](#backend-1)
- [Pages](#pages)
  - [Dashboard](#dashboard)
  - [Project Details](#project-details)
  - [Manage Account](#manage-account)
- [Implementation Details/Technical Notes](#implementation-detailstechnical-notes)
  - [API Documentation](#api-documentation)
    - [`User` endpoints](#user-endpoints)
    - [`Project` endpoints](#project-endpoints)
    - [`Task` endpoints](#task-endpoints)
  - [Data Models](#data-models)
  - [Note on State Management](#note-on-state-management)
- [Get in Touch](#get-in-touch)

## Project Overview

JDTodo is a web application designed for managing projects and tasks. It uses a React for the frontend and Python Flask for the backend to provide a user-friendly and efficient project/task management system.

## Tech stack

### Frontend

<p>
  <img alt="React" src="https://img.shields.io/badge/React-%2361DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img alt="Javascript" src="https://img.shields.io/badge/Javascript-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
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

## Installation and Setup
Fork this repository and clone it locally. Once completed, follow these steps:

### Environment variables 
Create a `.env` file at the root of the repository, then define the following 6 environment variables:
- `SQLALCHEMY_DATABASE_URI`
  - URI used to connect to the database (e.g. sqlite:////tmp/test.db, mysql://username:password@server/db). You will first need to create your own.
- `JWT_SECRET_KEY`
  - Secret key used for signing and verifying JWTs. A good rule of thumb is to use a secret key with a length of at least 256 bits (32 bytes) or longer and also a random, unique string generated cryptographically (e.g. `secrets.token_hex(32)`).
- `MAIL_USERNAME`
  - Username for your Gmail account
- `MAIL_PASSWORD`
  - Password for your Gmail account
- `BASE_FRONTEND_URL`
  - The URL where your frontend application is hosted (e.g. https://localhost:3000)
- `REACT_APP_BASE_BACKEND_URL`
  - The URL where your backend application is hosted (e.g. https://localhost:5000)
  
### Backend
Once these have been set, then follow these steps to run the backend development server:
1. `cd backend`
2. `pipenv shell`
3. `pipenv install`
4. `flask --app app run`

### Frontend

Follow these steps to run the frontend development server:

1. `cd frontend`
2. `npm install`
3. `npm start`

## Pages
Below are some of the essential pages that underpin the core functionality and represent the backbone of the application.of our application. Presented here are detailed descriptions and accompanying screenshots of the Dashboard, Project Details, and Manage Account pages. 

### Dashboard

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

### Project Details 

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

### Manage Account

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

## Implementation Details/Technical Notes

### API Documentation
<i>NOTE:</i> this represents the application's <i>internal</i> API and is not intended for use as an <i>open</i> API. It's important to note that documenting an internal API can pose certain security risks. However, in the context of showcasing my portfolio project, the purpose is solely to provide supplementary information.

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
  > | `200` | <code>{ 'user': { 'id': user.id, 'firstname': user.firstname, 'lastname': user.lastname, 'email': user.email }, 'message': 'Login success' }</code> |  
  > | `400` | <code>{ 'error': 'Missing request body' } OR { 'error': 'Please fill in all the required field(s)' } OR { 'error': 'Email is not valid' }</code> |              
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
  > | `400` | <code>{ 'error': 'Missing request body' } OR { 'error': 'Please fill in all the required field(s)' } OR { 'error': 'Email is not valid' } OR { 'error': 'Password must match' } OR { 'error': 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number' }</code> | 
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
  > | `200` | <code>{ 'user': { 'id': user.id, 'firstname': user.firstname, 'lastname': user.lastname, 'email': user.email }, 'message': 'User successfully fetched' }</code> |
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
  > | `200` | <code>{ 'user': { 'id': user.id, 'firstname': user.firstname, 'lastname': user.lastname, 'email': user.email }, 'message': 'User successfully modified' }</code> |
  > | `400` | <code>{ 'error': 'Missing request body' } OR { 'error': 'Please fill in all the required field(s)' } OR { 'error': 'Email is not valid' }</code> | 
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
  > | `400` | <code>{ 'error': 'Missing request body' } OR { 'error': 'Please fill in all the required field(s)' } OR { 'error': 'Email is not valid' } OR { 'error': 'Passwords must match' } OR { 'error': 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number'} OR { 'error': 'New password must be different from your current one' }</code> | 
  > | `401` | `{ 'error': 'Missing cookie 'access_token_cookie'' }` |
  > | `403` | <code>{ 'error': 'Access denied' } OR { 'error': 'Incorrect password' }</code> |
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
  > | `400` | <code>{ 'error': 'Missing request body' } OR { 'error': 'Please fill in all the required field(s)' } OR { 'error': 'Email is not valid' } |
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
  > | `400` | <code>{ 'error': 'Missing request body' } OR { 'error': 'Please fill in all the required field(s)' } OR { 'error': 'Passwords must match' } OR { 'error': 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number'} OR { 'error': 'New password must be different from your original one' }</code> | 
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
  > | `200` | <code>{ 'project': { 'proj_id': project.id, 'proj_name': project.name, 'date_updated': project.updated_at }, 'message': 'Project successfully fetched' }</code> |
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
  > | `200` | <code>{ 'project': { 'proj_id': project.id, 'proj_name': project.name, 'date_updated': project.updated_at }, 'message': 'Project successfully modified' }</code> |
  > | `400` | <code>{ 'error': 'Missing request body' } OR { 'error': 'Please fill in all the required field(s)' } OR { 'error': 'Project name must be less than 25 characters' }</code> | 
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
  > | `200` | <code>{ 'project': &lsqb;{ 'proj_id': project.id, 'proj_name': project.name, 'date_updated': project.updated_at }, ...&rsqb;, 'message': 'Projects successfully fetched' }</code> |
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
  > | `201` | <code>{ 'project': { 'proj_id': project.id, 'proj_name': project.name, 'date_updated': project.updated_at }, 'message': 'Project successfully created' }</code> |
  > | `400` | <code>{ 'error': 'Missing request body' } OR { 'error': 'Please fill in all the required field(s)' } OR { 'error': 'Project name must be less than 25 characters' }</code> | 
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
  > | `200` | <code>{ 'tasks': &lsqb;{ 'task_id': task.id, 'task_name': task.name, 'task_description': task.description, 'task_deadline': task.deadline, 'task_status': task.status }, ...&rsqb;, 'message': 'Tasks successfully fetched' }</code> | 
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
  > | `201` | <code>{ 'task': { 'task_id': task.id, 'task_name': task.name, 'task_description': task.description, 'task_deadline': task.deadline, 'task_status': task.status }, 'message': 'Task successfully created' }</code> |
  > | `400` | <code>{ 'error': 'Missing request body' } OR { 'error': 'Please fill in all the required field(s)' } OR { 'error': 'Task name must be less than 60 characters' } OR { 'error': 'Task deadline cannot be in the past' }</code> | 
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
  > | `200` | <code>{ 'task': { 'task_id': task.id, 'task_name': task.name, 'task_description': task.description, 'task_deadline': task.deadline,'task_status': task.status }, 'message': 'Task successfully modified' }</code> |
  > | `400` | <code>{ 'error': 'Missing request body' } OR { 'error': 'Please fill in all the required field(s)' } OR { 'error': 'Task name must be less than 60 characters' } OR { 'error': 'Task deadline cannot be in the past' } OR { 'error': 'Task description must be less than 300 characters' }</code> | 
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

  ##### Parameters

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
<i>NOTE:</i> much like the preceding discussion on API routes, the presentation of this database structure serves the purpose of showcasing a pivotal facet of my portfolio project. However, it is crucial to acknowledge that the exposure of such sensitive information introduces potential security vulnerabilities.

In `backend/models`, you will find 3 modules, `user.py`, `project.py`, `task.py`, each of which represents data for the 3 entities in this project: user, project, and task. Here is the Entry Relationship Diagram (ERD) that shows each field for each model, and how the 3 models work together:

<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1GKigIupkcTXZS7lQ8y6aGdR1YPNKY3VS" width="800">
  </div>
</div>

### Note on State Management
In this fullstack application, we need to manage both the client and server states. I have implemented Redux and React Redux for managing client state, and React-Query for managing server states. Each usage has been evaluated to ensure I am not duplicating state management between multiple tools whenever possible.

## Get in Touch
If you have any questions or want to contribute, feel free to reach out to jdtodo.help@gmail.com!
