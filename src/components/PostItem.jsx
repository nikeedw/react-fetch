import React from 'react';
import Button from './UI/button/Button';
import { useNavigate } from 'react-router-dom';

const PostItem = ({ post, number, remove }) => {
  const navigate = useNavigate();

  const handleOpenClick = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {post.id}. {post.title}
        </strong>
        <div>{post.body}</div>
      </div>
      <div className="post__btns">
        <Button onClick={handleOpenClick}>Open</Button>
        <Button onClick={() => remove(post)}>Delete</Button>
      </div>
    </div>
  );
};

export default PostItem;
