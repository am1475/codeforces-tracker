import React from 'react';

const About = () => {
  return (
    <section className="bg-white p-12 text-center">
      <h2 className="text-4xl font-bold mb-6">What We Aim To Do</h2>
      <div className="flex flex-wrap justify-center">
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img className="w-full" src="/path/to/about-image.jpg" alt="About" />
          <div className="px-6 py-4">
            <p className="text-lg">Our platform helps you keep track of your competitive programming progress, providing detailed analytics and insights.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
