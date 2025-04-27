// Author: Yat Long (Louis) Szeto
// Description: API route for handling notes storage and retrieval using MongoDB.
// - GET: Retrieves notes for a specific date if provided, or all notes otherwise.
// - POST: Adds a new note with associated text and date.
// - DELETE: Deletes a note based on its unique MongoDB ObjectId.

import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// MongoDB setup
const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri);
const dbName = 'final-project';
const collectionName = 'archive-collection';

// GET: Retrieve notes
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date');

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const notes = date
      ? await collection.find({ date }).toArray()
      : await collection.find({}).toArray();

    return NextResponse.json(notes);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

// POST: Add a new note
export async function POST(req: NextRequest) {
  const { note, date } = await req.json();

  if (!note || !date) {
    return NextResponse.json({ error: 'Note and date are required' }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne({ note, date });
    return NextResponse.json(result);
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to add note' }, { status: 500 });
  }
}

// DELETE: Remove a note by ID
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}