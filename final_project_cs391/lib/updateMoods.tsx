// Author: Yat Long (Louis) Szeto
// Description: Server-side function retrieves all mood objects from MongoDB database.

"use server";

import getCollection, { MOOD_COLLECTION } from "@/db";
import { MoodType } from "@/types";

export default async function getAllMoods(): Promise<MoodType[]> {
  const moodCollection = await getCollection(MOOD_COLLECTION);
  const data = await moodCollection.find().toArray();

  const moodsOut: MoodType[] = data.map((moodObject) => ({
    mood: moodObject.mood,
    date: moodObject.date,
  }));

  return moodsOut;
}
export async function saveMood(newMood: MoodType) {
  const moodCollection = await getCollection(MOOD_COLLECTION);
  
  await moodCollection.updateOne(
    { date: newMood.date }, 
    { $set: { mood: newMood.mood } }, 
    { upsert: true } // Insert if no document exists
  );
}