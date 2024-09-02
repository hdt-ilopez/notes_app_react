import React, { useState } from "react";
import { DialogTitle, Dialog } from "@headlessui/react"; // Assuming you're using Headless UI for modals
import TagsInput from "./TagsInput";
import { useManageNotes } from "../hooks/useManageNotes";
import { useNotes } from "../contexts/NotesContext";

const CreateNotesModal = ({ isOpen, onClose }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [tags, setTags] = useState([]);
  const { createNote } = useManageNotes();
  const { getNotes } = useNotes();

  const handleSubmit = async () => {
    const note = {
      noteTitle,
      noteContent,
      tags,
    };

    const res = await createNote(note);

    if (res === true) {
      setNoteTitle("");
      setNoteContent("");
      setTags([]);
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black opacity-30"></div>
      <div className="bg-white rounded-lg shadow-lg w-full h-screen md:h-fit md:w-2/3 p-6 relative z-10">
        <DialogTitle className="text-lg font-semibold text-gray-800">
          Create Note
        </DialogTitle>
        <div className="my-4 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Note Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="input input-ghost border-none p-0 text-2xl w-full bg-transparent placeholder:text-black text-black focus:text-black focus-within:outline-none"
          />
          <label className="form-control">
            <div className="label">
              <span className="label-text">CONTENT</span>
            </div>
            <textarea
              className="textarea bg-gray-100 focus-within:outline-none text-black focus:text-black h-52"
              placeholder="Note Content"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">TAGS</span>
            </div>
            <TagsInput tags={tags} setTags={setTags} />
          </label>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="btn bg-gray-300 text-gray-500 border-0"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-danger text-white bg-blue-500 hover:bg-red-700 border-none"
          >
            Submit
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateNotesModal;
