/**
 * Date and Weekday constants.
 * Per specification: Weeks begin on Monday and conclude on Sunday.
 */
export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export default { WEEK_DAYS, MONTH_NAMES };
