import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Data, setData] = useState({
        url: '',
        title: '',
        author: '',
        price: '',
        desc: '',
        language: '',
        genres: '',
        pubDate: '',
        pub: '',
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({
            ...Data,
            [name]: name === "price" ? Number(value) : value, // Ensure price is always a number
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (
                Data.url === "" ||
                Data.title === "" ||
                Data.author === "" ||
                Data.price === "" ||
                Data.desc === "" ||
                Data.language === "" ||
                Data.genres === "" ||
                Data.pubDate === "" ||
                Data.pub === ""
            ) {
                alert("All fields are required");
            } else {
                console.log("Submitting data to backend:", Data); // Debug log
                const response = await axios.put(
                    "http://localhost:1000/api/v1/updateBook",
                    Data,
                    { headers }
                );
                setData({
                    url: '',
                    title: '',
                    author: '',
                    price: '',
                    desc: '',
                    language: '',
                    genres: '',
                    pubDate: '',
                    pub: '',
                });
                alert(response.data.message);
                navigate("/allBooks");
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/getBookById/${id}`);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };
        fetch();
    }, [id]);

    return (
        <div className='bg-yellow-50 p-10'>
            <div className="add-book-form max-w-2xl p-8 bg-yellow-100 mx-auto shadow-xl rounded-lg border border-gray-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-yellow-800">
                    Update Book
                </h2>
                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                            type="text"
                            name="url"
                            placeholder="Image URL"
                            value={Data.url}
                            onChange={change}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Book Title"
                            value={Data.title}
                            onChange={change}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                        <input
                            type="text"
                            name="author"
                            placeholder="Author Name"
                            value={Data.author}
                            onChange={change}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={Data.price}
                            onChange={change}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="desc"
                            placeholder="Description"
                            value={Data.desc}
                            onChange={change}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                        <input
                            type="text"
                            name="language"
                            placeholder="Language"
                            value={Data.language}
                            onChange={change}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Genres</label>
                        <input
                            type="text"
                            name="genres"
                            placeholder="Genres (comma-separated)"
                            value={Data.genres}
                            onChange={change}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Publication Date</label>
                        <input
                            type="date"
                            name="pubDate"
                            value={Data.pubDate}
                            onChange={change}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                        <input
                            type="text"
                            name="pub"
                            placeholder="Publisher"
                            value={Data.pub}
                            onChange={change}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 transition"
                    >
                        Update Book
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBook;
