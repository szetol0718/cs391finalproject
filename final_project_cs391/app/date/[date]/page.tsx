// Author: Yat Long (Louis) Szeto
// Description: This page displays a specific day's date and quote of the day.
// Fetches the quote using server function from /lib/quote/getQuote.

"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import getQuote from '@/lib/GetQuote';

export default function DatePage() {
  const params = useParams();
  const date = params?.date;

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  // Fetch the quote using server function
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

  return (
    <div style={{ padding: '2rem' }}>
      {/* Display the selected date */}
      <h1 style={{ fontSize: '1.5rem' }}>
        {dayjs(date as string).format('dddd, MMMM D, YYYY')}
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
    </div>
  );
}