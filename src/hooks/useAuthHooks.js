import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

export const useAuthHooks = () => {
  const { setNotesUser } = useAuth();

  const loginUser = async (email, password) => {
    if (!email || !password) {
      toast.error("Please fill out all fields to register");
    }
    const formattedEmail = email.toLowerCase();

    try {
      const res = await toast.promise(
        axios.post("/api/auth/login", {
          email: formattedEmail,
          password,
        }),
        {
          pending: "Logging In...",
          success: "Logged in successfully!",
          error: "Login failed. Please try again.",
        }
      );

      setNotesUser(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Registration error:", error);
    }
  };

  const registerUser = async (form) => {
    const { firstName, lastName, email, password, gender } = form;

    if (!firstName || !lastName || !email || !password || !gender) {
      toast.error("Please fill out all fields to register");
    }

    const formattedFirstName = firstName.toLowerCase();
    const formattedLastName = lastName.toLowerCase();
    const formattedEmail = email.toLowerCase();

    try {
      const res = await toast.promise(
        axios.post("/api/auth/signup", {
          firstName: formattedFirstName,
          lastName: formattedLastName,
          email: formattedEmail,
          password,
          gender,
        }),
        {
          pending: "Registering user...",
          success: "User registered successfully!",
          error: "Registration failed. Please try again.",
        }
      );

      // Set the user in the context after successful registration
      setNotesUser(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Registration error:", error);
    }
  };

  const logout = () => {
    setNotesUser(null);
    localStorage.removeItem(notesUser);
    toast.success("Logout Successful");
  };

  return { loginUser, registerUser, logout };
};
