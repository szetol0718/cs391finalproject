"use server"

import getCollection, {NOTE_COLLECTION} from "@/db";
import {NoteType} from "@/types";

export default async function AddNote(newNoteObj:NoteType) {
    try {
        const noteCollection = await getCollection(NOTE_COLLECTION);
        await noteCollection.insertOne(newNoteObj);
    } catch (err) {
        console.error("Error fetching collection:", err);
    }
}