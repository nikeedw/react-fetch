import React, { useState } from "react";
import './styles/App.css';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import Posts from "./pages/Posts";
import About from "./pages/About";
import Navbar from "./components/UI/navbar/Navbar";
import Missing from "./pages/Missing";

function App() {
	return (
		<BrowserRouter>
			<Navbar/>
			<Routes>
				<Route path="/posts" element={<Posts />} />
				<Route path="/about" element={<About />} />
				<Route path="*" element={<Missing />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
