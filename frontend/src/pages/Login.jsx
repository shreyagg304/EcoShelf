import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {authActions} from "../store/auth";
import { useDispatch } from 'react-redux';

const Login = () => {
  const [Values, setValues] = useState({
    login: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      if (Values.login === ""|| Values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("http://localhost:1000/api/v1/login",Values);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-yellow-900 mb-4 text-center">
          Welcome Back to <span className="text-lime-600">EcoShelf</span>
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Explore, share, and build your bookshelf with us.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              name="login"
              className="w-full px-4 py-2 border rounded-md"
              required
              placeholder="Enter your email or username"
              Values={Values.login}
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
              Values={Values.password}
              onChange={change}
            />
          </div>
          <button type="submit" className="w-full bg-yellow-900 text-white py-2 px-4 rounded-md focus:ring" onClick={submit}>
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-yellow-900 font-medium hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
