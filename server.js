require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require("method-override");
const path = require("path");

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/myBlogs');
});


// Routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use('/', authRoutes);
app.use('/', blogRoutes);

app.get('/', (req, res) => {
    res.render('index', {user: null, title: "Home"});
});


// Connect to MongoDB
mongoose.connect(process.env.dbURI)
    .then((result) => {
        console.log("Connected Successfully")
    })
    .catch((err) => {
        console.log(err.message);
    });

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});