import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();
  const authContext = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Login failed! Status: ${response.status}`);
      }

      response.json().then((promise) => {
        const currentTime = new Date().getTime();
        localStorage.setItem("token", promise.token);
        localStorage.setItem("loginTime", currentTime.toString()); 
        authContext?.login();
        navigate("/home");
      });
    } catch (error) {
      console.error("Login failed:", error instanceof Error ? error.message : error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-200 to-orange-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[90%] max-w-md">
        <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">Welcome Back!</h1>
        <p className="text-gray-600 text-center mb-8">Log in to access your account</p>

        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={user.username}
          className="w-full p-3 mb-4 border bg-transparent border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={user.password}
          className="w-full p-3 mb-6 border bg-transparent border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600 transition"
          onClick={handleLogin}
        >
          Log In
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account? <a href="#signup" className="text-orange-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;