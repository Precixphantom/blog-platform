const Blog = require('../models/Blog');

// show create blog form
const createBlogForm = (req, res) => {
    res.render('createBlog', {title: "Create a new Blog"})
}


// handle create blog
const createBlog = async (req, res) => {
    try {
        const { title, content} = req.body;

        // Validation
        if (!title || !content) {
            return res.status(400).send("Title and Content are required");
        }

        // Instance of a blog
        const blog = new Blog({
            title,
            content,
            author: req.user._id
        });

        await blog.save();

        res.redirect('/myBlogs');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

const getAllBlogs = async (req, res) => {
    try {
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
    }
    catch (err) {
        console.err(err.message);
        res.status(500).send("Server Error");
    }
};

const getBlog = async (req, res) => {
    try {
        const {id} = req.params;

        const blog = await Blog.findById(id)
            .populate('author', 'username email')
        
        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        res.render('blog', {blog, user: req.user});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({author: req.user._id})
            .populate('author', 'username email')
            .sort({createdAt: -1});
        res.render('myBlogs', {blogs, user: req.user});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

// show update blog form
const updateBlogForm = async (req, res) => {
    try {
        const {id} = req.params;

        const blog = await Blog.findById(id)
            

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        // Check ownership
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).send("Unauthorized");
        }
        res.render('editBlog', {blog, user: req.user})

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
}


// handle update blog
const updateBlog = async (req, res) => {
    try {
        const {id} = req.params;

        const blog = await Blog.findById(id)
            

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        // Check ownership
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).send("Unauthorized");
        }

        const {title, content} = req.body;

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;

        // await blog.save();
        await Blog.findByIdAndUpdate(id, {title, content}, {new: true});

        res.redirect('/myBlogs');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const deleteBlog = async (req, res) => {
    try {
        const {id} = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        if (!req.user) {
            return res.status(401).send("User is not authenticated");
        }
        if (!blog.author) {
            return res.status(400).send("Blog has no author information")
        }
        // Check ownership
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).send("Unauthorized");
        }

        await Blog.findByIdAndDelete(id);

        res.redirect('/myBlogs');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

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