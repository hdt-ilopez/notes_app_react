import React, { useEffect, useState } from "react";
import { DialogTitle, Dialog } from "@headlessui/react"; // Assuming you're using Headless UI for modals
import TagsInput from "./TagsInput";
import { useManageNotes } from "../hooks/useManageNotes";
import { useNotes } from "../contexts/NotesContext";

const EditNoteModal = ({ isOpen, onClose }) => {
  const { selectedNote, setSelectedNote } = useNotes();
  const [editableNote, setEditableNote] = useState();
  const { editNote } = useManageNotes();
  const { getNotes } = useNotes();

  useEffect(() => {
    setEditableNote(selectedNote);
  }, [selectedNote]);

  const handleSubmit = async () => {
    const res = await editNote(editableNote);

    if (res === true) {
      setSelectedNote();
      onClose();
      getNotes();
    }
  };

  const handleChangeInputs = (value, selector) => {
    setEditableNote((prevState) => ({
      ...prevState,
      [selector]: value,
    }));
  };
  const handleChangeTags = (newTags) => {
    setEditableNote((prevState) => ({
      ...prevState,
      tags: newTags,
    }));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black opacity-30"></div>
      <div className="bg-white rounded-lg shadow-lg w-1/2 p-6 relative z-10">
        <DialogTitle className="text-lg font-semibold text-gray-800">
          Edit Note
        </DialogTitle>
        <div className="my-4 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Note Title"
            value={editableNote?.noteTitle}
            onChange={(e) => handleChangeInputs(e.target.value, "noteTitle")}
            className="input input-ghost border-none p-0 text-2xl w-full bg-transparent placeholder:text-black text-black focus:text-black focus-within:outline-none"
          />
          <label className="form-control">
            <div className="label">
              <span className="label-text">CONTENT</span>
            </div>
            <textarea
              className="textarea bg-gray-100 focus-within:outline-none text-black focus:text-black h-52"
              placeholder="Note Content"
              value={editableNote?.noteContent}
              onChange={(e) =>
                handleChangeInputs(e.target.value, "noteContent")
              }
            ></textarea>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">TAGS</span>
            </div>
            <TagsInput tags={editableNote?.tags} setTags={handleChangeTags} />
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

export default EditNoteModal;
