// Authour: Ajani Hickling
// Description: Homepage hosts Calendar component, as well as preview versions of other pages,
// namely, the Notes and To-Do pages

import Notes from "@/components/notes";
import Calendar from "@/components/Calendar";

const noteProps = {
    max:3, // comment out max prop to show all notes, or adjust number for more notes
}

export default function Home() {
  return (
      // div styling ensures column layout, with calendar on left, and previews of other page components on right
      // gap keeps distance between individual components, x-margin ensures room between components and edge of screen
      // even if notes expand due to lengthy notes added
      <div className={`flex flex-row gap-20 mx-10`}>
          <Calendar />
          <div className={`flex flex-col gap-10`}>
              <Notes props={noteProps}></Notes>
              {/* TO DO DISPLAY GOES HERE*/}
          </div>
      </div>
  );
}
