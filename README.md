# **Client Support Tickets API Documentation**

## **Overview**

This API allows you to manage client support tickets efficiently. You can create, retrieve, update, and delete tickets using this API. It follows RESTful principles and provides responses in JSON format.

## **Technologies Used**

The API is built using the following technologies:

- **Programming Language**: JavaScript (Node.js)
- **Web Framework**: Express.js
- **Database**: MongoDB (using Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Access control**: Role-based access control (RBAC) using accesscontrol library
- **Dependencies**:
    - **`accesscontrol`** (2.2.1): Role-based access control for handling permissions
    - **`bcryptjs`** (2.4.3): Password hashing and comparison
    - **`dotenv`** (16.3.1): Environment variables management
    - **`express`** (4.18.2): Web framework for handling HTTP requests
    - **`jsonwebtoken`** (9.0.1): Generation and verification of JSON Web Tokens
    - **`mongoose`** (7.3.1): MongoDB object modeling for Node.js
    - **`mongoose-autopopulate`** (1.0.1): Mongoose plugin for autopopulating referenced documents

## **How to Install and Run**

Follow the steps below to install and run the API:

1. **Clone the Repository**:
    
    ```
    git clone https://github.com/sandrorzimmer/tickets.git
    cd tickets
    ```

2. Navigate to the project directory:
    
    ```
    cd tickets
    ```

3. **Install Dependencies**:
    
    ```
    npm install
    ```
    
4. **Database Configuration**:

    Configure your MongoDB connection in the appropriate files (**`.env`**).

    An example of .env file (**.env.example**) is provided.


1. **Run the API**:
    
    ```
    npm start
    ```
    

The server will start running at [http://localhost:3000](http://localhost:3000/).

## **API Endpoints**

The API provides the following endpoints for managing support tickets:

### **Authentication**

- **Endpoint**: **`/api/login`**
- **Method**: **`POST`**
- **Description**: Obtain an access token (JWT) by providing valid credentials (username and password).
- **Request**:
    
    ```
    {
      "userName": "your_username",
      "password": "your_password"
    }
    ```
    
- **Response**:
    
    ```
    {
      "token": "your_access_token"
    }
    ```
    

### **Ticket Endpoints**

#### **Endpoint**: **`/api/tickets`**
- **Method**: **`GET`**
- **Description**: Get a paginated list of all support tickets.
- **Authentication**: Required (Bearer Token)
- 
#### **Endpoint**: **`/api/tickets/search`**
- **Method**: **`GET`**
- **Description**: Get a paginated list of support tickets based on search criteria (e.g., title, description, or solution).
- **Authentication**: Required (Bearer Token)
- **Query Parameters**:
    - **`title`**: Ticket title to search for (optional)
    - **`description`**: Ticket description to search for (optional)
    - **`solution`**: Ticket solution to search for (optional)
    - 
#### **Endpoint**: **`/api/tickets/{ticket_id}`**
- **Method**: **`GET`**
- **Description**: Get details of a specific support ticket.
- **Authentication**: Required (Bearer Token)
- 
#### **Endpoint**: **`/api/tickets`**
- **Method**: **`POST`**
- **Description**: Create a new support ticket.
- **Authentication**: Required (Bearer Token)
- **Request**:
    
    ```
    {
      "title": "Ticket Title",
      "description": "Detailed description of the issue",
      "solution": "Solution to the ticket issue",
      "ticketType": "ticket_type_id",
      "priority": "priority_id",
      "client": "client_id",
      "author": "author_id",
      "responsible": "responsible_id"
    }
    ```
    
- **Response**:
    
    ```
    {
      "id": "ticket_id",
      "title": "Ticket Title",
      "description": "Detailed description of the issue",
      "solution": "Solution to the ticket issue",
      "ticketType": {
        "id": "ticket_type_id",
        "name": "Ticket Type Name"
      },
      "priority": {
        "id": "priority_id",
        "name": "Priority Name"
      },
      "client": {
        "id": "client_id",
        "name": "Client Name"
      },
      "author": {
        "id": "author_id",
        "name": "Author Name",
        "userName": "author_username"
      },
      "responsible": {
        "id": "responsible_id",
        "name": "Responsible Name",
        "userName": "responsible_username"
      },
      "assignedAt": "2023-07-21T12:00:00Z",
      "completedAt": "2023-07-21T14:00:00Z",
      "createdAt": "2023-07-21T12:00:00Z",
      "updatedAt": "2023-07-21T14:00:00Z"
    }
    ```
    
#### **Endpoint**: **`/api/tickets/{ticket_id}`**
- **Method**: **`PUT`**
- **Description**: Update a specific support ticket.
- **Authentication**: Required (Bearer Token)
- **Request**:
    
    ```
    {
      "title": "Updated Ticket Title",
      "description": "Updated description of the issue",
      "solution": "Updated solution to the ticket issue",
      "ticketType": "updated_ticket_type_id",
      "priority": "updated_priority_id",
      "client": "updated_client_id",
      "author": "updated_author_id",
      "responsible": "updated_responsible_id"
    }
    ```
    
- **Response**:
    
    ```
    {
      "id": "ticket_id",
      "title": "Updated Ticket Title",
      "description": "Updated description of the issue",
      "solution": "Updated solution to the ticket issue",
      "ticketType": {
        "id": "updated_ticket_type_id",
        "name": "Updated Ticket Type Name"
      },
      "priority": {
        "id": "updated_priority_id",
        "name": "Updated Priority Name"
      },
      "client": {
        "id": "updated_client_id",
        "name": "Updated Client Name"
      },
      "author": {
        "id": "updated_author_id",
        "name": "Updated Author Name",
        "userName": "updated_author_username"
      },
      "responsible": {
        "id": "updated_responsible_id",
        "name": "Updated Responsible Name",
        "userName": "updated_responsible_username"
      },
      "assignedAt": "2023-07-21T13:00:00Z",
      "completedAt": "2023-07-21T15:00:00Z",
      "createdAt": "2023-07-21T12:00:00Z",
      "updatedAt": "2023-07-21T15:00:00Z"
    }
    ```
    
#### **Endpoint**: **`/api/tickets/{ticket_id}`**
- **Method**: **`DELETE`**
- **Description**: Delete a specific support ticket.
- **Authentication**: Required (Bearer Token)

### **Client endpoints**
#### **Endpoint**: **`/api/clients`**
- **Method**: **`GET`**
- **Description**: Get a paginated list of all clients.
- **Authentication**: Required (Bearer Token)

#### **Endpoint**: **`/api/clients/{client_id}`**
- **Method**: **`GET`**
- **Description**: Get details of a specific client.
- **Authentication**: Required (Bearer Token)
- 
#### **Endpoint**: **`/api/clients`**
- **Method**: **`POST`**
- **Description**: Create a new client.
- **Authentication**: Required (Bearer Token)
- **Request**:
    
    ```
    {
      "name": "Client name",
      "city": "Client city",
      "state": "Client state",
      "companyNumber": "Client unique company number"
    }
    ```
    
#### **Endpoint**: **`/api/clients/{client_id}`**
- **Method**: **`PUT`**
- **Description**: Update a specific client.
- **Authentication**: Required (Bearer Token)
- **Request**:
    
    ```
    {
      "name": "Client name",
      "city": "Client city",
      "state": "Client state",
      "companyNumber": "Client unique company number"
    }
    ```
    
#### **Endpoint**: **`/api/clients/{client_id}`**
- **Method**: **`DELETE`**
- **Description**: Delete a specific client.
- **Authentication**: Required (Bearer Token)

### **User endpoints**
#### **Endpoint**: **`/api/users`**
- **Method**: **`GET`**
- **Description**: Get a paginated list of all users.
- **Authentication**: Required (Bearer Token)

#### **Endpoint**: **`/api/users/{user_id}`**
- **Method**: **`GET`**
- **Description**: Get details of a specific user.
- **Authentication**: Required (Bearer Token)
- 
#### **Endpoint**: **`/api/users`**
- **Method**: **`POST`**
- **Description**: Create a new user.
- **Authentication**: Required (Bearer Token)
- **Request**:
    
    ```
    {
      "name": "User name",
      "userName": "Username",
      "password": "User password",
      "userRole": "userRole_id",
      "userGroup": "userGroup_id"
    }
    ```
    
#### **Endpoint**: **`/api/users/{user_id}`**
- **Method**: **`PUT`**
- **Description**: Update a specific user.
- **Authentication**: Required (Bearer Token)
- **Request**:
    
    ```
    {
      "name": "User name",
      "userName": "Username",
      "password": "User password",
      "userRole": "userRole_id",
      "userGroup": "userGroup_id"
    }
    ```
    
#### **Endpoint**: **`/api/users/{user_id}`**
- **Method**: **`DELETE`**
- **Description**: Delete a specific user.
- **Authentication**: Required (Bearer Token)

### **Priority endpoints**
#### **Endpoint**: **`/api/priorities`**
- **Method**: **`GET`**
- **Description**: Get a paginated list of all priorities.
- **Authentication**: Required (Bearer Token)

#### **Endpoint**: **`/api/priorities/{priority_id}`**
- **Method**: **`GET`**
- **Description**: Get details of a specific priority.
- **Authentication**: Required (Bearer Token)
- 
#### **Endpoint**: **`/api/priorities`**
- **Method**: **`POST`**
- **Description**: Create a new priority.
- **Authentication**: Required (Bearer Token)
- **Request**:
    
    ```
    {
      "name": "Priority name"
    }
    ```
    
#### **Endpoint**: **`/api/priorities/{priority_id}`**
- **Method**: **`PUT`**
- **Description**: Update a specific priority.
- **Authentication**: Required (Bearer Token)
- **Request**:
    
    ```
    {
      "name": "Priority name"
    }
    ```
    
#### **Endpoint**: **`/api/priorities/{priority_id}`**
- **Method**: **`DELETE`**
- **Description**: Delete a specific priority.
- **Authentication**: Required (Bearer Token)

### **Ticket status endpoints**
It has identical endpoints of priorities. Follows the same pattern of addresses, methods and fields.

### **Ticket type endpoints**
It has identical endpoints of priorities. Follows the same pattern of addresses, methods and fields.

### **User group endpoints**
It has identical endpoints of priorities. Follows the same pattern of addresses, methods and fields.

### **User role endpoints**
It has identical endpoints of priorities. Follows the same pattern of addresses, methods and fields.

Considering the permissions implemented in the project, there must be at least three kinds of roles: user, supervisor and admin.

It is possible to modify this structure as needed, but may be necessary modify permissions according to updated roles for each endpoint.

## **Error Handling**

In case of any errors during API requests, the API will return appropriate HTTP status codes along with error messages in the response body. Error responses will follow the following format:

```
    {
        "message": "No token provided.",
        "status": 401
    }
```
The API uses the following set of status responses and error messages according to the situation. For example:

- **status: 400 - message: One or more provided data are incorrect**
    - An invalid date was provided in search.
    - An invalid ID value was provided.
- **status: 400 - message: The following errors were found: <field> is required**
    - A required field is missing.
- **status: 404 - message: Page not found**
    - The page does not exist. There might be a typo in the URL.
- **status: 500 - message: Internal server error**
    - An unexpected error has occurred on the server while processing the request.

# Security

The API uses best practices of security for authetication and access control.

## Authentication

The authentication proccess is based on **JSON Web Token - JWT**.

All endpoints require user authentication. So the user has to provide his username and password to get a token (JWT).

The client can store this token and include it in subsequent API requests to gain access to protected routes, ensuring that only authenticated users can access sensitive data and perform specific actions.

It is important to ensure that your JWT secret (process.env.JWT_SECRET) is kept secure and not exposed to unauthorized users, as this is essential for token validation and security. Additionally, you should set a proper expiration time (process.env.JWT_EXPIRATION) to control the lifespan of the JWT token and enhance security.

## Password entry

The user must provide a password complying with specific rules that are validated when a new user is created or the user password is updated.

The password is validated by a function which tests if the password contains at least:

1. 8 characters.
2. One lowercase letter.
3. One uppercase letter.
4. One number.

## Password storage

The API provides best practices of encryption and storage for password, securely hashing and salting passwords before saving on the database, using bcrypt library. It prevents password information leaking even if an unauthorized access to database occurs.

1. Password Hashing: The bcryptjs library is utilized to hash passwords before storing them in the database. When a user registers or updates their password, the password is hashed using a one-way cryptographic hash function. This hash function converts the password into a fixed-length string of characters, making it computationally infeasible to reverse-engineer the original password from the hash.

2. Salt Generation: To further enhance security, bcryptjs automatically generates and manages salts for each password hash. A salt is a random value that is combined with the password before hashing. This process adds a unique factor to each password, preventing identical passwords from having the same hash. Salting is essential to prevent certain attacks, such as rainbow table attacks.

3. Password Verification: When a user attempts to log in, the provided password is hashed using the same algorithm and salt, and the resulting hash is compared with the stored hash in the database. If the two hashes match, it means the provided password is correct, and access is granted.

## Access control

Access control is an essential part of secutiry that involves managing different user roles and permissions. It is called role-based access control - RBAC.

The API defines three basic roles:
- user: it is able to read information from any endpoint. However, it is only allowed to create and change information on tickets.
- supervisor: extends all permissions from user and it is also allowed to create and change client information.
- admin: it is allowed to create, read, update and delete any information.

# Testing

This API does not currently provide automated tests. All performed tests were realized manually during development.

# Contribution

Contributions are highly appreciated and help improve the project. To contribute, please follow these guidelines:

## Bug reports

If you encounter a bug or issue with the API, please help us by submitting a detailed bug report. Follow these steps to report a bug:

1. Check the existing **[GitHub Issues](https://github.com/sandrorzimmer/expenses/issues)** to see if the bug has already been reported.
2. If the bug hasn't been reported, **[create a new issue](https://github.com/sandrorzimmer/expenses/issues/new)**.
3. Provide a clear and descriptive title for the issue.
4. Include steps to reproduce the bug, along with any relevant code snippets or error messages.
5. Add any additional context or information that might be helpful for understanding and resolving the issue.

## Feature requests

If you have a suggestion or would like to request a new feature for the Expenses API, please follow these steps:

1. Check the existing **[GitHub Issues](https://github.com/sandrorzimmer/expenses/issues)** to see if the feature has already been requested.
2. If the feature hasn't been requested, **[create a new issue](https://github.com/sandrorzimmer/expenses/issues/new)**.
3. Clearly describe the feature you would like to see added and explain its purpose and potential benefits.
4. Provide any relevant examples, use cases, or implementation details that can help in understanding the feature request.

## Pull requests

We welcome pull requests that address bug fixes, feature enhancements, or code improvements. To submit a pull request:

1. Fork the repository and create a new branch for your changes.
2. Make your changes and ensure the code follows the existing coding style and conventions.
3. Write tests to cover the changes if applicable.
4. Commit your changes with a clear and descriptive commit message.
5. Open a pull request against the ***main*** branch of the original repository.
6. Provide a detailed description of the changes and their purpose.

Please note that all contributions are subject to review and may require some iteration before they are merged into the main codebase.

Thank you for considering contributing to the Expenses API! Your contributions play a valuable role in enhancing the API and making it more robust and feature-rich.

# License

This project is licensed under the **[MIT License](https://chat.openai.com/c/LICENSE)**.