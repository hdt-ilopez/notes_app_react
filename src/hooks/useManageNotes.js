import axios from "axios";
import { toast } from "react-toastify";
import { useNotes } from "../contexts/NotesContext";

export const useManageNotes = () => {
  const { getNotes, notes, setNotes } = useNotes();

  const createNote = async (note) => {
    const { noteTitle, noteContent, tags } = note;

    if (!noteTitle || !noteContent) {
      toast.error("Title and content required to create note.");
      return false;
    }

    try {
      const res = await toast.promise(
        axios.post("/api/notes/create-note", note),
        {
          pending: "Creating note...",
          success: "Note created successfully",
          error: "Note creation failed, please try again",
        }
      );
      getNotes();
      return true;
    } catch (error) {
      console.error("Error creating note", error);
      return false;
    }
  };

  const editNote = async (note) => {
    if (!note) {
      toast.error("Note required.");
      return false;
    }

    try {
      const res = await toast.promise(
        axios.post(`/api/notes/edit-note/${note._id}`, note),
        {
          pending: "Editing note...",
          success: "Note updated successfully",
          error: "Note update failed, please try again",
        }
      );
      return true;
    } catch (error) {
      console.error("Error creating note", error);
      return false; // Return false if there is an error during note creation
    }
  };

  const pinNote = async (note) => {
    if (!note) {
      toast.error("Note required");
      return;
    }
    try {
      const res = await toast.promise(
        axios.post(`/api/notes/pin-note/${note._id}`),
        {
          pending: "Pinning note...",
          success: "Note pinned successfully",
          error: "Note pinning failed, please try again",
        }
      );

      if (res?.status === 200) {
        getNotes();
      }
    } catch (error) {
      toast.error(`Error pinning note: ${error.message}`);
      console.error("Error pinning note", error);
    }
  };

  const deleteNote = async (note) => {
    if (!note) {
      toast.error("Note required");
      return;
    }

    try {
      const res = await toast.promise(
        axios.delete(`/api/notes/delete-note/${note._id}`), // Use DELETE method for deletion
        {
          pending: "Deleting note...",
          success: "Note deleted successfully",
          error: "Note deletion failed, please try again",
        }
      );

      if (res?.status === 200) {
        if (notes?.length === 1) {
          setNotes([]);
        } else {
          getNotes();
        }
      }
    } catch (error) {
      toast.error(`Error deleting note: ${error.message}`);
      console.error("Error deleting note", error);
    }
  };

  return { createNote, editNote, pinNote, deleteNote };
};
