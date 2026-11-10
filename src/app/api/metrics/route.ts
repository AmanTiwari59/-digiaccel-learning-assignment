import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Task from '../../../models/Task';
import { TaskStatusEnum } from '../../../enums/TaskStatusEnum';
import { getISOWeekInfo, getWeekDates, formatDateKey } from '../../../utils/date/getWeekRange';
import { IWeeklySummary } from '../../../types/IWeeklySummary';

export const dynamic = 'force-dynamic';


/**
 * GET /api/metrics
 * Returns weekly task metrics for the given weekNumber & year (or current week).
 */
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const weekParam = searchParams.get('weekNumber');
    const yearParam = searchParams.get('year');

    const now = new Date();
    const currentWeekInfo = getISOWeekInfo(now);

    const weekNumber = weekParam ? Number(weekParam) : currentWeekInfo.weekNumber;
    const year = yearParam ? Number(yearParam) : currentWeekInfo.year;

    // Retrieve tasks for this week
    const weeklyTasks = await Task.find({ weekNumber, year });

    const totalTasks = weeklyTasks.length;
    const completedTasks = weeklyTasks.filter(
      (t) => t.status === TaskStatusEnum.COMPLETED
    ).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionPercentage =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const weekDates = getWeekDates(now);
    const startDate = formatDateKey(weekDates[0]);
    const endDate = formatDateKey(weekDates[6]);

    const summary: IWeeklySummary = {
      weekNumber,
      year,
      startDate,
      endDate,
      totalTasks,
      completedTasks,
      pendingTasks,
      completionPercentage,
    };

    return NextResponse.json(summary);
  } catch (error: any) {
    console.error('Error fetching weekly metrics:', error);
    return NextResponse.json(
      { message: error?.message || 'Failed to calculate weekly metrics' },
      { status: 500 }
    );
  }
}
