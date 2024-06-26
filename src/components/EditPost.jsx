// EditPost.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = ({ postId, initialTitle, initialText, initialImage, onClose, onUpdate }) => {
  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialText);
  const [image, setImage] = useState(initialImage);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    if (image instanceof File) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`https://login-project-backend.onrender.com/api/posts/${postId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedPost = await response.json();
        toast.success('Post updated successfully');
        onUpdate(updatedPost); // Call onUpdate with the updated post data
      } else {
        toast.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error during post update');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 lg:p-10 rounded shadow-md w-full max-w-xs md:max-w-md lg:max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Post</h2>
      <div className="mb-4">
        <label className="block mb-2 text-lg">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded text-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg">Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-2 border rounded text-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full px-4 py-2 border rounded text-lg"
        />
        {initialImage && !image && (
          <img
            src={`https://login-project-backend.onrender.com/uploads/${initialImage}`}
            alt={initialTitle}
            className="w-full h-auto object-cover rounded mt-4"
          />
        )}
      </div>
      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded text-lg">
        Update Post
      </button>
      <button type="button" onClick={onClose} className="w-full py-2 bg-gray-300 text-gray-800 rounded text-lg mt-2">
        Cancel
      </button>
    </form>
  );
};

export default EditPost;
