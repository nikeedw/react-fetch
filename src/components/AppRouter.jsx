import React from 'react';
import { Route, Routes } from "react-router-dom";
import Missing from "../pages/Missing";
import Posts from "../pages/Posts";
import About from "../pages/About";
import PostIdPage from '../pages/PostIdPage';
import { routes } from '../router/routes';

const AppRouter = () => {
	return (
		<Routes>
			{routes.map(route => (
					<Route
						key={route.path}
						path={route.path}
						element={<route.component />}
						exact={route.exact}
					/>
			))}
		</Routes>
	);
}

export default AppRouter;
