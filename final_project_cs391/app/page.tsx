import Notes from "@/components/notes";
import Calendar from "@/components/Calendar";

const noteProps = {
    max:3, // comment out max prop to show all notes
}

export default function Home() {
  return (
      <>
          <Notes props={noteProps}></Notes>
          <Calendar />
      </>
  );
}
