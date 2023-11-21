# StockAPI Project

This project is a stock management API built using MongoDB, Mongoose, and Express. It includes models for Brand, Category, Firm, Purchase, Sale, and a specialized user model for Google login integration. The project also utilizes technologies such as JWT for authentication, Nodemailer for email services, and logger for logging.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Models](#models)
- [Authentication](#authentication)
- [Advanced Querying](#advanced-querying)
- [API Documentation](#api-documentation)

## Features

- **Models:**

  - Brand
  - Category
  - Firm
  - Purchase
  - Sale
  - User (including Google login integration)

- **Technologies:**

  - MongoDB
  - Mongoose
  - Express
  - JWT (JSON Web Tokens)
  - Nodemailer
  - Logger

- **Advanced Querying:**
  The project provides advanced querying capabilities for efficient data retrieval.

- **Documentation:**
  - Swagger
  - ReDoc
  - JSON

## Technologies Used

### MongoDB and Mongoose

The project uses MongoDB as the database and Mongoose as the ODM (Object Data Modeling) library for Node.js and MongoDB.

### Express

Express is used as the web application framework to build robust and scalable APIs.

### JWT (JSON Web Tokens)

JSON Web Tokens are employed for secure authentication and authorization processes.

### Nodemailer

Nodemailer is integrated for email services, allowing the application to send emails for various functionalities.

### Logger

A logging mechanism is implemented using a logger for tracking and managing application logs effectively.

## Models

### Brand

Represents a brand in the stock management system.

### Category

Represents a category for organizing products.

### Firm

Represents a firm or company related to the stock.

### Purchase

Tracks information about stock purchases.

### Sale

Tracks information about stock sales.

### User

Includes a specialized user model for Google login integration.

## Authentication

The project uses JSON Web Tokens (JWT) for user authentication and authorization. The user model is extended to support Google login.

## Advanced Querying

The API supports advanced querying for efficient data retrieval.

## API Documentation

The API documentation is available in various formats:

- Swagger
- ReDoc
- JSON

Explore the API documentation for a detailed understanding of available endpoints and functionalities.

Feel free to clone the repository and customize the project according to your requirements.
