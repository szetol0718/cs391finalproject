// Author: Yat Long (Louis) Szeto
// Description: API route for handling to-do list operations using MongoDB.
// - GET: Retrieves all tasks.
// - POST: Adds a new task with optional due date.
// - PATCH: Updates a task's completion status.

import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// MongoDB setup
const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri);
const dbName = 'final-project';
const collectionName = 'todo-collection';

// GET: Retrieve all tasks
export async function GET() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const tasks = await collection.find({}).toArray();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

// POST: Add a new task
export async function POST(req: NextRequest) {
  const { text, dueDate } = await req.json();

  if (!text) {
    return NextResponse.json({ error: 'Task text is required' }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const newTask = {
      text,
      dueDate: dueDate || null,
      completed: false,
    };

    const result = await collection.insertOne(newTask);
    return NextResponse.json(result);
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to add task' }, { status: 500 });
  }
}

// PATCH: Toggle task completion
export async function PATCH(req: NextRequest) {
  const { id, completed } = await req.json();

  if (!id || typeof completed !== 'boolean') {
    return NextResponse.json({ error: 'Task ID and new completed status are required' }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { completed: completed } }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

// DELETE: Remove a task by ID
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}