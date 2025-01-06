import React from 'react';
import Hero from '../components/Home/Hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';
import AllBooks from './AllBooks';

const Home = () => {
  return (
    <div className='bg-yellow-50'>
        <Hero />
        <RecentlyAdded />
        <AllBooks />
    </div>
  );
};

export default Home;