# EchoHub 🗣️

> A community-driven blog platform where ideas echo across users. Share your thoughts, read perspectives, and engage with a community of thinkers.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://blog-platform-6wv2.onrender.com)
[![Node.js](https://img.shields.io/badge/node.js-v18+-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/database-MongoDB-green)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**[Live Demo](https://blog-platform-6wv2.onrender.com)** | **[Report Bug](https://github.com/Precixphantom/blog-platform/issues)** | **[Request Feature](https://github.com/Precixphantom/blog-platform/issues)**

---

## ⚠️ Important Note

**First load may take 30-60 seconds.** The application is hosted on Render's free tier, which spins down after periods of inactivity. As a junior developer building in public, I'm using free hosting to keep the project accessible while I continue learning and improving it.

---

## 🎯 What is EchoHub?

EchoHub is a blog platform I built to solve a simple problem: **giving people a space to share their thoughts on topics that matter to them**, while allowing others to discover and engage with those perspectives.

I wanted to understand what happens behind the scenes when you log into a website, create content, and see it persist across sessions. This project became my playground for learning authentication, authorization, database design, and server-side rendering.

### The Vision

Currently, users can write and publish their thoughts. The platform distinguishes between your own blogs and others' content, creating a personalized reading experience.

**Coming soon:** Comments, likes, and sharing features to transform EchoHub into a true community platform where ideas don't just exist—they echo and evolve through conversation.

---

## ✨ Features

### Current Features

- 🔐 **User Authentication** - Secure registration and login with password hashing
- ✍️ **Create & Publish** - Write and publish blog posts
- 📖 **Read & Discover** - Browse blogs from all users
- 👤 **Personal Dashboard** - View and manage your own blogs separately
- ✏️ **Edit & Delete** - Full CRUD operations on your content
- 🎨 **Responsive Design** - Works across desktop and mobile devices

### Roadmap (What's Next)

- [ ] Email verification for new users
- [ ] Dark/Light theme toggle
- [ ] Comment system
- [ ] Like and share functionality
- [ ] User profiles with avatars
- [ ] Search and filter blogs
- [ ] Rich text editor for better formatting
- [ ] Categories and tags

---

## 🛠️ Built With

**Backend:**

- [Node.js](https://nodejs.org/) - Runtime environment
- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - ODM for MongoDB

**Authentication & Security:**

- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JWT tokens
- [express-validator](https://express-validator.github.io/) - Input validation
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Cookie handling
- [express-session](https://www.npmjs.com/package/express-session) - Session management

**Frontend:**

- [EJS](https://ejs.co/) - Templating engine
- Vanilla CSS - Styling

**Development:**

- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables
- [nodemon](https://nodemon.io/) - Development server
- [method-override](https://www.npmjs.com/package/method-override) - HTTP verb support

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Precixphantom/blog-platform.git
   cd blog-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   SECRET_KEY=your_secret_key_here
   ```

   **How to get these:**
   - `MONGODB_URI`: Get from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
   - `SECRET_KEY`: Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   ```
   http://localhost:5000
   ```

---

## 📂 Project Structure

```
blog-platform/
├── controllers/       # Route logic and business logic
├── middleware/        # Authentication and validation middleware
├── models/           # Mongoose schemas and models
├── routes/           # API route definitions
├── views/            # EJS templates
├── public/
│   └── css/         # Stylesheets
├── .env             # Environment variables (not in repo)
├── .gitignore       # Git ignore rules
├── server.js        # Application entry point
└── package.json     # Dependencies and scripts
```

---

## 🎓 What I Learned

Building EchoHub taught me more than I expected:

### The Biggest Challenges

1. **EJS Templating** - Understanding how to pass data from the backend to views and render dynamic content
2. **Authentication Flow** - Implementing secure user authentication and ensuring users only see/edit their own content
3. **Deployment** - Dealing with environment variables, database connections, and the differences between local and production environments

### Key Takeaways

- **Authentication ≠ Authorization** - Logging in is one thing; ensuring users can only access their own resources is another
- **State management matters** - Sessions, cookies, and JWTs each solve different problems
- **Error handling is crucial** - Things break in production in ways they never do locally

### What I'd Do Differently Now

Three months later, I'd approach several things differently:

- Use TypeScript for better type safety
- Implement comprehensive input validation from the start
- Write tests alongside features (not after)
- Use a REST API architecture instead of pure server-side rendering
- Add proper logging and monitoring from day one

---

## 🐛 Known Limitations

Being honest about where the project stands:

- **Cold starts**: Render free tier sleeps after inactivity (30-60s initial load)
- **No pagination**: Performance will degrade with thousands of posts
- **Basic UI**: Functional but not polished—design improvements coming
- **No real-time features**: Comments/likes will need page refreshes initially
- **Limited error feedback**: User-facing error messages could be more helpful

I'm aware of these limitations and actively working to address them as I learn more.

---

## 🤝 Contributing

**I'm learning in public and contributions are welcome!** Whether you're a beginner like me or an experienced developer, your input helps me grow.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas Where I'd Love Help

- Code reviews and best practice suggestions
- Security improvements
- UI/UX enhancements
- Documentation improvements
- Bug fixes

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 About Me

I'm Precious Afolabi, a **Junior Backend Developer** learning in public and building projects to understand how things work behind the scenes. I'm curious about authentication, databases, APIs, and everything that powers modern web applications.

This project represents where I was three months ago. It's not perfect, but it's real progress, and I'm proud of shipping something functional while continuing to improve it.

### Let's Connect

- **Twitter/X**: [@AfolabiPre38572](https://x.com/AfolabiPre38572)
- **LinkedIn**: [Precious Afolabi](https://www.linkedin.com/in/precious-afolabi-34194138b)
- **Email**: <afolabiprecious099@gmail.com>

**I'm open to feedback, mentorship, and opportunities.** If you're reviewing this as a potential employer or mentor, I'd love to hear your thoughts on how I can improve—both this project and as a developer.

---

## 🙏 Acknowledgments

- Thanks to everyone who's contributed feedback
- The Node.js and MongoDB communities for excellent documentation
- Every developer who's shared their learning journey publicly—you inspired me to do the same

---

## 📊 Project Status

**Active Development** - I'm continuously improving this project as I learn new concepts and best practices. Check the [Issues](https://github.com/Precixphantom/blog-platform/issues) page to see what I'm working on next.

**Last Updated**: December 2024

---

*Built with curiosity, improved through feedback, and shared with the hope it helps other learners.* 🚀
