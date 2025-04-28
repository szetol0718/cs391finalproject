// TODO COMPONENT
// Author: Arooj Kamran
// Description: User can enter goals (weekly or monthly), set deadlines, and mark them as completed

// The to-do list will contain 0+ posted goals and 1 "Default" (Add a Goal!) form.
// Add a goal contains text input, a dropdown for goal type (weekly/monthly), and a date input.
// Submitting this form will:
// (a) Post the goal (default becomes newest posted)
// (b) Render a new blank form for additional entries
// Each goal can be marked completed via checkbox

"use client"; 
import React, { useEffect, useState } from 'react';
import { Task } from '@/types';
import { getAllToDos, addTodo, toggleComplete } from '@/lib/updateToDos'; 

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  useEffect(() => {
    async function fetchTasks() {
      try {
        const fetchedTasks = await getAllToDos();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      dueDate: newTaskDueDate || undefined,
      completed: false,
    };

    try {
      await addTodo(newTask); // <- call server action
      setTasks([...tasks, newTask]);
      setNewTaskText('');
      setNewTaskDueDate('');
    } catch (error) {
      console.error('Failed to add task', error);
    }
  };

  const handleToggleComplete = async (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    try {
      const completedStatus = updatedTasks.find(task => task.id === id)?.completed ?? false;
      await toggleComplete(id, completedStatus); // <- call server action
    } catch (error) {
      console.error('Failed to update task', error);
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
        <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </div>

      <ul className="space-y-2">
        {sortedTasks.map((task) => (
          <li key={task.id} className="border p-2 rounded flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <div className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              <div className="font-semibold">{task.text}</div>
              {task.dueDate && (
                <div className="text-sm">{`Due: ${task.dueDate}`}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
