export type NoteType = {
    _id?: string;
    note: string,
    id: number,
    date?: string,
}

export type Task = {
    _id: string;
    text: string;
    dueDate?: string;
    completed: boolean;
  };

export type NumNotes = {
    max?: number,
}


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