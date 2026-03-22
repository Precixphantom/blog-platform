const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Blacklist = require('../models/Blacklist');
const Blog = require('../models/Blog');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// show register form
const showRegister = (req, res) => {
    res.render('register', {user: req.user || null});
};

// handle register
const registerUser = catchAsync(async (req, res, next) => {
    const {username, email, password} = req.body;

        // Check User
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return next(new AppError('User already exist', 400));
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
})

// show login form
const showLogin = (req, res) => {
    res.render('login', {user: req.user || null});
}

// handle login
const loginUser = catchAsync(async (req, res, next) => {
        const {email, password} = req.body;

        // Check user
        const user = await User.findOne({email});

        if (!user) {
            return next (new AppError('Invalid email or password', 401));
        }

        // Check password
        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            return next(new AppError('Incorrect email or password', 401));
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
})

// handle logout
const logoutUser = catchAsync(async (req, res, next) => {
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
})

// dashboard
const showDashboard = catchAsync(async (req, res) => {
    const blogs = await Blog.find()
            .populate('author', 'username')
            .sort({createdAt: -1});
        
        res.render('dashboard', {user: req.user, blogs});
})

module.exports = {
    showRegister,
    registerUser,
    showLogin,
    loginUser,
    logoutUser,
    showDashboard
}