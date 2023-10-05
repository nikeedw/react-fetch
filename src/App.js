import React, { useRef, useState, useMemo, useEffect } from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import Modal from "./components/UI/modal/Modal";
import Button from "./components/UI/button/Button";
import { usePosts } from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";

function App() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

	useEffect(() => {
		fetchPosts();
	}, [filter])
	
	function createPost(newPost) {
		setPosts( [...posts, newPost] );
		setModal(false);
	}
	
	async function fetchPosts() {
		const posts = await PostService.getAll();
		setPosts(posts);
	}

	function removePost(post) {
		const newList = posts.filter(p => p.id !== post.id);
		setPosts(newList);
	}

	return (
		<div className="App">
			<Button onClick={() => setModal(true)}>
				Create user
			</Button>
			<Modal
				visible={modal}
				setVisible={setModal}
			>
				<PostForm create={createPost} />
			</Modal>
			<hr style={{margin: '15px 0'}} />
			<PostFilter filter={filter} setFilter={setFilter}/>
			<PostList 
				remove={removePost} 
				posts={sortedAndSearchedPosts} 
				title="Posts List" 
			/>
		</div>
	);
}

export default App;
