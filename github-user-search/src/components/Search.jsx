import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await fetchUserData(username, location, minRepos);
      if (data.items && data.items.length) {
        setUserData(data.items);
      } else {
        setError("Looks like we cant find the user");
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2 w-full shadow-sm focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded p-2 w-full shadow-sm focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            placeholder="Minimum Repositories (optional)"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="border rounded p-2 w-full shadow-sm focus:ring focus:ring-blue-300"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 w-full shadow-md"
          >
            Search
          </button>
        </form>
        {loading && <p className="mt-4 text-center">Loading...</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        <div className="mt-4">
          {userData.map(user => (
            <div key={user.id} className="border p-4 mb-4 rounded shadow">
              <img src={user.avatar_url} alt={user.login} width="50" />
              <h2 className="font-semibold">{user.login}</h2>
              <p>Location: {user.location || 'N/A'}</p>
              <p>Repositories: {user.public_repos}</p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Profile</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;