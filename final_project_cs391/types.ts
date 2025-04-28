// Author: Ajani Hickling
// Description: NoteType has types for note text, date, ID for mapping and ID for mongoDB storage
export type NoteType = {
    // _id?: string;
    note: string,
    id?: number,
    date?: string,
}

// Author: Ajani Hickling
// Description: NumNotes has optional maximum value. This type can be used to vary the number of notes displayed,
// depending on where the Notes component is displayed
export type NumNotes = {
    max?: number,
}

//author: Arooj Kamran
// props used for todo list
export type Task = {
    id: number;
    text: string;
    dueDate?: string;
    completed: boolean;
  };


//author: Leigh Brown
//props used for habit tracker table
export type HType = //different types of habits user can track
    "Health + Wellness" |
    "Household" |
    "Finance" |
    "Personal" |
    "Productivity";

export type HTrack = //different ways user can track habits
    "daily" |
    "weekly" |
    "bi-weekly";

//needed for the checkbox completion and updating table/mongodb accordingly
export type Day = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

//each habit that is being tracked
export type HabitProps = {
    id: number;
    habit: string;
    type: HType;
    tracking: HTrack;
    notes?: string;
    sun: boolean;
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    weeklyCompleted: number;
}

//stored weekly habit table to post previous weeks completion
export type ArchiveProps = {
    weekStart: string;
    weekEnd: string;
    habits: HabitProps[];
};