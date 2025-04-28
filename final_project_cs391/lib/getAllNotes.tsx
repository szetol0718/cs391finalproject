// Author: Ajani Hickling
// Description: Server-side function retrieves all note objects from MongoDB database

"use server"

import getCollection, {NOTE_COLLECTION} from "@/db";
import {NoteType} from "@/types";

export default async function getAllNotes(): Promise<NoteType[]> {
    const noteCollection = await getCollection(NOTE_COLLECTION);
    const data = await noteCollection.find().toArray();

    const notesOut: NoteType[] = data.map((noteObject) => ({
        note: noteObject.note,
        id: noteObject.id,
        date: noteObject.date,
    }));

    return notesOut;
}