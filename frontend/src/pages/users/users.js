import { UserRow } from "./components";
import { useEffect, useState } from "react";
import { request } from "../../utils";

export const Users = () => {
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	
	useEffect(() => {
		Promise.all([
			request('/users'),
			request('/users/roles'),
		]).then(([usersData, rolesData]) => {
			setErrorMessage(null);

			if (usersData.error || rolesData.error) {
				setErrorMessage(usersData.error || rolesData.error);
				return;
			}

			setUsers(usersData.users);
			setRoles(rolesData.roles);
		});
	}, []);

	const onUserRemove = (userId) => {
		request(`/users/${userId}`, 'DELETE')
			.then(({ error }) => {
				if (error) {
					setErrorMessage(error);
					return;
				}

				setUsers(users.filter(({id}) => id !== userId));
			});
	};

	if (errorMessage) {
		return (
			<div>
				<h2>Ошибка</h2>
				<div>{errorMessage}</div>
			</div>
		);
	}

	return (
		<div>
			<h2>Пользователи</h2>
			<table>
				<thead>
					<tr>
						<th>Логин</th>
						<th>Дата регистрации</th>
						<th>Роль</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow {...{ id, login, registeredAt, roleId, roles, onUserRemove }} key={id} />
					))}
				</tbody>
			</table>
		</div>
	)
}
