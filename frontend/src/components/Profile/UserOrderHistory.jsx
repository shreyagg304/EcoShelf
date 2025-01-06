import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/getOrderHistory", { headers });
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div>
      {!OrderHistory && <div className='w-full h-[100%] flex items-center justify-center'><Loader /></div>}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              No Order History
            </h1>
            {/* <img src="" alt="" /> */}
          </div>
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <div>
          <h1 className='text-5xl font-semibold text-yellow-800 items-center justify-center flex p-8'>
            Your Order History
          </h1>
          <div className='mt-4 bg-yellow-800 text-yellow-50 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1 className=''>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className=''>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className=''>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className=''>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className=''>Mode</h1>
            </div>
          </div>
          {OrderHistory.map((items, i) => (
            <div className='bg-yellow-100 w-full rounded py-2 px-4 flex gap-2 hover:bg-yellow-200 hover:cursor-pointer'>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i+1}</h1>
              </div>
              <div className='w-[22%]'>
                <Link 
                  to={`/viewBookDetails/${items.book._id}`}
                  className=''
                >
                  {items.book.title}
                </Link>
              </div>
              <div className='w-[45%]'>
                <h1 className=''>{items.book.desc.slice(0,50)}...</h1>
              </div>
              <div className='w-[9%]'>
                <h1 className=''>{items.book.price}</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='font-semibold text-green-800'>{items.status === "Order placed" ? (
                  <div className='text-yellow-500'>{items.status}</div> ) : items.status === "Cancelled" ? (
                    <div className='text-red-600'>{items.status}</div> ) : (
                      items.status
                )}
                </h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className='text-sm'>COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserOrderHistory