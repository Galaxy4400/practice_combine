const express = require('express');
const { getPosts, getPost, addPost, editPost, deletePost } = require('../controllers/post.controller');
const { addComment, deleteComment } = require('../controllers/comment.controller');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/has-role');
const mapPost = require('../helpers/map-post');
const mapComment = require('../helpers/map-comment');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/:id', async (req, res) => {
	try {
		const post = await getPost(req.params.id);

		res.send({ error: null, post: mapPost(post) });
	} catch (error) {
		res.send({ error: error.message || "Unknown error" });
	}
});

router.get('/', async (req, res) => {
	try {
		const postsData = await getPosts(req.query.search, req.query.limit, req.query.page);
	
		res.send({
			error: null, postsData: {
				...postsData,
				posts: postsData.posts.map(mapPost),
			}
		});
	} catch (error) {
		res.send({ error: error.message || "Unknown error" });
	}
});

router.post('/:id/comments', authenticated, async (req, res) => {
	try {
		const comment = await addComment(req.params.id, {
			content: req.body.content,
			author: req.user.id,
		});

		res.send({ error: null, comment: mapComment(comment) });
	} catch (error) {
		res.send({ error: error.message || "Unknown error" });
	}
});

router.delete('/:postId/comments/:commetnId', authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
	try {
		await deleteComment(req.params.commetnId, req.params.postId);

		res.send({ error: null });
	} catch (error) {
		res.send({ error: error.message || "Unknown error" });
	}
});

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		const post = await addPost({
			title: req.body.title,
			content: req.body.content,
			image: req.body.imageUrl,
		});

		res.send({ error: null, post: mapPost(post) });
	} catch (error) {
		res.send({ error: error.message || "Unknown error" });
	}
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		const post = await editPost(req.params.id, {
			title: req.body.title,
			content: req.body.content,
			image: req.body.imageUrl,
		});

		res.send({ error: null, post: mapPost(post) });
	} catch (error) {
		res.send({ error: error.message || "Unknown error" });
	}
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		await deletePost(req.params.id);

		res.send({ error: null });
	} catch (error) {
		res.send({ error: error.message || "Unknown error" });
	}
});

module.exports = router;