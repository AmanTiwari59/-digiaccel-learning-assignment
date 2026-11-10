/**
 * Interface representing aggregated statistics for a given week.
 * Matches the summary cards and progress bar on the Home screen.
 */
export interface IWeeklySummary {
  weekNumber: number;
  year: number;
  startDate: string; // Monday YYYY-MM-DD
  endDate: string; // Sunday YYYY-MM-DD
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionPercentage: number; // 0 - 100
}

export default IWeeklySummary;
