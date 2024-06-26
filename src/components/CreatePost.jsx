// CreatePost.jsx
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = ({ onCreate, onClose }) => { // Add onClose prop to handle modal closing
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    formData.append('image', image);

    try {
      const response = await fetch('http://https://login-project-backend.onrender.com/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Post created successfully');
        setTitle('');
        setText('');
        setImage(null);

        // Call onCreate function passed from Homepage to fetch updated posts
        onCreate();
        onClose(); // Close the modal after creating a post
      } else {
        toast.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error during post creation');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setText('');
    setImage(null);
    onClose(); // Close the modal when canceling
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 lg:p-10 rounded shadow-md w-full max-w-xs md:max-w-md lg:max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Post</h2>
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
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={handleCancel} className="w-1/2 py-2 bg-gray-300 text-gray-800 rounded text-lg">
            Cancel
          </button>
          <button type="submit" className="w-1/2 py-2 bg-blue-500 text-white rounded text-lg">
            Create Post
          </button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default CreatePost;
