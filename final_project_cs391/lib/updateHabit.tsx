//author: Leigh Brown
//uses mongodb's updateOne function to update the corresponding document based
// on user interaction with the habit tracker table
"use server";
import getCollection, { HABIT_COLLECTION } from '@/db';

//allow users to change the habit name, type, tracking, and completion using the table
export default async function updateHabit(id: number, habit?: string, track?: string, type?: string, notes?: string, weeklyCompleted?: number) {
    const habitCollection = await getCollection(HABIT_COLLECTION);

    if (habit !== undefined) {
        await habitCollection.updateOne(
            { id: id },
            { $set: { habit: habit } }
        );
    }

    if (track !== undefined) {
        await habitCollection.updateOne(
            { id: id },
            { $set: { tracking: track } }
        );
    }

    if (type !== undefined) {
        await habitCollection.updateOne(
            { id: id },
            { $set: { type: type } }
        );
    }

    if (notes !== undefined) {
        await habitCollection.updateOne(
            { id: id },
            { $set: { notes: notes } }
        )
    }

    if (weeklyCompleted !== undefined) {
        await habitCollection.updateOne(
            { id: id },
            { $set: { weeklyCompleted: weeklyCompleted } }
        )
    }

}