# DevOps Overview

## 2a. CI/CD Pipeline

A CI/CD pipeline helps automate the process of building, testing, and deploying the application whenever code changes are pushed.

### Stages:

1. **Code Commit**

   * The developer pushes code to GitHub.

2. **Build Stage**

   * Install dependencies using:

     ```bash
     npm install
     ```
   * Build the frontend (Next.js):

     ```bash
     npm run build
     ```

3. **Test Stage**

   * Run tests (if available):

     ```bash
     npm test
     ```

4. **Deployment Stage**

   * The application can be deployed using Docker containers.
   * Backend services can be managed using PM2 to ensure uptime.

### Tools Used:

* GitHub (code repository)
* GitHub Actions (for CI/CD automation)
* Docker (for containerization)
* PM2 (process manager)

---

## 2b. Dockerization

The application is containerized using Docker to ensure consistency across different environments.

### Setup:

* Separate Dockerfiles are created for:

  * Backend (Express.js)
  * Frontend (Next.js)

* A `docker-compose.yml` file is used to run both services together.

### Run the application:

```bash
docker-compose up --build
```

### Benefits:

* Consistent environment across development and production
* Easy to set up and run the project
* Isolated services (frontend and backend)

---

## 2c. Linux Hosting Considerations

The application can be deployed on a Linux server (e.g., Ubuntu).

### Key Components:

* **PM2**

  * Used to run and manage the backend server
  * Automatically restarts the app if it crashes

* **Nginx**

  * Acts as a reverse proxy
  * Routes incoming requests:

    * `/api` → backend
    * `/` → frontend

* **Environment Variables**

  * Sensitive data like API keys and database URLs are stored in `.env` files

### Managing Multiple Projects:

* Run each application on a different port
* Use Nginx to route traffic based on domain or path
* Use Docker containers for better isolation

---

## 2d. Kafka Usage (Conceptual)

Apache Kafka can be used for handling asynchronous tasks and event-driven communication.

### Example Use Cases:

1. **Logging**

   * User activities such as login or course searches can be sent as events
   * These events can be processed later without affecting performance

2. **Course Recommendations**

   * User preferences can be sent as events
   * A separate service can process these events and generate recommendations

### Benefits:

* Decouples services
* Improves scalability
* Handles high-throughput data streams efficiently
