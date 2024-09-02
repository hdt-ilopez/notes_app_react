import React, { useEffect, useState } from "react";
import NotesCard from "../components/NotesCard";
import { useNotes } from "../contexts/NotesContext";
import EditNoteModal from "../components/EditNoteModal";
const HomePage = () => {
  const { notes, selectedNote, loading } = useNotes();
  const [editOpen, setEditOpen] = useState(false);

  const sortedNotes = notes.sort((a, b) => {
    // Sort by pinned status first: true comes before false
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    // If both notes are pinned or both are unpinned, sort by updatedAt (most recent first)
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  if (notes?.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col items-center">
        <img src="/icons/AddNotes.svg" alt="" width={300} />
        <p className="font-semibold text-black w-full md:w-1/3 text-center">
          Start Creating your own notes! Click the + button in the bottom corner
          to begin writing your ideas, thoughts and reminders
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {sortedNotes.map((note) => (
          <NotesCard key={note.id} note={note} setEditOpen={setEditOpen} />
        ))}
      </div>
      <EditNoteModal isOpen={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
};

export default HomePage;
