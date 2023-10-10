import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import Button from '../components/UI/button/Button';
import { IoIosArrowBack } from 'react-icons/io';

const PostIdPage = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [fetchPostById, isLoading, error] = useFetching( async(id) => {
		const response = await PostService.getById(id);
		setPost(response.data);
	});
	const [fetchComments, isComLoading, ComError] = useFetching( async(id) => {
		const response = await PostService.getCommentsById(id);
		setComments(response.data);
	});

	useEffect(() => {
		fetchPostById(params.id);
		fetchComments(params.id);
	}, [])

	const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Вернуться на предыдущую страницу
  };

	return (
		<div className='PostIdPage'>
			<Button 
				className="back_btn"
				style={{
					position: "absolute",
					top: "10px",
					left: "10px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "40px",
				}}
				onClick={handleGoBack}
			>
				<IoIosArrowBack />
			</Button>
			<h1>You have opened the post page with id: {params.id}</h1>
			{isLoading
				? <div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
						<Loader />
					</div>
				: <h1 style={{
						margin: "20px",
						color: "#6c62fb"
					}}>
						{post.id}. {post.title}
					</h1>
			}
			<h1>Comments</h1>
			{isComLoading 
				? <div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
						<Loader />
					</div>
				: <div>
						{comments.map(comm => 
							<div style={{marginTop: "20px"}}>
								<h4 style={{marginBottom: "5px"}}>{comm.email}</h4>
								<div>{comm.body}</div>
							</div>
						)}
					</div>
			}
		</div>
	)
}

export default PostIdPage;