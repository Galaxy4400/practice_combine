import { useDispatch } from "react-redux";
import { Confirm } from "../../../../components";
import { useModal } from "../../../../providers";
import { PostForm } from "../post-form/post-form";
import { removePost } from "../../../../actions";
import { useNavigate } from "react-router-dom";

export const PostContent = ({ post }) => {
	const { id, title, imageUrl, content, publishedAt } = post;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { openModal, closeModal } = useModal();

	const editHandler = (post) => {
		openModal(<PostForm post={post}/>);
	};

	const removeHandler = (id) => {
		openModal(
			<Confirm 
				text={"Вы уверены что хотите удалить пост?"} 
				onClose={() => closeModal()}
				onConfirm={() => {
					dispatch(removePost(id))
						.then(() => {
							closeModal();
							navigate('/');
						});
				}}
			/>
		);
	}

	return (
		<div>
			<h2>{title}</h2>
			<img src={imageUrl} alt={title} />
			<div>{content}</div>
			<div>{publishedAt}</div>
			<div>
				<button className="btn" type="button" onClick={() => editHandler(post)}>Редактировать</button>
				<button className="btn" type="button" onClick={() => removeHandler(id)}>Удалить</button>
			</div>
		</div>
	)
};