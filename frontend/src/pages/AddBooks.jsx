import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBooks = () => {
    const navigate =  useNavigate();
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
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
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
                const response = await axios.post(
                    "http://localhost:1000/api/v1/addBook",
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

    return (
        <div className="add-book-form max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Add a New Book
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
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBooks;
