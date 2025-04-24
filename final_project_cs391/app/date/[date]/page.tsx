"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      {quote && (
        <>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1a1a1a' }}>
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
      <h1>Details for {date}</h1>
      {/* Insert notes, habits, events, etc. here */}
    </div>
  );
}