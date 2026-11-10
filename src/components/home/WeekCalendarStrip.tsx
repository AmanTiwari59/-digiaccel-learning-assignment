import React from 'react';
import { getWeekDates, formatDateKey } from '../../utils/date/getWeekRange';
import { WEEK_DAYS } from '../../constants/dateConstants';
import { cn } from '../../utils/classNames';

interface IWeekCalendarStripProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
  referenceDate?: Date;
}

/**
 * Week Calendar Strip Component.
 * Displays Monday through Sunday per specifications.
 * Active day is highlighted in a vibrant purple pill with indicator dot.
 */
export const WeekCalendarStrip: React.FC<IWeekCalendarStripProps> = ({
  selectedDate,
  onSelectDate,
  referenceDate = new Date(),
}) => {
  const weekDates = getWeekDates(referenceDate);

  return (
    <div className="flex items-center justify-between gap-1 px-1 py-3 overflow-x-auto no-scrollbar">
      {weekDates.map((date) => {
        const dateKey = formatDateKey(date);
        const isSelected = dateKey === selectedDate;
        // Map day 0-6 to Mon-Sun
        const dayIndex = (date.getDay() + 6) % 7;
        const dayLabel = WEEK_DAYS[dayIndex];
        const dayNumber = String(date.getDate()).padStart(2, '0');

        return (
          <button
            key={dateKey}
            type="button"
            onClick={() => onSelectDate(dateKey)}
            className={cn(
              'flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl min-w-[46px] transition-all duration-150 cursor-pointer',
              isSelected
                ? 'bg-[#5B36F4] text-white shadow-md shadow-[#5B36F4]/30 scale-105'
                : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <span
              className={cn(
                'text-[11px] font-medium tracking-tight mb-1',
                isSelected ? 'text-white/80' : 'text-gray-400'
              )}
            >
              {dayLabel}
            </span>
            <span
              className={cn(
                'text-sm font-bold',
                isSelected ? 'text-white' : 'text-gray-700'
              )}
            >
              {dayNumber}
            </span>
            {isSelected && (
              <span className="w-1.5 h-1.5 bg-white rounded-full mt-1 animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default WeekCalendarStrip;
