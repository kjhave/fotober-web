// src/app/page.tsx
import { cookies } from 'next/headers';
import DashboardPage from '@/components/dashboard/DashBoardPage';
import { AuthForm } from '@/components/auth/AuthForm';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (token) {
    return <DashboardPage />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 p-8">Welcome to Fotober</h1>
      <AuthForm />
    </div>
  );
}
