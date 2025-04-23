// TODO COMPONENT
// Author:  Arooj Kamran
// Description: User can enter goals (weekly or monthly), set deadlines, and mark them as completed

// The to-do list will contain 0+ posted goals and 1 "Default" (Add a Goal!) form.
// Add a goal contains text input, a dropdown for goal type (weekly/monthly), and a date input.
// Submitting this form will:
// (a) Post the goal (default becomes newest posted)
// (b) Render a new blank form for additional entries
// Each goal can be marked completed via checkbox

"use client"
import { useState } from "react";

type Task = {
  id: number;
  text: string;
  type: "weekly" | "monthly";
  due: string;       // Due date
  completed: boolean;
};

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [id, setId] = useState(0);

  function handleSubmit(formData: FormData) {
    const text = formData.get("task") as string;
    const type = formData.get("type") as "weekly" | "monthly";
    const due = formData.get("due") as string;

    if (!text || !type || !due) return;

    const newTask: Task = {
      id,
      text,
      type,
      due,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setId(id + 1);
  }

  function toggleComplete(taskId: number) {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function TaskForm() {
    return (
      <form action={handleSubmit} className="flex flex-col gap-2 my-4 items-start">
        <input
          type="text"
          name="task"
          placeholder="Enter your goal..."
          className="p-2 w-80 border border-gray-400 rounded"
        />
        <select name="type" className="p-2 border border-gray-400 rounded">
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          type="date"
          name="due"
          className="p-2 border border-gray-400 rounded"
        />
        <input
          type="submit"
          value="Add Goal"
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        />
      </form>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold underline mb-3">Set Your Monthly and Weekly Goals</h2>
      <TaskForm />
      <div className="mt-4">
        {["weekly", "monthly"].map(category => (
          <div key={category} className="mb-4">
            <h3 className="text-lg font-bold capitalize">{category} Goals</h3>
            {tasks
              .filter(task => task.type === category)
              .map(task => (
                <div key={task.id} className="flex items-center gap-3 ml-2 mb-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />
                  <div className="flex flex-col">
                    <span
                      className={`${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.text}
                    </span>
                    <span className="text-sm text-gray-600">
                      Complete by: {task.due}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
