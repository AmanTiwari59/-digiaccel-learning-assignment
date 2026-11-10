import { ITask } from '../types/ITask';
import { IWeeklySummary } from '../types/IWeeklySummary';
import { TaskStatusEnum } from '../enums/TaskStatusEnum';
import { getISOWeekInfo, getWeekDates, formatDateKey } from './date/getWeekRange';

/**
 * Computes weekly task statistics: total, completed, pending, and percentage.
 *
 * @param tasks - Array of tasks for the week
 * @param refDate - Reference date to determine the target week
 * @returns Computed IWeeklySummary object
 */
export function calculateWeeklyStats(tasks: ITask[], refDate: Date = new Date()): IWeeklySummary {
  const { weekNumber, year } = getISOWeekInfo(refDate);
  const weekDates = getWeekDates(refDate);
  const startDate = formatDateKey(weekDates[0]);
  const endDate = formatDateKey(weekDates[6]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === TaskStatusEnum.COMPLETED).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return {
    weekNumber,
    year,
    startDate,
    endDate,
    totalTasks,
    completedTasks,
    pendingTasks,
    completionPercentage,
  };
}

export default calculateWeeklyStats;
