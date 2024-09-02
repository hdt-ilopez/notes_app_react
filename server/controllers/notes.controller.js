import Note from "../models/notes.model.js";

export const createNote = async (req, res) => {
  const { noteTitle, noteContent, tags } = req.body;
  const { userId } = req.user;

  if (!noteTitle || !noteContent) {
    return res
      .status(400)
      .json({ message: "Note title and content required to make note" });
  }

  try {
    const newNote = new Note({
      noteTitle,
      noteContent,
      tags,
      userId,
      pinned: false,
    });

    await newNote.save();

    return res.status(200).json({ message: "New note created successfully" });
  } catch (error) {
    console.error(`Error in create note controller: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error in create note controller", error });
  }
};

export const editNote = async (req, res) => {
  const { noteTitle, noteContent, tags } = req.body;
  const { noteId } = req.params;
  const { userId } = req.user;

  if (!noteId) {
    return res.status(400).json({ message: "Note Id missing" });
  }

  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Unable to find note with that ID" });
    }

    if (note.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this note" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { noteTitle, noteContent, tags },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error(`Error in update note controller: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error in update note controller", error });
  }
};

export const getNotes = async (req, res) => {
  const { userId } = req.user;

  try {
    const notes = await Note.find({ userId: userId });

    if (notes.length === 0) {
      return;
    } else {
      return res
        .status(200)
        .json({ message: "Notes fetched successfully", notes });
    }
  } catch (error) {
    console.error("Error in get notes controller", error);
    return res.status(500).json({ message: "error in get notes controller" });
  }
};

export const deleteNote = async (req, res) => {
  const { userId } = req.user;
  const { noteId } = req.params;

  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res
        .status(404)
        .json({ message: "Unable to find note with that ID" });
    }

    if (note.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this note" });
    }

    await Note.findByIdAndDelete(noteId);
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in delete notes controller", error);
    return res
      .status(500)
      .json({ message: "Error in delete notes controller" });
  }
};

export const pinNote = async (req, res) => {
  const { userId } = req.user;
  const { noteId } = req.params;

  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res
        .status(404)
        .json({ message: "Unable to find note with that ID" });
    }

    if (note.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this note" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { pinned: !note.pinned },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "Note pinned successfully" });
  } catch (error) {
    console.error("Error in pin notes controller", error);
    return res.status(500).json({ message: "Error in pin notes controller" });
  }
};
