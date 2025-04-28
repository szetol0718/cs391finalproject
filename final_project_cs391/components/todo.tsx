// TODO COMPONENT
// Author:  Arooj Kamran
// Description: User can enter goals (weekly or monthly), set deadlines, and mark them as completed

// The to-do list will contain 0+ posted goals and 1 "Default" (Add a Goal!) form.
// Add a goal contains text input, a dropdown for goal type (weekly/monthly), and a date input.
// Submitting this form will:
// (a) Post the goal (default becomes newest posted)
// (b) Render a new blank form for additional entries
// Each goal can be marked completed via checkbox

"use client";
import React, { useState, useEffect } from 'react';

type Task = {
  _id: string;
  text: string;
  dueDate?: string;
  completed: boolean;
};

async function fetchTasksFromServer() {
  const res = await fetch('/api/to-do');
  const data = await res.json();
  return data;
}

async function postTaskToServer(task: { text: string; dueDate?: string }) {
  const res = await fetch('/api/to-do', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to save task');
}

async function toggleTaskCompletionOnServer(id: string, completed: boolean) {
  const res = await fetch('/api/to-do', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, completed }),
  });
  if (!res.ok) throw new Error('Failed to update task');
}

async function deleteTaskFromServer(id: string) {
  const res = await fetch('/api/to-do', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Failed to delete task');
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await fetchTasksFromServer();
        setTasks(data);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    }
    loadTasks();
  }, []);

  const addTask = async () => {
    if (newTaskText.trim() === '') return;
    try {
      await postTaskToServer({ text: newTaskText, dueDate: newTaskDueDate || undefined });
      const updatedTasks = await fetchTasksFromServer();
      setTasks(updatedTasks);
      setNewTaskText('');
      setNewTaskDueDate('');
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const toggleComplete = async (id: string, currentStatus: boolean) => {
    try {
      await toggleTaskCompletionOnServer(id, !currentStatus);
      const updatedTasks = await fetchTasksFromServer();
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTaskFromServer(id);
      const updatedTasks = await fetchTasksFromServer();
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return -1;
    if (!b.dueDate) return 1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="New task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </div>
      <ul className="space-y-2">
        {sortedTasks.map((task) => (
          <li key={task._id} className="border p-2 rounded flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task._id, task.completed)}
            />
            <div className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              <div className="font-semibold">{task.text}</div>
              {task.dueDate && (
                <div className="text-sm">{`Due: ${task.dueDate}`}</div>
              )}
            </div>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}