// Author: Yat Long (Louis) Szeto
// Description: API route for handling notes operations (GET, POST, DELETE).

import { NextRequest, NextResponse } from 'next/server';
import getCollection, { NOTE_COLLECTION } from '@/db';
import { ObjectId } from 'mongodb';

// GET /api/notes
// Fetch all notes or notes for a specific date
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date');

  try {
    const collection = await getCollection(NOTE_COLLECTION);
    // Query notes based on date or fetch all
    const notes = date
      ? await collection.find({ date }).toArray()
      : await collection.find({}).toArray();
    return NextResponse.json(notes);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

// POST /api/notes
// Add a new note
export async function POST(req: NextRequest) {
  const { note, date } = await req.json();

  // Validate request body
  if (!note || !date) {
    return NextResponse.json({ error: 'Note and date are required' }, { status: 400 });
  }

  try {
    const collection = await getCollection(NOTE_COLLECTION);
    // Insert new note document
    const result = await collection.insertOne({ note, date });

    return NextResponse.json(result);
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to add note' }, { status: 500 });
  }
}

// DELETE /api/notes
// Delete a note by ID
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  // Validate ID
  if (!id) {
    return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
  }

  try {
    const collection = await getCollection(NOTE_COLLECTION);
    // Delete note with matching _id
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}