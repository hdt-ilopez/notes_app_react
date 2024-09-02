import React from "react";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { formatTime } from "../utils/formatTime";
import { useManageNotes } from "../hooks/useManageNotes";
import { useNotes } from "../contexts/NotesContext";

const NotesCard = ({ note, setEditOpen }) => {
  const { deleteNote, pinNote } = useManageNotes();
  const { setSelectedNote } = useNotes();

  const onEditClick = () => {
    setSelectedNote(note);
    setEditOpen(true);
  };

  return (
    <div className="flex flex-col gap-2 border-2 border-gray-300 rounded-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-black">{note?.noteTitle}</h2>
          <p className="text-md font-semibol text-gray-500">
            {formatTime(note?.updatedAt)}
          </p>
        </div>
        <IconButton
          onClick={() => pinNote(note)}
          sx={{
            color: note?.pinned === true ? "#2563eb" : "#6b7280",
            "&:hover": {
              color: "#3b82f6",
            },
          }}
        >
          <PushPinOutlinedIcon />
        </IconButton>
      </div>
      <p className="text-gray-600 truncate">{note?.noteContent}</p>
      <div className="flex items-center justify-between">
        <div className="text-gray-500 flex gap-2 truncate">
          {note?.tags.map((tag, index) => (
            <p key={index}>#{tag}</p>
          ))}
        </div>
        <div className="flex ">
          <IconButton
            onClick={() => onEditClick()}
            sx={{
              color: "#9ca3af",
              "&:hover": {
                color: "#3b82f6", // Change the color to blue on hover
              },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => deleteNote(note)}
            sx={{
              color: "#9ca3af",
              "&:hover": {
                color: "red", // Change the color to blue on hover
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default NotesCard;
