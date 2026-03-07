// src/app/dashboard/layout.jsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';

export const metadata = {
  title: 'Dashboard — Domus',
};

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login?callbackUrl=/dashboard');

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col bg-[#FAFAF8]">

        {/* Top bar — mobile only */}
        <nav className="navbar bg-white border-b border-gray-100 shadow-sm lg:hidden sticky top-0 z-50">
          <label
            htmlFor="dashboard-drawer"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              strokeLinejoin="round" strokeLinecap="round" strokeWidth="2"
              fill="none" stroke="currentColor" className="size-5">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <span className="text-sm font-black text-secondary px-2 uppercase tracking-widest">
            Domus Dashboard
          </span>
        </nav>

        {/* Page content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <DashboardSidebar session={session} />
      </div>
    </div>
  );
}