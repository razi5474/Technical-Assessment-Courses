## CI/CD Pipeline

A basic CI/CD (Continuous Integration and Continuous Deployment) pipeline automates building, testing, and deploying the application.

### Stages

1. **Code Commit**
   - Developer pushes code to GitHub repository

2. **Build**
   - Install dependencies:
     ```bash
     npm install
     ```
   - Build frontend (Next.js):
     ```bash
     npm run build
     ```

3. **Test**
   - Run tests (if available):
     ```bash
     npm test
     ```

4. **Deploy**
   - Application is deployed using:
     - Docker containers
     - PM2 for backend process management

### Tools Used

- GitHub (version control)
- GitHub Actions (CI/CD automation)
- Docker (containerization)
- PM2 (process manager for Node.js)

### 🐳 Dockerization

The application is containerized using **Docker**.

**Dockerfile includes:**
- Node.js base image
- Dependency installation
- Application setup
- Port exposure

**Run the application using Docker:**

```bash
docker build -t course-app .
docker run -p 5000:5000 course-app


### 🐧 Linux Hosting Strategy

The application can be deployed on a Linux server (e.g., Ubuntu). The following approach ensures reliability, scalability, and maintainability.

#### 🔹 Process Manager (PM2)
- PM2 is used to keep the Node.js backend running continuously.
- Automatically restarts the application if it crashes.

```bash
pm2 start server.js
pm2 save
pm2 startup
