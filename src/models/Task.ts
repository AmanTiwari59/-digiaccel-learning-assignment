import mongoose, { Schema, Model } from 'mongoose';
import { ITask } from '../types/ITask';
import { TaskPriorityEnum } from '../enums/TaskPriorityEnum';
import { TaskStatusEnum } from '../enums/TaskStatusEnum';
import { getISOWeekInfo } from '../utils/date/getWeekRange';

export type ITaskDocument = mongoose.Document &
  Omit<ITask, '_id'> & {
    _id: mongoose.Types.ObjectId;
  };

const TaskSchema: Schema<ITaskDocument> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is mandatory'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    date: {
      type: String,
      required: [true, 'Task date is mandatory (YYYY-MM-DD)'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be formatted as YYYY-MM-DD'],
    },
    startTime: {
      type: String,
      trim: true,
      default: '09:00',
    },
    endTime: {
      type: String,
      trim: true,
      default: '10:00',
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriorityEnum),
      default: TaskPriorityEnum.MEDIUM,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatusEnum),
      default: TaskStatusEnum.PENDING,
    },
    weekNumber: {
      type: Number,
      required: true,
      index: true,
    },
    year: {
      type: Number,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-validation hook:
 * Automatically computes and sets ISO weekNumber and year from the task date.
 */
TaskSchema.pre('validate', function (next) {
  if (this.date) {
    const [yearStr, monthStr, dayStr] = this.date.split('-');
    const taskDate = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
    const { weekNumber, year } = getISOWeekInfo(taskDate);
    this.weekNumber = weekNumber;
    this.year = year;
  }
  next();
});

// Compound index for querying tasks by week and status
TaskSchema.index({ year: 1, weekNumber: 1, status: 1 });
TaskSchema.index({ title: 'text', description: 'text' });

const Task: Model<ITaskDocument> =
  mongoose.models.Task || mongoose.model<ITaskDocument>('Task', TaskSchema);

export default Task;
