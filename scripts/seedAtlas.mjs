import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: Please provide MONGODB_URI as an environment variable.');
  process.exit(1);
}

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    date: { type: String, required: true },
    startTime: { type: String, default: '09:00' },
    endTime: { type: String, default: '10:00' },
    priority: { type: String, default: 'medium' },
    status: { type: String, default: 'pending' },
    weekNumber: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

async function run() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected!');

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  const demoTasks = [
    {
      title: 'Finishing Wireframe',
      description: 'Complete UI layout and screen flows in Figma for client review',
      date: todayStr,
      startTime: '09:00',
      endTime: '11:30',
      priority: 'high',
      status: 'pending',
      weekNumber: 46,
      year: 2026,
    },
    {
      title: 'Meeting with team',
      description: 'Sprint planning and task allocation sync',
      date: todayStr,
      startTime: '11:45',
      endTime: '12:30',
      priority: 'medium',
      status: 'pending',
      weekNumber: 46,
      year: 2026,
    },
    {
      title: 'Buy a cat food',
      description: 'Pick up dry food and treats from supermarket',
      date: todayStr,
      startTime: '16:00',
      endTime: '16:45',
      priority: 'low',
      status: 'completed',
      weekNumber: 46,
      year: 2026,
    },
    {
      title: 'Finishing daily commission',
      description: 'Deliver exported illustrations and asset pack',
      date: todayStr,
      startTime: '18:00',
      endTime: '19:30',
      priority: 'high',
      status: 'completed',
      weekNumber: 46,
      year: 2026,
    },
  ];

  await Task.deleteMany({});
  const result = await Task.insertMany(demoTasks);
  console.log(`Inserted ${result.length} demo tasks into database 'todo_app', collection 'tasks'!`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Error seeding Atlas:', err);
  process.exit(1);
});
