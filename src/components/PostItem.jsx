import React from 'react';
import Button from './UI/button/Button';

const PostItem = ({ post, number, remove }) => {
	return (
		<div className="post">
			<div className="post__content">
				<strong>{number}. {post.title}</strong>
				<div>{post.body}</div>
			</div>
			<div className="post__btns">
				<Button onClick={() => remove(post)}>
					Delete
				</Button>
			</div>
		</div>
	)
}

export default PostItem