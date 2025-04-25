// Author: Yat Long (Louis) Szeto
// Description: This page displays a specific day's content in the personal planner app,
// including a quote of the day fetched from an API and placeholders for notes, habits, or events.
"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function DatePage() {
  const params = useParams();
  const date = params?.date;

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

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

  return (
    <div style={{ padding: '2rem' }}>
    <h1 style= {{fontSize: '1.5rem'}}>{dayjs(date as string).format('dddd, MMMM D, YYYY')}</h1>
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
      {/* Insert notes, habits, events, etc. here */}
    </div>
  );
}