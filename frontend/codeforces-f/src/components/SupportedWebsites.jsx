import React from 'react';

const SupportedWebsites = () => {
  return (
    <section className="bg-white p-12 text-center">
      <h2 className="text-4xl font-bold mb-6">Supported Websites</h2>
      <div className="flex flex-wrap justify-center">
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img className="w-full" src="/path/to/codeforces-logo.jpg" alt="Codeforces" />
          <div className="px-6 py-4">
            <p className="text-lg">Codeforces</p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img className="w-full" src="/path/to/leetcode-logo.jpg" alt="LeetCode" />
          <div className="px-6 py-4">
            <p className="text-lg">LeetCode</p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img className="w-full" src="/path/to/codechef-logo.jpg" alt="CodeChef" />
          <div className="px-6 py-4">
            <p className="text-lg">CodeChef</p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img className="w-full" src="/path/to/hackerrank-logo.jpg" alt="HackerRank" />
          <div className="px-6 py-4">
            <p className="text-lg">HackerRank</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportedWebsites;
