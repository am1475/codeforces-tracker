import React from 'react';

const Benefits = () => {
  return (
    <section className="bg-gray-100 p-12 text-center">
      <h2 className="text-4xl font-bold mb-6">Benefits for Students</h2>
      <div className="flex flex-wrap justify-center">
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img className="w-full" src="/path/to/benefits-image1.jpg" alt="Benefit 1" />
          <div className="px-6 py-4">
            <p className="text-lg">Monitor your progress over time</p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img className="w-full" src="/path/to/benefits-image2.jpg" alt="Benefit 2" />
          <div className="px-6 py-4">
            <p className="text-lg">Identify strengths and areas for improvement</p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img className="w-full" src="/path/to/benefits-image3.jpg" alt="Benefit 3" />
          <div className="px-6 py-4">
            <p className="text-lg">Set goals and track your achievements</p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img className="w-full" src="/path/to/benefits-image4.jpg" alt="Benefit 4" />
          <div className="px-6 py-4">
            <p className="text-lg">Get motivated by seeing your growth</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
