// Author: Arooj Kamran

'use server'; 

import getCollection, { TODO_COLLECTION } from '@/db';
import { Task } from '@/types';

//Fetches all to-do tasks from the MongoDB database.
export async function getAllToDos(): Promise<Task[]> {
    const todoCollection = await getCollection(TODO_COLLECTION);
    const data = await todoCollection.find().toArray();
  
    // Maps the raw MongoDB documents into strongly typed 'Task' objects.
    const todos: Task[] = data.map((task) => ({
      id: task.id,
      text: task.text,
      dueDate: task.dueDate,
      completed: task.completed,
    }));
  
    // Returns the list of todos to the caller (usually a client component).
    return todos;
  }

// Adds a new task into the MongoDB database.
export async function addTodo(newTask: Task) {
  const todoCollection = await getCollection(TODO_COLLECTION);
  await todoCollection.insertOne(newTask);
}

//Updates the 'completed' status of a task by its ID
export async function toggleComplete(id: number, completed: boolean) {
  const todoCollection = await getCollection(TODO_COLLECTION);
  await todoCollection.updateOne({ id }, { $set: { completed } });
}