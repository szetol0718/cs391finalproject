//author: Leigh Brown
//needed for the archiving of the weeks habit tracker. gets the start and end of last week's
//habit table so the corresponding dates can be displayed in the archive page

export function getLastSunday(date: Date): string {
    const sunday = new Date(date);
    const day = sunday.getDay();
    const diff = day === 0 ? 7 : day;
    sunday.setDate(sunday.getDate() - diff); //sets the date of sunday based on what day of the week it is
    sunday.setHours(0, 0, 0, 0); //needed to prevent more than one archive of the week
    return sunday.toISOString();
}

export function getLastSaturday(date: Date): string {
    const saturday = new Date(getLastSunday(date)); //uses the getLastSunday component to make it easier to find sat
    saturday.setDate(saturday.getDate() + 6);
    saturday.setHours(23, 59, 59, 999);
    return saturday.toISOString();
}