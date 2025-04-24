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

// Colors for each weekday to visually distinguish days
const rainbowColors = [
  '#ffb3b3', // Red - Mon
  '#ffe599', // Orange - Tue
  '#ffff99', // Yellow - Wed
  '#b3ffcc', //  Green - Thu
  '#b3e5ff', // Blue - Fri
  '#dab3ff', // Indigo - Sat
  '#ffb3e6', // Violet - Sun
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

const DayCircle = styled(({ istoday, ...props }) => <div {...props} />)<{ bg: string; istoday?: boolean }>`
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
  border: ${({ istoday }) => (istoday ? '3px solid #007acc' : 'none')};
  &:hover {
    background: ${({ bg }) => bg + '99'}; /* Simple transparency-based lighten */
    transform: scale(1.1);
    cursor: pointer;
  }
`;


const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar: React.FC = () => {
  // Get today's date
  const today = dayjs();

  // Track the first day of the selected month
  const [month, setMonth] = useState<Dayjs>(today.startOf('month'));

  // Offset to align the first day of the month with the correct weekday
  const startDay = (month.day() + 6) % 7;

  // Total number of days in the selected month
  const daysInMonth = month.daysInMonth();

  const goPrevMonth = () => setMonth(month.subtract(1, 'month'));
  const goNextMonth = () => setMonth(month.add(1, 'month'));

  const blanks = Array.from({ length: startDay }, (_, i) => <div key={`blank-${i}`} />);
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    // Render each day in the month as a colored, clickable circle
    const currentDate = month.add(i, 'day');
    const isToday = currentDate.isSame(today, 'day');
    const weekdayIndex = (currentDate.day() + 6) % 7; // 0 = Monday
    const bg = rainbowColors[weekdayIndex];
    const formattedDate = currentDate.format('YYYY-MM-DD');
  
    return (
      <Link key={i} href={`/date/${formattedDate}`} passHref>
        <button type="button" style={{ all: 'unset' }}>
          <DayCircle istoday={isToday} bg={bg}>
            {currentDate.date()}
          </DayCircle>
        </button>
      </Link>
    );
  });

  return ( 
    // Calendar navigation and grid layout
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