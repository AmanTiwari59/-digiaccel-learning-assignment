import React from 'react';
import { cn } from '../../utils/classNames';

interface IWeeklyProgressBarProps {
  percentage: number;
  className?: string;
}

/**
 * Weekly Progress Bar Component.
 * Displays "Weekly Progress" label with smooth completion filling.
 */
export const WeeklyProgressBar: React.FC<IWeeklyProgressBarProps> = ({
  percentage,
  className,
}) => {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <div className={cn('flex flex-col gap-2 my-2', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 tracking-tight">Weekly Progress</h3>
        <span className="text-xs font-semibold text-[#5B36F4]">{clamped}%</span>
      </div>
      <div className="w-full h-3 bg-[#E9E2FF] rounded-full overflow-hidden p-0.5">
        <div
          className="h-full bg-[#5B36F4] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export default WeeklyProgressBar;
