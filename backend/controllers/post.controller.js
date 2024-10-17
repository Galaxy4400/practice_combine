const Post = require("../models/post.model");

const addPost = async (postData) => {
	const post = await Post.create(postData);

	post.populate({
		path: 'comments',
		populate: 'author',
	});

	return post;
};

const editPost = async (id, postData) => {
	const post = await Post.findByIdAndUpdate(id, postData, { returnDocument: 'after' });

	await post.populate({
		path: 'comments',
		populate: 'author',
	});

	return post;
};

const deletePost = async (id) => {
	await Post.deleteOne({ _id: id });
};

const getPost = async (id) => {
	const post = await Post.findById(id);

	await post.populate({
		path: 'comments',
		populate: 'author',
	});

	return post;
};

const getPosts = async (search = '', limit = 10, page = 1) => {
	const [posts, count] = await Promise.all([
		Post.find({ title: { $regex: search, $options: 'i' } }).limit(limit).skip((page - 1) * limit).sort({ createdAt: -1 }),
		Post.countDocuments({ title: { $regex: search, $options: 'i' } }),
	]);

	return { posts, count, lastPage: Math.ceil(count / limit) };
};

module.exports = { addPost, editPost, deletePost, getPost, getPosts };