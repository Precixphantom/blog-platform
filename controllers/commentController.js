const Blog = require('../models/Blog')
const Comment = require('../models/Comment');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// create comment
const createComment = catchAsync(async (req, res, next) => {
        const {content} = req.body
        const {blogId} = req.params

        if (!content) {
            return next(new AppError('Content is required', 400))
        }

        const blog = await Blog.findById(blogId)
        if (!blog) {
            return next(new AppError('Blog does not exist', 404))
        }

        const comment = new Comment({
            content,
            blog: blogId,
            author: req.user.id,
        });

        await comment.save()

        res.status(201).json(comment);
})

const getComments = catchAsync(async (req, res, next) => {
    const comments = await Comment.find({blog: req.params.blogId})

    res.status(200).json({comments});
})

const deleteComment = catchAsync(async (req, res, next) => {
    const {commentId} = req.params;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return next (new AppError('No comment to delete', 404));
        }

        if (!req.user) {
            return next (new AppError('User is not authenticated', 401));
        }

        if (!comment.author) {
            return next (new AppError('Comment has no author information', 400));
        }

        if (comment.author.toString() !== req.user._id.toString()) {
            return next (new AppError('Unauthorized', 403));
        }

        await Comment.findByIdAndDelete(commentId);

        res.status(204).send();
})




module.exports = {
    createComment,
    getComments,
    deleteComment
}