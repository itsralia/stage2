# Users API

The Users API is a RESTful API for managing user data in an application.

## Table of Contents

- [Project Description](#project-description)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)

## Project Description

The Person Users API serves as the backend for a workshop application, allowing users to create, read, update, and delete user records. It provides a simple and efficient way to manage user data for the application.

## Getting Started

To get started with the Workshop Users API, follow the instructions below.

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- Node.js
- MongoDB

## Usage

To use the Workshop Users API, follow the guidelines below.

## API Endpoints

The Users API provides the following endpoints:

- `GET /api`: Retrieve a list of all users.
- `POST /api`: Create a new user.
- `GET /api/user_id`: Retrieve a user by ID.
- `PUT /api/user_id`: Update a user by ID.
- `DELETE /api/user_id`: Delete a user by ID.

1. **GET /api**: Retrieve a list of all users.

   - Method: GET
   - URL: `https://stagetwo-km36.onrender.com/api

2. **POST /api**: Create a new user.

   - Method: POST
   - URL: `https://stagetwo-km36.onrender.com/api`
   - Body (JSON):
     ```json
     {
       "name": "Ife Lolade"
     }
     ```

3. **GET /api/user_id**: Retrieve a user by ID.

   - Method: GET
   - URL: Replace `:id` with the actual user ID, for example, ``https://stagetwo-km36.onrender.com/api/1`

4. **PUT /api/user_id**: Update a user by ID.

   - Method: PUT
   - URL: Replace `:id` with the actual user ID, for example, `https://stagetwo-km36.onrender.com/api/2`
   - Body (JSON):
     ```json
     {
       "name": "New Name"
     }
     ```

5. **DELETE /api/user_id**: Delete a user by ID.

   - Method: DELETE
   - URL: Replace `:id` with the actual user ID, for example, `https://stagetwo-km36.onrender.com/api/1`

## Database Schema

The database schema for the Workshop Users API includes the following fields:

- `user_id` (Number): Unique user identifier.
- `name` (String): User's name.

Database Modelling UML Link
https://drive.google.com/file/d/1Oq8Cej6f6cfR6tg8iyx4_R174YSsEsrN/view?usp=drive_link
