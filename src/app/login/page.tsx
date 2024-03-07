"use client";

import { useState } from 'react';
import { onLogin } from '@/helpers/login';
import { useRouter } from 'next/navigation'; 
import React from 'react';
import { useDispatch } from 'react-redux'

const Page = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch()

  const handleLogin = async () => {

    setLoading(true);
    await onLogin(user, setLoading, router, dispatch); // Added await since onLogin is asynchronous
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
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
              name="email"
              value={user.email}
              onChange={handleChange}
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
              name="password"
              value={user.password}
              onChange={handleChange}
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
