import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router/routes';
import { AuthContext } from '../context';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
	const { isAuth, isLoading } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoading) {
			return; // Подождите, пока isLoading не станет false
		}

		if (isAuth) {
			navigate('/posts');
		} else {
			navigate('/login');
		}
	}, [isAuth, isLoading, navigate]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Routes>
			{isAuth ? (
				<>
					{privateRoutes.map((route) => (
						<Route
							key={route.path}
							path={route.path}
							element={<route.component />}
							caseSensitive
						/>
					))}
					{/* Перенаправление на /posts при isAuth === true */}
					<Route path="/*" element={<Navigate to="/posts" />} />
				</>
			) : (
				<>
					{publicRoutes.map((route) => (
						<Route
							key={route.path}
							path={route.path}
							element={<route.component />}
							caseSensitive
						/>
					))}
					{/* Перенаправление на /login при isAuth === false */}
					<Route path="/*" element={<Navigate to="/login" />} />
				</>
			)}
		</Routes>
	);
};

export default AppRouter;
