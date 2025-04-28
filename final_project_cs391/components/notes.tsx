// NOTES COMPONENT
// Author: Ajani Hickling
// Description: User can enter notes (reminders, goals, etc.) and view their entered notes
// Users can add new notes with a text field and date picker, view their notes, and delete notes.

"use client";

import { useState, useEffect } from "react";
import { NoteType, NumNotes } from "@/types";

export default function Notes({ props }: { props: NumNotes }) {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [id, setId] = useState(0);
    const [warning, setWarning] = useState('');

    // --- Fetch all notes from MongoDB when component mounts ---
    useEffect(() => {
        async function fetchNotes() {
            try {
                const res = await fetch('/api/notes');
                const data = await res.json();
                setNotes(data);
                setId(data.length);
            } catch (error) {
                console.error('Failed to fetch notes:', error);
            }
        }
        fetchNotes();
    }, []);

    // --- Handle adding a new note ---
    async function handleSubmit(formData: FormData) {
        const newNoteText = formData.get("note") as string;
        const newNoteDate = formData.get("date") as string;

        if (!newNoteText || !newNoteDate) {
            setWarning('Both note text and date are required.');
            return;
        }
        setWarning('');

        const newNote = { note: newNoteText, date: newNoteDate };

        try {
            const res = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newNote),
            });

            if (!res.ok) throw new Error('Failed to save note');

            // Refresh notes after adding
            const updatedRes = await fetch('/api/notes');
            const updatedData = await updatedRes.json();
            setNotes(updatedData);
            setId(updatedData.length);

            console.log('Note saved to MongoDB!');
        } catch (error) {
            console.error('Error saving note:', error);
        }
    }

    // --- Handle deleting a note ---
    async function handleDelete(noteId: string) {
        try {
            const res = await fetch('/api/notes', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: noteId }),
            });

            if (!res.ok) throw new Error('Failed to delete note');

            // Refresh notes after deleting
            const updated = await fetch('/api/notes');
            const updatedData = await updated.json();
            setNotes(updatedData);
            setId(updatedData.length);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    return (
        <div className="text-wrap">
            {/* Heading */}
            <h2 className="underline underline-offset-3 font-semibold text-lg text-justify">
                Leave Yourself Some Notes!
            </h2>

            {/* Display all notes */}
            {(props.max ? notes.slice(0, props.max) : notes).map((note: NoteType) => (
                <div key={note._id ?? note.id} className="flex flex-row items-center justify-between bg-gray-50 p-3 my-2 rounded-lg shadow">
                    <div>
                        <p className="text-md">{note.note}</p>
                        <p className="text-sm text-green-700 italic">{note.date}</p>
                    </div>
                    <button
                        onClick={() => note._id && handleDelete(note._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ))}

            {/* Warning message if missing inputs */}
            {warning && (
                <p className="text-red-600 mb-2">{warning}</p>
            )}

            {/* Note-adding form */}
            <DefaultNote handleSubmit={handleSubmit} />

            <hr className="opacity-30" />

            {/* Message if reaching maximum notes */}
            {props.max ? (
                id >= props.max ? (
                    <p className="my-5 text-red-700">Maximum number of notes displayed</p>
                ) : (
                    <p className="my-5 text-green-700">Notes remaining: {props.max - id}</p>
                )
            ) : null}
        </div>
    );
}

// --- Subcomponent: Form for adding new notes ---
function DefaultNote({ handleSubmit }: { handleSubmit: (formData: FormData) => Promise<void> }) {
    return (
        <form action={handleSubmit} className="flex flex-row">
            <input
                type="text"
                id="note"
                name="note"
                placeholder="Add a note..."
                className="p-2 text-md w-80 flex-2/3"
                required
            />
            <input
                type="date"
                id="date"
                name="date"
            />
            <input
                type="submit"
                value="+"
                className="m-3 py-0.5 px-2.5 text-lg rounded-xl opacity-70 text-gray-900 bg-green-300 border-2 border-green-800"
            />
        </form>
    );
}