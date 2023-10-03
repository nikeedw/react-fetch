import React, { useRef, useState } from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import Select from "./components/UI/select/Select";

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'A', body: 'C'},
		{id: 2, title: 'B', body: 'B'},
		{id: 3, title: 'C', body: 'A'},
	]);
	const [selectedSort, setSelectedSort] = useState('');

	function createPost(newPost) {
		setPosts( [...posts, newPost] );
	}

	function removePost(post) {
		const newList = posts.filter( (p) => p.id !== post.id ); 
		setPosts(newList);
	}

	function sortPosts(sort) {
		setSelectedSort(sort);
		setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
	}	

	return (
		<div className="App">
			<PostForm create={createPost} />
			<hr style={{margin: '15px 0'}} />
			<div>
				<Select 
					value={selectedSort}
					onChange={sortPosts}
					defaulValue="Sort by:"
					options={[
						{value: "title", name: "by title"},
						{value: "body", name: "by description"}
					]}
				/>
			</div>
			{/* Условная отрисовка */}
			{posts.length !== 0
				?
 				<PostList 
					remove={removePost} 
					posts={posts} 
					title="Posts List" 
				/>
				:
				<h1 style={{textAlign: 'center'}}>
					Posts not found!
				</h1>
			}
		</div>
	);
}

export default App;
