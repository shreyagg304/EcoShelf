import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader/Loader'

const Profile = () => {
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get ("http://localhost:1000/api/v1/getUserInfo", {headers});
      setProfile(response.data);
    };
    fetch();
  }, []);
  return (
    <div className='bg-yellow-50 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 '>
      {!Profile && (
        <div className='w-full flex items-center justify-center'>
          <Loader />
        </div>
      )}
      {Profile && (
        <>
          <div className='md:w-2/6 lg:w-1/6 w-full lg:h-screen md:h-[90vh] '>
            <Sidebar data={Profile} />
          </div>
          <div className='md:w-4/6 lg:w-5/6 w-full'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default Profile