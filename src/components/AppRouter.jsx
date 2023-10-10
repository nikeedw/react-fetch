import React from 'react';
import { Route, Routes } from "react-router-dom";
import Missing from "../pages/Missing";
import Posts from "../pages/Posts";
import About from "../pages/About";
import PostIdPage from '../pages/PostIdPage';

const AppRouter = () => {
	return (
		<Routes>
			<Route path="/posts" element={<Posts />} />
			<Route exact path="posts/:id" element={<PostIdPage />}/>
			<Route path="/about" element={<About />} />
			<Route path="*" element={<Missing />} />
		</Routes>
	)
}

export default AppRouter;