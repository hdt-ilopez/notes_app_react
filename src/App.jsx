import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./contexts/AuthContext";
import MainLayout from "./layout/MainLayout";

const App = () => {
  const { notesUser } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={notesUser ? <HomePage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/login"
              element={!notesUser ? <LoginPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/register"
              element={!notesUser ? <RegisterPage /> : <Navigate to={"/"} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
