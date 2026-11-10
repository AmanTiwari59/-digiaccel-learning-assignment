import { useState, useEffect, useCallback } from 'react';
import { ITask, ITaskInput } from '../types/ITask';
import { ITaskFilter } from '../types/ITaskFilter';
import { TaskStatusEnum } from '../enums/TaskStatusEnum';
import { tasksApi } from '../apis/tasksApi';

/**
 * Custom hook to manage task state, CRUD operations, and optimistic updates.
 * Decouples network logic and local state from UI components.
 */
export function useTasks(initialFilter: ITaskFilter = {}, onTasksMutated?: () => void) {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tasksApi.getTasks(initialFilter);
      setTasks(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(initialFilter)]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /**
   * Optimistically toggles task status between COMPLETED and PENDING.
   */
  const toggleTaskStatus = async (task: ITask) => {
    const nextStatus =
      task.status === TaskStatusEnum.COMPLETED
        ? TaskStatusEnum.PENDING
        : TaskStatusEnum.COMPLETED;

    // Optimistic state update
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, status: nextStatus } : t))
    );

    try {
      await tasksApi.updateTask(task._id!, { status: nextStatus });
      onTasksMutated?.();
    } catch {
      // Revert optimistic update on failure
      fetchTasks();
    }
  };

  /**
   * Creates a new task and updates list.
   */
  const addTask = async (payload: ITaskInput): Promise<ITask> => {
    const created = await tasksApi.createTask(payload);
    setTasks((prev) => [created, ...prev]);
    onTasksMutated?.();
    return created;
  };

  /**
   * Edits an existing task and updates list.
   */
  const editTask = async (id: string, updates: Partial<ITask>): Promise<ITask> => {
    const updated = await tasksApi.updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    onTasksMutated?.();
    return updated;
  };

  /**
   * Deletes a task by ID.
   */
  const removeTask = async (id: string): Promise<void> => {
    // Optimistic removal
    setTasks((prev) => prev.filter((t) => t._id !== id));
    try {
      await tasksApi.deleteTask(id);
      onTasksMutated?.();
    } catch {
      fetchTasks();
    }
  };

  return {
    tasks,
    loading,
    error,
    refreshTasks: fetchTasks,
    toggleTaskStatus,
    addTask,
    editTask,
    removeTask,
  };
}

export default useTasks;
