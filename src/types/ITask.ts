import { TaskPriorityEnum } from '../enums/TaskPriorityEnum';
import { TaskStatusEnum } from '../enums/TaskStatusEnum';

/**
 * Interface representing a task entity.
 * Stores scheduling, status, priority, and weekly bucket metadata.
 */
export interface ITask {
  _id?: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  startTime?: string; // HH:mm (e.g. "09:00")
  endTime?: string; // HH:mm (e.g. "10:30")
  priority: TaskPriorityEnum;
  status: TaskStatusEnum;
  weekNumber: number; // ISO Week 1-53 (Monday to Sunday)
  year: number; // ISO Year
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Interface for task creation and update payloads.
 */
export interface ITaskInput {
  title: string;
  description?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  priority?: TaskPriorityEnum;
  status?: TaskStatusEnum;
}

export default ITask;
