//author: Leigh Brown

"use client";

import ArchiveDisplay from "@/components/archiveDisplay";
import { ArchiveProps } from "@/types";
import getAllArchive from "@/lib/getAllArchive";
import { useState, useEffect } from "react";
import HabitTrackerHeader from "@/components/HabitHeader";

export default function ArchivePage() {
    const [archive, setArchive] = useState<ArchiveProps[]>([]);

    useEffect(() => {
        const fetchArchive = async () => {
            try {
                const allA = await getAllArchive();
                setArchive(allA);
            } catch (error) {
                console.error("Failed to fetch archive:", error);
            }
        };
        fetchArchive();
    }, []);

    return (
        <main className="min-h-screen w-full flex-col justify-center pb-5 text-green-950 bg-teal-100">
            <HabitTrackerHeader/>
            <h1 className="text-4xl font-bold mb-2 p-3 text-center justify-center">Archived Weekly Habits</h1>
            <ArchiveDisplay inputArchives={archive} />
        </main>
    );
}
