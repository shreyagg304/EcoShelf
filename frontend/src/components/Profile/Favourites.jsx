import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchFavouriteBooks = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v1/getFavBooks", { headers });
      setFavouriteBooks(response.data.data);
    } catch (error) {
      console.log("Error fetching favourites:", error);
    }
  };

  useEffect(() => {
    fetchFavouriteBooks();
  }, []);

  const handleRemoveBook = async (bookId) => {
    try {
      await axios.put(
        "http://localhost:1000/api/v1/removeBookFromFav",
        {},
        {
          headers: { ...headers, bookid: bookId },
        }
      );
      alert("Book removed from favourites");
      fetchFavouriteBooks();
    } catch (error) {
      console.error("Error removing book from favourites:", error);
    }
  };

  return (
    <>
      {FavouriteBooks.length === 0 ? (
        <div className="h-[20vh] text-5xl font-semibold text-zinc-500 flex items-center justify-center w-full">
          No Favourite Books
        </div>
      ) : (
        <>
          <div className="text-5xl font-semibold text-center mb-6 text-yellow-900">Favourite Books</div>
          <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2">
            {FavouriteBooks.map((item, i) => (
              <div key={i}>
                <BookCard
                  data={item}
                  favourite={true}
                  onRemove={handleRemoveBook}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Favourites;
