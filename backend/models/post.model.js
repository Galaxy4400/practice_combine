const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const validator = require('validator');

const PostSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		required: true,
		validate: {
			validator: validator.isURL,
			message: 'Image should be a valid url',
		}
	},
	content: {
		type: String,
		required: true,
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment',
	}],
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

Post.createIndexes();

module.exports = Post;