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
import Loader from "./components/UI/loader/Loader";

function App() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const [isPostsLoading, setIsPostsLoading] = useState(false);

	useEffect(() => {
		fetchPosts();
	}, [filter])
	
	function createPost(newPost) {
		setPosts( [...posts, newPost] );
		setModal(false);
	}
	
	async function fetchPosts() {
		setIsPostsLoading(true);
		setTimeout(async () => {
			const posts = await PostService.getAll();
			setPosts(posts);
			setIsPostsLoading(false);
		}, 1000);
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
			{isPostsLoading 
				? <div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
						<Loader />
					</div>
				:	<PostList 
						remove={removePost} 
						posts={sortedAndSearchedPosts} 
						title="Posts List" 
					/>
			}
		</div>
	);
}

export default App;
