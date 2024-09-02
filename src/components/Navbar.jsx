import React from "react";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 w-full shadow-md">
      <div>
        <img src="/images/logo.png" alt="Notella Logo" width={75} />
      </div>

      <UserAvatar />
    </div>
  );
};

export default Navbar;
