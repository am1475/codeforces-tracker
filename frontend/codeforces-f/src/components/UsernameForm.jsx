import React from 'react';

const UsernameForm = ({ username, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded mb-6 max-w-md mx-auto">
      <label className="block mb-2 text-lg font-bold" htmlFor="username">
        Enter your Codeforces Username:
      </label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-4"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Track
      </button>
    </form>
  );
};

export default UsernameForm;
