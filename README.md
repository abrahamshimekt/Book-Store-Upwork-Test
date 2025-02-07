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
cd book-store-upwork-test
cd backend
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Configure environment variables
Create a `.env` file in the root directory with the following:
```
PORT=5000
MONGODB_CONNECTION_STRING=
REDIS_URL=
JWT_SECRET_KEY=
```

### 4️⃣ Start the server
```sh
node index.js
```
Server will run on `http://localhost:5000`.

## 📌 API Endpoints

### 📖 Books API
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/books/add-book` | Add a new book |
| **GET** | `/api/get-all-books?pageNumber=10&pageSize=1` | Get all books with pagination |
| **GET** | `/api/books/get-book-by-ISBN?ISBN=` | Get book details by ISBN |
| **PUT** | `/api/books/:id` | Update book details |
| **DELETE** | `/api/books/:ISBN` | Remove a book |

### 🔒 Authentication (JWT Required for Modification Routes)
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/users/sign-up` | Register a new user |
| **POST** | `/api/users/sign-in` | Authenticate user and get a token |

### Postman API documentation with examples
https://app.getpostman.com/join-team?invite_code=ebc784e57d8c38ac3f2c9eff31d3e54c287742e6328ff1d2c250e933d4b79049&target_code=3be0d25b83a45ec49058421f6a275792

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
💡 **Built with ❤️ by [Abraham Shimekt](https://github.com/abrahamshimekt)**
