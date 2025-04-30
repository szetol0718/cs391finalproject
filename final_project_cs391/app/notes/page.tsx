// Authors:
// Arooj Kamran: created page
// Ajani Hickling: Populated page's content & styling
// Description: Notes page rendering the Notes component
import Notes from "@/components/notes";

const noteProps = {
    // max: 20,
    // Leaving noteProps empty allows unlimited temporary notes to be added. Note max is an optional type field.
    // Based on conditional logic in the notes component, no warning text is displayed when max is not declared
    // Setting a number value restricts the number of notes added, similarly to the note component on the homepage.
};

export default function NotesPage() {
    return (
        // Adapts styling principle from home-page:
        // x-margin & gap leaves space between page edges and between note text and date, even for long notes
        <div className={`flex flex-col gap-10 mx-10`}>
            <Notes props={noteProps} />
        </div>
    );
}
