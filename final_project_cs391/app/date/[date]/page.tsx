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
    fetch('/api/to-do')
      .then(res => res.json())
      .then((data: Task[]) => {
        const filtered = data.filter(task => task.dueDate === date);
        setDayTodos(filtered);
      })
      .catch(err => {
        console.error('Failed to fetch todos from DB:', err);
      });
  }, [date]);

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
        dayTodos.map((todo, index) => (
          <div
            key={todo._id ?? index}
            style={{
              backgroundColor: '#f0f9ff',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <input type="checkbox" checked={todo.completed} readOnly />
            <div className={todo.completed ? 'line-through text-gray-500' : ''}>
              <p style={{ margin: 0 }}>{todo.text}</p>
            </div>
          </div>
        ))
      ) : (
        <p style={{ marginTop: '1rem', color: '#888', fontStyle: 'italic' }}>
          No tasks scheduled for this day.
        </p>
      )}
    </div>
  );
}