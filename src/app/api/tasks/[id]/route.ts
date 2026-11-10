import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import Task from '../../../../models/Task';
import { getISOWeekInfo } from '../../../../utils/date/getWeekRange';

export const dynamic = 'force-dynamic';


interface IParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/tasks/[id]
 * Retrieves a single task by ID.
 */
export async function GET(_request: NextRequest, { params }: IParams) {
  try {
    await connectToDatabase();
    const task = await Task.findById(params.id);

    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || 'Failed to retrieve task' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/tasks/[id]
 * Updates attributes or status of a task.
 */
export async function PUT(request: NextRequest, { params }: IParams) {
  try {
    await connectToDatabase();
    const updates = await request.json();

    // If date changed, re-calculate ISO weekNumber and year
    if (updates.date && /^\d{4}-\d{2}-\d{2}$/.test(updates.date)) {
      const [yearStr, monthStr, dayStr] = updates.date.split('-');
      const taskDate = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
      const { weekNumber, year } = getISOWeekInfo(taskDate);
      updates.weekNumber = weekNumber;
      updates.year = year;
    }

    const updatedTask = await Task.findByIdAndUpdate(params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || 'Failed to update task' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tasks/[id]
 * Deletes a task by ID.
 */
export async function DELETE(_request: NextRequest, { params }: IParams) {
  try {
    await connectToDatabase();
    const deletedTask = await Task.findByIdAndDelete(params.id);

    if (!deletedTask) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: params.id });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || 'Failed to delete task' },
      { status: 500 }
    );
  }
}
