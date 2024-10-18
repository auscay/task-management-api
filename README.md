# Task Management API

This is a Task Management API built with **NestJS**, **MongoDB**, and **GraphQL**. It provides basic task management features such as creating, updating, retrieving, and deleting tasks with user authentication and authorization.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [License](#license)

## Features

- **CRUD operations** for managing tasks.
- **Pagination** for retrieving tasks.
- **Filtering** tasks by status and priority.
- **GraphQL** API.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/task-management-api.git
    ```

2. Navigate into the project directory:

    ```bash
    cd task-management-api
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Environment Variables

Create a `.env` file at the root of the project and add the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/task_management_db  # MongoDB connection string
PORT=3000  # Application Port
```
## Running the Application
To start the application, run the following command:

1. Development mode:

    ```bash
    npm run start:dev
    ```
2. Production mode:

    ```bash
    npm run start:prod
    ```
3. GraphQL Playground:

Visit `http://localhost:3000/graphql` in your browser to access the GraphQL Playground.

## API Endpoints
For the complete API schema, including all queries, mutations, and type definitions, refer to the `schema.gql` file in the root directory. This file outlines the structure of all available endpoints and their corresponding inputs and outputs.

## Testing
To run the tests, use the following command:

```bash
npm run test
```

