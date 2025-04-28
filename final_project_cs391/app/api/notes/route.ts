// Author: Yat Long (Louis) Szeto
// Description: API route for handling notes storage and retrieval using MongoDB.
// - GET: Retrieves notes for a specific date if provided, or all notes otherwise.
// - POST: Adds a new note with associated text and date.
// - DELETE: Deletes a note based on its unique MongoDB ObjectId.

import { NextRequest, NextResponse } from 'next/server';
import getCollection, { NOTE_COLLECTION } from '@/db';
import { ObjectId } from 'mongodb';

// GET: Retrieve notes
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date');

  try {
    const collection = await getCollection(NOTE_COLLECTION);

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
    const collection = await getCollection(NOTE_COLLECTION);

    const result = await collection.insertOne({ note, date });
    return NextResponse.json(result);
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to add note' }, { status: 500 });
  }
}

// DELETE: Remove a note
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
  }

  try {
    const collection = await getCollection(NOTE_COLLECTION);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}