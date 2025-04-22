// Authors: Ajani Hickling,
// Description: UI Header Component
// hosts navigational links to sub-pages (to be implemented)

const headerTestStyle = `text-4xl font-semibold p-4 text-white w-screen mb-5 bg-teal-900`;

export default function Header() {
    return(
        <header >
            <h1 className={headerTestStyle}>Habit Tracker</h1>
        </header>
    );
}