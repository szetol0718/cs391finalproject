<<<<<<< HEAD
// Notes types -- Ajani Hickling
// NoteType is designated type for Notes component
export type NoteType = {
    note: string,
    id: number,
}

// NumNotes type contains prop for an optional max number of notes to enter or display
export type NumNotes = {
    max?: number,
}

// individual habits
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

//needed for the checkbox completion
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

=======
types.ts:

//individual habits
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

//needed for the checkbox completion
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

>>>>>>> 8a1e398 (arooj)
//stored weekly habit table to post previous weeks completion
export type ArchiveProps = {
    weekStart: string;
    weekEnd: string;
    habits: HabitProps[];
<<<<<<< HEAD
}
=======
};
>>>>>>> 8a1e398 (arooj)
