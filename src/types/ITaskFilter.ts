import { TaskPriorityEnum } from '../enums/TaskPriorityEnum';
import { TaskStatusEnum } from '../enums/TaskStatusEnum';

/**
 * Interface representing query filters for retrieving tasks.
 */
export interface ITaskFilter {
  date?: string; // YYYY-MM-DD
  weekNumber?: number;
  year?: number;
  status?: TaskStatusEnum;
  priority?: TaskPriorityEnum;
  search?: string;
}

export default ITaskFilter;
