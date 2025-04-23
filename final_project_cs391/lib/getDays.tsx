//author: Leigh Brown
//needed for the archiving of the weeks habit tracker. gets the start and end of last week's
//habit table so the corresponding dates can be displayed in the archive page

export function getLastSunday(date: Date): string {
    const sunday = new Date(date);
    sunday.setDate(sunday.getDate() - 7);
    sunday.setHours(0, 0, 0, 0); //needed to prevent more than one archive of the week
    return sunday.toISOString();
}

export function getLastSaturday(date: Date): string {
    const saturday = new Date(date);
    saturday.setDate(saturday.getDate() - 1);
    saturday.setHours(23, 59, 59, 999);
    return saturday.toISOString();
}