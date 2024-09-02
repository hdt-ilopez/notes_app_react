import React from "react";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 w-full shadow-md">
      <div>
        <img src="/images/logo.png" alt="Notella Logo" width={75} />
      </div>
      <label className=" hidden md:flex input input-bordered bg-white  border-gray-300  items-center focus-within:border-blue-500 focus-within:outline-none gap-2 w-96">
        <input type="text" className="grow" placeholder="Search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <UserAvatar />
    </div>
  );
};

export default Navbar;
