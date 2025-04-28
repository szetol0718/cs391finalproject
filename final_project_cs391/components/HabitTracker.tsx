//author: Leigh Brown
//This is the habit tracker component. Here the user can change and track up to 10 habits using a table.
// Table consists of 12 columns:
// Col 1: Habit name - editable: user enters the name of habit
// Col 2: Habit type - 5 types of habits to choose from a select menu
// Col 3: Habit Tracking - daily, weekly, and biweekly habits
// Used also to track weekly completion
// Col 4 - 10: - each day and it’s corresponding checkbox to mark completion
// used for weekly completion
// Col 11: weekly completion - displays the percentage of habit completed for that week
// Col 12: optional notes on the habit


"use client";
import { useState, useEffect } from "react";
import {defaultHabits} from "./defaultHabits";
import {HabitProps, Day} from "@/types";

import getAllHabits from "@/lib/getAllHabits";
import updateHabit from "@/lib/updateHabit";
import toggleComplete from "@/lib/toggleComplete";
import calcWeeklyCompleted from "./calcWeeklyCompleted";
import { archiveCurrentWeek } from "@/lib/archiveCurrentWeek";
import { resetHabits } from "@/lib/resetHabits";
import {getLastSunday, getLastSaturday} from "@/lib/getDays";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, TextField, Select, MenuItem} from "@mui/material";


