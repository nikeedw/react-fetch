import React, { useRef, useState, useMemo } from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import Modal from "./components/UI/modal/Modal";
import Button from "./components/UI/button/Button";
import { usePosts } from "./hooks/usePosts";

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'Babel', body: 'CSS components'},
		{id: 2, title: 'Agile', body: 'Block metodology'},
		{id: 3, title: 'CMS', body: 'A web structure'},
	]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

	function createPost(newPost) {
		setPosts( [...posts, newPost] );
		setModal(false);
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
