import './app.css';
import { Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components';
import { Authorization, Main, Post, Registration, Users } from './pages';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './actions';
import { request } from './utils';


export const Blog = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		request('/me').then(({ user }) => user && dispatch(setUser(user)));
	}, [dispatch]);

	return (
		<div className='wrapper'>
			<Header />
			<main>
				<h2>Контент страницы</h2>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<Authorization />} />
					<Route path='/register' element={<Registration />} />
					<Route path='/users' element={<Users />} />
					<Route path='/post' element={<Post />} />
					<Route path='/post/:id' element={<Post />} />
					<Route path='*' element={<div>Ошибка</div>} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
};
