// Author: Yat Long (Louis) Szeto
// Description: This page displays a specific day's content in the personal planner app,
// including a quote of the day fetched from an API and daily notes loaded from MongoDB.

"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Task,NoteType } from '@/types';

export default function DatePage() {
  const params = useParams();
  const date = params?.date;

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [dayNotes, setDayNotes] = useState<NoteType[]>([]);
  const [dayTodos, setDayTodos] = useState<Task[]>([]);

  useEffect(() => {
    fetch('/api/quote')
      .then(res => res.json())
      .then(data => {
        setQuote(data.q);
        setAuthor(data.a);
      })
      .catch(err => {
        console.error('Failed to fetch quote:', err);
      });
  }, []);

  useEffect(() => {
    if (!date) return;
    fetch(`/api/notes?date=${date}`)
      .then(res => res.json())
      .then((data: NoteType[]) => {
        setDayNotes(data);
      })
      .catch(err => {
        console.error('Failed to fetch notes from DB:', err);
      });
  }, [date]);

  useEffect(() => {
    if (!date) return;
    fetch(`/api/to-do?date=${date}`)
      .then(res => res.json())
      .then((data: Task[]) => {
        setDayTodos(data);
      })
      .catch(err => {
        console.error('Failed to fetch todos from DB:', err);
      });
  }, [date]);

  async function toggleComplete(id: string, currentStatus: boolean) {
    try {
      const res = await fetch('/api/to-do', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed: !currentStatus }),
      });
      if (!res.ok) throw new Error('Failed to toggle task');
  
      // After toggling, refetch updated todos filtered by date
      if (date) {
        const refreshed = await fetch(`/api/to-do?date=${date}`).then(res => res.json());
        setDayTodos(refreshed);
      }
    } catch (error) {
      console.error('Failed to toggle todo completion:', error);
    }
  }
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem' }}>{dayjs(date as string).format('dddd, MMMM D, YYYY')}</h1>

      {quote && (
        <>
          <h1 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1a1a1a' }}>
            Quote of the Day
          </h1>
          <p style={{ fontStyle: 'italic', marginBottom: '0.25rem' }}>
            “{quote}”
          </p>
          <p style={{ fontWeight: 'bold', marginBottom: '1rem', textAlign: 'right' }}>
            – {author}
          </p>
        </>
      )}

      <h2>Notes for {dayjs(date as string).format('MMMM D, YYYY')}</h2>

      {dayNotes.length > 0 ? (
        dayNotes.map((note, index) => (
          <div
            key={note.id ?? index}
            style={{
              backgroundColor: '#f9f9f9',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
            }}
          >
            <p style={{ margin: 0 }}>{note.note}</p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>{note.date}</p>
          </div>
        ))
      ) : (
        <p key="no-notes" style={{ marginTop: '1rem', color: '#888', fontStyle: 'italic' }}>
          No notes added yet for this day.
        </p>
      )}

      <h2 className="mt-6">Todo List for {dayjs(date as string).format('MMMM D, YYYY')}</h2>

      {dayTodos.length > 0 ? (
        dayTodos.map((task) => (
          <li key={task._id} className="border p-2 rounded flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task._id!, task.completed)}
            />
            <div className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              <div className="font-semibold">{task.text}</div>
              {task.dueDate && (
                <div className="text-sm">{`Due: ${task.dueDate}`}</div>
              )}
            </div>
          </li>
        ))
      ) : (
        <p style={{ marginTop: '1rem', color: '#888', fontStyle: 'italic' }}>
          No tasks scheduled for this day.
        </p>
      )}
    </div>
  );
}