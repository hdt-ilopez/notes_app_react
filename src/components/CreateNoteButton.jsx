import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import CreateNotesModal from "./CreateNotesModal";

const CreateNoteButton = () => {
  const [notesModalOpen, setNotesModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-1 md:bottom-10 md:right-10 ">
        <IconButton onClick={() => setNotesModalOpen(true)}>
          <AddIcon
            sx={{
              fontSize: 50,
              color: "white",
              backgroundColor: "#3b82f6",
              padding: "4px",
              borderRadius: "12px",
            }}
          />
        </IconButton>
      </div>
      <CreateNotesModal
        isOpen={notesModalOpen}
        onClose={() => setNotesModalOpen(false)}
      />
    </>
  );
};

export default CreateNoteButton;
