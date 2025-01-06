import React from 'react'
import HeaderImage from '/header_pic.png';

const Hero = () => {
  return (
    <div>
        <section className="text-center">
            <h2 className="text-6xl font-bold text-yellow-900 mb-4 pt-6 px-4 max-sm:text-4xl">Welcome to EcoShelf</h2>
            <p className="text-xl text-gray-600 mb-6 px-4">Explore, share, and build your bookshelf with us.</p>
            <img src={HeaderImage} alt="People reading books" className="mx-auto" />
        </section>
    </div>
  );
};

export default Hero;