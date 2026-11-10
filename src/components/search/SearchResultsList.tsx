import React from 'react';
import { ITask } from '../../types/ITask';
import { TaskItem } from '../home/TaskItem';

interface ISearchResultsListProps {
  tasks: ITask[];
  loading: boolean;
  query: string;
  onToggleStatus: (task: ITask) => void;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
}

/**
 * Search Results List Component.
 * Renders filtered task results with interactive actions.
 */
export const SearchResultsList: React.FC<ISearchResultsListProps> = ({
  tasks,
  loading,
  query,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="w-8 h-8 border-3 border-[#5B36F4] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-gray-400 font-medium">Searching tasks...</span>
      </div>
    );
  }

  if (query.trim() === '') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
        <span className="text-3xl mb-2">🔍</span>
        <p className="text-sm font-medium">Type keywords above to find tasks</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
        <span className="text-3xl mb-2">🍃</span>
        <h4 className="text-sm font-bold text-gray-700">No results found</h4>
        <p className="text-xs text-gray-400 mt-1">
          No tasks matched &quot;{query}&quot;. Try different keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-3">
      <span className="text-xs font-semibold text-gray-400 mb-2">
        Found {tasks.length} task{tasks.length > 1 ? 's' : ''}
      </span>
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
    </div>
  );
};

export default SearchResultsList;
