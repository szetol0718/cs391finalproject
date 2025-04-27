// Author: Yat Long (Louis) Szeto
// Description: This page displays a specific day's content in the personal planner app,
// including a quote of the day fetched from an API and daily notes loaded from localStorage.
"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

// Define NoteType
type NoteType = {
  id: number;
  note: string;
  date: string;
};

export default function DatePage() {
  const params = useParams();
  const date = params?.date;

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [dayNotes, setDayNotes] = useState<NoteType[]>([]);

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
          </div>
        ))
      ) : (
        <p key="no-notes" style={{ marginTop: '1rem', color: '#888', fontStyle: 'italic' }}>
          No notes added yet for this day.
        </p>
      )}
    </div>
  );
}