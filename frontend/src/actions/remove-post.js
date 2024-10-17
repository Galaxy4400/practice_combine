import { request } from "../utils";

export const removePost = (id) => () => 
	request(`/posts/${id}`, 'DELETE');