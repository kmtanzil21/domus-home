// src/app/profile/page.jsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getUserByEmail } from '@/lib/users';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login?callbackUrl=/profile');

  // Get full user data from MongoDB
  const user = await getUserByEmail(session.user.email);

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-BD', {
        year:  'numeric',
        month: 'long',
        day:   'numeric',
      })
    : 'N/A';

  const initials = session.user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* Top banner */}
      <div className="bg-secondary h-48 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <div className="absolute top-0 left-0 w-48 h-1 bg-primary" />
        <div className="absolute bottom-0 right-0 w-48 h-1 bg-primary/30" />
        <div className="absolute bottom-0 right-0 w-1 h-48 bg-primary/30" />
        {/* Decorative dots */}
        <span className="absolute top-8 right-24 w-3 h-3 rounded-full bg-primary/30" />
        <span className="absolute top-16 right-40 w-1.5 h-1.5 rounded-full bg-primary/20" />
        <span className="absolute bottom-8 left-24 w-2 h-2 rounded-full bg-white/10" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">My Account</p>
          <h1 className="text-3xl font-black text-white mt-1">Profile</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Avatar card — overlaps banner */}
        <div className="relative -mt-16 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center sm:items-end gap-5">

            {/* Avatar */}
            <div className="relative shrink-0">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={96}
                  height={96}
                  className="rounded-2xl border-4 border-white shadow-md object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center
                                border-4 border-white shadow-md">
                  <span className="text-white text-2xl font-black">{initials}</span>
                </div>
              )}
              {/* Online dot */}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white" />
            </div>

            {/* Name + role */}
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-black text-secondary">{session.user?.name}</h2>
              <p className="text-sm text-gray-400 mt-0.5">{session.user?.email}</p>
            </div>

            {/* Role badge */}
            <div className="shrink-0">
              <span className="px-3 py-1.5 bg-primary/10 text-primary text-[11px] font-black uppercase tracking-widest rounded-sm">
                {user?.role || 'User'}
              </span>
            </div>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

          {/* Full Name */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">
              Full Name
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-secondary font-bold text-sm">{session.user?.name || '—'}</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">
              Email Address
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-secondary font-bold text-sm truncate">{session.user?.email || '—'}</p>
            </div>
          </div>

          {/* Joined */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">
              Member Since
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-secondary font-bold text-sm">{joinedDate}</p>
            </div>
          </div>

          {/* Login Provider */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">
              Login Method
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                {user?.provider === 'google' ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                )}
              </div>
              <p className="text-secondary font-bold text-sm capitalize">
                {user?.provider || 'Credentials'}
              </p>
            </div>
          </div>
        </div>

        {/* Account ID */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">
            Account ID
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2" />
              </svg>
            </div>
            <p className="text-gray-400 font-mono text-xs truncate">{user?._id || session.user?.id || '—'}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/houses"
            className="flex-1 text-center py-3 bg-primary text-white text-xs font-bold uppercase
                       tracking-widest rounded-sm hover:bg-primary/90 transition-colors duration-200"
          >
            Browse Houses
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 text-center py-3 border border-secondary text-secondary text-xs font-bold
                       uppercase tracking-widest rounded-sm hover:bg-secondary hover:text-white
                       transition-colors duration-200"
          >
            My Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}