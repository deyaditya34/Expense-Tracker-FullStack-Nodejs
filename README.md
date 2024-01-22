# **FINANCE TRACKER APPLICATION - BACK-END PROJECT DOCUMENTATION** #

### **_Project Overview_** ###
This application can be your reliable companion for managing and tracking your financial transactions effortlessly. This application is designed to provide a seamless experience for users to record, categorize, and analyze their expenses and incomes, helping them gain insights into their spending habits and savings.

### **_Dependencies_** ###
* **Node.js :** The project is built by using Node.js for all the server side developments.
* **Express.js :** All the API's are built using express.js.
* **MongoDB :** As a NoSQL database, it is very efficient for storing and managing data.  
* **JWT Authentication :** JSON Web Token (JWT) authentication system is used to ensure secure data sessions.
* **DOTNEV :** All the configuration variables, passwords etc are isolated using dotenv library. 
* **Crypto :** Crypto is being used for encrypting the passwords for storing it to the database.
* **RESTAPI :** RESTAPI architecture is followed throughout the application.

### **_Scope And Objectives_** ###
* #### **Scope :-** ####
  
  * The application aims to track and categorize all the incomes and expenditures providing users with a clear overview  of their spending and savings.

  * It includes features for manual entry, automatic categorization, and analysis of expenses and incomes. 

* #### **Objectives :-** #### 
  
  * User can create, list, search and delete their own set of categories and transactions.
  * Enable users to track their income and expense respectively.
  * Support users in planning for future financial goals.
  * Maintain the security and privacy for each users information.

### **_Features_** ###
  
  * #### **Efficient Database -** ####
    * The database used in this application - **"MONGODB"** is one of the best and trending nosql databases in today's world.
  
  * #### **RESTAPI** ####
    * All the API endpoints are in complete sync with the RESTApi method.
  
  * #### **Encrypting Password** ####
    * The password given by the user is encrypted before storing it to the database, establishing a very secure environment for the  user.
  
  * #### **Login Token** ####
    * The user is given a token at the time of login by which the user can login without sharing the password each time.
  
  * #### **Paginated Response** ###
    * All of the response sent from the server is properly paginated and also a default pagination is set.
  
  * #### **Invite-Only Registration System** ####
    * For a user to register, the user will be needing the token of the **"ADMIN"** user, failing to which the user cannot register to the application.

### **_API's Walkthrough_** ###

  * #### **Authentication** ####
    
    * ###### **Register :-** ##### 
      Here is a demo code for a user to register in the application :-  
      
      ```
      URL - http://localhost:PORT_NUMBER/auth/register
      req method - POST
      req.headers = {
        token : "JWT Token..."
      }
      req.body = {
        username: "username",
        password: "password"
      }

      NOTE :
      
      1. The token should be provided by the admin user as the registration type of the application is invite-only registration.

      2. All the values provided in the above request are mandatory for a request to be completed.
      ```

    * ##### **Login :-** #####
      Here is a demo code for a user to login in the application :-
  
      ```
      url - http://localhost:PORT_NUMBER/auth/login
      req method - POST
      req.body = {
        username: "username",
        password: "password"
      }

      NOTE : 

      1. All the above mentioned request components are mandatory for a request to be completed
      ```

    * ##### **Password Change :-** #####
    Please go through the application for the exact url and the request components. In simpler terms, username, old password, new password and the token needs to be provided in the respective request components.

  * ### **Business API** ###
  
    * #### **Get Business** ####  

    The intention behind this API is to get the user current balance with each increasing transaction.  

    Here is a demo code for a user to call the API :-

    ```
    url - http://localhost:PORT_NUMBER/business
    req method - GET
    req.headers = {
      token: "JWT Token..."
    }
    ```

  * ### **Categories API** ###
  
    * #### **Create Category** ####

    Here is a demo code for a user to create a category :-

    ```
    url - http://localhost:PORT_NUMBER/categories/
    req method - POST
    req.headers = {
      token : "JWT Token..."
    }  
    req.body = {
      name: "category name",
      color: "category color",
      type: "category type"
    }

    NOTE :-   
    
    1. All the request components are mandatory to receive a successful response
    2. "name" refers to the category name to be created, "color" refers to the color to be assigned to the category and "type" refers to the category being considered to be income and expenses and be assigned by using either "DEBIT" or "CREDIT".  
    ```

    * #### **Delete Category** ####
    
    Here is a demo code for a user to delete a category :-

    ```
    url - http://localhost:PORT_NUMBER/categories/:id
    req method = DELETE
    req.headers = {
      token : "JWT Token..."
    }
    req.params = {
      id : "category id"
    }

    NOTE :-

    1. In order to know the category id for a particular category the user needs to search for the category using the "search category API".
    ```

    * #### **Search Category** ####

    Here is a demo code for a user to search the list of categories :-

    ```
    url - http://localhost:PORT_NUMBER/categories/
    req method = GET
     req.headers = {
      token : "JWT Token..."
    }
    req.query = {
      name: "category name",
      color: "category color",
      type: "category type",
      pageNo : "number expected",
      pageSize : "number expected"
    }

    NOTE :-

    1. all the query components in the request are optional and the user can send any combination of the query components in the request.
    ```

    * #### **Get Category** ####

    Here is a demo code for a user to get the particular category :-

    ```
    url - http://localhost:PORT_NUMBER/categories/:id
    req method - GET
    req.headers = {
      token : "JWT Token..."
    }
    req.params = {
      id : "category id"
    }

    NOTE :-

    1. In order to know the category id for a particular category the user needs to search for the category using the "search category API".

    ```

    * #### **Get Category With Transactions** ####

    Here is a demo code for a user to get the category based transactions :-

    ```
    url - http://localhost:PORT_NUMBER/categories/:id/transactions
    req method - GET
    req.headers = {
      token : "JWT Token..."
    }
    req.params = {
      id : "category id"
    }
    req.query = {
      pageNo : "number expected",
      pageSize : "number expected"
    }

    NOTE :-

    1. query components are optional as default pagination is already set.
    2. In order to know the category id for a particular category the user needs to search for the category using the "search category API".
    ```

  
  * ### **Transactions API** ###
  
    ```
    All the transactions API are in the same architecture as the categories API and for a deep dive into the exact request components, error handling, architructure etc please refer to the code directly. 
    ```

### **_How to run the application_** ###

  #### **Steps to be done** ####

  1. Copy the **".env.example"** file and rename it as **".env"**. Modify the values as needed per requirements.
  2. Run the code **npm run dev** from root directory.
   
    
### **_Conclusion_** ###

To sum up, the Finance Tracker Back-End project embodies the latest in web development, utilizing powerful technologies to create a system that is both scalable and secure. Whether you're a developer delving into architecture or a user seeking financial management solutions, this project offers a deep dive into the world of efficient back-end development. 

  * If interested, Contact me in [**Linkedin**](https://www.linkedin.com/in/aditya-kumar-dey-699a1a54/) 