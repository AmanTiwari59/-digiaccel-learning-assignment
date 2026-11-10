import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Task from '../../../models/Task';
import { TaskPriorityEnum } from '../../../enums/TaskPriorityEnum';
import { TaskStatusEnum } from '../../../enums/TaskStatusEnum';
import { getISOWeekInfo, formatDateKey } from '../../../utils/date/getWeekRange';

export const dynamic = 'force-dynamic';


/**
 * POST /api/seed
 * Populates database with sample tasks matching the Figma design.
 */
export async function POST() {
  try {
    await connectToDatabase();

    const today = new Date();
    const todayStr = formatDateKey(today);
    const { weekNumber, year } = getISOWeekInfo(today);

    // Initial tasks directly matching Figma mockup
    const demoTasks = [
      {
        title: 'Finishing Wireframe',
        description: 'Complete UI layout and screen flows in Figma for client review',
        date: todayStr,
        startTime: '09:00',
        endTime: '11:30',
        priority: TaskPriorityEnum.HIGH,
        status: TaskStatusEnum.PENDING,
        weekNumber,
        year,
      },
      {
        title: 'Meeting with team',
        description: 'Sprint planning and task allocation sync',
        date: todayStr,
        startTime: '11:45',
        endTime: '12:30',
        priority: TaskPriorityEnum.MEDIUM,
        status: TaskStatusEnum.PENDING,
        weekNumber,
        year,
      },
      {
        title: 'Buy a cat food',
        description: 'Pick up dry food and treats from supermarket',
        date: todayStr,
        startTime: '16:00',
        endTime: '16:45',
        priority: TaskPriorityEnum.LOW,
        status: TaskStatusEnum.COMPLETED,
        weekNumber,
        year,
      },
      {
        title: 'Finishing daily commission',
        description: 'Deliver exported illustrations and asset pack',
        date: todayStr,
        startTime: '18:00',
        endTime: '19:30',
        priority: TaskPriorityEnum.HIGH,
        status: TaskStatusEnum.COMPLETED,
        weekNumber,
        year,
      },
    ];

    await Task.deleteMany({});
    const inserted = await Task.insertMany(demoTasks);

    return NextResponse.json({
      message: 'Demo tasks seeded successfully',
      count: inserted.length,
    });
  } catch (error: any) {
    console.error('Error seeding demo tasks:', error);
    return NextResponse.json(
      { message: error?.message || 'Failed to seed tasks' },
      { status: 500 }
    );
  }
}
