import React, { useRef, useState, useMemo, useEffect } from "react";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
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
import { useObserver } from "../hooks/useObserver";
import Select from "../components/UI/select/Select";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts || [], filter.sort, filter.query);
	const lastElement = useRef()
	console.log(lastElement);

	const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page);
		setPosts([...posts, ...response.data]);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPagesCount(totalCount, limit));
	})

	useObserver(lastElement, page < totalPages, isPostsLoading, () => {
		setPage(page + 1);
})

	useEffect(() => {
		fetchPosts(limit, page);
	}, [page, limit])
	
	function createPost(newPost) {
		const maxId = Math.max(...posts.map((post) => post.id), 0);
		const postId = maxId + 1;
		const postWithId = { ...newPost, id: postId };
	
		setPosts([...posts, postWithId]);
		setModal(false);
	}	

	function removePost(post) {
		const newList = posts.filter(p => p.id !== post.id);
		setPosts(newList);
	}

	function changePage(page) {
		setPage(page);
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
			<div className="selects">
				<Select 
					value={limit}
					onChange={value => setLimit(value)}
					defaultValue="Number posts"
					options={[
						{value: 5, name: 5},
						{value: 10, name: 10},
						{value: 25, name: 25},
						{value: -1, name: 'Show all'},
					]}
				/>
			</div>
			{postError &&
				<h1 style={{textAlign: "center", marginBlock: "20px"}}>
					{`There is an error! ${postError}`}
				</h1>
			}
			{isPostsLoading && 
				<div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
					<Loader />
				</div>
			}	
			<PostList 
				remove={removePost} 
				posts={sortedAndSearchedPosts} 
				title="Posts List" 
			/>
			<div ref={lastElement}>{/*FOR Intersection Observer*/}</div>
			<Pagination 
				totalPages={totalPages}
				page={page}
				changePage={changePage}
			/>
		</div>
	);
}

export default Posts;