export default function HabitTracker() {
    type HabitWithLocalNotes = HabitProps & { localNotes?: string, localHabits?: string };
    //need this to fix how I update notes and the habit name so it doesn't call updateHabit with every single change a user makes

    const [rows, setRows] = useState<HabitWithLocalNotes[]>(defaultHabits); //initially was default habits but I changed it with tests

    useEffect(() => { //get all the habits from mongodb
        async function fetchHabits() {
            const hTable = await getAllHabits();
            setRows(hTable);
        }
        fetchHabits();
    }, []);

    const toggle = async (id: number, d: Day) => { //update daily completion
        const habit = rows.find((row) => row.id === id);
        if (habit) {
            const complete = !habit[d];
            await toggleComplete(id, d, complete);
            const updatedHabit = { ...habit, [d]: complete };
            const updatedWeeklyCompleted = calcWeeklyCompleted(updatedHabit); // Get the new weekly completion
            await updateHabit(id, undefined, undefined, undefined, undefined, updatedWeeklyCompleted); // Update the weeklyCompleted field
            setRows(rows.map(h => h.id === id ? { ...h, [d]: complete, weeklyCompleted: updatedWeeklyCompleted } : h));
        }
    };

    useEffect(() => { //decide whether the habit table should be archived and reset for a new week
        const today = new Date(); //js date function
        const dayOfWeek = today.getDay(); //get the day of the week

        // archive week's habits every sunday
        if (dayOfWeek === 0) {
            const lastWeekStart = getLastSunday(today);
            const lastWeekEnd = getLastSaturday(today);

            archiveCurrentWeek(lastWeekStart, lastWeekEnd)
                .then(() => resetHabits())
                .catch((err) => console.error("failed to archive week", err));
        }
    }, []);

    return (
        <TableContainer className ="w-full" sx={{backgroundColor: "white" }}>
            <Table stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "auto", font: "bold" }}>Habit</TableCell>
                        <TableCell sx={{ width: "auto" }}>Type</TableCell>
                        <TableCell sx={{ width: "auto" }}>Track</TableCell>
                        <TableCell align="center" sx={{ padding: "2px", width: "30px" }}>Sun</TableCell>
                        <TableCell align="center" sx={{ padding: "2px", width: "30px" }}>Mon</TableCell>
                        <TableCell align="center" sx={{ padding: "2px", width: "30px" }}>Tue</TableCell>
                        <TableCell align="center" sx={{ padding: "2px", width: "30px" }}>Wed</TableCell>
                        <TableCell align="center" sx={{ padding: "2px", width: "30px" }}>Thu</TableCell>
                        <TableCell align="center" sx={{ padding: "2px", width: "30px" }}>Fri</TableCell>
                        <TableCell align="center" sx={{ padding: "2px", width: "30px" }}>Sat</TableCell>
                        <TableCell sx={{ width: "auto" }}>%</TableCell>
                        <TableCell>Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((habit) => (
                        <TableRow key={habit.id}>
                            {/*habit name (text) */}
                            <TableCell>
                                <TextField
                                    value={habit.habit} variant="standard" size = "small"
                                    onChange={ (e) => {
                                        //used prevRows to automatically update the table without having to reload the page
                                        // without having problems with other updated portions (was orig not updating properly)
                                        setRows(prevRows =>
                                            prevRows.map(h =>
                                                h.id === habit.id ? { ...h, habit: e.target.value } : h));
                                    }}/>
                            </TableCell>

                            {/*habit type (select) choose from 5 different habit types. uses MUI Select/MenuItem*/}
                            <TableCell>
                                <Select
                                    value={habit.type} variant="outlined" size = "small"
                                    onChange={async (e) => {

                                        //needed this so it wouldn't have error when updating the table
                                        const newType = e.target.value as "Productivity"|"Health + Wellness"|"Household"|"Finance"|"Personal";

                                        await updateHabit(habit.id, undefined, undefined, newType);
                                        setRows(prevRows =>
                                            prevRows.map(h =>
                                                h.id === habit.id ? { ...h, type: newType } : h));
                                    }}>
                                    <MenuItem value="Productivity">Productivity</MenuItem>
                                    <MenuItem value="Health + Wellness">Health</MenuItem>
                                    <MenuItem value="Household">Household</MenuItem>
                                    <MenuItem value="Finance">Finance</MenuItem>
                                    <MenuItem value="Personal">Personal</MenuItem>
                                </Select>
                            </TableCell>

                            {/*habit tracking. 3 ways to track habits. uses MUI Select/MenuItem*/}
                            <TableCell>
                                <Select
                                    value={habit.tracking} variant="outlined" size = "small"
                                    onChange={async (e) => {
                                        const newTracking = e.target.value as "daily" | "weekly" | "bi-weekly";

                                        const updatedWeeklyCompleted = calcWeeklyCompleted({
                                            ...habit, tracking: newTracking,});

                                        await updateHabit(habit.id, undefined, newTracking, undefined, undefined, updatedWeeklyCompleted);

                                        setRows(prevRows =>
                                            prevRows.map(h =>
                                                h.id === habit.id ? { ...h, tracking: newTracking, weeklyCompleted: updatedWeeklyCompleted }
                                                    : h));
                                    }} >
                                    <MenuItem value="daily">Daily</MenuItem>
                                    <MenuItem value="weekly">Weekly</MenuItem>
                                    <MenuItem value="bi-weekly">Bi-weekly</MenuItem>
                                </Select>
                            </TableCell>

                            {/*Daily checkboxes, used to track completion of a habit for the week*/}
                            {/*maps through the days of the week so i can make all 7 without having to rewrite the code*/}
                            {(["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as Day[]).map((day) => (
                                <TableCell key={day} align="center" sx={{ padding: "2px", width: "30px" }}>
                                    <Checkbox
                                        checked={habit[day]}
                                        onChange={() => toggle(habit.id, day)}
                                    />
                                </TableCell>
                            ))}

                            {/*showcases the percentage of that habit completed for the week*/}
                            <TableCell sx={{ width: "30px" }}>{habit.weeklyCompleted}%</TableCell>

                            {/*looked up online how to only update this when user pressed enter instead of*/}
                            {/*after every keystroke*/}
                            {/*notes about the habit that users can add as they see fit*/}
                            <TableCell>
                                <TextField
                                    value={(habit.localNotes ?? habit.notes) || ""}
                                    variant="standard" multiline placeholder="add notes..." fullWidth
                                    onChange={(e) => {
                                        setRows(prevRows =>
                                            prevRows.map(h =>
                                                h.id === habit.id ? { ...h, localNotes: e.target.value } : h));
                                    }}
                                    onKeyDown={async (e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();

                                            const newHabit = habit.localHabits ?? habit.habit;
                                            const newNote = habit.localNotes ?? habit.notes;

                                            await updateHabit(habit.id, newHabit, undefined, undefined, newNote, undefined);

                                            setRows(prevRows =>
                                                prevRows.map(h =>
                                                    h.id === habit.id
                                                        ? {...h,
                                                            habit: newHabit, notes: newNote, localHabits: undefined,
                                                            localNotes: undefined} : h));
                                        }}}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}