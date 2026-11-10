import React from 'react';
import { CheckSquare, XSquare } from 'lucide-react';
import { IWeeklySummary } from '../../types/IWeeklySummary';
import { TaskStatusEnum } from '../../enums/TaskStatusEnum';
import { cn } from '../../utils/classNames';

interface IMetricCardsProps {
  metrics: IWeeklySummary | null;
  activeStatusFilter?: TaskStatusEnum | null;
  onSelectStatusFilter?: (status: TaskStatusEnum | null) => void;
}

/**
 * Metric Cards Component.
 * Displays "Task Complete" and "Task Pending" weekly count summaries
 * matching the Figma visual language.
 */
export const MetricCards: React.FC<IMetricCardsProps> = ({
  metrics,
  activeStatusFilter,
  onSelectStatusFilter,
}) => {
  const completed = metrics?.completedTasks ?? 0;
  const pending = metrics?.pendingTasks ?? 0;

  const isCompletedActive = activeStatusFilter === TaskStatusEnum.COMPLETED;
  const isPendingActive = activeStatusFilter === TaskStatusEnum.PENDING;

  const handleToggle = (status: TaskStatusEnum) => {
    if (!onSelectStatusFilter) return;
    if (activeStatusFilter === status) {
      onSelectStatusFilter(null); // Clear filter
    } else {
      onSelectStatusFilter(status);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3.5 my-3">
      {/* Completed Card */}
      <div
        onClick={() => handleToggle(TaskStatusEnum.COMPLETED)}
        className={cn(
          'bg-[#F0EEFF] rounded-2xl p-4 flex flex-col justify-between transition-all duration-150 cursor-pointer border border-[#E0D8FF] hover:shadow-sm',
          isCompletedActive && 'ring-2 ring-[#5B36F4] shadow-md'
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-[#5B36F4]/10 text-[#5B36F4] flex items-center justify-center">
            <CheckSquare className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-gray-700">Task Complete</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-gray-900 tracking-tight">
            {String(completed).padStart(2, '0')}
          </span>
          <span className="text-[11px] font-medium text-gray-500">This Week</span>
        </div>
      </div>

      {/* Pending Card */}
      <div
        onClick={() => handleToggle(TaskStatusEnum.PENDING)}
        className={cn(
          'bg-[#FFEAEA] rounded-2xl p-4 flex flex-col justify-between transition-all duration-150 cursor-pointer border border-[#FFD5D5] hover:shadow-sm',
          isPendingActive && 'ring-2 ring-[#FF5B5B] shadow-md'
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-[#FF5B5B]/10 text-[#FF5B5B] flex items-center justify-center">
            <XSquare className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-gray-700">Task Pending</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-gray-900 tracking-tight">
            {String(pending).padStart(2, '0')}
          </span>
          <span className="text-[11px] font-medium text-gray-500">This Week</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCards;
