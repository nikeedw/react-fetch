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
import { useFetching } from "./hooks/useFetching";
import { getPagesCount } from "./utils/pages";
import { usePagination } from "./hooks/usePagination";

function App() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts || [], filter.sort, filter.query);
	
	const pagesArray = usePagination(totalPages);

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const response = await PostService.getAll(limit, page);
		setPosts(response.data);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPagesCount(totalCount, limit));
	})

	useEffect(() => {
		fetchPosts();
	}, [filter])
	
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
			{postError &&
				<h1 style={{textAlign: "center", marginBlock: "20px"}}>
					{`There is an error! ${postError}`}
				</h1>
			}
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
			<div className="page__wrapper">
				{pagesArray.map(p => 
					<span 
						onClick={() => setPage(p)}
						key={p}
						className={page === p ? 'page page__current' : 'page'}
					>{p}</span>
				)}
			</div>
		</div>
	);
}

export default App;
