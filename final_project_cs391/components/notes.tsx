// NOTES COMPONENT
// Author: Ajani Hickling
// Description: User can enter notes (reminders, goals, etc.) and view their entered notes

// Notes will contain 0+ 'posted' notes and 1 "Default" (Add A Note!) note.
// Add a note will contain a text field for user to enter text input.
// Submitting this default note will
// (a) Post the note (default becomes newest posted)
// (b) Render a new blank default note

"use client"
import {useState} from "react";
import {NoteType, NumNotes} from "@/types";

// TextDisplay component takes text input and returns it in a paragraph tag
function TextDisplay({text}:{text:string}) {
    return(
        <p className={`my-5 mx-2`}>
            {text}
        </p>
    )
}

// Default function: Notes component, containing posted notes and note-adder
export default function Notes({props}:{props:NumNotes}) {

    const [notes, setNotes] = useState<NoteType[]>([]);
    const [id, setId] = useState(0);

    // Function to run on formSubmit. Takes text-input, creates unique NoteType object,
    // enters it into the notes array, which will be mapped over to display all notes
    function handleSubmit(formData: FormData) {
        const newNoteText = formData.get("note") as string;
        const newNote:NoteType = {
            id: id,
            note: newNoteText,
        }
        if (props.max && id < props.max) {
            setId((prevNum) => prevNum + 1);
            setNotes((currentNotes) => [...currentNotes, newNote]);
            console.log("id:", id);
            console.log("notes:", notes);
        }
    }

    // Note-adding component: Form with text-input and submit burron
    function DefaultNote() {
        return(
            <form action={handleSubmit}>
                <input
                    type="text" id={"note"}
                    name={"note"}
                    placeholder={`Add a note...`}
                    onChange={()=>{}}
                    className={`p-2 text-md w-80`}
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
                notes.map((note:NoteType) => (
                    <div key={note.id}>
                        <TextDisplay text={note.note} />
                        <hr className={`opacity-30`}/>
                    </div>
                ))
            }
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