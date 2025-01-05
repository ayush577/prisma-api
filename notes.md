# Prisma Node TypeScript Backend API Project

This project is a backend API built using Node.js, TypeScript, and Prisma. It serves as a learning project to understand how to integrate Prisma with a Node.js and TypeScript stack for database management.

## Project Structure

- **Prisma**: An ORM (Object-Relational Mapping) tool used for database schema management and querying.
- **Node.js**: A JavaScript runtime used for building the backend server.
- **TypeScript**: A typed superset of JavaScript that adds static types to the language.
- **Express**: A web application framework for Node.js used to build the API endpoints.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete operations for managing authors and books.
- **Database**: Uses SQLite as the database for simplicity and ease of setup.
- **Type Safety**: TypeScript ensures type safety throughout the application.
- **Prisma Client**: Automatically generated client for interacting with the database.

## Endpoints

### Authors

- `GET /authors`: Retrieve all authors.
- `GET /authors/:id`: Retrieve a single author by ID.
- `POST /authors`: Create a new author.
- `PUT /authors/:id`: Update an existing author.
- `DELETE /authors/:id`: Delete an author.

### Books

- `GET /books`: Retrieve all books.
- `GET /books/:id`: Retrieve a single book by ID.
- `POST /books`: Create a new book.
- `PUT /books/:id`: Update an existing book.
- `DELETE /books/:id`: Delete a book.

## Setup

1. Clone the repository.
2. Install dependencies: yarn install
3. Set up the database

npx primsa migrate dev --name init

4. Start the server:
yarn run dev