//author: Leigh Brown
//calculates a habits weekly completion based on the amount of days marked complete
//and the habit's tracking type
import { HabitProps } from "@/types";
import { Day } from "@/types";

const d: Day[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];


export default function calcWeeklyCompleted(habit: HabitProps): number {

    const completed = d.filter((day) => habit[day]).length;

    if (habit.tracking === "daily") {
        return Math.round((completed / 7) * 100);

    } else if (habit.tracking === "weekly") {
        return completed >= 1 ? 100 : 0;

    } else if (habit.tracking === "bi-weekly") {
        if (completed === 1) {
            return 50;
        } else if (completed >= 2) {
            return 100;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}
