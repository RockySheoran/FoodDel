# Food Ordering(FoodDel) Web App (MERN Stack)
  - [User-URL] https://fooddel-frontend4.onrender.com
  - [Admin-URL] (https://fooddeladmin.onrender.com)
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
![Image](https://github.com/user-attachments/assets/2c756c20-173e-40be-8efc-4a53cc2c6a8d)
![Image](https://github.com/user-attachments/assets/ce09b8be-f501-4c00-8af6-749b71abb6fc)
![Image](https://github.com/user-attachments/assets/a09670d7-1759-4530-8976-9570ef1a8471)
![Image](https://github.com/user-attachments/assets/1a3225c9-c7e2-49e1-8756-8668d68ddf68)
![Image](https://github.com/user-attachments/assets/d225f520-592c-45af-9f9e-220c6986882c)
![Image](https://github.com/user-attachments/assets/e7622984-2ba4-42f9-934d-f6418345f9ce)
![Image](https://github.com/user-attachments/assets/9ad2aa70-f255-49d7-9766-403ce2859496)
![Image](https://github.com/user-attachments/assets/c5419d56-31d8-4221-84ce-a368dd023bcd)


## API Documentation
The API endpoints for the backend can be documented using tools like Postman or fetch by axios. Include endpoints for user authentication, menu items, orders, and more.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include relevant tests.

## Contact
For any questions or suggestions, feel free to contact me.

Happy coding!

Feel free to customize this template according to your specific project details and requirements.




