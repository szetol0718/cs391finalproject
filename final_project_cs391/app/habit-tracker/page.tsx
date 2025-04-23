"use client";
import HabitTracker from "@/components/HabitTracker";
import HabitTrackerHeader from "@/components/HabitHeader";
import Header from "@/components/header";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

export default function HabitTrackerPage() {

    return (
        <ThemeProvider theme={theme}>
            <main className="min-h-screen w-full flex-col justify-center pb-5 text-blue-950 bg-blue-100">
                <Header/>
                <div className="w-[90%] items-center justify-center mt-0 m-auto">
                    <h1 className="text-4xl font-bold mb-4 p-6 text-center">Weekly Habit Tracker</h1>
                    <HabitTrackerHeader />
                    <HabitTracker />
                </div>
            </main>
        </ThemeProvider>
    );
}
