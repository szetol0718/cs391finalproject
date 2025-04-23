//  Calendar Component
// Author: Yat Long(Louis) Szeto
// Displays a flexible calendar grid view.
// Props:
//   - numOfDays: number of days to display (e.g., 14 for mini, 30 for full)
//   - view: 'mini' or 'full' layout style
// Reused across Home and Habit Tracker pages.
// Styled using styled-components for CS391 Final Project.

//example of usage: <Calendar numOfDays={30} view="full" /> ,<Calendar numOfDays={14} view="mini" />
'use client'; 
import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 800px;
  margin: 2rem auto;
`;

const WeekList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WeekButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1rem;
  background: ${({ active }) => (active ? '#ddd' : '#f5f5f5')};
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;

  &:hover {
    background: #eee;
  }
`;

const CalendarPanel = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`;

const DayCircle = styled.div<{ bg: string }>`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #333;
`;

const pastelColors = ['#ffd6d6', '#ffeecb', '#d9f4dc', '#cbe7f8', '#e6d8ff', '#fff1cb', '#ffcde1'];

const Calendar: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const renderFullMonth = () => {
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    return days.map((day) => (
      <DayCircle key={day} bg="#f0f0f0">
        {day}
      </DayCircle>
    ));
  };

  const renderWeek = (weekIndex: number) => {
    const weekStart = weekIndex * 7 + 1;
    const weekDays = Array.from({ length: 7 }, (_, i) => weekStart + i);
    return weekDays.map((day, i) => (
      <DayCircle key={day} bg={pastelColors[i % pastelColors.length]}>
        {day}
      </DayCircle>
    ));
  };

  return (
    <Wrapper>
      <WeekList>
        {[1, 2, 3, 4].map((week) => (
          <WeekButton
            key={week}
            active={selectedWeek === week}
            onClick={() => setSelectedWeek(week === selectedWeek ? null : week)}
          >
            Week {week}
          </WeekButton>
        ))}
      </WeekList>

      <CalendarPanel>
        {selectedWeek ? renderWeek(selectedWeek - 1) : renderFullMonth()}
      </CalendarPanel>
    </Wrapper>
  );
};

export default Calendar;


