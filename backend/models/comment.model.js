const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const CommentSchema = new Schema({
	content: {
		type: String,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

Comment.createIndexes();

module.exports = Comment;