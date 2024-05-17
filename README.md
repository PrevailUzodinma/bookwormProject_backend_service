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

    {
      "email": "example@example.com"
    }
```
-   Response: 

```
    json

    {
     status: 'success',
     message: 'password reset link sent to the user email'
   }
```


### Reset Password

-   Method: `PATCH`
-   Route: `https://books-be-11.onrender.com/api/v1/users/resetPassword/:id` - please note: `id` is the token sent to the email of the client
-   Description: Resets the user's password using a reset token.
-   Request Body:
```
    json

    {
      "password": "newpassword123",
      "confirmPassword": "newpassword123"
    }
```
-   Response:

```
    json

    {
      "message": "password reset successfully",
    }
```
### Reset Password

-   Method: `GET`
-   Route: `https://books-be-11.onrender.com/api/v1/users/logout`
-   Description: Logs out an existing user.
-   Response:

```
    json

    {
      message: "Logout successful"
    }
```

eBook API Documentation
-----------------------
### 1\. Search eBooks

-   Method: `POST`
-   Route: `https://books-be-11.onrender.com/api/v1/ebooks/search`
-   Description: Search for eBooks using various query parameters. You can combine multiple parameters to refine your search.

    #### Query Parameters (eg. /?author)

-   `q` (string): General search term.
-   `keyword` (string): Keyword to search in the title.
-   `author` (string): Author name to search.
-   `categories` (string): Category to search.
-   Request Example:
    - Searching by general term
    ```
    POST /ebooks/search?q=love
    ``` 
    - Searching by author only
    ```
    POST /ebooks/search?author=john
    ``` 
    - Searching by category only
    ```
    POST /ebooks/search?categories=fantasy
    ``` 
    - Searching by author, and category
    ```
    POST /ebooks/search?author=harry&categories=fiction
    ``` 
    - Searching by keyword, author, and category
    ```
    POST /ebooks/search?keyword=cream&author=mary&categories=fantasy
    ``` 

-   Response: Returns the search data.
```
json

{
  "success": true,
  "message": "Ebooks fetched successfully",
  "data": [
    {
      "id": "1",
      "title": "The Hobbit",
      "description": "A fantasy novel by J.R.R. Tolkien",
      "categories": ["Fantasy"],
      "author": "J.R.R. Tolkien",
      "thumbnail": "http://example.com/image.jpg",
      "url": "http://example.com/ebook"
    }
  ]
}
```
### 2\. Save eBook
-   Method: `POST`
-   Route: `https://books-be-11.onrender.com/api/v1/ebooks/save`
-   Description: Save an eBook for the authenticated user.
-   Headers: `Authorization`: Bearer token
-   Body Parameters: `id` (string): ID of the eBook to save.
-   Request Example:
```
json

Headers:
{
  "Authorization": "Bearer <token>"
}

Request Body:
{
  "id": "YTcyedkl"
}
```
- Response Example: 

```
json

{
  "success": true,
  "message": "Ebook saved successfully to this user",
  "data": {
    "userId": "123",
    "ebookId": "YTcyedkl",
    ebook
  }
}
```
### 3\. Get Saved eBooks
-   Method: `GET`
-   Route: `https://books-be-11.onrender.com/api/v1/ebooks/saved`
-   Description: Get all saved eBooks for the authenticated user.
-   Headers: `Authorization`: Bearer `token`
-   Request Example:
```
json

Headers:
{
  "Authorization": "Bearer <token>"
}`
```
- Response Example:
```
json

{
  "success": true,
  "message": "Saved ebooks fetched successfully",
  "data": [
    {
      "id": "234567890",
      "title": "The Hobbit",
      "description": "A fantasy novel by J.R.R. Tolkien",
      "categories": ["Fantasy"],
      "author": "J.R.R. Tolkien",
      "thumbnail": "http://example.com/image.jpg",
      "url": "http://example.com/ebook"
    }
  ]
}
```
### 4\. Delete Saved eBook
-   Method: `DELETE`
-   Route: `https://books-be-11.onrender.com/api/v1/ebooks/saved/:id`
-   Description: Delete a saved eBook by its ID for the authenticated user.
-   Headers: `Authorization`: Bearer `token`
-   Body Parameters: `id` (string): ID of the eBook to save.
-   Request Example:
```
json

Headers:
{
  "Authorization": "Bearer <token>"
}`
```
- Response Example
```
json

{
  "success": true,
  "message": "saved ebook deleted successfully",
  "data": {
    "id": "234567890",
    "title": "The Hobbit",
    "description": "A fantasy novel by J.R.R. Tolkien",
    "categories": ["Fantasy"],
    "author": "J.R.R. Tolkien",
    "thumbnail": "http://example.com/image.jpg",
    "url": "http://example.com/ebook"
  }
}
```
### 5\. Search eBook by ID
-   Method: `GET`
-   Route: `https://books-be-11.onrender.com/api/v1/ebooks/search/:id`
-   Description: Get a specific eBook by its ID.
-   Body Parameters: `id` (string): ID of the eBook to retrieve.
-   Request Example:
```
GET ebooks/search/234567890
```
- Response Example: 

```
json

{
  "success": true,
  "message": "ebook fetched successfully",
  "data": {
    "id": "234567890",
    "title": "The Hobbit",
    "description": "A fantasy novel by J.R.R. Tolkien",
    "categories": ["Fantasy"],
    "author": "J.R.R. Tolkien",
    "thumbnail": "http://example.com/image.jpg",
    "url": "http://example.com/ebook"
  }
}
```

Dependencies
------------

-   Node.js: Ensure you have Node.js installed on your system.
-   Express.js: This project is built using Express.js, a web application framework for Node.js.
-   jsonwebtoken: For generating and verifying JSON Web Tokens (JWT) used in authentication.
-   bcrypt: For hashing passwords securely.
-   nodemailer: For sending emails for password reset functionality.
- cors: cors is used to enable Cross-Origin Resource Sharing (CORS) in your Express.js application, allowing your API to handle requests from different origins.
- axios: axios is a promise-based HTTP client for the browser and Node.js. It is used for making HTTP requests to external APIs.
- mongoose: mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward, schema-based solution to model your application data.