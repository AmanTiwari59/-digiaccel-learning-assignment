/**
 * Returns the ISO week number (1-53) and year for a given date.
 * ISO weeks start on Monday.
 *
 * @param date - Target JavaScript Date
 * @returns Object with weekNumber (1-53) and year
 */
export function getISOWeekInfo(date: Date = new Date()): { weekNumber: number; year: number } {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Day of week in ISO: Monday is 1, Sunday is 7
  const dayNr = (target.getUTCDay() + 6) % 7 + 1;
  target.setUTCDate(target.getUTCDate() - dayNr + 4);
  const firstThursday = target.valueOf();
  target.setUTCMonth(0, 1);
  if (target.getUTCDay() !== 4) {
    target.setUTCMonth(0, 1 + ((4 - target.getUTCDay() + 7) % 7));
  }
  const weekNumber = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  const year = new Date(firstThursday).getUTCFullYear();
  return { weekNumber, year };
}

/**
 * Returns the 7 days (Monday to Sunday) for the week containing the given reference date.
 *
 * @param refDate - Any date within the desired week
 * @returns Array of 7 Date objects starting from Monday through Sunday
 */
export function getWeekDates(refDate: Date = new Date()): Date[] {
  const date = new Date(refDate);
  // Calculate day offset to Monday (where Monday = 0, Sunday = 6)
  const day = (date.getDay() + 6) % 7;
  const monday = new Date(date);
  monday.setDate(date.getDate() - day);
  monday.setHours(0, 0, 0, 0);

  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(monday);
    currentDay.setDate(monday.getDate() + i);
    week.push(currentDay);
  }
  return week;
}

/**
 * Formats a Date object to YYYY-MM-DD string.
 */
export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default { getISOWeekInfo, getWeekDates, formatDateKey };
