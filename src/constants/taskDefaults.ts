import { TaskPriorityEnum } from '../enums/TaskPriorityEnum';
import { TaskStatusEnum } from '../enums/TaskStatusEnum';
import { ITaskInput } from '../types/ITask';

/**
 * Default empty task input state for modal initialization.
 */
export const DEFAULT_TASK_INPUT: ITaskInput = {
  title: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  startTime: '09:00',
  endTime: '10:00',
  priority: TaskPriorityEnum.MEDIUM,
  status: TaskStatusEnum.PENDING,
};

export default DEFAULT_TASK_INPUT;
