# BigTech: A Case Study

Welcome to **BigTech: A Case Study**, a comprehensive project aimed at understanding and replicating the infrastructure of major tech companies like Amazon. This project is designed to be modular, allowing for in-depth exploration of each component of a large-scale e-commerce platform.

## Table of Contents

- [Introduction](#introduction)
- [Modules](#modules)
  - [Authentication](#authentication)
  - [Product Management](#product-management)
  - [Order Processing](#order-processing)
  - [Logistics](#logistics)
  - [User Interface](#user-interface)
  - [Analytics](#analytics)
  

## Introduction

This project aims to deepen my knowledge and learning by researching how these features are implemented in software from major companies. To achieve this, I will attempt to recreate Amazon's system, exploring the best practices and techniques used in developing successful e-commerce platforms.

**Note:** This project is primarily intended for educational purposes, including my own learning journey. I am not affiliated with Amazon, Google, Facebook, or any other big tech company. I am undertaking this project solely to improve my knowledge. Therefore, implementations may not mirror those of industry giants like Amazon, but I will strive to do my best. This also allows beginners to study and learn from the project. **Contributions and feedback are always welcome!**


## Modules

### Authentication

technologies: Typescript, fastify, docker, prisma, postgresql, JwtToken, bcrypt, nodemailer.

The authentication module handles user sign-up, login, and security features such as password hashing, multi-factor authentication, Role-based authentication and session management.

- [x] User registration
	- [x] Verification by email
- [x] User login
	- [x] Login with email and password
- [x] Password recovery
	- [x] Send password recovery by email
	- [x] Implementation of security questions
- [x] Role-based authentication
	- [x] Create some roles such as user, admin, guest
	- [x] Access control to different parts of the application based on user roles
- [x] Tokens and sessions
	- [x] User session management
	- [x] JWT
- [x] Security
	- [x] Encrypted credentials


### Product Management

technologies: Typescript, *firebase*, fastify, docker, prisma, postgresql, nodemailer.

This module focuses on handling product data and functionality independently. It includes product listing, categorization, inventory management, and search functionality without relying on user management.

- [x] Product Listing
	- [x] Create new product
	- [x] Update existing product
	- [x] Delete product
	- [x] View product details
- [x] Product Categorization
	- [x] Create new category
	- [x] Update existing category
	- [x] Delete category
	- [x] Assign products to categories
- [x] Inventory Management
	- [x] Track product stock levels
	- [x] Update stock levels
	- [x] Notify when stock is low
- [x] Product Search Functionality
	- [x] Implement search by product name
	- [x] Implement search by category
	- [x] Implement search by attributes (e.g., price, brand)
- [x] Product Reviews and Ratings
	- [x] Add product reviews
	- [x] Edit product reviews
	- [x] Delete product reviews
	- [x] Rate products
- [x] Product Images
	- [x] Upload product images
	- [x] Update product images
	- [x] Delete product images
- [x] Price Management
	- [x] Set product prices
	- [x] Update product prices
	- [x] Apply discounts and promotions

### Order Processing

The order processing module manages the lifecycle of an order from cart to checkout, payment processing, and order confirmation.

*Coming soon*

### Logistics

Logistics includes shipping, delivery tracking, warehouse management, and returns handling.

*Coming soon*

### User Interface

The user interface module focuses on building a responsive and user-friendly front-end using modern web technologies.

*Coming soon*

### Analytics

Analytics covers data collection, reporting, and analysis to provide insights into user behavior, sales trends, and system performance.

*Coming soon*

