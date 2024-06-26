// Homepage.jsx
import React, { useState, useEffect } from 'react';
import CreatePost from '../components/CreatePost';
import Posts from '../components/Posts';
import { CSSTransition } from 'react-transition-group';
import EditPost from '../components/EditPost';
import { toast } from 'react-toastify';
import '../styles/PostAnimation.css';

const Homepage = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [editPostData, setEditPostData] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts(); // Fetch posts initially
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://login-project-backend.onrender.com/api/posts');
      if (response.ok) {
        const data = await response.json();
        const sortedPosts = data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
        setPosts(sortedPosts); // Update posts state with fetched and sorted data
      } else {
        console.error('Failed to fetch posts');
        toast.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error fetching posts');
    }
  };

  const handleEditPost = (postData) => {
    setEditPostData(postData);
  };

  const handleCloseEdit = () => {
    setEditPostData(null);
  };

  const handleUpdatePost = (updatedPost) => {
    const updatedPosts = posts.map(post => post._id === updatedPost._id ? updatedPost : post);
    setPosts(updatedPosts);
    setEditPostData(null); // Close EditPost component
  };

  const handleCloseCreate = () => {
    setShowCreatePost(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <div className="p-4">
        <button
          onClick={() => setShowCreatePost(!showCreatePost)}
          className="mb-4 py-2 px-4 bg-blue-500 text-white rounded"
        >
          Write a Post
        </button>

        <CSSTransition
          in={showCreatePost}
          timeout={300}
          classNames="post"
          unmountOnExit
        >
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md">
              <CreatePost onCreate={fetchPosts} onClose={handleCloseCreate} /> {/* Pass onClose prop */}
            </div>
          </div>
        </CSSTransition>

        {editPostData && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
              <EditPost
                postId={editPostData._id}
                initialTitle={editPostData.title}
                initialText={editPostData.text}
                initialImage={editPostData.image}
                onClose={handleCloseEdit}
                onUpdate={handleUpdatePost}
              />
            </div>
          </div>
        )}

        <Posts posts={posts} onEdit={handleEditPost} />
      </div>
    </div>
  );
};

export default Homepage;
