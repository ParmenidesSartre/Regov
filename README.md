# Regov Assessment

### How to satisfy the requirement
To satisfy the requirement we can create two microservices: one for handling user authentication and authorization called AuthService, and another for fetching the user biography, family, and neighborhood data called DataService. Both microservices will connect to the same MongoDB database.

### How to run the code
1. Clone the repository.
2. Install docker desktop if you don't have it already.
3. At the root of the repository, run `npm run dev`.

### Justifications for the design
- **Microservices Architecture**:
  - Each microservice has a clear, specific role, promoting separation of concerns.
  - Each service can be developed, deployed, and scaled independently, enhancing scalability and flexibility.
 
- **NoSQL vs SQL**
   - I am opting for a NoSQL database (MongoDB) over a SQL database due to its scalability and flexibility, which aligns well with the microservices architecture.
   - SQL databases might compromise ACID properties when scaled horizontally, whereas NoSQL databases naturally support data distribution across multiple servers.
   - Although the ideal scenario in a microservices architecture is to follow the database-per-service pattern for independent evolution of services, due to assesment time constraints, I have decided to use a shared MongoDB database across the microservices.
   - The choice of NoSQL over SQL allows us to prioritize system scalability, distributed data management, and potential for future service independence.
    
- **AuthService and DataService**:
  - AuthService manages user authentication and authorization, ensuring secure access control.
  - DataService fetches user-specific information, functioning independently from AuthService, which eliminates the need for inter-service communication.

- **Shared MongoDB Database**:
  - Both microservices connect to the same MongoDB database, ensuring data consistency and integrity across services.

- **Deployment using Docker and Docker Compose**:
  - Containerization with Docker guarantees a consistent and reproducible environment, minimizing platform-specific issues.
  - Docker Compose allows efficient orchestration of multiple containers, simplifying their management as a unified service.

- **Shared .env file with Docker Compose**:
  - Enables sharing of secret keys for token validation across services, ensuring secure and unified session handling.
 
### How should the design evolved
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

### Schema Design

![alt text](https://github.com/ParmenidesSartre/Regov/blob/main/schema.png)
 
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
