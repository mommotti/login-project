import React, { useEffect, useState } from 'react';
import Post from './Post';
import { toast } from 'react-toastify';

const Posts = ({ onEdit }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      const sortedPosts = data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      setPosts(sortedPosts);
    } catch (error) {
      toast.error('Failed to load posts');
    }
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(post => post._id !== postId));
        toast.success('Post deleted successfully');
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      toast.error('Error deleting post');
    }
  };

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
            postId={post._id}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-center">No posts available</p>
      )}
    </div>
  );
};

export default Posts;
