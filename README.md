# Dental Appointment Management System

Welcome to the **Dental Appointment Management System**! This project is designed to help manage dental appointments efficiently, offering both a backend API and a frontend interface.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- 🦷 User registration and authentication
- 📅 Appointment booking, updating, and cancellation
- 👤 User profile management
- 📱 Responsive frontend interface

## Installation

To get started, clone this repository:

```sh
git clone https://github.com/your-username/dental-appointment-system.git
cd dental-appointment-system
```


## Backend Setup
Navigate to the backend directory:
```sh
cd dental-appointment-backend
```

Install the dependencies:
```sh
npm install
```

Set up your environment variables (See [Environment Variables](#environment-variables) Section).

Start Server
```sh
npm start
```

## Frontend Setup

Navigate to the frontend directory:

```sh
cd dental-office-frontend
```

Install the dependencies:
```sh
npm install
```

Build the frontend (setup for AWS S3, Firebase & Beanstalk):
```sh
npm run build
```
Copy all the build files and upload it to GUI
deploy the build to your preferred static site hosting service (e.g., AWS S3, Netlify).

## Environment Variables

Create a .env file in both the dental-appointment-backend and dental-office-frontend directories and add the following:

## Backend (.env)
```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Frontend (.env)
```sh
REACT_APP_API_BASE_URL=http://your-backend-url.com
```

## Usage

## Backend
* Ensure your MongoDB server is running.
* Run the backend server:

## Frontend
* Deploy the frontend build folder to your preferred static site hosting.
* Access the frontend via the deployed URL.

## API Endpoints
## authentication
* **POST /api/auth/register** - Register a new user

**Example Request**
```sh
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "address": "123 Main St",
  "birthdate": "1990-01-01",
  "contactNumber": "123-456-7890"
}
```
**Example Response:**
```sh
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "address": "123 Main St",
    "birthdate": "1990-01-01",
    "contactNumber": "123-456-7890",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```
* **POST /api/auth/login** - Login a user
**Example Request**
```sh
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
**Example Response:** 
```sh
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "address": "123 Main St",
    "birthdate": "1990-01-01",
    "contactNumber": "123-456-7890",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```
## Appointments
* **GET /api/appointments** - Get all appointments
**Example Request:**
```sh
GET /api/appointments
Authorization: Bearer your_jwt_token
```
**Example Response:**
```sh
[
  {
    "_id": "appointment_id",
    "service": "Cleaning",
    "dentist": "Dr. Smith",
    "date": "2023-01-10T10:00:00.000Z",
    "user": "user_id"
  }
]
```
* **POST /api/appointments** - Book a new appointment
**Example Request**
```sh
{
  "service": "Cleaning",
  "dentist": "Dr. Smith",
  "date": "2023-01-10T10:00:00.000Z"
}
```
**Example Response**
```sh
{
  "_id": "appointment_id",
  "service": "Cleaning",
  "dentist": "Dr. Smith",
  "date": "2023-01-10T10:00:00.000Z",
  "user": "user_id"
}
```
* **PUT /api/appointments/:id** - Update an appointment
```sh
{
  "service": "Whitening",
  "date": "2023-01-15T14:00:00.000Z"
}
```
**Example Response**
```sh
{
  "_id": "appointment_id",
  "service": "Whitening",
  "dentist": "Dr. Smith",
  "date": "2023-01-15T14:00:00.000Z",
  "user": "user_id"
}
```
* **DELETE /api/appointments/:id** - Cancel an appointment
```sh
DELETE /api/appointments/appointment_id
Authorization: Bearer your_jwt_token
```
**Example Request**
```sh
DELETE /api/appointments/appointment_id
Authorization: Bearer your_jwt_token
```
**Example Response**
```sh
{
  "message": "Appointment cancelled successfully."
}
```
## User
* **GET /api/user/profile** - Get user profile
**Example Request**
```sh
GET /api/user/profile
Authorization: Bearer your_jwt_token
```
**Example Response**
```sh
{
  "_id": "user_id",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "address": "123 Main St",
  "birthdate": "1990-01-01",
  "contactNumber": "123-456-7890",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```
* **PUT /api/user/profile** - Update user profile
**Example Request**
```sh
{
  "firstName": "John",
  "lastName": "Doe",
  "address": "456 Elm St",
  "birthdate": "1990-01-01",
  "contactNumber": "987-654-3210"
}
```
**Example Response**
```sh
{
  "_id": "user_id",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "address": "456 Elm St",
  "birthdate": "1990-01-01",
  "contactNumber": "987-654-3210",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```



This repo is for demo only and may be outdated, contact me at darrendfadrilan@gmail.com! 🦷✨


