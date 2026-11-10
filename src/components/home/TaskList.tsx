import React from 'react';
import { ITask } from '../../types/ITask';
import { TaskItem } from './TaskItem';
import { formatTaskDate } from '../../utils/date/formatTaskDate';

interface ITaskListProps {
  tasks: ITask[];
  loading: boolean;
  selectedDate: string;
  isViewingAll: boolean;
  onToggleViewAll: () => void;
  onToggleStatus: (task: ITask) => void;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
}

/**
 * Task List Container Component.
 * Handles task grouping, "View All" toggle, loading spinners, and empty states.
 */
export const TaskList: React.FC<ITaskListProps> = ({
  tasks,
  loading,
  selectedDate,
  isViewingAll,
  onToggleViewAll,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  const headerTitle = isViewingAll ? 'All Weekly Tasks' : 'Tasks Today';

  return (
    <div className="flex flex-col mt-4 mb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">{headerTitle}</h2>
          {!isViewingAll && (
            <p className="text-xs text-gray-400 font-medium">
              {formatTaskDate(selectedDate)}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onToggleViewAll}
          className="text-xs font-semibold text-[#5B36F4] hover:underline cursor-pointer"
        >
          {isViewingAll ? 'Show Today' : 'View All'}
        </button>
      </div>

      {/* Task List / State views */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div className="w-8 h-8 border-3 border-[#5B36F4] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-gray-400 font-medium">Loading tasks...</span>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-gray-200 rounded-3xl my-2">
          <span className="text-3xl mb-2">🎉</span>
          <h4 className="text-sm font-bold text-gray-800">No Tasks Found</h4>
          <p className="text-xs text-gray-400 max-w-xs mt-1">
            Tap the &quot;+&quot; button below to add your first task for this day!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
