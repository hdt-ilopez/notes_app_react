import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAuthHooks } from "../hooks/useAuthHooks";

const UserAvatar = () => {
  const { notesUser } = useAuth();
  const { logout } = useAuthHooks();
  return (
    <div className="flex gap-2 items-center text-black">
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
  );
};

export default UserAvatar;
