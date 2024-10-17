const { default: mongoose } = require("mongoose")
const mapComment = require("./map-comment")

module.exports = (post) => {
	return {
		id: post.id,
		title: post.title,
		content: post.content,
		imageUrl: post.image,
		comments: post.comments.map(
			comment => mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
		),
		publishedAt: post.createdAt,
	}
}