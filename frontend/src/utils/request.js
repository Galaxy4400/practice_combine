export const request = (url, method, data) => {
	return fetch(`/api${url}`, {
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(response => {
		const contentType = response.headers.get('Content-Type');

		if (contentType && contentType.includes('application/json')) {
			return response.json();
		} else {
			return { error: true };
		}
	});
};