import { request } from "../utils";
import { addComment } from "./add-comment";

export const addCommentAsync = (postId, content) => (dispatch) => {
	request(`/posts/${postId}/comments`, 'POST', { content })
		.then((commentData) => {
			dispatch(addComment(commentData.comment));
		});
};