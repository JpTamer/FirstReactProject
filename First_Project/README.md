# Amalfi Restaurant - Food Ordering Platform

A full-stack restaurant ordering web application built with React (Vite) frontend and Node.js/Express backend with PostgreSQL database.

## Features

- 🍕 **Menu Browsing** - Browse categorized menu items (Starters, Pizzas, Pastas, Desserts)
- 🛒 **Shopping Cart** - Add, update, and remove items from cart
- 👤 **User Authentication** - Register and login with secure password hashing
- 📦 **Order Management** - Place orders with delivery information
- 📍 **Real-time Order Tracking** - Track order status from placement to delivery
- ⭐ **Reviews System** - Leave ratings and reviews for menu items
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database (Neon)
- **bcrypt** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
First_Project/
├── src/                      # Frontend source code
│   ├── Components/           # React components
│   ├── Pages/               # Page components
│   ├── context/             # React Context (Auth)
│   ├── hooks/               # Custom hooks
│   └── Images/              # Static images
├── Backend/                 # Backend source code
│   ├── index.js            # Express server
│   ├── create_tables.sql   # Database schema
│   └── package.json        # Backend dependencies
├── public/                  # Public assets
└── package.json            # Frontend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database (or Neon account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JpTamer/FirstReactProject.git
   cd First_Project
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd Backend
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

   Create a `.env` file in the Backend directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   PORT=3000
   ```

5. **Set up the database**
   
   Run the SQL script to create tables:
   ```bash
   cd Backend
   # Execute create_tables.sql in your PostgreSQL database
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd Backend
   npm start
   # Or use nodemon for development:
   npm run startnod
   ```

2. **Start the frontend development server**
   ```bash
   # In the root directory
   npm run dev
   ```

3. **Open your browser**
   ```
   http://localhost:5173
   ```

## Environment Variables

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 3000)

## Database Schema

The application uses the following tables:
- **Users** - User accounts with authentication
- **MenuItems** - Restaurant menu items
- **Cart** - Shopping cart items
- **Orders** - Order information
- **OrderItems** - Individual items in orders
- **Reviews** - User reviews and ratings

## API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - User login

### Menu
- `GET /menu` - Get all menu items

### Cart
- `POST /cart` - Add item to cart
- `PUT /cart/:id` - Update cart item quantity
- `DELETE /cart/:id` - Remove item from cart
- `DELETE /cart/clear/all` - Clear entire cart

### Orders
- `POST /orders` - Create new order
- `GET /orders` - Get user's orders
- `GET /orders/:id` - Get order details
- `PUT /orders/:id/status` - Update order status

### Reviews
- `POST /reviews` - Add review
- `GET /reviews` - Get all reviews
- `GET /reviews/item/:menuItemId` - Get reviews for menu item
- `GET /reviews/user/me` - Get user's reviews
- `DELETE /reviews/:id` - Delete review

## Deployment

The application is configured for deployment on Vercel (frontend) with the backend hosted separately.

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## License

This project is open source and available under the MIT License.

## Author

Jean Paul Tamer - [@JpTamer](https://github.com/JpTamer)
