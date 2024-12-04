# CRUD Fullstack Application

A modern fullstack CRUD (Create, Read, Update, Delete) application built with EJS, Express, Node.js and MongoDB.

## 🚀 Features

- Create, Read, Update, and Delete operations
- Responsive design with Bootstrap
- Server-side rendering with EJS
- RESTful API endpoints
- MongoDB database integration

## 📦 Tech Stack

### Frontend
- EJS (Embedded JavaScript templating)
- Bootstrap 5
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

git clone https://github.com/donfarescobar/crud.git

2. Navigate to project directory:

cd crud-fullstack


3. Install dependencies:

npm install


4. Create .env file and add your MongoDB connection string:

MONGODB_URI=your_mongodb_connection_string
PORT=5000


5. Run the application:

npm start


The application will be available at `http://localhost:5000`

## 📁 Project Structure

├── models/
│   └── users.js
├── public/
│   ├── css/
│   └── images/
├── routes/
│   └── routes.js
├── uploads/
├── views/
│   ├── layout/
│   └── pages/
├── main.js
└── package.json


## 🛠 API Endpoints

- GET    /api/data     - Get all data
- POST   /api/data     - Create new data
- PUT    /api/data/:id - Update data by ID
- DELETE /api/data/:id - Delete data by ID
