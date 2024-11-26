# CS261 - Web Application Project (Group 1)
This repository contains the frontend and backend code for our CS261 project. The system allows students to submit petitions online, track their status, and provides administrators with tools to manage and process these petitions efficiently.

## Table of Contents
* [Technologies Used](#technologies-used)
* [Installation](#installation)
  * [Frontend](#frontend)
  * [Backend](#backend)
  * [Spring Boot](#spring-boot)
  * [Docker Compose](#docker-compose)
* [Project Structure](#project-structure)

## Technologies Used
* **Frontend:** Node.JS (Express)
* **Backend:** Spring Boot, node.js
* **API Gateway:** Kong
* **Other:**  Docker

## Installation
### Frontend
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

### Backend
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

### Spring Boot
1. Install Maven or Gradle
2. Run Application`java -jar {compiled file}`

### Docker Compose
1. Create a `docker-compose.yml` file.
2. Run `docker compose up -d` to start your services.
3. Visit `http://localhost:8080` (or another mapped port) to access the running application.
4. Manage and debug services using logs or the Docker Desktop GUI.
5. Use `docker compose down` when you're done.

## Project Structure
```
project-root/
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── sever.js
│   ├── public/
│   └── ...
├── backend/
│   ├── .metadata/
│   ├── .mvn/wrapper/
│   ├── src/
│   ├── target
│   └── ...
├── init-scripts/
├── docker-compose.yml
└── ...
```