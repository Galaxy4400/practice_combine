import { request } from "../utils";
import { setPostData } from "./set-post-data";

export const loadPost = (postId) => (dispatch) =>
	request(`/posts/${postId}`).then((postData) => {
		if (postData.post) {
			dispatch(setPostData(postData.post));
		};

		return postData;
	});