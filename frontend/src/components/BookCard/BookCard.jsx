import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ data, favourite, onRemove }) => {
  const handleRemoveBook = () => {
    if (onRemove) {
      onRemove(data._id); // Call onRemove function passed as prop
    }
  };

  return (
    <div className='flex flex-col'>
      <Link to={`viewBookDetails/${data._id}`}>
        <div className='p-4 border rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300'>
          <div className='flex items-center justify-center'>
            <img src={data.url} alt="/" className='h-[25vh]' />
          </div>
          <div className='py-4 text-center'>
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <p className="text-gray-600">Author: {data.author}</p>
            <p className="text-gray-600">Genres: {data.genres.join(', ')}</p>
            <p className="font-bold text-yellow-900">₹{data.price}</p>
          </div>
        </div>
      </Link>
      {favourite && (
        <button
          className='bg-yellow-800 text-sm px-4 py-2 rounded border text-yellow-50'
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;

