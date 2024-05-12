# BOOKS-BE-11

Books Backend API Documentation
===============================

Introduction
------------

Welcome to the documentation for the Books Backend API. This API provides endpoints for user authentication and password management. Below you will find information on how to consume these routes, including the required dependencies and example requests and responses.

Base URL
--------

All API endpoints are relative to the base URL:

```
https://books-be-11.onrender.com/api/v1
```

Authentication
--------------

### Signup

-   Method: `POST`
-   Route: `https://books-be-11.onrender.com/api/v1/users/signup`
-   Description: Creates a new user account.
-   Request Body:
```
    json

    {
      "email": "example@example.com",
      "password": "password123"
    }
```
-   Response: Returns the newly created user object.

### Login

-   Method: `POST`
-   Route: `https://books-be-11.onrender.com/api/v1/users/login`
-   Description: Logs in an existing user.
-   Request Body:
```
    json

    {
      "email": "example@example.com",
      "password": "password123"
    }
```
-   Response: Returns a JWT token for authenticated requests.

### Forgot Password

-   Route: `POST`
-   Route: `https://books-be-11.onrender.com/api/v1/users/forgotPassword`
-   Description: Sends an email with instructions to reset the user's password.
-   Request Body:
```
    json

    `{
      "email": "example@example.com"
    }`
```
-   Response: 

```
    json

    `{
     status: 'success',
     message: 'password reset link sent to the user email'
   }`
```


### Reset Password

-   Method: `PATCH`
-   Route: `https://books-be-11.onrender.com/api/v1/users/resetPassword/:id` - please note: `id` is the token sent to the email of the client
-   Description: Resets the user's password using a reset token.
-   Request Body:
```
    json

    `{
      "password": "newpassword123",
      "confirmPassword": "newpassword123"
    }`
```
-   Response:

```
    json

    `{
      "message": "password reset successfully",
    }`
```



Dependencies
------------

-   Node.js: Ensure you have Node.js installed on your system.
-   Express.js: This project is built using Express.js, a web application framework for Node.js.
-   jsonwebtoken: For generating and verifying JSON Web Tokens (JWT) used in authentication.
-   bcrypt: For hashing passwords securely.
-   nodemailer: For sending emails for password reset functionality.