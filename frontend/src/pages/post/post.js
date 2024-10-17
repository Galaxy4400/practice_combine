import { useDispatch, useSelector } from "react-redux";
import { Comments, PostContent, PostForm } from "./components";
import { useEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { loadPost } from "../../actions";
import { selectPost } from "../../selectors";

export const Post = () => {
	const dispatch = useDispatch();
	const post = useSelector(selectPost);
	const isCreating = !!useMatch('/post');
	const [error, setError] = useState(null);

	const { id } = useParams();

	useEffect(() => {
		if (isCreating) return;
		
		dispatch(loadPost(id)).then(postData => {
			if (postData.error) setError(postData.error);
		});
			
	}, [id, dispatch, isCreating]);

	return (
		<>
			{error ? (<div>{error}</div>) : 
			(<div>
				{isCreating ? (
					<>
						<PostForm />
					</>
				) : (
					<>
						<PostContent post={post} />
						<Comments comments={post.comments} postId={id} />
					</>
				)}
			</div>)
			}
		</>
	)
};