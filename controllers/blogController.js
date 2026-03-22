const Blog = require('../models/Blog');
const Comment = require('../models/Comment')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// show create blog form
const createBlogForm = (req, res) => {
    res.render('createBlog', {title: "Create a new Blog"})
}


// handle create blog
const createBlog = catchAsync(async (req, res, next) => {
    const { title, content} = req.body;

        // Validation
        if (!title || !content) {
            return next(new AppError('Title and content are required', 400))
        }

        // Instance of a blog
        const blog = new Blog({
            title,
            content,
            author: req.user._id
        });

        await blog.save();

        res.redirect('/myBlogs');
})

const getAllBlogs = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
        const limit = 5;

       const totalBlogs = await Blog.countDocuments();
        const totalPages = Math.ceil(totalBlogs / limit);

        const blogs = await Blog.find()
                                .sort({ createdAt: -1 }) // newest first
                                .skip((page - 1) * limit)
                                .limit(limit);

        res.render('blogs', {
            blogs,
            user: req.user,
            currentPage: page,
            totalPages
        });
})

const getBlog = catchAsync(async (req, res, next) => {
        const {id} = req.params;

        const blog = await Blog.findById(id)
            .populate('author', 'username email')
        
        if (!blog) {
            return next(new AppError('Blog not found', 404));
        }

        const comments = await Comment.find({blog: id})

        res.render('blog', {blog, user: req.user, comments});
})

const getMyBlogs = catchAsync(async (req, res, next) => {
    const blogs = await Blog.find({author: req.user._id})
            .populate('author', 'username email')
            .sort({createdAt: -1});
        res.render('myBlogs', {blogs, user: req.user});
})

// show update blog form
const updateBlogForm = catchAsync(async (req, res, next) => {
        const {id} = req.params;

        const blog = await Blog.findById(id)
            

        if (!blog) {
            return next(new AppError('Blog not found', 404));
        }

        // Check ownership
        if (blog.author.toString() !== req.user.id) {
            return next(new AppError('Unauthorized', 403));
        }
        res.render('editBlog', {blog, user: req.user})
})


// handle update blog
const updateBlog = catchAsync(async (req, res, next) => {
    const {id} = req.params;

        const blog = await Blog.findById(id)
            

        if (!blog) {
            return next(new AppError('Blog not found', 404));
        }

        // Check ownership
        if (blog.author.toString() !== req.user.id) {
            return next(new AppError('Unauthorized', 403));
        }

        const {title, content} = req.body;

        await Blog.findByIdAndUpdate(id, {title, content}, {new: true});

        res.redirect('/myBlogs');
})

const deleteBlog = catchAsync(async (req, res, next) => {
    const {id} = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return next(new AppError('Blog not found', 404));
        }

        if (!req.user) {
            return next(new AppError('User id not authenticated', 401));
        }

        if (!blog.author) {
            return next(new AppError('Blog has no author information', 400));
        }

        // Check ownership
        if (blog.author.toString() !== req.user._id.toString()) {
            return next(new AppError('Unauthorized', 403));
        }

        await Blog.findByIdAndDelete(id);

        res.redirect('/myBlogs');
})

module.exports = {
    createBlogForm,
    createBlog,
    getAllBlogs,
    getBlog,
    getMyBlogs,
    updateBlogForm,
    updateBlog,
    deleteBlog
}