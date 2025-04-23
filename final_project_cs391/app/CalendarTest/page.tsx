// pages/test-calendar.tsx
// Test page for Calendar Component by Louis Szeto
'use client'; 
import React from 'react';
import Calendar from '@/components/Calendar';

const TestCalendarPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Calendar Component Test</h1>
      <Calendar />
    </div>
  );
};

export default TestCalendarPage;

