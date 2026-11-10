import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Task from '../../../models/Task';
import { getISOWeekInfo } from '../../../utils/date/getWeekRange';

export const dynamic = 'force-dynamic';


/**
 * GET /api/tasks
 * Retrieves tasks based on optional filters:
 * - date (YYYY-MM-DD)
 * - weekNumber (1-53)
 * - year
 * - status (pending | completed | in_progress)
 * - search (keyword search in title/description)
 */
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const weekNumber = searchParams.get('weekNumber');
    const year = searchParams.get('year');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const filter: Record<string, any> = {};

    if (date) {
      filter.date = date;
    }
    if (weekNumber) {
      filter.weekNumber = Number(weekNumber);
    }
    if (year) {
      filter.year = Number(year);
    }
    if (status) {
      filter.status = status;
    }
    if (search && search.trim() !== '') {
      filter.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    const tasks = await Task.find(filter).sort({ date: 1, startTime: 1, createdAt: -1 });

    return NextResponse.json(tasks);
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { message: error?.message || 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks
 * Creates a new task.
 * Requires: title, date (YYYY-MM-DD)
 */
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { title, description, date, startTime, endTime, priority, status } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ message: 'Title is mandatory' }, { status: 400 });
    }

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { message: 'Valid date is mandatory (YYYY-MM-DD)' },
        { status: 400 }
      );
    }

    const [yearStr, monthStr, dayStr] = date.split('-');
    const taskDate = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
    const { weekNumber, year } = getISOWeekInfo(taskDate);

    const newTask = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      date,
      startTime: startTime || '09:00',
      endTime: endTime || '10:00',
      priority: priority || 'medium',
      status: status || 'pending',
      weekNumber,
      year,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error: any) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { message: error?.message || 'Failed to create task' },
      { status: 500 }
    );
  }
}
