import React, { useState } from 'react';
import Button from "./UI/button/Button";
import Input from "./UI/input/Input";

const PostForm = ({ create }) => {
	const [post, setPost] = useState({title: '', body: ''});

	function addNewPost(e) {
		e.preventDefault();
		create({ 
			title: post.title, 
			body: post.body 
		});
		setPost({ title: '', body: '' });
	}	

	return (
		<form>
			{/* Управляемый компонент */}
			<Input
				type="text"
				placeholder="Post title"
				value={post.title}
				onChange={(event) => setPost({ ...post, title: event.target.value })}
			/>
			{/* Неуправляемый/неконтролируемый компонент */}
			<Input
				type="text"
				placeholder="Post description"
				value={post.body}
				onChange={(event) => setPost({ ...post, body: event.target.value })}
			/>
			<Button onClick={addNewPost}>Add post</Button>
		</form>
	)
}

export default PostForm;