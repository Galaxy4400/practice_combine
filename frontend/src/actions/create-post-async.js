import { request } from "../utils";
import { setPostData } from "./set-post-data";

export const createPostAsync = (newPostData) => (dispatch) =>
	request('/posts', 'POST', newPostData).then(postData => {
		dispatch(setPostData(postData.post));

		return postData.post;
	});