// src/app/dashboard/page.jsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUserByEmail } from '@/lib/users';
import Image from 'next/image';
import Link from 'next/link';
import { RiEditLine, RiBuilding2Line, RiUserLine } from 'react-icons/ri';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user    = await getUserByEmail(session.user.email);

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-BD', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : 'N/A';

  const initials = session?.user?.name
    ?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  const cards = [
    {
      href:  '/dashboard/edit-profile',
      icon:  RiEditLine,
      label: 'Edit Profile',
      desc:  'Update your name and photo',
      color: 'bg-primary/10 text-primary',
    },
    {
      href:  '/houses',
      icon:  RiBuilding2Line,
      label: 'Browse Houses',
      desc:  'View all available listings',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      href:  '/profile',
      icon:  RiUserLine,
      label: 'My Profile',
      desc:  'View your public profile',
      color: 'bg-blue-50 text-blue-500',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">

      {/* Welcome */}
      <div className="bg-secondary rounded-2xl p-6 mb-8 flex items-center gap-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-white/5" />

        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name}
            width={60}
            height={60}
            className="rounded-2xl border-2 border-primary/40 object-cover shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center
                          text-white text-lg font-black shrink-0">
            {initials}
          </div>
        )}

        <div>
          <p className="text-white/50 text-xs uppercase tracking-widest mb-0.5">Welcome back</p>
          <h1 className="text-white text-2xl font-black">{session?.user?.name}</h1>
          <p className="text-white/40 text-xs mt-0.5">Member since {joinedDate}</p>
        </div>
      </div>

      {/* Quick actions */}
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">
        Quick Actions
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ href, icon: Icon, label, desc, color }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm
                       hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
          >
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
              <Icon className="text-lg" />
            </div>
            <p className="text-secondary font-black text-sm mb-1 group-hover:text-primary
                          transition-colors duration-200">
              {label}
            </p>
            <p className="text-gray-400 text-xs">{desc}</p>
          </Link>
        ))}
      </div>

      {/* Account info */}
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-8 mb-4">
        Account Info
      </p>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {[
          { label: 'Email',        value: user?.email },
          { label: 'Login Method', value: user?.provider || 'credentials' },
          { label: 'Role',         value: user?.role || 'user' },
          { label: 'Joined',       value: joinedDate },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between px-5 py-3.5">
            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">{label}</p>
            <p className="text-xs font-bold text-secondary capitalize">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}