import React from 'react';
import { Trash2, Edit3 } from 'lucide-react';
import { ITask } from '../../types/ITask';
import { TaskStatusEnum } from '../../enums/TaskStatusEnum';
import { TaskPriorityEnum } from '../../enums/TaskPriorityEnum';
import { CheckBox } from '../common/CheckBox';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import { cn } from '../../utils/classNames';

interface ITaskItemProps {
  task: ITask;
  onToggleStatus: (task: ITask) => void;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
}

/**
 * Task Item Row Component.
 * Supports checkbox status toggle, swipe-to-delete, inline edit, and priority styling.
 */
export const TaskItem: React.FC<ITaskItemProps> = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  const isCompleted = task.status === TaskStatusEnum.COMPLETED;
  const { offset, onTouchStart, onTouchMove, onTouchEnd, closeSwipe } = useSwipeGesture({
    threshold: 40,
    maxOffset: 80,
  });

  const priorityStyles = {
    [TaskPriorityEnum.LOW]: 'bg-green-50 text-green-700 border-green-200',
    [TaskPriorityEnum.MEDIUM]: 'bg-amber-50 text-amber-700 border-amber-200',
    [TaskPriorityEnum.HIGH]: 'bg-red-50 text-red-600 border-red-200',
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeSwipe();
    if (task._id) {
      onDelete(task._id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(task);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl my-2 select-none">
      {/* Background Action: Red Delete Button revealed on swipe */}
      <div className="absolute inset-y-0 right-0 w-20 bg-[#FF5B5B] flex items-center justify-center rounded-r-2xl">
        <button
          type="button"
          onClick={handleDelete}
          className="text-white text-xs font-bold flex flex-col items-center gap-1 p-2"
        >
          <Trash2 className="w-5 h-5" />
          <span>Delete</span>
        </button>
      </div>

      {/* Foreground Task Card */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ transform: `translateX(${offset}px)` }}
        className={cn(
          'relative bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between transition-transform duration-100 ease-out shadow-[0_2px_8px_rgba(0,0,0,0.03)]',
          isCompleted && 'bg-gray-50/70 border-gray-100'
        )}
      >
        {/* Left: Checkbox & Title */}
        <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-2">
          <CheckBox
            checked={isCompleted}
            onChange={() => onToggleStatus(task)}
            id={`task-check-${task._id}`}
          />
          <div className="flex flex-col min-w-0">
            <span
              className={cn(
                'text-sm font-semibold tracking-tight text-gray-900 truncate transition-all',
                isCompleted && 'line-through text-gray-400 font-normal'
              )}
            >
              {task.title}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              {task.startTime && (
                <span className="text-[11px] text-gray-400 font-medium">
                  {task.startTime}
                  {task.endTime ? ` - ${task.endTime}` : ''}
                </span>
              )}
              {task.priority && (
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-md font-semibold border capitalize',
                    priorityStyles[task.priority] || priorityStyles[TaskPriorityEnum.MEDIUM]
                  )}
                >
                  {task.priority}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions (Trash & Edit) */}
        <div className="flex items-center gap-1 shrink-0 text-gray-300">
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Delete Task"
            className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleEdit}
            aria-label="Edit Task"
            className="p-1.5 text-gray-300 hover:text-[#5B36F4] hover:bg-[#F4F0FF] rounded-lg transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
