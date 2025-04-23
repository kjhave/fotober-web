import TaskList from '@/components/taskFunctions/TaskList';

export default function TaskPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-10">Task List</h1>
      <TaskList />
    </div>
  );
}