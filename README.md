# Work.ai Task

## Table of contents
1. #### Introduction
2. #### Packages and Libraries
3. #### Installation
4. #### Setup and Usage


## Introduction

A backend app to create, read, update and delete users.

## Packages and Libraries
1. bcrypt
1. dotenv
1. express
1. jsonwebtoken 
1. mongoose 
1. uuid 
1. validator
1. mocha
2. should
3. chai
4. request


## Installation
The first step is to clone this repository.
Open command line and run the following command.
```
git clone https://github.com/kaisar12012000/work_ai_task.git
```
The next step is to go to the main branch and install all the required packages.
```
cd NoteMe
git checkout main
npm i
```

## Setup and Usage
### Setup
Now that all packages are installed it is time to proceed with the setup.

The first thing is to initialise the database. *We are using mongodb as our database. Make sure you have mongo and mongoShell(optional) already installed.*

In a new terminal inside your project directory run the following commands to initialize the database and collections.
```
cd reset
mongosh #If you've chosen to use mongoShell. An alternative command will be mongo.
use work_ai
load("reset.js") #This will initialize your db with some dummy values.
```
Now your database is ready. It is time to start the server. Open a new termianl in you root directory and run the following command.
```
nodemon server.js
```
The backend server should start at `PORT=3002`.

The next step is to run automation testcases that will ensure if the project is ready to be used. There are **unit tests** that need to be run to ensure that setup is done correctly. For the setup to complete all testcases should pass.

To run the tests open new terminal in the root directory and run the following command.
```
mocha
```

Once all testcases pass you are good to use the API's.

### Usage
There are total 7 API's. They are:
1. Super login
1. Create User
1. Get all users
1. Get User By Id
1. Put Update user
1. Patch Update User
1. Soft delete user

#### Super login
- Name: SUPER LOGIN
- Endpoint: http://localhost:3002/worko/super-login
- method: POST
- Response Body:
  ```json
    {
      "error": {},
      "data": {
        "accessToken": "Access-token-value"
      }
    }
  ```

#### Create User
- Name: Create User
- Endpoint: http://localhost:3002/worko/user
- method: POST
- Request Headers: 
  ```js
  {
     "Authorization": `Bearer ${token}`
  }
  ```
- Request Body:
  ```json
    {
        "name": "Unit Test User 1",
        "email": "unitTestUser1@testing.com",
        "age": 24,
        "city": "Nagpur",
        "zipCode": 440013
    }
  ```
- Response Code : 201
#### Get All Users
- Name: Get All Users
- Endpoint: http://localhost:3002/worko/users
- method: GET
- Request Headers: 
  ```js
  {
     "Authorization": `Bearer ${token}`
  }
  ```
- Response Body:
  ```json
    {
      "error": {},
      "data": {
        "users": [
          {
            "_id": "667e4d0e858a3c36c691f614",
            "id": "d97e2012-ab7e-407d-8044-a72e431059ed",
            "email": "unitTestUser1@testing.com",
            "name": "Unit Test User 1",
            "age": 24,
            "city": "Nagpur",
            "zipCode": 440013,
            "isDeleted": false,
            "__v": 0
          },
          {
            "_id": "667e518ca166f79e702cf212",
            "id": "06237355-6ca5-437f-894e-fc36eeb0e348",
            "email": "unitTestUser1@testing.com",
            "name": "Unit Test User 1",
            "age": 24,
            "city": "Nagpur",
            "zipCode": 440013,
            "isDeleted": false,
            "__v": 0
          }
        ]
      }
    }
  ```
#### Get User By Id
- Name: Get User By Id
- Endpoint: http://localhost:3002/worko/user/:userId
- method: GET
- Request Headers: 
  ```js
  {
     "Authorization": `Bearer ${token}`
  }
  ```
- Response Body:
  ```json
    {
      "error": {},
      "data": {
        "user":
          {
            "_id": "667e4d0e858a3c36c691f614",
            "id": "d97e2012-ab7e-407d-8044-a72e431059ed",
            "email": "unitTestUser1@testing.com",
            "name": "Unit Test User 1",
            "age": 24,
            "city": "Nagpur",
            "zipCode": 440013,
            "isDeleted": false,
            "__v": 0
          }
      }
    }
  ```
#### Put Update User By Id
- Name: Put Update User By Id
- Endpoint: http://localhost:3002/worko/user/:userId
- method: PUT
- Request Headers: 
  ```js
  {
     "Authorization": `Bearer ${token}`
  }
  ```
- Request Body:
  ```json
    {
        "name": "Unit Test User 1",
        "email": "unitTestUser1@testing.com",
        "age": 24,
        "city": "Nagpur",
        "zipCode": 440013
    }
  ```
- Response Code : 202
#### Patch Update User By Id
- Name: Put Update User By Id
- Endpoint: http://localhost:3002/worko/user/:userId
- method: PATCH
- Request Headers: 
  ```js
  {
     "Authorization": `Bearer ${token}`
  }
  ```
- Request Body:
  ```json
    {
        "name": "Unit Test User 01",
        "age": 24,
    }
  ```
- Response Code : 202
#### Soft Delete User By Id
- Name: Put Update User By Id
- Endpoint: http://localhost:3002/worko/user/:userId
- method: DELETE
- Request Headers: 
  ```js
  {
     "Authorization": `Bearer ${token}`
  }
  ```
- Response Code : 204
