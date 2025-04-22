import Notes from "@/components/notes";

const noteProps = {
    max:3, // comment out max prop to show all notes
}

export default function Home() {
  return (
      <>
          <Notes props={noteProps}></Notes>
      </>
  );
}
