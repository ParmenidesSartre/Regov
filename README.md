# Regov Assessment


## Table of Contents

## Question 1
- [**Requirements**](#requirements)

- [**Designing the Solution**](#designing-the-solution)

- [**Running the Project**](#how-to-run-the-code)

- [**Justifications for the Design**](#justifications-for-the-design)

- [**Design Evolution**](#how-should-the-design-evolve)

- [**Security Measures**](#security-measures)

- [**Schema Design**](#schema-design)

- [**AuthService Microservice**](#authservice-microservice)

- [**UserService Microservice**](#userservice-microservice)

### Question 2
- [**Answer**](#answer)


## Requirements
As the requirement is a bit vague, this is what i understand from the description. If this is a real development process, there will be a lot of back and forth to better understand the requirement. But due to the time constraint, this is what i understand.
1. Implement field selection functionality in the User Biography endpoint to enable users to customize the data they retrieve.

2. Use the selected fields as query parameters to fetch related family data from the database.

3. Implement authentication and authorization mechanisms to limit system access to authorized users, which include residents and authorities.

4. Include robust error handling within the system to prevent data leakage and unauthorized access during system failures.

5. Secure all API endpoints to prevent unauthorized access or misuse. This could involve measures such as implementing access tokens or JWT for API requests.

## Designing the Solution

To fulfill these requirements, our approach encompasses the creation of two distinct microservices: `AuthService` and `UserService`. The former will take charge of user authentication and authorization, whereas the latter will retrieve user-specific information such as biography, family, and neighborhood data. Both these microservices will interface with a common MongoDB database to maintain a cohesive data state.

Following this overarching structure, we will meet each requirement in the following manner:

1. **Flexible Data Retrieval:** The `UserService` will include an endpoint for User Biography that allows field-level selection. This provides users with the flexibility to choose and retrieve only the data they require.

2. **Family Data Fetching:** The fields selected by the user will serve as query parameters to locate and fetch related family data from the MongoDB database. This functionality will be incorporated within the `UserService`.

3. **Access Control:** The `AuthService` will implement robust authentication and authorization methods to ensure that only authorized residents and authorities have access to the system.

4. **Robust Error Handling:** Both microservices will include comprehensive error handling to prevent data leaks and unauthorized access during system failures, ensuring data integrity and system reliability.

5. **API Security:** All exposed API endpoints will be secured against unauthorized access or misuse. We will leverage security strategies such as access tokens or JWTs to authenticate and validate API requests. This level of security will be a shared responsibility of both `AuthService` and `UserService`.


## How to run the code
1. Clone the repository.
2. Install docker desktop if you don't have it already.
3. Create a `.env` file in the root of the repository and add the following variables:
```
PORT = 3000
JWT_SECRET = secret_key
MONGO_INITDB_ROOT_USERNAME = Parmenides
MONGO_INITDB_ROOT_PASSWORD = qLp59VvQYywpbtKT
MONGO_INITDB_DATABASE = data
```
4. At the root of the repository, run `npm run dev` which will create and run the docker container.

## Justifications for the design
- **Microservices Architecture**:
  - Each microservice has a clear, specific role, promoting separation of concerns.
  - Each service can be developed, deployed, and scaled independently, enhancing scalability and flexibility.
 
- **NoSQL vs SQL**
   - I am opting for a NoSQL database (MongoDB) over a SQL database due to its scalability and flexibility, which aligns well with the microservices architecture.
   - SQL databases might compromise ACID properties when scaled horizontally, whereas NoSQL databases naturally support data distribution across multiple servers.
   - Although the ideal scenario in a microservices architecture is to follow the database-per-service pattern for independent evolution of services, due to assesment time constraints, I have decided to use a shared MongoDB database across the microservices.
   - The choice of NoSQL over SQL allows us to prioritize system scalability, distributed data management, and potential for future service independence.
    
- **AuthService and UserService**:
  - AuthService manages user authentication and authorization, ensuring secure access control.
  - UserService fetches user-specific information, functioning independently from AuthService, which eliminates the need for inter-service communication.

- **Shared MongoDB Database**:
  - Both microservices connect to the same MongoDB database, ensuring data consistency and integrity across services.

- **Deployment using Docker and Docker Compose**:
  - Containerization with Docker guarantees a consistent and reproducible environment, minimizing platform-specific issues.
  - Docker Compose allows efficient orchestration of multiple containers, simplifying their management as a unified service.

- **Shared .env file with Docker Compose**:
  - Enables sharing of secret keys for token validation across services, ensuring secure and unified session handling.
 
## How should the design evolved
These are some future design evolution that I envision:

**1. Database per Service:**
   - Enhances service independence and reduces risk of data conflicts.
   - Needed as your system complexity and database load increase.

**2. API Gateway:**
   - Simplifies client-side interactions and manages cross-cutting concerns.
   - Useful when the number of microservices grows, making direct client-to-service interactions cumbersome.

**3. Event-Driven Architecture:**
   - Improves system responsiveness and facilitates loose coupling.
   - Ideal when your system requires real-time data synchronization and asynchronous communication.

**4. Serverless Architecture:**
   - Enables auto-scaling to match demand and optimizes resource usage.
   - Consider this when workloads are unpredictable, and you want to pay only for resources used.

**5. CI/CD Integration:**
   - Allows quicker development iterations and reliable deployments.
   - Important as your development team expands and deployment frequency increases.

## Security Measures

1. **HTTP Headers Security (helmet):** `helmet` is a middleware that sets various HTTP headers to help protect the application from well-known web vulnerabilities. It includes security features like DNS Prefetch Control, Frameguard to prevent clickjacking, Hide Powered-By to remove the `X-Powered-By` header, HSTS to keep users on HTTPS, and more.

2. **Cross-Site Scripting (XSS) Protection (xss):** `xss-clean` is a middleware that sanitizes user input coming into the application to prevent cross-site scripting attacks where malicious scripts are injected into trusted websites.

3. **Data Sanitization (express-mongo-sanitize):** This middleware is used to prevent NoSQL injection, which can occur when an attacker injects code into the query that manipulates it. It works by eliminating prohibited characters from input coming into the API.

4. **Data Compression (compression):** `compression` is a middleware that implements GZIP compression. This can help to reduce the size of the data being sent over the network, improving the speed of the response the client receives.

5. **HTTP Request Logging (morgan):** `morgan` is a middleware that logs HTTP requests. This can be useful for debugging, but also allows for monitoring of any suspicious activities by tracking IP addresses and the endpoints they are hitting.

6. **Rate Limiting (express-rate-limit):** This middleware limits the number of requests a single IP can make to the API within a given time frame. This is a simple way to prevent brute-force attacks, where an attacker attempts to submit many requests to guess a password, for instance.

7. **Error Handling:** Custom error handling middleware (`errorConverter` and `errorHandler`) is used to ensure that errors are handled, and appropriate error messages are sent to the client. This avoids exposing sensitive details about the application.

8. **Content Parsing (express.json and express.urlencoded):** These middlewares parse incoming request bodies and make it easier to work with in the application. They also help to prevent certain types of data-related security vulnerabilities.

9. **404 Handler:** A catch-all route that returns a `404 Not Found` error for any requests that don't match defined routes. This avoids exposing any details about the filesystem or possible endpoints.

## Schema Design

![alt text](https://github.com/ParmenidesSartre/Regov/blob/main/schema.png)

## AuthService Microservice

Routes:

1. POST `/auth/register`: Register a new user with the following JSON body:
    
    ```
    {
      "username": String,
      "password": String,
      "name": String,
      "email": String,
      "biography": String,
      "neighborhood": ObjectId,
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
    
    Returns an access token upon successful login. The access token should be used to authenticate requests to the UserService microservice.  

## UserService Microservice

Routes:

1. GET `/user/:userID`: Get user biography data for the user with the specified userID. The access token should be passed via an Authorization header. Users can only view their own record and authorities can view any records.
2. GET `/user/:userID/family`: Get family data for the user with the specified userID. The access token should be passed via an Authorization header. 
3. GET `/neighborhood/:neighborhoodID`: Get neighborhood data for the specified neighborhoodID. The access token should be passed via an Authorization header.

All access to protected route is authorized through middleware that share the same environment through docker compose.


## Answer

You can find the answer to the question in the `answer.md` file.


