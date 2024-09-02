import express from "express";
import {
  createNote,
  deleteNote,
  editNote,
  getNotes,
  pinNote,
} from "../controllers/notes.controller.js";

const router = express.Router();

router.post("/create-note", createNote);
router.post("/edit-note/:noteId", editNote);
router.delete("/delete-note/:noteId", deleteNote);
router.post("/pin-note/:noteId", pinNote);
router.get("/get-notes", getNotes);

export default router;
