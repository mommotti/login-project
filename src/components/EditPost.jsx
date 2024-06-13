import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const EditPost = ({ postId, initialTitle, initialText, initialImage, onClose }) => {
  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialText);
  const [image, setImage] = useState(null); // Track selected image file
  console.log(postId);
  useEffect(() => {
    setTitle(initialTitle);
    setText(initialText);
  }, [initialTitle, initialText]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        toast.success('Post updated successfully');
        onClose();
      } else {
        toast.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error during post update');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded text-lg"
        />
      </div>
      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded text-lg">
        Update Post
      </button>
      <button type="button" onClick={onClose} className="mt-4 w-full py-2 bg-gray-300 text-gray-800 rounded text-lg">
        Cancel
      </button>
    </form>
  );
};

export default EditPost;
