//author: Leigh Brown
"use client";
import HabitTracker from "@/components/HabitTracker";
import HabitTrackerHeader from "@/components/HabitHeader";

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

export default function HabitTrackerPage() {

    return (
        <ThemeProvider theme={theme}>
            <main className="min-h-screen w-full flex-col justify-center pb-5 text-green-950 bg-teal-100">

                <div className="w-[90%] items-center justify-center mt-0 m-auto">
                    <h1 className="text-4xl font-bold p-2 text-center">Weekly Habit Tracker</h1>
                    <p className="text-xl font-bold mb-2 p-3 text-center">
                        Save Name and Note changes by pressing enter in the notes section
                    </p>
                    <HabitTrackerHeader />
                    <HabitTracker />
                </div>
            </main>
        </ThemeProvider>
    );
}
