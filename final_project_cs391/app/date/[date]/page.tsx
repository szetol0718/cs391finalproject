"use client";
import { useParams } from 'next/navigation';

export default function DatePage() {
  const params = useParams();
  const date = params?.date;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Details for {date}</h1>
      {/* Insert notes, habits, events, etc. here */}
    </div>
  );
}