import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAuthHooks } from "../hooks/useAuthHooks";

const UserAvatar = () => {
  const { notesUser } = useAuth();
  const { logout } = useAuthHooks();
  return (
    <>
      <div className="hidden gap-2 items-center  md:flex text-black">
        <div tabIndex={0} className="avatar w-[50px]">
          <img src={notesUser?.profilePicture} className="rounded-full" />
        </div>
        <div className="hidden md:block">
          {" "}
          <p className="font-bold capitalize">
            {notesUser?.firstName} {notesUser?.lastName}
          </p>
          <button onClick={logout} className="underline text-sm cursor-pointer">
            Logout
          </button>
        </div>
      </div>
      <div className="dropdown md:hidden">
        <div tabIndex={0} className="avatar w-[50px]">
          <img src={notesUser?.profilePicture} className="rounded-full" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white text-black rounded-box z-[1] w-52 p-2 shadow right-1"
        >
          <li onClick={logout}>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserAvatar;
