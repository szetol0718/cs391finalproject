// Author: Yat Long (Louis) Szeto
// Description: API route for handling to-do list operations using MongoDB.
//GET,POST,PATCH,DELETE
import { NextRequest, NextResponse } from 'next/server';
import getCollection, { TODO_COLLECTION } from '@/db';
import { ObjectId } from 'mongodb';

// --- GET /api/to-do ---
// Fetch all tasks or tasks for a specific due date
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date');

  try {
    const collection = await getCollection(TODO_COLLECTION);

    // Query tasks based on due date or fetch all
    const tasks = date
      ? await collection.find({ dueDate: date }).toArray()
      : await collection.find({}).toArray();

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

// --- POST /api/to-do ---
// Add a new task
export async function POST(req: NextRequest) {
  const { text, dueDate } = await req.json();

  // Validate task text
  if (!text) {
    return NextResponse.json({ error: 'Task text is required' }, { status: 400 });
  }

  try {
    const collection = await getCollection(TODO_COLLECTION);

    // Insert new task document
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

// --- PATCH /api/to-do ---
// Toggle task completion
export async function PATCH(req: NextRequest) {
  const { id, completed } = await req.json();

  // Validate ID and completed status
  if (!id || typeof completed !== 'boolean') {
    return NextResponse.json({ error: 'Task ID and completed status are required' }, { status: 400 });
  }

  try {
    const collection = await getCollection(TODO_COLLECTION);

    // Update task's completed status
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { completed } }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

// --- DELETE /api/to-do ---
// Delete a task by ID
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  // Validate ID
  if (!id) {
    return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
  }

  try {
    const collection = await getCollection(TODO_COLLECTION);

    // Delete task with matching _id
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json(result);
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}