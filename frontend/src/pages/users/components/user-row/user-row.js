import { useState } from 'react';
import { request } from '../../../../utils';

export const UserRow = ({ id, login, registeredAt, roleId: userRoleId, roles, onUserRemove }) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId})
			.then(() => setInitialRoleId(newUserRoleId));
	};

	const isSaveButtonDisabled = initialRoleId === selectedRoleId;

	return (
		<tr>
			<td>{login}</td>
			<td>{registeredAt}</td>
			<td>
				<select value={selectedRoleId} onChange={onRoleChange}>
					{roles.map(({ id: roleId, name: roleName }) => (
						<option value={roleId} key={roleId}>{roleName}</option>
					))}
				</select>
			</td>
			<td><button className="btn" type="button" onClick={() => onRoleSave(id, selectedRoleId)} disabled={isSaveButtonDisabled}>Сохранить</button></td>
			<td><button className="btn" type="button" onClick={() => onUserRemove(id)}>уладить</button></td>
		</tr>
	);
};

