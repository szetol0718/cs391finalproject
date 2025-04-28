// Authors: Ajani Hickling, Arooj Kamran
// Description: UI Header Component
// hosts navigational links to sub-pages

import Link from "next/link";

const headerTextStyle = `text-4xl font-semibold p-4 text-white bg-teal-900`;
const headerStyle = `bg-teal-900 w-screen flex flex-row flex-wrap items-center justify-between mb-8`
const navLinkStyle = `text-white mx-5 mt-5 text-lg hover:text-yellow-300`;

export default function Header() {
  return (
    <header className={headerStyle}>
      <h1 className={headerTextStyle}>Habit Tracker</h1>
      <nav className="flex justify-center mb-4">
        <Link href="/" className={navLinkStyle}>Home</Link>
        <Link href="/notes" className={navLinkStyle}>Notes</Link>
        <Link href="/todo" className={navLinkStyle}>To-Do</Link>
          <Link href="/habit-tracker" className={navLinkStyle}>Habit Tracker</Link>
      </nav>
    </header>
  );
}
