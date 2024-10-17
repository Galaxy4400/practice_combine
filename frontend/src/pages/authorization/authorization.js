import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions';
import { selecthash } from '../../selectors/select-user-session';
import { useResetForm } from '../../hooks';
import { request } from '../../utils';

const authFormRules = yup.object().shape({
	login: yup.string().required().min(3).max(15),
	password: yup.string().required().min(3).max(15),
});

export const Authorization = () => {
	const { 
		register, reset, handleSubmit, formState: { errors }
	} = useForm({ resolver: yupResolver(authFormRules) });

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();
	
	const session = useSelector(selecthash);

	useResetForm(reset);

	useEffect(() => {
		if (!session) reset();
	}, [session, reset]);

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password })
			.then(({ error, user }) => {
				if (error) {
					setServerError(error);
					return;
				}

				dispatch(setUser(user));
			});
	}

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (session) {
		return <Navigate to="/" replace />;
	}

	return (
		<div>
			<h2>Авторизация</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="Логин..."
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<input
					type="password"
					placeholder="Пароль..."
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<button className='btn' type="submit" disabled={!!formError}>Войти</button>
				<Link to="/register">Регистрация</Link>
				{errorMessage && <div>{errorMessage}</div>}
			</form>
		</div>
	);
};