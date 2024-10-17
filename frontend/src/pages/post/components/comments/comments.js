import { useState } from "react";
import { Comment } from "./comment/comment";
import { useDispatch } from "react-redux";
import { addCommentAsync } from "../../../../actions";

export const Comments = ({ comments, postId }) => {
	const [newComment, setNewComment] = useState('');

	const dispatch = useDispatch();

	const onNewCommentAdd = (postId, comment) => {
		dispatch(addCommentAsync(postId, comment));
		setNewComment('');
	};

	return (
		<div>
			<div>
				<textarea value={newComment} placeholder="Комментарий" onChange={({ target }) => setNewComment(target.value)}></textarea>
				<button className="btn" type="button" onClick={() => onNewCommentAdd(postId, newComment)}>Отправить</button>
			</div>
			<div>
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment {...{ id, author, content, publishedAt, postId }} key={id} />
				))}
			</div>
		</div>
	)
};