//author: Leigh Brown
//this component updates the daily completion of a habit, using the corresponding checkbox
//in HabitTracker.tsx
"use server";

import getCollection, { HABIT_COLLECTION } from "@/db";

export default async function toggleComplete(id: number, d: string, completion: boolean) {
    const habitCollection = await getCollection(HABIT_COLLECTION);
    await habitCollection.updateOne(
        { id: id },
        { $set: { [d]: completion } }
    );
}
