const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Blacklist = require('../models/Blacklist');
const Blog = require('../models/Blog');

// show register form
const showRegister = (req, res) => {
    res.render('register', {user: req.user || null});
};

// handle register
const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        // Check User
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).send("User already exist");
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.redirect('/login');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// show login form
const showLogin = (req, res) => {
    res.render('login', {user: req.user || null});
}

// handle login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check user
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).send("User does not exists");
        }

        // Check password
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).send("Incorrect password");
        }
        
        // create token
        const token = jwt.sign(
            {id: user._id, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );



        // send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        });

        // redirect
        res.redirect('/myBlogs');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// handle logout
const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }

        const decoded = jwt.decode(token);

        await Blacklist.create({
            token,
            expiresAt: new Date(decoded.exp * 1000),
        });

        res.clearCookie("token");

        res.redirect('/login');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error")
    }
}

// dashboard
const showDashboard = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('author', 'username')
            .sort({createdAt: -1});
        
        res.render('dashboard', {user: req.user, blogs});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

module.exports = {
    showRegister,
    registerUser,
    showLogin,
    loginUser,
    logoutUser,
    showDashboard
}