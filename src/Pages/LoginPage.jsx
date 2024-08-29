import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthHooks } from "../hooks/useAuthHooks";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { loginUser } = useAuthHooks();

  return (
    <div className="w-full h-screen bg-slate-100 flex justify-center items-center">
      <div className="w-screen h-screen flex items-center justify-center lg:h-fit lg:max-w-screen-sm p-6 bg-white rounded-md drop-shadow-xl">
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-blue-700 text-3xl font-bold">Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full bg-gray-100 border-gray-300 focus-within:outline-none placeholder:text-gray-400 text-black"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input input-bordered w-full bg-gray-100 border-gray-300 focus-within:outline-none placeholder:text-gray-400 text-black"
          />
          <button
            onClick={() => loginUser(email, password)}
            className="btn w-1/3 bg-green-500 hover:bg-green-700 hover:shadow-green-600 text-white font-bold text-xl tracking-wider border-none shadow-md shadow-green-400/75 transition-all duration-300 ease-in-out "
          >
            Login
          </button>
          <p className="text-gray-600">
            {"Don't"} have an account?
            <span
              onClick={() => navigate("/register")}
              className="btn btn-link pl-1 text-blue-600 hover:text-blue-800 no-underline hover:underline transition-all duration-300 ease-in-out"
            >
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
