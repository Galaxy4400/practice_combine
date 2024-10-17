import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export const Search = ({doSearch}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	useEffect(() => {
		doSearch(debouncedSearchTerm);
	}, [debouncedSearchTerm, doSearch]);

	return (
		<div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
			Поиск: <input type="text" value={searchTerm} onChange={({target}) => setSearchTerm(target.value)} style={{width: '250px'}}/>
		</div>
	)
};