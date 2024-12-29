# Food Ordering(FoodDel) Web App (MERN Stack)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Contact](#contact)

## Introduction
This is a full-stack food ordering(FoodDel) web application built using the MERN stack (MongoDB, Express, React, Node.js). The application consists of a customer-facing app for ordering food and an admin app for managing orders, menu items, and more.

## Features
- User authentication and authorization
- Browse food items
- Add items to the cart and place orders
- Stripe Payment Integration: Secure and reliable payment processing using Stripe.
- Order tracking
- Admin panel to manage menu items, orders

## Technologies Used
- **Frontend:** React.js, React Context API, React Router
- **Backend:** Node.js, Express.js
- **Payment Gateway:** Stripe
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Tailwind CSS

## Installation
### Prerequisites
- Node.js
- MongoDB

### Clone the Repository
```sh
git clone https://github.com/RockySheoran/FoodDel.git

```
## frontend Setup
Navigate to the backend directory:

```sh
cd frontend
```
## Backend Setup
Navigate to the backend directory:
```sh

cd backend
```
## Backend Setup
Navigate to the backend directory:

```sh
cd backend

```
Install dependencies:

```sh
npm install
```

Create a .env file in the backend directory and add the following:

```sh
JWT_SECRET="random#secret"
STRIPE_SECRET_KEY="sk_test_51JhWAiRXoTvIuM91beRv8XldfL3GGKyuLhzabkSwNeIXryY51G9UKnwNUFcotg0N6k4UAGhiprjJd4XhAF85JCN4004TC42zkl"
```

Start the backend server:

```sh
npm run server
node server.js
```
## Frontend Setup
Navigate to the frontend directory:

```sh

cd frontend
```

Install dependencies:
```sh

npm install
```

Start the frontend server:
```sh

npm run dev
```

## Admin App Setup

Navigate to the admin directory:
```sh

cd admin
```

Install dependencies:

```sh
npm install
```

Start the admin app :
```sh
npm start
npm run dev
```

## Usage
Access the customer-facing app at http://localhost:5173.
Access the admin app at http://localhost:5174.
Register as a new user or log in with existing credentials.
Browse the menu, add items to the cart, and place an order.
Pay using dummy visa card
Use the admin panel to manage orders, menu items.

## Screenshots
![Screenshot 2024-12-29 141251](https://github.com/user-attachments/assets/223f96ad-9a74-4331-93ad-7c58ac7bbcc9)
![Screenshot 2024-12-29 141308](https://github.com/user-attachments/assets/d09d6c1f-6ce4-4779-9618-ee18e0a4e7c1)
![Screenshot 2024-12-29 141401](https://github.com/user-attachments/assets/e4c8fe34-0224-4bfb-a24e-58ae1a6cd76c)
![Screenshot 2024-12-29 141430](https://github.com/user-attachments/assets/e2ca26b4-279b-43d4-a5e6-c264a0e8fe64)
![Screenshot 2024-12-29 141450](https://github.com/user-attachments/assets/fb0246e0-3d70-4ec9-8da1-fbf50b65e895)
![Screenshot 2024-12-29 141521](https://github.com/user-attachments/assets/c2f10f66-d096-4959-9007-e4cf0e52f2b1)

## API Documentation
The API endpoints for the backend can be documented using tools like Postman or fetch by axios. Include endpoints for user authentication, menu items, orders, and more.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include relevant tests.

## Contact
For any questions or suggestions, feel free to contact me.

Happy coding!

Feel free to customize this template according to your specific project details and requirements.




