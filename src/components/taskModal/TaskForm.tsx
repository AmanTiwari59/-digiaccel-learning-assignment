import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { ITask, ITaskInput } from '../../types/ITask';
import { TaskPriorityEnum } from '../../enums/TaskPriorityEnum';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { cn } from '../../utils/classNames';

interface ITaskFormProps {
  initialValues?: Partial<ITask>;
  onSubmit: (values: ITaskInput) => Promise<void>;
  onCancel: () => void;
  isEditMode?: boolean;
}

/**
 * Task Creation & Edit Form Component.
 * Faithfully mirrors the layout and field styling of Figma Screen 3.
 */
export const TaskForm: React.FC<ITaskFormProps> = ({
  initialValues,
  onSubmit,
  isEditMode = false,
}) => {
  const [title, setTitle] = useState<string>(initialValues?.title || '');
  const [description, setDescription] = useState<string>(initialValues?.description || '');
  const [date, setDate] = useState<string>(
    initialValues?.date || new Date().toISOString().split('T')[0]
  );
  const [startTime, setStartTime] = useState<string>(initialValues?.startTime || '09:00');
  const [endTime, setEndTime] = useState<string>(initialValues?.endTime || '10:00');
  const [priority, setPriority] = useState<TaskPriorityEnum>(
    initialValues?.priority || TaskPriorityEnum.MEDIUM
  );

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is mandatory');
      return;
    }
    if (!date) {
      setError('Date is mandatory');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        date,
        startTime,
        endTime,
        priority,
      });
    } catch (err: any) {
      setError(err?.message || 'Failed to save task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="bg-red-50 text-red-600 text-xs px-3.5 py-2.5 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* Task Title */}
      <Input
        label="Task title"
        placeholder="Doing Homework"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Set Time: Start & Ends */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-700 tracking-wide">Set Time</label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="time"
            leadingIcon={<Clock className="w-4 h-4" />}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            type="time"
            leadingIcon={<Clock className="w-4 h-4" />}
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      {/* Set Date */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-700 tracking-wide">Set Date</label>
        <Input
          type="date"
          leadingIcon={<Calendar className="w-4 h-4" />}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      {/* Priority Selector */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-700 tracking-wide">Priority</label>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { level: TaskPriorityEnum.LOW, label: 'Low' },
              { level: TaskPriorityEnum.MEDIUM, label: 'Medium' },
              { level: TaskPriorityEnum.HIGH, label: 'High' },
            ] as const
          ).map(({ level, label }) => {
            const isSelected = priority === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => setPriority(level)}
                className={cn(
                  'h-10 rounded-xl text-xs font-bold border transition-all cursor-pointer',
                  isSelected
                    ? 'bg-[#5B36F4] text-white border-[#5B36F4] shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-700 tracking-wide">Description</label>
        <textarea
          rows={3}
          placeholder="Add Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white text-gray-900 text-sm rounded-xl border border-gray-200 p-3.5 outline-none placeholder:text-gray-400 focus:border-[#5B36F4] focus:ring-2 focus:ring-[#5B36F4]/15 resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={submitting}
          className="rounded-2xl shadow-lg shadow-[#5B36F4]/25"
        >
          {isEditMode ? 'Save changes' : 'Create task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
