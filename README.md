
# Project SetUp
## Prerequisites
1. Node.js _v18.17.0 and above 
2. Database :MongoDb
## Installing
1. npm install
2. npm start
3. The API server will start running on http://localhost:5000 by default.
# Endpoints/APIs
## Authentication.

### POST   /user/login

Description: User Login.
### POST   /user/signup

Description: User Signup.
 
### POST   /user/task/addtask

Description: Adding Task
### PUT  /user/task//taskdetails/:taskId

Description: Editing the Task
### DELETE  user/task/deletetask/:taskId

Description: Delete the Task
### GET  /user/task/alltasks

Description: All Tasks 
### GET /user/task//taskdetails/:taskId

Description:Details of task with taskId

## Deployment

Deployed with render 