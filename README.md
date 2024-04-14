# E-Commerce Website Generated Using ChatGPT

This project is an e-commerce website generated using ChatGPT, a natural language processing model developed by OpenAI. The website allows users to browse products, view product details, filter products by category, and manage their shopping cart. Below is an overview of the project, including frontend and backend resources, project structure, and API functionality.

## Project Overview

This website is designed to provide users with a seamless shopping experience by offering a variety of features commonly found in e-commerce platforms. Users can navigate through different product categories, view product details, add items to their cart, and manage their shopping cart contents.

### Frontend Resources

The frontend of the website is built using React.js, a popular JavaScript library for building user interfaces. Additionally, the following frontend resources are utilized:

- **React Router**: Used for routing and navigation within the website.
- **React Icons**: Provides a library of icons used for various UI elements.
- **Tailwind CSS**: Utilized for styling and layout design, offering a utility-first approach to CSS.

### Backend Resources

The backend of the website is built using Node.js and Express.js, providing the server-side functionality required for handling API requests and database interactions. MongoDB is used as the database to store product information, user data, and cart contents.

## Project Structure

The project structure consists of frontend and backend directories, each containing their respective source code files. Below is an outline of the project structure:

```
e-commerce-website/
│
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── context/             # Context providers (e.g., AuthContext, CartContext)
│   │   ├── pages/               # Page components (e.g., Home, ProductDetails, Cart)
│   │   ├── services/            # API service functions
│   │   ├── styles/              # CSS or styling files (e.g., Tailwind CSS)
│   │   ├── utils/               # Utility functions
│   │   ├── App.js               # Main application component
│   │   └── index.js             # Entry point for the React application
│   │
│   ├── public/                  # Public assets (e.g., images)
│   └── package.json             # Frontend dependencies and scripts
│
├── backend/
│   ├── controllers/            # Route handlers
│   ├── models/                 # Mongoose models
│   ├── routes/                 # API routes
│   ├── utils/                  # Utility functions
│   ├── app.js                  # Express application setup
│   └── package.json            # Backend dependencies and scripts
│
└── README.md                   # Project documentation
```

### API Functionality

The backend provides the following API endpoints for interacting with the database and serving data to the frontend:

- **GET /api/products**: Retrieves all products from the database.
- **GET /api/products/:id**: Retrieves a specific product by ID.
- **POST /api/cart**: Adds a product to the user's shopping cart.
- **GET /api/cart/:userId**: Retrieves the contents of the user's shopping cart.
- **DELETE /api/cart/:userId/:productId**: Removes a product from the user's shopping cart.

## Project Setup

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/NitinVangipuram/e-commerce.git`
2. Navigate to the frontend directory: `cd frontend`
3. Install frontend dependencies: `npm install`
4. Start the frontend development server: `npm start`
5. Navigate to the backend directory: `cd ../backend`
6. Install backend dependencies: `npm install`
7. Start the backend server: `node server.js`

Once both the frontend and backend servers are running, you can access the website by opening a web browser and navigating to the specified URL.

---

This project demonstrates how ChatGPT can be used to generate code for building functional web applications,  with modern web development practices. You can find link to the complete gpt prompt [here](https://chat.openai.com/share/5eb69ad9-f23d-469a-8b09-eb57afcb6285).
