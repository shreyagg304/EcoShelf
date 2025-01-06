import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { GrLanguage } from 'react-icons/gr';
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdOutlineDelete } from "react-icons/md";
import UpdateBook from '../../pages/UpdateBook';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:1000/api/v1/getBookById/${id}`);

            setData(response.data.data);  
        };
        fetch();
    }, []);
    
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      };
    const handleFavourite = async () => {
        const response = await axios.put("http://localhost:1000/api/v1/addBookToFav", {}, { headers });
        alert(response.data.message);
    };
    const handleCart = async () => {
        const response = await axios.put("http://localhost:1000/api/v1/addToCart",{},{ headers });
        alert(response.data.message);
    };
    const deleteBook = async () => {
        const response = await axios.delete("http://localhost:1000/api/v1/deleteBook",{ headers });
        alert(response.data.message);  
        navigate("/allBooks"); 
    };

    return (
        <>
            {data ? (
                <div className="px-4 md:px-12 py-8 bg-yellow-50 flex flex-col md:flex-row gap-8">
                    <div className="w-full lg:w-3/6 relative">
                        <div className='p-4 bg-yellow-800 rounded flex items-center justify-center h-full'>
                            <img 
                                src={data.url} 
                                alt="Book Cover" 
                                className="h-[50vh] lg:h-[70vh] rounded object-cover"
                            />
                            {isLoggedIn === true && role === "user" && (
                                <div className='absolute top-4 right-4 flex flex-col gap-4'>
                                    <button className='bg-white rounded-full text-3xl text-red-600 p-3 shadow-md' onClick={handleFavourite}>
                                        <FaHeart />{" "}
                                    </button>
                                    <button className='bg-white rounded-full text-3xl text-lime-500 p-3 shadow-md' onClick={handleCart}>
                                        <FaShoppingCart />{" "}
                                    </button>
                                </div>
                            )}
                            {isLoggedIn === true && role === "admin" && (
                                <div className='absolute top-4 right-4 flex flex-col gap-4'>
                                    <Link to={`/updateBook/${id}`} className='bg-white rounded-full text-3xl p-3 shadow-md'>
                                        <FaEdit />{" "}
                                    </Link> 
                                    <button className='bg-white rounded-full text-3xl text-red-600 p-3 shadow-md' onClick={deleteBook}>{" "}
                                        <MdOutlineDelete />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="p-4 w-full lg:w-1/2 space-y-4">
                        <p className="text-3xl font-bold text-yellow-900 mb-2">{data.title}</p>
                        <p className="text-xl text-gray-900 font-semibold mb-2">By {data.author}</p>
                        <p className="text-gray-700 text-lg leading-relaxed">{data.desc}</p>
                        <p className="text-gray-700 text-lg mt-2">
                            <span className="font-semibold">Genre:</span> {data.genres ? data.genres.join(', ') : 'N/A'}
                        </p>
                        <p className="text-gray-700 text-lg flex items-center">
                            <GrLanguage className="mr-2" /> {data.language}
                        </p>
                        <p className="text-gray-700 text-lg">
                            <span className="font-semibold">Publisher:</span> {data.pub}
                        </p>
                        <p className="text-gray-700 text-lg">
                            <span className="font-semibold">Published Date:</span> {data.pubDate}
                        </p>
                        <p className="text-yellow-900 text-xl font-bold mt-4">Price: ₹{data.price}</p>
                    </div>
                </div>
            ) : (
                <div className="h-screen bg-yellow-50 flex items-center justify-center">
                    <Loader />
                </div>
            )}
        </>
    );
};

export default BookDetails;
