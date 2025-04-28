// Author: Yat Long (Louis) Szeto
// Description: API route for handling notes storage and retrieval using MongoDB.
// - GET: If a `date` is provided as a query parameter, retrieves notes for that date.
//        If no `date` is provided, retrieves all notes.
// - POST: Adds a new note with associated `note` text and `date` into the MongoDB collection.
// MongoDB database: 'final-project'
// MongoDB collection: 'archive-collection'
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGO_URI!; 
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
    const date = req.nextUrl.searchParams.get('date');
  
    try {
      await client.connect();
      const db = client.db('final-project');
      const collection = db.collection('archive-collection');
  
      if (date) {
        const notes = await collection.find({ date }).toArray();
        return NextResponse.json(notes);
      } else {
        const notes = await collection.find({}).toArray(); // get all notes
        return NextResponse.json(notes);
      }
    } catch (error) {
      console.error('GET error:', error);
      return NextResponse.json({ error: 'Database fetch failed' }, { status: 500 });
    }
  }

export async function POST(req: NextRequest) {
  const { note, date } = await req.json();

  if (!note || !date) {
    return NextResponse.json({ error: 'Note and date required' }, { status: 400 });
  }

  await client.connect();
  const db = client.db('final-project');
  const result = await db.collection('archive-collection').insertOne({ note, date });

  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json(); // get MongoDB _id from request
  
    if (!id) {
      return NextResponse.json({ error: 'Note ID required' }, { status: 400 });
    }
  
    try {
      await client.connect();
      const db = client.db('final-project');
      const collection = db.collection('archive-collection');
      
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return NextResponse.json(result);
    } catch (error) {
      console.error('DELETE error:', error);
      return NextResponse.json({ error: 'Database delete failed' }, { status: 500 });
    }
  }