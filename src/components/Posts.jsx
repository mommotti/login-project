// Posts.jsx
import React, { useEffect, useState } from 'react';
import Post from './Post';
import { toast } from 'react-toastify';

const Posts = ({ onEdit }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        toast.error('Failed to load posts');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="space-y-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            title={post.title}
            text={post.text}
            image={post.image}
            dateCreated={post.dateCreated}
            postId={post._id} // Pass postId to Post component
            onEdit={onEdit} // Pass onEdit function to Post component
          />
        ))
      ) : (
        <p className="text-center">No posts available</p>
      )}
    </div>
  );
};

export default Posts;
