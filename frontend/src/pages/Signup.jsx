import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [Values, setValues] = useState({
    username: "", 
    email: "", 
    password: "", 
    address: "",
  });
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("http://localhost:1000/api/v1/signup",Values);
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50 p-8">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-yellow-900 mb-4 text-center">
          Create Your Account on <span className="text-lime-600">EcoShelf</span>
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Start building your bookshelf and share with the world.
        </p>
        <form className="space-y-6" onSubmit={submit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-4 py-2 border rounded-md"
              required
              placeholder="Enter your name"
              value={Values.username}
              onChange={change}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              className="w-full px-4 py-2 border rounded-md"
              required
              placeholder="Enter your email"
              value={Values.email}
              onChange={change}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md"
              required
              placeholder="Enter your password"
              value={Values.password}
              onChange={change}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              className="w-full px-4 py-2 border rounded-md"
              rows="4"
              placeholder="Enter your address"
              required
              value={Values.address}
              onChange={change}
            />
          </div>
          <button type="submit" className="w-full bg-yellow-900 text-white py-2 px-4 rounded-md focus:ring">
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-900 font-medium hover:underline">
              Login now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
