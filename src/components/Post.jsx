// Post.jsx
import React from 'react';

const Post = ({ title, text, image, dateCreated, onEdit, postId }) => {
  return (
    <div className="bg-white rounded shadow-md p-4 max-w-xl mx-auto mb-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-lg mb-4">{text}</p>
      {image && (
        <img
          src={`http://localhost:5000/uploads/${image}`}
          alt={title}
          className="w-full h-auto object-cover rounded mb-4"
        />
      )}
      <p className="text-sm text-gray-500">{new Date(dateCreated).toLocaleString()}</p>

      {/* Edit Button */}
      <button
        onClick={() => onEdit({ _id: postId, title, text, image })}
        className="py-2 px-4 bg-gray-300 text-gray-800 rounded mt-2"
      >
        Edit Post
      </button>
    </div>
  );
};

export default Post;
