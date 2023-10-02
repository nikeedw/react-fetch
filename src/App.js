import React, { useRef, useState } from "react";
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

	const [post, setPost] = useState({title: '', body: ''});

	function addNewPost(e) {
		e.preventDefault();
		setPosts([...posts, {...post, id: Date.now()}]);
		setPost({title: '', body: ''});
	}

	return (
		<div className="App">
			<form>
				{/* Управляемый компонент */}
				<Input 
					type="text" 
					placeholder="Post title" 
					value={post.title}
					onChange={(event) => setPost({...post, title: event.target.value})}
				/>
				{/* Неуправляемый/неконтролируемый компонент */}
				<Input 
					type="text" 
					placeholder="Post description" 
					value={post.body}
					onChange={(event) => setPost({...post, body: event.target.value})}
				/>
				<Button onClick={addNewPost}>Add post</Button>
			</form>
			<PostList posts={posts} title="Post List" />
		</div>
	);
}

export default App;
