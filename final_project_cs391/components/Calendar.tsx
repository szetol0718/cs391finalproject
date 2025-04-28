/**
 * Calendar Component
 * Author: Yat Long (Louis) Szeto
 *
 * Description:
 * A monthly calendar view that aligns dates by weekdays, supports month navigation,
 * highlights the current day, and links each day to its detail page.
 */
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs, { Dayjs } from 'dayjs';
import Link from 'next/link';

// --- Defines background colors for each day of the week ---
const rainbowColors = [
  '#ffb3b3', '#ffe599', '#ffff99', 
  '#b3ffcc', '#b3e5ff', '#dab3ff', '#ffb3e6', 
];

// --- Styled Components ---

const Wrapper = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
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

// Circle representing each day; highlights today with a border
const DayCircle = styled.div<{ bg: string; $isToday?: boolean }>`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin: 0 auto;
  transition: background 0.3s ease, transform 0.25s, box-shadow 0.25s;
  border: ${({ $isToday }) => ($isToday ? '3px solid #007acc' : 'none')};

  &:hover {
    background: ${({ bg }) => bg + '99'}; /* Lighten color slightly on hover */
  }
`;

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Calendar() {
  // Get today's date
  const today = dayjs();

  // Track the first day of the currently selected month
  const [month, setMonth] = useState<Dayjs>(today.startOf('month'));

  // Offset needed to align the first day with the correct weekday (Monday start)
  const startDay = (month.day() + 6) % 7;

  const daysInMonth = month.daysInMonth();


  const goPrevMonth = () => setMonth(month.subtract(1, 'month'));
  const goNextMonth = () => setMonth(month.add(1, 'month'));

  // Generate empty blanks to shift the first date into correct weekday slot
  const blanks = Array.from({ length: startDay }, (_, i) => <div key={`blank-${i}`} />);

  // Generate all day circles for the current month
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const currentDate = month.add(i, 'day'); // Compute the date for this cell
    const isToday = currentDate.isSame(today, 'day'); // Check if it is today
    const weekdayIndex = (currentDate.day() + 6) % 7; // Get the correct weekday index
    const bg = rainbowColors[weekdayIndex]; // Background color based on weekday
    const formattedDate = currentDate.format('YYYY-MM-DD'); // Format to link correctly

    return (
      <Link key={i} href={`/date/${formattedDate}`} passHref>
        <button type="button">
          <DayCircle key={i} bg={bg} $isToday={isToday}>
            {currentDate.date()}
          </DayCircle>
        </button>
      </Link>
    );
  });

  return (
    // Main Calendar Layout
    <Wrapper>
      {/* Month navigation buttons and month title */}
      <Header>
        <NavButton onClick={goPrevMonth}>← Prev</NavButton>
        <h2>{month.format('MMMM YYYY')}</h2>
        <NavButton onClick={goNextMonth}>Next →</NavButton>
      </Header>

      {/* Weekday headers + day grid */}
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