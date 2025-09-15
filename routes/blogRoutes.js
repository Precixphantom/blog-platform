const express = require('express');
const controller = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// get all blogs
router.get('/blogs', controller.getAllBlogs);

// show create blog form
router.get('/blogs/create', authMiddleware, controller.createBlogForm);

// handele create blog
router.post('/blogs/create', authMiddleware, controller.createBlog);

// get user's blogs
router.get('/myBlogs', authMiddleware, controller.getMyBlogs);

// single blog
router.get('/blogs/:id', controller.getBlog);

// show update blog form
router.get('/blogs/:id/edit', authMiddleware, controller.updateBlogForm);

// handle update and delete 
router.put('/blogs/:id', authMiddleware, controller.updateBlog);
router.delete('/blogs/:id', authMiddleware, controller.deleteBlog);

module.exports = router;

