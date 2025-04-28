//author: Arooj Kamran
'use server'; 

import getCollection, { TODO_COLLECTION } from '@/db';
import { Task } from '@/types';

export async function getAllToDos(): Promise<Task[]> {
    const todoCollection = await getCollection(TODO_COLLECTION);
    const data = await todoCollection.find().toArray();
  
    const todos: Task[] = data.map((task) => ({
      id: task.id,
      text: task.text,
      dueDate: task.dueDate,
      completed: task.completed,
    }));
  
    return todos;
  }

export async function addTodo(newTask: Task) {
  const todoCollection = await getCollection(TODO_COLLECTION);
  await todoCollection.insertOne(newTask);
}

export async function toggleComplete(id: number, completed: boolean) {
  const todoCollection = await getCollection(TODO_COLLECTION);
  await todoCollection.updateOne({ id }, { $set: { completed } });
}