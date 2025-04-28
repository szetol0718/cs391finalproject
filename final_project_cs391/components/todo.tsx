// TODO COMPONENT
// Author: Arooj Kamran
// Description: User can enter goals (weekly or monthly), set deadlines, and mark them as completed

// The to-do list will contain 0+ posted tasks and 1 "Default" (New Task) form.
// Submitting this form will:
// (a) Post the task (default becomes newest posted)
// (b) Render a new blank form for additional entries
// Each goal can be marked completed via checkbox

"use client"; 
import React, { useEffect, useState } from 'react';
import { Task } from '@/types';
import { getAllToDos, addTodo, toggleComplete } from '@/lib/updateToDos'; 

// Main React functional component 'TodoList'.
// Exports it as the default export of this file so it can be used on a page.
export default function TodoList() {
  // useState Hooks to manage an array of task objects locally in the component, the text input for adding a new task, and the due date input for adding a new task
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [id, setId] = useState(0); //track next available ID

  useEffect(() => {
    async function fetchTasks() {
      try {
        // Fetches existing tasks from MongoDB by calling the server action 'getAllToDos'
        const fetchedTasks = await getAllToDos();
        setTasks(fetchedTasks);

        //looked up online how to find the highest id stored in the mongodb database so that we could set the next task to an id 1 higher
        //it also checks that the to do list isn't empty and if so makes the next task have an id of 0
        const highestId = fetchedTasks.length > 0
            ? Math.max(...fetchedTasks.map(task => task.id))
            : -1;
        setId(highestId + 1);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, []);

  // Function to handle adding a new task when the 'Add Task' button is clicked.
  const handleAddTask = async () => {
    if (newTaskText.trim() === '') return;

    const newTask: Task = {
      id: id,
      text: newTaskText,
      dueDate: newTaskDueDate || undefined,
      completed: false,
    };

    try {
      // Calls server action 'addTodo' to save the new task into MongoDB.
      await addTodo(newTask); // <- call server action
      setTasks([...tasks, newTask]);
      setNewTaskText('');
      setNewTaskDueDate('');
      setId(id + 1);
    } catch (error) {
      console.error('Failed to add task', error);
    }
  };

   // Function to handle toggling the completed status of a task.
  const handleToggleComplete = async (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    try {
      const completedStatus = updatedTasks.find(task => task.id === id)?.completed ?? false;
      // Calls server action 'toggleComplete' to update the task's completed field in MongoDB.
      await toggleComplete(id, completedStatus); // <- call server action
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  // Sorts tasks based on their due date.
  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return -1;
    if (!b.dueDate) return 1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Main container styled with Tailwind CSS classes for padding and centering. */}
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="New task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="p-2 border rounded"
        />
        {/* Text input for the task description */}
        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          className="p-2 border rounded"
        />
        {/* Optional date input for task's due date */}
        <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </div>

      <ul className="space-y-2">
        {/* List of existing tasks */}
        {sortedTasks.map((task) => (
          <li key={task.id} className="border p-2 rounded flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            {/* Checkbox for marking task completed or not */}
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
