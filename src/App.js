import React, { useRef, useState, useMemo } from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'Babel', body: 'CSS components'},
		{id: 2, title: 'Agile', body: 'Block metodology'},
		{id: 3, title: 'CMS', body: 'A web structure'},
	]);
	const [filter, setFilter] = useState({sort: '', query: ''});

	const sortedPosts = useMemo(() => {
		if(filter.sort) {
			return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
		} 
		return posts;
	}, [filter.sort, posts]); //use Memory

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query));
	}, [filter.query, sortedPosts])

	function createPost(newPost) {
		setPosts( [...posts, newPost] );
	}

	function removePost(post) {
		const newList = posts.filter( (p) => p.id !== post.id );
		setPosts(newList);
	}

	return (
		<div className="App">
			<PostForm create={createPost} />
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
