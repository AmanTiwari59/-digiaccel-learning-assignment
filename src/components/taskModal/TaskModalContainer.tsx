import React from 'react';
import { BottomSheet } from '../common/BottomSheet';
import { TaskForm } from './TaskForm';
import { ITask, ITaskInput } from '../../types/ITask';

interface ITaskModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: ITask | null;
  defaultDate?: string;
  onSaveTask: (values: ITaskInput) => Promise<void>;
}

/**
 * Task Modal Container Component.
 * Integrates BottomSheet presentation with TaskForm handling.
 */
export const TaskModalContainer: React.FC<ITaskModalContainerProps> = ({
  isOpen,
  onClose,
  taskToEdit,
  defaultDate,
  onSaveTask,
}) => {
  const isEditMode = Boolean(taskToEdit);
  const title = isEditMode ? 'Edit Task' : 'Add New Task';

  const initialValues: Partial<ITask> = taskToEdit || {
    date: defaultDate || new Date().toISOString().split('T')[0],
  };

  const handleSubmit = async (values: ITaskInput) => {
    await onSaveTask(values);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={title}>
      <TaskForm
        key={taskToEdit?._id || 'new-task'}
        initialValues={initialValues}
        isEditMode={isEditMode}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </BottomSheet>
  );
};

export default TaskModalContainer;
