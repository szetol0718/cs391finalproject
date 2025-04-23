//author: Leigh Brown
"use server";
//this will reset everything to 0/false on sunday in prep for new week
import getCollection, { HABIT_COLLECTION } from "@/db";

export async function resetHabits(): Promise<void> {
    const habitCollection = await getCollection(HABIT_COLLECTION);

    await habitCollection.updateMany(
        {}, // update all habits
        {
            $set: {
                sun: false,
                mon: false,
                tue: false,
                wed: false,
                thu: false,
                fri: false,
                sat: false,
                weeklyCompleted: 0,
            },
        }
    );
}
