import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import h1 from '../images/h1.jpg';
import aboutImage from '../images/ab1.jpeg';
import benefitsImage from '../images/b1.jpg';
import teamImage from '../images/cc1.jpg';
import codeforcesLogo from '../images/c1.jpeg';
import leetcodeLogo from '../images/l2.jpeg';
import codechefLogo from '../images/ch1.jpeg';
import hackerrankLogo from '../images/hk1.jpeg';
import 'aos/dist/aos.css';
import AOS from 'aos';
// Import the styles.css file

function HomePage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
      if (response.data.status === 'OK') {
        navigate(`/dashboard/${username}`);
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="home-page min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-white p-4 shadow-lg text-black">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Codeforces Tracker</h1>
          <nav>
            <a href="/" className="px-4 py-2 hover:text-gray-700">Home</a>
            <a href="/about" className="px-4 py-2 hover:text-gray-700">About</a>
            <a href="/contact" className="px-4 py-2 hover:text-gray-700">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section py-12 text-white" data-aos="fade-up">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left px-6">
            <h1 className="text-5xl font-bold mb-4">Track Your Coding Progress</h1>
            <p className="text-lg mb-6">Analyze and improve your performance on platforms like Codeforces, LeetCode, CodeChef, and HackerRank.</p>
            <button className="px-6 py-3 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-800">Get Started</button>
          </div>
          <div className="w-full md:w-1/2">
            <img src={h1} alt="Hero" className="mx-auto md:mx-0 rounded-lg shadow-lg w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* Username Form Section */}
      <section className="py-12 bg-gray-100" data-aos="fade-up">
        <div className="container mx-auto flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Enter your Codeforces Username</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <label className="block mb-2 text-lg font-bold" htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleInputChange}
              className="w-full p-3 border rounded mb-4"
              required
            />
            <button type="submit" className="w-full py-3 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-800">Track</button>
          </form>
        </div>
      </section>

      {/* About Our Service Section */}
      <section className="py-12 bg-white" data-aos="fade-up">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 px-6 mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">About Our Service</h2>
            <p className="text-lg">Our platform provides detailed analytics of your coding performance, helping you to improve and track your progress across various coding platforms.</p>
          </div>
          <div className="md:w-1/2 px-6">
            <img src={aboutImage} alt="About" className="rounded-lg shadow-lg w-full max-w-sm mx-auto" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gray-100" data-aos="fade-up">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 px-6 mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">Benefits for Students</h2>
            <p className="text-lg">Students can gain insights into their strengths and weaknesses, allowing them to focus on areas that need improvement. This helps in better preparation for coding interviews and competitions.</p>
          </div>
          <div className="md:w-1/2 px-6">
            <img src={benefitsImage} alt="Benefits" className="rounded-lg shadow-lg w-full max-w-sm mx-auto" />
          </div>
        </div>
      </section>

      {/* Supported Websites Section */}
      <section className="py-12 bg-white" data-aos="fade-up">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Supported Websites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
              <img src={codeforcesLogo} alt="Codeforces" className="w-16 h-16 mb-4" />
              <p className="text-lg font-semibold">Codeforces</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
              <img src={leetcodeLogo} alt="LeetCode" className="w-16 h-16 mb-4" />
              <p className="text-lg font-semibold">LeetCode</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
              <img src={codechefLogo} alt="CodeChef" className="w-16 h-16 mb-4" />
              <p className="text-lg font-semibold">CodeChef</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
              <img src={hackerrankLogo} alt="HackerRank" className="w-16 h-16 mb-4" />
              <p className="text-lg font-semibold">HackerRank</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 bg-gray-100" data-aos="fade-up">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 px-6 mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-lg">We are a team of passionate developers dedicated to helping coders improve their skills by providing insightful analytics and tracking tools. Our mission is to make coding practice more efficient and effective.</p>
          </div>
          <div className="md:w-1/2 px-6">
            <img src={teamImage} alt="Team" className="rounded-lg shadow-lg w-full max-w-sm mx-auto" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-6">
        <p>&copy; 2024 Codeforces Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
