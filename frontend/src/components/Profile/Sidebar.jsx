import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const role = useSelector((state) => state.auth.role); 
  return (
    <div className='bg-yellow-800 p-6 rounded-md flex flex-col items-center lg:h-[90vh] md:h-[90vh] h-[55vh] lg:m-0 mx-5'>
        <div className='flex items-center flex-col justify-center'>
            <img src={data.avatar} className='h-24 w-24 rounded-full object-cover' />
            <p className='mt-3 text-xl text-zinc-100 font-semibold text-center'>{data.username}</p>
            <p className='mt-1 text-sm text-zinc-200 text-center'>{data.email}</p>
            <div className='w-full mt-4 h-[1px] bg-yellow-50 hidden lg:block' ></div>
        </div>

        {role === "user" && (
            <div className='w-full flex-col items-center flex mt-3'>
            <Link
                to="/profile"
                className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-yellow-900 rounded-lg transition-all duration-300"
            >
                Favourites
            </Link>
            <Link
                to="/profile/orderHistory"
                className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-yellow-900 rounded-lg transition-all duration-300"
            >
                Order History
            </Link>
            <Link
                to="/profile/settings"
                className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-yellow-900 rounded-lg transition-all duration-300"
            >
                Settings
            </Link>
        </div>
        )}

        {role === "admin" && (
            <div className='w-full flex-col items-center flex mt-3'>
            <Link
                to="/profile"
                className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-yellow-900 rounded-lg transition-all duration-300"
            >
                All Orders
            </Link>
            <Link
                to="/profile/addBook"
                className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-yellow-900 rounded-lg transition-all duration-300"
            >
                Add Book
            </Link>
        </div>
        )}

        <button className='hover:bg-yellow-700 lg:w-full mt-2 text-white font-semibold flex items-center justify-center p-2 bg-yellow-900 hover:text-lime-200 transition-all duration-300 rounded-lg' onClick={() => {
            dispatch(authActions.logout());
            dispatch(authActions.changeRole("user"));
            localStorage.clear("id");
            localStorage.clear("token");
            localStorage.clear("role");
            history("/");
        }}>
            Log out <FaArrowRightFromBracket className="ml-3" />
        </button>
    </div>
  );
};

export default Sidebar
