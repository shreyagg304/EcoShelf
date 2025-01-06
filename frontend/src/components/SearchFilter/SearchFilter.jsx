import React from 'react';

const SearchFilter = ({ searchTerm, setSearchTerm, filterGenres, setFilterGenres }) => {
  return (
    <div className="px-8">
      <div className="flex flex-wrap justify-between items-center">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-lime-500 rounded-md p-2 md:w-1/4 max-sm:w-full my-4"
        />
        <select
          value={filterGenres}
          onChange={(e) => setFilterGenres(e.target.value)}
          className="border border-lime-500 rounded-md p-2 md:w-1/4 max-sm:w-full my-4 "
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
    </div>
  );
};

export default SearchFilter;

