import React, { useState } from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import Button from "./components/UI/button/Button";
import Input from "./components/UI/input/Input";

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'JavaScript', body: 'JS Description'},
		{id: 2, title: 'TypeScript', body: 'TS Description'},
		{id: 3, title: 'React', body: 'React JS Description'},
	]);

	return (
		<div className="App">
			<form>
				<Input type="text" placeholder="Post title" />
				<Input type="text" placeholder="Post description" />
				<Button>Add post</Button>
			</form>
			<PostList posts={posts} title="Post List" />
		</div>
	);
}

export default App;
