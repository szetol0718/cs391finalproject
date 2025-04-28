// Author: Yat Long (Louis) Szeto
// Description: This page displays a specific day's date, quote of the day, and todo list.

"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import getQuote from '@/lib/GetQuote';
import { getAllToDos, toggleComplete } from '@/lib/updateToDos';
import { Task } from '@/types';

export default function DatePage() {
  const params = useParams();
  const date = params?.date as string;

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [todos, setTodos] = useState<Task[]>([]);

  // Fetch the quote when the page loads
  useEffect(() => {
    async function fetchQuote() {
      try {
        const quoteData = await getQuote();
        setQuote(quoteData.q);
        setAuthor(quoteData.a);
      } catch (err) {
        console.error('Failed to fetch quote:', err);
      }
    }
    fetchQuote();
  }, []);

  // Fetch todos when the page loads
  useEffect(() => {
    async function fetchTodos() {
      try {
        const allTodos = await getAllToDos();
        const filteredTodos = allTodos.filter((todo) => todo.dueDate === date);
        setTodos(filteredTodos);
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      }
    }
    fetchTodos();
  }, [date]);

  // Handle toggling completion of a task
  async function handleToggle(id: number, currentStatus: boolean) {
    try {
      await toggleComplete(id, !currentStatus);
      // After toggling, re-fetch the todos
      const allTodos = await getAllToDos();
      const filteredTodos = allTodos.filter((todo) => todo.dueDate === date);
      setTodos(filteredTodos);
    } catch (err) {
      console.error('Failed to toggle task completion:', err);
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      {/* Display the selected date */}
      <h1 style={{ fontSize: '1.5rem' }}>
        {dayjs(date).format('dddd, MMMM D, YYYY')}
      </h1>

      {/* Display the quote of the day */}
      {quote && (
        <>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>
            Quote of the Day
          </h2>
          <p style={{ fontStyle: 'italic', marginBottom: '0.25rem' }}>
            “{quote}”
          </p>
          <p style={{ fontWeight: 'bold', marginBottom: '1rem', textAlign: 'right' }}>
            – {author}
          </p>
        </>
      )}

      {/* Display Todos */}
      <h2 className="text-xl font-semibold mt-8 mb-4">To-Do List</h2>
      {todos.length > 0 ? (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-3 p-2 bg-gray-100 rounded shadow">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id, todo.completed)}
              />
              <div className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No todos for this day.</p>
      )}
    </div>
  );
}