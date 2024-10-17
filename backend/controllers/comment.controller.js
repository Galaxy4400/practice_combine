const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

const addComment = async (postId, commentData) => {
	const comment = await Comment.create(commentData);

	await Post.findByIdAndUpdate(postId, { $push: { comments: comment } });

	await comment.populate('author');

	return comment;
};

const deleteComment = async (id, postId) => {
	await Comment.deleteOne({ _id: id });

	await Post.findByIdAndUpdate(postId, { $pull: { comments: id } });
};

module.exports = { addComment, deleteComment };