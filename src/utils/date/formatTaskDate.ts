import { MONTH_NAMES } from '../../constants/dateConstants';

/**
 * Formats a date string (YYYY-MM-DD) into user-friendly display format.
 * Example: "Friday 14, January" (matching Figma Screen 3).
 *
 * @param dateStr - Date string in YYYY-MM-DD or ISO string
 * @returns Formatted human-readable date
 */
export function formatTaskDate(dateStr: string): string {
  if (!dateStr) return '';
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const date = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));

  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];

  return `${dayName} ${day}, ${month}`;
}

/**
 * Formats time range for task display (e.g., "09:00 AM - 10:30 AM").
 */
export function formatTimeRange(startTime?: string, endTime?: string): string {
  if (!startTime) return '';
  if (!endTime) return startTime;
  return `${startTime} - ${endTime}`;
}

export default { formatTaskDate, formatTimeRange };
