import React from "react";
import { useAuthHooks } from "../hooks/useAuthHooks";

const HomePage = () => {
  const { logout } = useAuthHooks();

  return (
    <div>
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
