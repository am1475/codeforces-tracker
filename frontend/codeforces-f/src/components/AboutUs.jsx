import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-gray-100 p-12 text-center">
      <h2 className="text-4xl font-bold mb-6">About Us</h2>
      <div className="flex flex-wrap justify-center">
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img className="w-full" src="/path/to/about-us-image.jpg" alt="About Us" />
          <div className="px-6 py-4">
            <p className="text-lg">We are a team of passionate developers and educators dedicated to helping students excel in competitive programming and coding challenges.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
