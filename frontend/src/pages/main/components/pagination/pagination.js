export const Pagination = ({ setPage, page, lastPage }) => {
	return (
		<div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
			<button className="btn" disabled={page === 1} onClick={() => setPage(1)}>В начало</button>
			<button className="btn" disabled={page === 1} onClick={() => setPage(page - 1)}>Предыдущая</button>
			<div> Страница: {page}</div>
			<button className="btn" disabled={page === lastPage} onClick={() => setPage(page + 1)}>Следующая</button>
			<button className="btn" disabled={page === lastPage} onClick={() => setPage(lastPage)}>В конец</button>
		</div>
	)
};