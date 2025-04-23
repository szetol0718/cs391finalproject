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
        <main className="min-h-screen w-full flex-col justify-center pb-5 text-blue-950 bg-blue-100">
            <HabitTrackerHeader/>
            <h1 className="text-4xl font-bold mb-4 p-6 text-center">Archive</h1>
            <ArchiveDisplay inputArchives={archive} />
        </main>
    );
}
