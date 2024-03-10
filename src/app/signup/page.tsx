"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import axios from "axios";
import { signup } from "@/helpers/signup";
import { useRouter } from 'next/navigation';


export default function SignupPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

const onSignup=()=>{

    signup(user, setLoading, router);
}


  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center w-full lg:w-10/12 pt-10 px-4 lg:px-30 ">
      <div className="w-full lg:w-4/12 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="block text-gray-700 text-lg font-semibold mb-2" >{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="username">username</label>
        <input
          className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="email">email</label>
        <input
          className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="password">password</label>
        <input
          className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onSignup}
          className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {buttonDisabled ? "No signup" : "Signup"}
        </button>
        <br />
        <Link href="/login">Visit login page</Link>
      </div>
    </div>
  );
}