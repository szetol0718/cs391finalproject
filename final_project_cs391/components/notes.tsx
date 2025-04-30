// NOTES COMPONENT
// Author: Ajani Hickling
// Description: User can enter notes (reminders, goals, etc.) and view their entered notes

// Notes will contain 0+ 'posted' notes and 1 "Default" (Add A Note!) note.
// Add a note will contain a text field for user to enter text input.
// Submitting this default note will
// (a) Post the note (default becomes newest posted)
// (b) Render a new blank default note

"use client";

import { useState } from "react";
import { NoteType, NumNotes } from "@/types";

// Text display component displays the note text generated, and associated date info (if it was provided)
// This component retrieves data from form submission
// If a date was provided, it is shown.
function TextDisplay({props}:{props:NoteType}) {
    return(
        <div className={`flex flex-row`}>
            <p className={`my-5 mx-2 flex-1/2`}>{props.note}</p>
            <p className={`my-5 mx-2 text-green-700 italic`}>{props.date ? props.date : ""}</p>
        </div>
    );
}

// Default function : takes an (optional) max number of notes, and renders a form from which notes can be generated
// Generated notes are then displayed
export default function Notes({props}: {props: NumNotes}) {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [id, setId] = useState(0);

    // Function to run on formSubmit. Takes text-input, creates unique NoteType object,
    // enters it into the notes array, which will be mapped over to display all notes
    function handleSubmit(formData: FormData) {
        // retrieves submitted data : note text and optional date field
        const newNoteText = formData.get("note") as string;
        const newNoteDate = formData.get("date") as string;

        // creates new noteType object
        const newNote = {
            id: id,
            note: newNoteText,
            date: newNoteDate
        };

        // two possible cases are facilitated:
        // CASE 1: a maximum number of notes was not declared, so notes can be created continuously without restriction
        // CASE 2: There exists a maximum number. So long as the ID (which starts at 0) is less than the max, notes will be created.
        if ((props.max && id < props.max) || (!props.max)) {
            setId((prevNum) => prevNum + 1);
            setNotes((currentNotes) => [...currentNotes, newNote]);
            console.log("id:", id);
            console.log("notes:", notes);
            console.log("date:", newNoteDate);
            console.log("today:", new Date(newNoteDate));
        }
    }

    // Default note represents the data entry component (users can enter text and (optionally) an associated date)
    // flex-1/2 in first input ensures data input and add button are right aligned, regardless of note text
    function DefaultNote() {
        return(
            <form action={handleSubmit} className={`flex flex-row`}>
                <input
                    type="text" id={"note"}
                    name={"note"}
                    placeholder={`Add a note...`}
                    required={true}  // can enter a note without a date, cannot enter a note without text
                    className={`flex-1/2`}
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
        )
    }

    return (
        <div className={"text-wrap"}>

            {/* Heading/instruction */}
            <h2 className="underline underline-offset-3 font-semibold text-lg text-justify">
                Leave Yourself Some Notes!
            </h2>
            {
                // Maps over notes, producing divs of each, separated by a horizontal line
                // If there was no declared max, all notes are displayed
                // If max notes was set, only that many notes are displayed
                notes.map((note:NoteType) => (
                    <div key={note.id}>
                        <TextDisplay props={note} />
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