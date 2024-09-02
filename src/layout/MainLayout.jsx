import React from "react";
import { useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import CreateNoteButton from "../components/CreateNoteButton";
import { NotesProvider } from "../contexts/NotesContext";

const MainLayout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <NotesProvider>
      <div
        style={{
          display: isNonMobile ? "flex" : "block",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div
          className="bg-gray-100"
          style={{ flexGrow: 1, overflow: "hidden", maxHeight: "100vh" }}
        >
          <Navbar
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              zIndex: 9999,
            }}
          />
          <div className={isNonMobile ? "px-8" : "px-4"}>
            <Outlet />
            <CreateNoteButton />
          </div>
        </div>
      </div>
    </NotesProvider>
  );
};

export default MainLayout;
