# Regov Assessment

### How to satisfy the requirement
To satisfy the requirement we can create two microservices: one for handling user authentication and authorization called AuthService, and another for fetching the user biography, family, and neighborhood data called DataService. Both microservices will connect to the same MongoDB database.
 
### AuthService Microservice

Routes:

1. POST `/auth/register`: Register a new user with the following JSON body:
    
    ```
    {
      "username": String,
      "password": String,
      "name": String,
      "email": String,
      "biography": String,
      "neighborhoodID": ObjectId,
      "role": String
    }
    
    ```
    
    Role should be either "Resident" or "Authority". This route creates a new user in the User collection. This route should be accessible only to authorities.
    
2. POST `/auth/login`: Login an existing user with the following JSON body:
    
    ```
    {
      "username": String,
      "password": String
    }
    
    ```
    
    Returns an access token upon successful login. The access token should be used to authenticate requests to the DataService microservice.
    
3. GET `/auth/verify`: Verify the access token, usually used by the DataService microservice to check if a request is authorized. The access token should be passed via an Authorization header.

### DataService Microservice

Routes:

1. GET `/data/user/:userID`: Get user biography data for the user with the specified userID. The access token should be passed via an Authorization header. Users can only view their own record and authorities can view any records.
2. GET `/data/user/:userID/family`: Get family data for the user with the specified userID. The access token should be passed via an Authorization header. 
3. GET `/data/neighborhood/:neighborhoodID`: Get neighborhood data for the specified neighborhoodID. The access token should be passed via an Authorization header.
