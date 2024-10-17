import { request } from "../utils";
import { setPostData } from "./set-post-data";

export const savePostAsync = (postId, newPostData) => (dispatch) => 
	request(`/posts/${postId}`, 'PATCH', newPostData).then((postData) => {
		dispatch(setPostData(postData.post));
		
		return postData.post;
	});