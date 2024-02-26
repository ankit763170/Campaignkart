"use client"
import { useState } from 'react';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const loggedIn = false; // You need to set the loggedIn state as per your logic

  const handleLogin = () => {
    // Implement your login logic here
    setLoading(true);
    // Example: Simulating login for 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center pt-10 px-4 lg:px-20">
      <div className="w-full lg:w-4/12">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-lg font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-lg font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
