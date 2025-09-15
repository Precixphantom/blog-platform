# Blog Platform

A simple and responsive blog platform where users can create, edit, and view blogs. Built with **Node.js**, **Express**, **MongoDB**, and **EJS** templates.

---

## Features

- User authentication (register & login)
- Create, edit, delete, and view blogs
- Responsive design using CSS
- View blogs by all users and your own blogs

---

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS templates
- CSS
- bcryptjs (for password hashing)
- express-session & cookie-parser (for session management)
- method-override (for PUT/DELETE requests)

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Precixphantom/blog-platform.git
   ```

2. **Navigate to the project folder**
   ```bash
   cd blog-platform
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a `.env` file** in the root folder and add your environment variables:
   ```ini
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   SECRET_KEY=your_secret_key
   ```

5. **Start the application**
   ```bash
   npm start
   ```

6. **Open in your browser**
   ```
   http://localhost:5000
   ```

---

## Usage

- Register a new account or login with an existing one  
- Create a new blog post using the **Create Blog** form  
- View, edit, or delete your blogs from **My Blogs**  
- View blogs from all users on the **Dashboard**  

---

## Folder Structure

```
blog-platform/
│
├─ controllers/       # Route controllers
├─ middleware/        # Authentication middleware
├─ models/            # Mongoose models
├─ public/            # Static files (CSS)
├─ routes/            # Route files
├─ views/             # EJS templates
├─ .env               # Environment variables
├─ package.json
└─ server.js          # Entry point
```

---

## Contributing

1. Fork the repository  
2. Create a new branch (`git checkout -b feature-name`)  
3. Make your changes and commit (`git commit -m "Description"`)  
4. Push to the branch (`git push origin feature-name`)  
5. Open a Pull Request  

---

## License

This project is licensed under the MIT License.

---

## Author

**Precixphantom**
