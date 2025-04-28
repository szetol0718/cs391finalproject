//author: Leigh Brown
//used to navigate btwn the habit tracker and archive page
"use client";
import Link from "next/link";

export default function HabitTrackerHeader() {
    const linkStyling =
        "md:p-1 mb-2 md:m-2 text-lg md:text-xl font-bold hover:underline text-green-950";
    const headerStyle =
        "w-full flex flex-row gap-4 justify-center items-center p-2 text-green-950 bg-teal-100";

    return (
        <header className={headerStyle}>
            <nav className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <Link href ="/" className = {linkStyling}> Home </Link>
                <Link href="/habit-tracker" className={linkStyling}>
                    Habit Tracker
                </Link>
                <Link href="/archive" className={linkStyling}>
                    Archive
                </Link>
            </nav>
        </header>
    );
}
