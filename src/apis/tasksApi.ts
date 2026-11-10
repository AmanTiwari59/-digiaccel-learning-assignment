import { request } from './configs/request';
import { ITask, ITaskInput } from '../types/ITask';
import { ITaskFilter } from '../types/ITaskFilter';
import { IWeeklySummary } from '../types/IWeeklySummary';

/**
 * Domain API Client for Task Operations.
 * Interacts with Next.js REST API routes.
 */
export const tasksApi = {
  /**
   * Fetches tasks matching filter criteria (date, week, search, status, etc.).
   */
  getTasks: async (filters: ITaskFilter = {}): Promise<ITask[]> => {
    return request<ITask[]>({
      method: 'GET',
      apiPath: '/api/tasks',
      params: filters as Record<string, string | number | undefined>,
    });
  },

  /**
   * Retrieves a single task by ID.
   */
  getTaskById: async (id: string): Promise<ITask> => {
    return request<ITask>({
      method: 'GET',
      apiPath: `/api/tasks/${id}`,
    });
  },

  /**
   * Creates a new task.
   */
  createTask: async (payload: ITaskInput): Promise<ITask> => {
    return request<ITask>({
      method: 'POST',
      apiPath: '/api/tasks',
      body: payload,
    });
  },

  /**
   * Updates an existing task by ID.
   */
  updateTask: async (id: string, updates: Partial<ITask>): Promise<ITask> => {
    return request<ITask>({
      method: 'PUT',
      apiPath: `/api/tasks/${id}`,
      body: updates,
    });
  },

  /**
   * Deletes a task by ID.
   */
  deleteTask: async (id: string): Promise<{ success: boolean; id: string }> => {
    return request<{ success: boolean; id: string }>({
      method: 'DELETE',
      apiPath: `/api/tasks/${id}`,
    });
  },

  /**
   * Retrieves aggregated weekly summary metrics.
   */
  getWeeklyMetrics: async (weekNumber?: number, year?: number): Promise<IWeeklySummary> => {
    return request<IWeeklySummary>({
      method: 'GET',
      apiPath: '/api/metrics',
      params: { weekNumber, year },
    });
  },

  /**
   * Seeds demo tasks if database is empty.
   */
  seedDemoTasks: async (): Promise<{ message: string; count: number }> => {
    return request<{ message: string; count: number }>({
      method: 'POST',
      apiPath: '/api/seed',
    });
  },
};

export default tasksApi;
