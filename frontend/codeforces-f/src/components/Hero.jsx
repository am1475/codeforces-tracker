import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
          <h1 className="text-5xl font-bold mb-4">Track Your Coding Progress</h1>
          <p className="text-lg mb-6">Analyze and improve your performance on platforms like Codeforces, LeetCode, CodeChef, and HackerRank.</p>
        </div>
        <div className="w-full md:w-1/2">
          <img src="/path/to/hero-image.jpg" alt="Hero" className="mx-auto md:mx-0" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
