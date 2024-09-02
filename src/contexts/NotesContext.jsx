import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create a context for notes
const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState();

  const getNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/notes/get-notes");

      if (res?.data?.notes) {
        setNotes(res.data.notes);
      } else {
        toast.error("No data received");
      }
    } catch (error) {
      if (error.response.data.message === "No notes found for current user") {
        return;
      } else {
        toast.error(`Error fetching notes: ${error.response.data.message}`);
      }

      console.error("Error fetching notes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        selectedNote,
        setSelectedNote,
        getNotes,
        loading,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
