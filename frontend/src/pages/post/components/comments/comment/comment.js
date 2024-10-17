import { useDispatch } from "react-redux";
import { removeCommentAsync } from "../../../../../actions";
import { useModal } from "../../../../../providers";
import { Confirm } from "../../../../../components";

export const Comment = ({ id, author, content, publishedAt, postId }) => {
	const dispatch = useDispatch();

	const { openModal, closeModal } = useModal();

	const removeHandler = (id, postId) => {
		openModal(
			<Confirm 
				text={"Вы уверены что хотите удалить комментарий?"} 
				onClose={() => closeModal()}
				onConfirm={() => {
					dispatch(removeCommentAsync(id, postId));
					closeModal();
				}}
			/>
		);
	}

	return (
		<div>
			<div>Автор: {author}</div>
			<div>Дата: {publishedAt}</div>
			<div>Текст: {content}</div>
			<button className="btn" onClick={() => removeHandler(id, postId)}>Удалить комментарий</button>
		</div>
	)
};