import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    noteTitle: {
      type: String,
      required: true,
      min: 2,
    },
    noteContent: {
      type: String,
      required: true,
      min: 5,
    },
    tags: {
      type: Array,
    },
    pinned: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Notes", NoteSchema);

export default Note;
