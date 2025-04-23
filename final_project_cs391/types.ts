export type NoteType = {
    note: string,
    id: number,
}

export type NumNotes = {
    max?: number,
}

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

//stored weekly habit table to post previous weeks completion
export type ArchiveProps = {
    weekStart: string;
    weekEnd: string;
    habits: HabitProps[];
};