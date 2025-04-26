// Authors:  Arooj Kamran
// Description: Notes page rendering the Notes component
import Notes from "@/components/notes";

const noteProps = {
  max: 20, // or any upper limit for full page
};

export default function NotesPage() {
  return (
    <div className={`my-5 mx-2 w-1/2`}>
      <Notes props={noteProps} />
    </div>
  );
}
