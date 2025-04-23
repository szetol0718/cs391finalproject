//author: Leigh Brown
"use server";
import getCollection, { ARCHIVE_COLLECTION } from '@/db';
import { ArchiveProps } from "@/types";

export default async function getAllArchives(): Promise<ArchiveProps[]> {
    const archiveCollection = await getCollection(ARCHIVE_COLLECTION);
    const data = await archiveCollection.find().toArray();

    const archives: ArchiveProps[] = data.map((archive) => ({
        weekStart: archive.weekStart,
        weekEnd: archive.weekEnd,
        habits: archive.habits,
    }));

    return archives.reverse();
}
