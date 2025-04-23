/**
 * Calendar Component
 * Author: Yat Long (Louis) Szeto
 * 
 * Description:
 * A dynamic and interactive calendar component for the CS391 Final Project.
 * This component displays a real monthly calendar view aligned by weekdays (Monday to Sunday),
 * with support for navigating between months.
 * 
 * Features:
 * - Displays the actual number of days in each month using dayjs
 * - Aligns dates correctly based on the first weekday of the month
 * - Highlights the current day
 * - Month navigation (← / → buttons)
 * 
 * Styling:
 * - Fully styled using styled-components
 * - Light-colored, circular date tiles with hover effects
 * 
 * Usage:
 * This calendar is reused across the Home and Habit Tracker pages. It is designed
 * to support integration with data (e.g., habits, notes) per date and may be extended
 * with additional logic for interactivity, form inputs, and dynamic indicators.
 */

'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs, { Dayjs } from 'dayjs';

const rainbowColors = [
  '#ffd6d6', // Red - Mon
  '#fff1cb', // Orange - Tue
  '#f9ffd6', // Yellow - Wed
  '#d9f4dc', // Green - Thu
  '#cbe7f8', // Blue - Fri
  '#e6d8ff', // Indigo - Sat
  '#ffcde1', // Violet - Sun
];

const Wrapper = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:1rem;
`;

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  background: #eee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #ddd;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

const DayHeader = styled.div`
  font-weight: bold;
  text-align: center;
  padding: 0.5rem 0;
`;

const DayCircle = styled.div<{ bg: string; isToday?: boolean }>`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  background: ${({ isToday, bg }) => (isToday ? '#ffcf77' : bg)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin: 0 auto;
  transition: background 0.3s ease;
  box-shadow: ${({ isToday }) =>
    isToday ? '0 0 0 3px #ffb347, 0 0 10px rgba(255, 195, 0, 0.3)' : 'none'};
`;

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar: React.FC = () => {
  const today = dayjs();
  const [month, setMonth] = useState<Dayjs>(today.startOf('month'));

  const startDay = (month.day() + 6) % 7;
  const daysInMonth = month.daysInMonth();

  const goPrevMonth = () => setMonth(month.subtract(1, 'month'));
  const goNextMonth = () => setMonth(month.add(1, 'month'));

  const blanks = Array.from({ length: startDay }, (_, i) => <div key={`blank-${i}`} />);
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const currentDate = month.add(i, 'day');
    const isToday = currentDate.isSame(today, 'day');
    const weekdayIndex = (currentDate.day() + 6) % 7; // 0 = Monday
    const bg = rainbowColors[weekdayIndex];

    return (
      <DayCircle key={i} isToday={isToday} bg={bg}>
        {currentDate.date()}
      </DayCircle>
    );
  });

  return (
    <Wrapper>
      <Header>
        <NavButton onClick={goPrevMonth}>← Prev</NavButton>
        <h2>{month.format('MMMM YYYY')}</h2>
        <NavButton onClick={goNextMonth}>Next →</NavButton>
      </Header>

      <Grid>
        {weekdayLabels.map((label) => (
          <DayHeader key={label}>{label}</DayHeader>
        ))}
        {blanks.concat(days)}
      </Grid>
    </Wrapper>
  );
};

export default Calendar;
