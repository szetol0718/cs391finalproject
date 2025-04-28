// Author: Yat Long (Louis) Szeto
// Description: This page displays a specific day's date, quote of the day, and todo list.

"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import getQuote from '@/lib/GetQuote';
import { getAllToDos, toggleComplete } from '@/lib/updateToDos';
import { Task } from '@/types';
import getAllMoods from '@/lib/updateMoods';
import { saveMood } from '@/lib/updateMoods';

export default function DatePage() {
  const params = useParams();
  const date = params?.date as string;

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [todos, setTodos] = useState<Task[]>([]);
  const [mood, setMood] = useState<string | null>(null);

  // Fetch the quote when the page loads
  useEffect(() => {
    async function fetchQuote() {
      try {
        const quoteData = await getQuote(date);
        setQuote(quoteData.q);
        setAuthor(quoteData.a);
      } catch (err) {
        console.error('Failed to fetch quote:', err);
      }
    }
    fetchQuote();
  }, [date]);

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

  useEffect(() => {
    async function fetchMoods() {
      try {
        const moods = await getAllMoods();
        const todayMood = moods.find((m) => m.date === date);
        if (todayMood) {
          setMood(todayMood.mood);
        }
      } catch (err) {
        console.error('Failed to fetch moods:', err);
      }
    }
    fetchMoods();
  }, [date]);

  async function handleMoodSelect(selectedMood: string) {
    setMood(selectedMood);

    try {
      await saveMood({ date, mood: selectedMood });
    } catch (error) {
      console.error('Failed to save mood:', error);
    }
  }

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

      {/* Mood Tracker */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Mood of the Day</h2>
      <div className="flex space-x-4 text-4xl mb-4">
        {["😄", "😐", "😢", "😡", "🥳", "🤯", "😔", "😎"].map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleMoodSelect(emoji)}
            className="hover:scale-110 transition-transform"
          >
            {emoji}
          </button>
        ))}
      </div>
      {mood && (
        <p className="text-lg">
          Your mood today: <span className="text-2xl">{mood}</span>
        </p>
      )}

      {/* Display To-dos */}
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