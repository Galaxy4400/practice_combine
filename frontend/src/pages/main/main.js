import { useEffect, useState } from "react";
import { Pagination, PostCard, Search } from "./components";
import { PAGINATION_LIMIT } from "../../constants";
import { request } from "../../utils/request";

export const Main = () => {
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [posts, setPosts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		request(`/posts?search=${searchTerm}&limit=${PAGINATION_LIMIT}&page=${page}`)
			.then(({ postsData }) => {
				setPosts(postsData.posts);
				setLastPage(postsData.lastPage);

				if (page > lastPage) setPage(1);
			});
	}, [page, searchTerm, lastPage]);

	return (
		<div style={{ margin: '50px 0px' }}>
			<Search doSearch={setSearchTerm} />
			<div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(3, 1fr)', margin: '50px 0px' }}>
				{posts.map((post) => <PostCard {...post} key={post.id} />)}
			</div>
			<Pagination setPage={setPage} page={page} lastPage={lastPage} />
		</div>
	)
};