# Book-Store-Upwork-Test
# 📚 Bookstore Management API

## 🚀 Overview
This is a RESTful API built with **Node.js** and **Express.js** for managing a bookstore inventory. The API allows users to perform CRUD operations, including adding, retrieving, updating, and deleting book records.

## 📌 Features
- 📖 **Create**: Add new books with details such as title, author, ISBN, and stock quantity.
- 🔍 **Read**: Retrieve a book by ISBN and list all books with pagination.
- ✏️ **Update**: Modify book details and adjust stock levels.
- ❌ **Delete**: Remove a book using its ISBN.

## 🛠️ Tech Stack
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Validation**: express-validator
- **Caching**: Redis (for performance optimization)
- **Authentication**: JWT-based authentication
- **Testing**: Jest & Supertest
- **Linting**: ESLint

## 📂 Project Structure
```
📦 bookstore-api
├── 📂 controllers         # API controllers (business logic)
├── 📂 models              # Mongoose schemas/models
├── 📂 routes              # API routes
├── 📂 middleware          # Authentication & validation middleware
├── 📂 utils               # Utility functions
├── 📂 config              # Configuration files (e.g., DB, Redis, JWT)
├── 📂 tests               # Unit & integration tests
├── index.js             # Entry point for the API
├── package.json          # Project dependencies & scripts
└── README.md             # API documentation
```

## 📌 Installation & Setup
### 1️⃣ Clone the repository
```sh
git clone https://github.com/yourusername/bookstore-api.git
cd bookstore-api
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Configure environment variables
Create a `.env` file in the root directory with the following:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 4️⃣ Start the server
```sh
npm start
```
Server will run on `http://localhost:5000`.

## 📌 API Endpoints

### 📖 Books API
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/books/add` | Add a new book |
| **GET** | `/api/books?limit=10&page=1` | Get all books with pagination |
| **GET** | `/api/books/:ISBN` | Get book details by ISBN |
| **PUT** | `/api/books/:ISBN` | Update book details |
| **DELETE** | `/api/books/:ISBN` | Remove a book |

### 🔒 Authentication (JWT Required for Modification Routes)
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/auth/register` | Register a new user |
| **POST** | `/api/auth/login` | Authenticate user and get a token |

## 🛠️ Testing
Run unit and integration tests using Jest & Supertest:
```sh
npm test
```

## ⚡ Performance Optimizations
✅ **MongoDB Indexing** for fast queries
✅ **Redis Caching** to reduce database load
✅ **Pagination** for optimized book retrieval

## 🔒 Security Features
✅ **JWT Authentication** to protect routes
✅ **Input Validation & Sanitization**
✅ **HTTPS & Secure Headers** (Helmet.js)

## 🤝 Contribution
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Add feature"`)
4. Push to GitHub (`git push origin feature-name`)
5. Open a pull request 🚀

## 📜 License
This project is licensed under the MIT License.

---
💡 **Built with ❤️ by [Your Name](https://github.com/yourusername)**


## How It works
```
cd backend
npm i
node index.js
```
### Postman API documentation with examples
https://app.getpostman.com/join-team?invite_code=ebc784e57d8c38ac3f2c9eff31d3e54c287742e6328ff1d2c250e933d4b79049&target_code=3be0d25b83a45ec49058421f6a275792
