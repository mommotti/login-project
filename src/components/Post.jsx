import React from 'react';

const Post = ({ title, text, image, dateCreated, onEdit, onDelete, postId }) => {
  const formattedDate = new Date(dateCreated).toLocaleString();

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
      <p className="text-sm text-gray-500">{formattedDate}</p>
      <div className="flex space-x-2 mt-2">
        <button
          onClick={() => onEdit({ _id: postId, title, text, image })}
          className="py-2 px-4 bg-gray-300 text-gray-800 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(postId)}
          className="py-2 px-4 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
