// Authors: Ajani Hickling,Arooj Kamran
// Description: UI Header Component
// hosts navigational links to sub-pages (to be implemented)

import Link from "next/link";

const headerTestStyle = `text-4xl font-semibold p-4 text-white w-screen mb-5 bg-teal-900`;
const navLinkStyle = `text-white underline mx-4 text-lg`;

export default function Header() {
  return (
    <header>
      <h1 className={headerTestStyle}>Habit Tracker</h1>
      <nav className="flex justify-center mb-4">
        <Link href="/" className={navLinkStyle}>Home</Link>
        <Link href="/notes" className={navLinkStyle}>Notes</Link>
        <Link href="/todo" className={navLinkStyle}>To-Do</Link>
      </nav>
    </header>
  );
}
