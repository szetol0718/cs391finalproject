//author: Leigh Brown
"use server";
import getCollection, { HABIT_COLLECTION } from '@/db';
import { HabitProps } from "@/types";

export default async function getAllHabits(): Promise<HabitProps[]> {
    const habitCollection = await getCollection(HABIT_COLLECTION);
    const data = await habitCollection.find().toArray();

    const habits: HabitProps[] = data.map((habit) => ({
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
        completedHistory: habit.completedHistory,
    }));

    return habits;
}
