import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';
import axios from 'axios';

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('All');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/getAllBooks');
        setData(response.data.data);
        setFilteredData(response.data.data); // Initially show all books
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    // Filter books based on search term and genre
    const filtered = data.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = filterGenre === 'All' || book.genres.includes(filterGenre);
      return matchesSearch && matchesGenre;
    });
    setFilteredData(filtered);
  }, [searchTerm, filterGenre, data]);

  return (
    <div className='p-8 bg-yellow-50 h-auto'>
      <h4 className='text-4xl text-yellow-900 font-bold max-sm:text-3xl p-4 mt-4 text-center'>All Books</h4>
      
      {/* Search and Filter */}
      <div className="flex flex-wrap justify-between items-center gap-4">
  <input
    type="text"
    placeholder="Search books..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border border-lime-500 rounded-md p-2 md:w-1/4 max-sm:w-full mt-4"
  />
  <select
    value={filterGenre}
    onChange={(e) => setFilterGenre(e.target.value)}
    className="border border-lime-500 rounded-md p-2 md:w-1/4 max-sm:w-full mt-4"
  >
    <option value="All">All Genres</option>
    <option value="Fiction">Fiction</option>
    <option value="Non-Fiction">Non-Fiction</option>
    <option value="Science">Science</option>
    <option value="Fantasy">Fantasy</option>
    <option value="Classics">Classics</option>
    <option value="Adventure">Adventure</option>
    <option value="Thriller">Thriller</option>
    <option value="Mystery">Mystery</option>
    <option value="Drama">Drama</option>
    <option value="Memoir">Memoir</option>
    <option value="Biography">Biography</option>
    <option value="Romance">Romance</option>
    <option value="Historical Fiction">Historical Fiction</option>
    <option value="Philosophy">Philosophy</option>
    <option value="Gothic Fiction">Gothic Fiction</option>
    <option value="Dystopian">Dystopian</option>
    <option value="Science Fiction">Science Fiction</option>
    <option value="Young Adult">Young Adult</option>
  </select>
</div>

      {!filteredData.length && (
        <div className='flex items-center justify-center my-8'>
          <Loader />{" "}
        </div>
      )}
      
      <div className='my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {filteredData.map((item, i) => (
          <div key={i}>
            <BookCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
