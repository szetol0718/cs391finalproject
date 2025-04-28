//Authors: Leigh Brown and Yat Long (Louis) Szeto


import {MongoClient, Db, Collection} from 'mongodb';
 
 const MONGO_URI = process.env.MONGO_URI as string;
 if (!MONGO_URI) {
     throw new Error("MONGO_URI environment variable is undefined")
 }
 const db_name = "final-project";
 export const HABIT_COLLECTION = "habit-collection";  // habit collection (Leigh)
 export const ARCHIVE_COLLECTION = "archive-collection";  // archive collection (Leigh)
 export const NOTE_COLLECTION = "note-collection";
 export const TODO_COLLECTION = "todo-collection"; 
 export const MOOD_COLLECTION = "mood-collection";
 
 let client: MongoClient | null = null;
 let db: Db | null = null;
 
 async function connect(): Promise<Db> {
     if (!client) {
         client = new MongoClient(MONGO_URI);
         await client.connect();
     }
     return client.db(db_name)
 }
 
 export default async function getCollection(
     collectionName: string, ): Promise<Collection> {
     if (!db) {
         db= await connect();
     }
     return db.collection(collectionName);
 }