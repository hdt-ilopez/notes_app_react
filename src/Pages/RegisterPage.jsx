import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthHooks } from "../hooks/useAuthHooks";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState("male");
  const { registerUser } = useAuthHooks();

  const form = {
    firstName,
    lastName,
    email,
    password,
    gender,
  };

  return (
    <div className="w-full h-screen bg-slate-100 flex justify-center items-center">
      <div className="w-screen h-screen flex items-center justify-center lg:h-fit lg:max-w-screen-sm p-6 bg-white rounded-md drop-shadow-xl">
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-blue-700 text-3xl font-bold">Register</h1>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full bg-gray-100 border-gray-300 focus-within:outline-none placeholder:text-gray-400 text-black"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full bg-gray-100 border-gray-300 focus-within:outline-none placeholder:text-gray-400 text-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full bg-gray-100 border-gray-300 focus-within:outline-none placeholder:text-gray-400 text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full bg-gray-100 border-gray-300 focus-within:outline-none placeholder:text-gray-400 text-black"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="input input-bordered w-full bg-gray-100 border-gray-300 focus-within:outline-none placeholder:text-gray-400 text-black"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <button
            onClick={() => registerUser(form)}
            className="btn w-1/3 bg-green-500 hover:bg-green-700 hover:shadow-green-600 text-white font-bold text-xl tracking-wider border-none shadow-md shadow-green-400/75 transition-all duration-300 ease-in-out "
          >
            Create Account
          </button>
          <p className="text-gray-600">
            Have an account?
            <span
              onClick={() => navigate("/login")}
              className="btn btn-link pl-1 text-blue-600 hover:text-blue-800 no-underline hover:underline transition-all duration-300 ease-in-out"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
