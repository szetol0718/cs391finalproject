//author: Leigh Brown
//this function stores what the habit tracker looks like at the end of the week. if a user changes a habit name, type, or anything after
// the fact the archive will still display what it looked like at the time it was archived
"use server";

import getCollection, { ARCHIVE_COLLECTION, HABIT_COLLECTION } from '@/db';
import { ArchiveProps } from "@/types";

export async function archiveCurrentWeek(startDate: string, endDate: string): Promise<void> {
    const archiveCollection = await getCollection(ARCHIVE_COLLECTION);

    //check if an archive for this week already exists so it doesn't do it over and over
    const existingArchive = await archiveCollection.findOne({ weekStart: startDate, weekEnd: endDate });

    if (existingArchive) {
        console.log("Archive for this week already exists.");
        return;
    }

    const habitCollection = await getCollection(HABIT_COLLECTION);
    const habits = await habitCollection.find().toArray();

    const archiveData: ArchiveProps = {
        weekStart: startDate,
        weekEnd: endDate,
        habits: habits.map((habit) => ({
            id: habit.id,
            habit: habit.habit,
            type: habit.type,
            tracking: habit.tracking,
            notes: habit.notes,
            sun: habit.sun,
            mon: habit.mon,
            tue: habit.tue,
            wed: habit.wed,
            thu: habit.thu,
            fri: habit.fri,
            sat: habit.sat,
            weeklyCompleted: habit.weeklyCompleted,
        })),
    };

    await archiveCollection.insertOne(archiveData);
    console.log("Successfully archived the week");
}
