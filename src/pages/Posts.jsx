import React, { useRef, useState, useMemo, useEffect } from "react";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { usePagination } from '../hooks/usePagination';
import '../styles/App.css';
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Modal from "../components/UI/modal/Modal";
import Button from "../components/UI/button/Button";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import { getPagesCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts || [], filter.sort, filter.query);

	const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page);
		setPosts(response.data);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPagesCount(totalCount, limit));
	})

	useEffect(() => {
		fetchPosts(limit, page);
	}, [])
	
	function createPost(newPost) {
		setPosts( [...posts, newPost] );
		setModal(false);
	}

	function removePost(post) {
		const newList = posts.filter(p => p.id !== post.id);
		setPosts(newList);
	}

	function changePage(page) {
		setPage(page);
		fetchPosts(limit, page);
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
			<Pagination 
				totalPages={totalPages}
				page={page}
				changePage={changePage}
			/>
		</div>
	);
}

export default Posts;
