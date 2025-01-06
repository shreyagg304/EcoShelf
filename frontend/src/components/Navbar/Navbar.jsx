import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "About Us",
            link: "/aboutUs",
        },
        {
            title: "All Books",
            link: "/allBooks",
        },
        // {
        //     title: "Marketplace",
        //     link: "/marketplace",
        // },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
        {
            title: "Admin Profile",
            link: "/profile",
        },
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    if (isLoggedIn === false) {
        links.splice(3,3);
    }
    if (isLoggedIn == true && role === "user"){
        links.splice(5,1);
    }
    if (isLoggedIn == true && role === "admin"){
        links.splice(3,2);
    }

    const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
        <nav className='z-50 relative flex bg-yellow-900 text-lime-500 px-6 py-4 items-center justify-between'>
            <Link to="/" className='flex items-center'>
                <img
                    className='h-10 me-4' 
                    src="ecoshelfLogo.png" 
                    alt="logo" 
                />
                <h1 className='text-3xl font-bold'>EcoShelf</h1>
            </Link>
            <div className='navLinksEcoshelf block md:flex items-center gap-4'>
                <div className='hidden md:flex gap-4 text-xl font-semibold'>
                    {links.map((items, i) => (
                        <div className='flex items-center'>
                            {items.title === "Profile" || items.title === "Admin Profile" ? 
                                <Link
                                    to={items.link}
                                    className=" px-3 text-lg border border-lime-500 rounded font-semibold hover:bg-white hover:text-yellow-900 transition-all duration-300" 
                                    key={i}
                                >
                                    {items.title}
                                </Link> : 
                                <Link
                                    to={items.link}
                                    className=" hover:text-white transition-all duration-300" 
                                    key={i}
                                >
                                    {items.title}{" "}
                                </Link>
                            }
                        </div>
                    ))}
                </div>
                {isLoggedIn === false && (
                    <div className='hidden md:flex gap-4'>
                    <Link
                        to="/Login" 
                        className='px-4 py-1 text-lg border border-lime-500 rounded font-semibold hover:bg-white hover:text-yellow-900 transition-all duration-300'
                    >
                        LogIn
                    </Link>
                    <Link
                        to="/SignUp" 
                        className='px-4 py-1 text-lg bg-lime-500 text-yellow-900 rounded font-semibold hover:bg-white hover:text-yellow-900 transition-all duration-300'
                    >
                        SignUp
                    </Link>
                </div>
                )}
            </div>
            <button 
                className='block md:hidden text-lime-500 text-2xl hover:text-lime-600' 
                onClick={ () => MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden") }
            >
                <FaGripLines />
            </button>
        </nav>
        <div 
            className={`${MobileNav} bg-yellow-100 absolute w-full flex flex-col items-center justify-center`}
        >
            {links.map((items, i) => (
                <Link
                    to={items.link}
                    className="text-lime-500 my-2 text-xl font-semibold hover:text-yellow-800 transition-all duration-300" 
                    key={i}
                    onClick={() => setMobileNav("hidden")} 
                >
                    {items.title}{" "}
                </Link>
            ))}
            {isLoggedIn === false && (
                <>
                    <Link
                        to="/Login" 
                        className='px-4 py-1 text-lime-500 text-xl mb-4 border border-lime-500 rounded font-semibold hover:bg-white hover:text-yellow-900 transition-all duration-300'
                        onClick={() => setMobileNav("hidden")} 
                    >
                        LogIn
                    </Link>
                    <Link
                        to="/SignUp" 
                        className='px-4 py-1 text-xl mb-4 bg-lime-500 text-yellow-900 rounded font-semibold hover:bg-white hover:text-yellow-900 transition-all duration-300'
                        onClick={() => setMobileNav("hidden")}
                    >
                        SignUp
                    </Link>
                </>
            )}
        </div>
    </>
  );
};

export default Navbar;