trip advis
react node express sql

step 1
.gitinore created 

then 

fe,be 

in be 
```
npm init -y 
npm i express dotenv cors
npm install -D nodemon
npm install bcryptjs jsonwebtoken nodemailer
npm install -D @types/bcryptjs @types/jsonwebtoken
```

folder structure
backend/
├── config/
│   ├── database.js
│   
├── controllers/
│   └── authController.js
├── middleware/
│   └── auth.js
├── routes/
│   └── auth.js
├── models/
│   └── User.js
├── utils/
│   ├── jwt.js
│   └── sendEmail.js
└── server.js

Next Steps:
Set up SQL Server connection

Create auth routes (register, verify, login)

Add email verification logic

```
npm install mssql
```
