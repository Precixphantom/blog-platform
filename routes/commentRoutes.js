const express = require('express');
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


// create comments
router.post('/blogs/:blogId/comments', authMiddleware, commentController.createComment);

// get all comment for a post
router.get('/blogs/:blogId/comments', authMiddleware, commentController.getComments);

// delete comment
router.delete('/comments/:commentId', authMiddleware, commentController.deleteComment);


module.exports = router;