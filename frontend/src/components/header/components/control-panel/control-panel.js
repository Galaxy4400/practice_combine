import { Link, useNavigate } from "react-router-dom";
import { ROLE } from "../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole, selectUserLogin } from "../../../../selectors";
import { logoutAction } from "../../../../actions";


export const ControlPanel = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	return (
		<div className="actions">
			<div className="buttons">
				{
					roleId === ROLE.GUEST ? 
						<>
							<Link className="btn" to="/login">Войти</Link>
							<Link className="btn" to="/register">Регистрация</Link>
						</>
					 : (
						<>
							<span>{login}</span>
							<button className="btn" onClick={() => dispatch(logoutAction())}>Выйти</button>
						</>
					)
				}
			</div>
			<div className="buttons">
				<button className="btn" onClick={() => navigate(-1)}>Назад</button>
				<Link className="btn" to="/post">Новая статья</Link>
				<Link className="btn" to="/users">Пользователи</Link>
			</div>
		</div>
	)
};