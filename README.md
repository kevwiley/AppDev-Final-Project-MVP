# AppDev-Final-Project-MVP

This project is a REST API where users can view computer parts and builds put together by others. After making an account, they can upload and edit their own builds, as well as add extra parts. Admins will be able to delete any user, build, or part, and access a list of all current users.

---
## Setup

Install dependencies using `npm install`  
Seed the database using `node database/seed.js`  

Create .env file in this format:  
```
# Environment
NODE_ENV=production

# Server Configuration
PORT=3000

# JWT Configuration
JWT_SECRET=enter_key
JWT_EXPIRES_IN=24h

# Database Configuration
DB_NAME=pcbuilder.db
```  

Tests can be run with `npm test`  

Start the database using `npm start`  

---
## Feature List

User builds, and parts are available to anyone, even if not logged in.  
Users with the "user" role when logged in may upload parts and builds, as well as update their own.  
Users with the "admin" role when logged in may access the user list, and delete parts, builds, or users.  

Parts have their own Ids, and these Ids are what need to be used when creating a build.  

---
## Endpoints

### (Updated) `Register and Login`

`http://localhost:3000/api/register` - Will create new user  
Response: `User Object`  
Format:
```
{
  "username": "testuser",
  "email": "testuser@test.com",
  "password": "123456"
}
```

`http://localhost:3000/api/login` - Will allow user to log in  
Response: `Token`  
Format:
```
{
  "message": "User registered",
  "user": {
    "id": 3,
    "username": "testuser",
    "email": "testuser@test.com"
  }
}
```
---

### `Get`

`http://localhost:3000/api/parts` - Will retrun a list of available parts, can search by id  
Response `Array`  
`http://localhost:3000/api/builds` - Will return a list of builds can search by id  
Response `Array`  
`http://localhost:3000/api/users` **Requires admin role** - Will return list of users  
Response `Array`  

---

### `Post`

`http://localhost:3000/api/parts` **Requires user or admin role** - Adds Part to collection  
Response `Object`  
Format: 
```
{
  "name": "Test GPU",
  "category": "GPU",
  "price": 700
}
```

`http://localhost:3000/api/builds` **Requires user or admin role** - Adds Build to collection  
Response `Object`  
Format:
```
{
  "name": "New Build",
  "cpuId": 1,
  "gpuId": 5,
  "motherboardId": 9,
  "ramId": 13,
  "storageId": 17
}
```

---

### `Put`

`http://localhost:3000/api/users/:id` **Requires account owner** - Updates Username  
Response `Updated user`  
Format:
```
{
  "username": "updatedUser"
}
```

`http://localhost:3000/api/parts/:id` **Requires user or admin role** - Updates Part  
Response `Updated part`  
Format:
```
{
  "price": 600
}
```

`http://localhost:3000/api/builds/:id` **Requires build owner or admin role** - Updates Build  
Response `Updated build`  
Format:
```
{
  "gpuId": 4
}
```

---

### `Delete`

`http://localhost:3000/api/users/:id` **Requires admin role** - Deletes User  
Response `Message`  
`http://localhost:3000/api/parts/:id` **Requires admin role** - Deletes Part  
Response `Message`  
`http://localhost:3000/api/builds/:id` **Requires admin role** - Deletes Build  
Response `Message`  

---

## Possible Future Implementations

Price Comparison Features  
Part Spec Comparison  
Price Range Search  

---

## Project Tree
```
AppDev-Final-Project-MVP/
├── database/
│   ├── models/
│   │   ├── user.js
│   │   ├── part.js
│   │   ├── build.js
│   │   └── index.js
│   ├── seed.js
│   └── setup.js
│
├── routes/
│   ├── auth.js
│   ├── builds.js
│   ├── parts.js
│   └── users.js
│
├── middleware/
│   └── auth.js
│
├── __tests__/
│   └── api.test.js
│
├── server.js
└── package.json
```
