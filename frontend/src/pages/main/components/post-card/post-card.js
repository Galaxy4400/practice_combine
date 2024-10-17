import { Link } from "react-router-dom";

export const PostCard = ({ id, title, imageUrl, publishedAt, comments }) => {
	return (
		<Link to={`/post/${id}`} style={{display: 'block'}}>
			<div>
				<img src={imageUrl} alt="post" />
				<h3>{title}</h3>
				<p>Дата публикации: {publishedAt}</p>
				<p>Количество комментариев: {comments.length}</p>
			</div>
		</Link>
	)
};