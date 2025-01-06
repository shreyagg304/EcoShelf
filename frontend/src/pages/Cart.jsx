import React, { useState, useEffect } from 'react'
import Loader from "../components/Loader/Loader"
import { AiFillDelete } from "react-icons/ai"
import {useNavigate} from "react-router-dom"
import axios from 'axios'

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/getUserCart", { headers });
      setCart(response.data.data);
    };
    fetch();
  }, []);

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/removeFromCart/${bookid}`,
        {},
        { headers }
      );
      alert(response.data.message);
      setCart(Cart.filter(item => item._id !== bookid)); 
    } catch (error) {
      console.error("Error removing book from cart", error);
    }
  };

  useEffect(() => {
    if(Cart && Cart.length > 0) {
      let total =0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total =0;
    }
  }, [Cart]);

  const PlaceOrder = async () => {
      try {
          const response = await axios.post(
              "http://localhost:1000/api/v1/placeOrder",
              { order: Cart },
              { headers }
          );

          alert(response.data.message);
          navigate("/profile/orderHistory");
      } catch (error) {
          console.error("Error placing order:", error);
          alert("Failed to place order. Please try again.");
      }
  };


  return (
    <div className='h-auto bg-yellow-50'>
      {!Cart && <div className='w-full h-[100%] flex items-center justify-center'><Loader /></div>}
      {Cart && Cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              Empty Cart
            </h1>
            {/* <img src="/" alt="" /> */}
          </div>
        </div>
      )}
      {Cart && Cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-yellow-800 items-center justify-center flex p-8'>
            Your Cart
          </h1>
          {Cart.map((items, i) => (
            <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-yellow-100 justify-between items-center'>
              <img src={items.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover ' />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-yellow-800 font-semibold text-start mt-2 md:mt-0'>
                  {items.title}
                </h1>
                <p className='text-normal text-gray-700 mt-2 hidden lg:block'>
                  {items.desc.slice(0, 100)}...
                </p>
                <p className='text-normal text-gray-700 mt-2 hidden md:block lg:hidden'>
                  {items.desc.slice(0, 65)}...
                </p>
                <p className='text-normal text-gray-700 mt-2 block md:hidden'>
                  {items.desc.slice(0, 100)}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-gray-800 text-3xl font-semibold flex'>
                ₹{items.price}
                </h2>
                <button
                  className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
                  onClick={() => deleteItem(items._id)}
                >
                  <AiFillDelete/>
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {Cart && Cart.length > 0 && (
        <div className='my-4 w-full flex items justify-end'>
          <div className='p-4 bg-yellow-900 rounded text-white m-4'>
            <h1 className='text-3xl font-semibold'>
              Total Amount
            </h1>
            <div className='mt-3 flex items-center justify-between test-xl text-grey-900'>
              <h2>No. of Books : {Cart.length} books <h2>Total : ₹{Total}</h2> </h2>
            </div>
            <div className='w-[100%] mt-3'>
              <button className='hover:bg-yellow-700 rounded px-4 py-2 flex justify-center w-full font-semibold bg-yellow-800 text-yellow-50 hover:text-lime-500' onClick={PlaceOrder}>
                Place your order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart