// NOTES COMPONENT
// Author: Ajani Hickling
// Description: User can enter notes (reminders, goals, etc.) and view their entered notes

// Notes will contain 0+ 'posted' notes and 1 "Default" (Add A Note!) note.
// Add a note will contain a text field for user to enter text input.
// Submitting this default note will
// (a) Post the note (default becomes newest posted)
// (b) Render a new blank default note

"use client"
import {useState, useEffect} from "react";
import {NoteType, NumNotes} from "@/types";

// TextDisplay component takes text input and returns it in a paragraph tag
function TextDisplay({props}:{props:NoteType}) {
    return(
        <div className={`flex flex-row`}>
            <p className={`my-5 mx-2 flex-1/2`}>{props.note}</p>
            <p className={`my-5 mx-2 text-green-700 italic`}>{props.date ? props.date : ""}</p>
        </div>
    )
}

// Default function: Notes component, containing posted notes and note-adder
export default function Notes({props}:{props:NumNotes}) {

    const [notes, setNotes] = useState<NoteType[]>([]);
    const [id, setId] = useState(0);
    const [warning, setWarning] = useState('');

    async function fetchNotesFromServer() {
        const res = await fetch('/api/notes');
        const data = await res.json();
        return data;
    }

    async function postNoteToServer(newNote: { note: string; date: string }) {
        const res = await fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNote),
        });
        if (!res.ok) throw new Error('Failed to save note');
    }

    async function deleteNoteFromServer(noteId: string) {
        const res = await fetch('/api/notes', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: noteId }),
        });
        if (!res.ok) throw new Error('Failed to delete note');
    }

  // Fetch all notes from MongoDB on load
  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await fetchNotesFromServer();
        setNotes(data);
        setId(data.length);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    }
    fetchNotes();
  }, []);

    // Function to run on formSubmit. Takes text-input, creates unique NoteType object,
    // enters it into the notes array, which will be mapped over to display all notes
    async function handleSubmit(formData: FormData) {
        const newNoteText = formData.get("note") as string;
        const newNoteDate = formData.get("date") as string;
        
        if (!newNoteText || !newNoteDate) {
            setWarning('Both note text and date are required.');
            return;
        }
        
        setWarning(''); // Clear warning if everything is valid

        try {
            await postNoteToServer({ note: newNoteText, date: newNoteDate });
            const updatedData = await fetchNotesFromServer();
            setNotes(updatedData);
            setId(updatedData.length);
            console.log('Note saved to MongoDB!');
        } catch (error) {
            console.error('Error saving note:', error);
        }
    }   

    async function handleDelete(noteId: string) {
        try {
            await deleteNoteFromServer(noteId);
            const updatedData = await fetchNotesFromServer();
            setNotes(updatedData);
            setId(updatedData.length);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    // Note-adding component: Form with text-input and submit button
    function DefaultNote() {

        return(
            <form action={handleSubmit} className={`flex flex-row`}>
                <input
                    type="text" id={"note"}
                    name={"note"}
                    placeholder={`Add a note...`}
                    className={`p-2 text-md w-80 flex-2/3`}
                    required={true}  // can enter a note without a date, cannot enter a note without text
                />
                <input
                    type="date" id={"date"}
                    name={"date"}
                />
                <input
                    type="submit"
                    value="+"
                    className={`
                    m-3 py-0.5 px-2.5 text-lg rounded-xl opacity-70
                    text-gray-900
                    bg-green-300 border-2
                    border-green-800 
                `}
                />
            </form>
        );
    }

    return(
        <div className={`text-wrap`}>
            <h2 className={`underline underline-offset-3 font-semibold text-lg text-justify`}>
                Leave Yourself Some Notes!
            </h2>
            {
                // If there was no declared max, all notes are displayed
                // If max notes was set, only that many notes are displayed
                (props.max ? notes.slice(0, props.max) : notes).map((note: NoteType) => (
                    <div key={note._id ?? note.id} className="flex flex-row items-center justify-between bg-gray-50 p-3 my-2 rounded-lg shadow">
                    <div>
                      <p className="text-md">{note.note}</p>
                      <p className="text-sm text-green-700 italic">{note.date}</p>
                    </div>
                    <button
                      onClick={() => handleDelete((note as any)._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ))
            }
            {warning && (
              <p className="text-red-600 mb-2">{warning}</p>
            )}
            <DefaultNote/>  {/* Default, ie form where notes are added from */}
            <hr className={`opacity-30`}/>

            {
                // If a maximum exists, show appropriate message (notes remaining, notes maxxed out)
                (props.max) ?

                        // Display an error message if the maximum number of notes has occurred
                        (props.max && id >= props.max) ?
                        <p className={`my-5 text-red-700`}>Maximum number of notes displayed</p>
                            :
                        <p className={`my-5 text-green-700`}>Notes remaining: {props.max as number - id}</p>

                :
                // If max prop is undefined, show nothing
                    <></>
            }
        </div>
    );
}