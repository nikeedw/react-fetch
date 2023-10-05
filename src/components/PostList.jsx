import React from 'react';
import PostItem from "./PostItem";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const PostList = ({ posts, title, remove }) => {
	if(!posts.length) {
		return (
			<h1 style={{textAlign: "center"}}>Posts not found!</h1>
		)
	}

	return (
		<div>
			<h1 style={{textAlign: "center", marginBottom: "15px"}}>{title}</h1>
			<TransitionGroup>
				{posts.map((post, index) => 
					<CSSTransition
						key={post.id}
						timeout={300}
						classNames="post"
					>
						<PostItem remove={remove} number={index + 1} post={post}/>
					</CSSTransition>
				)}
			</TransitionGroup>
		</div>
	)
}

export default PostList;