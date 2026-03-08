// src/components/DashboardSidebar.jsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  RiHome5Line,
  RiBuilding2Line,
  RiUserLine,
  RiEditLine,
  RiLogoutBoxLine,
  RiAddBoxLine,
} from 'react-icons/ri';

const navItems = [
  { href: '/dashboard',              icon: RiHome5Line,     label: 'Overview'      },
  { href: '/dashboard/add-house',    icon: RiAddBoxLine,    label: 'Add House'     },
  { href: '/dashboard/edit-profile', icon: RiEditLine,      label: 'Edit Profile'  },
  { href: '/houses',                 icon: RiBuilding2Line, label: 'Browse Houses' },
  { href: '/profile',                icon: RiUserLine,      label: 'My Profile'    },
];

export default function DashboardSidebar({ session }) {
  const pathname = usePathname();
  const router   = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  const initials = session?.user?.name
    ?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="flex min-h-full flex-col bg-secondary
                    is-drawer-close:w-16 is-drawer-open:w-64
                    transition-all duration-300">

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10
                      is-drawer-close:justify-center">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
          </svg>
        </div>
        <span className="text-white font-black text-sm uppercase tracking-widest is-drawer-close:hidden">
          Domus
        </span>
      </div>

      {/* User info */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10
                      is-drawer-close:justify-center is-drawer-close:px-2">
        {session?.user?.image ? (
          <Image
            src={session.user.image} alt={session.user.name}
            width={36} height={36}
            className="rounded-xl shrink-0 object-cover border-2 border-primary/40"
          />
        ) : (
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center
                          text-white text-xs font-black shrink-0 border-2 border-primary/40">
            {initials}
          </div>
        )}
        <div className="is-drawer-close:hidden overflow-hidden">
          <p className="text-white text-xs font-bold truncate">{session?.user?.name}</p>
          <p className="text-white/40 text-[11px] truncate">{session?.user?.email}</p>
        </div>
      </div>

      {/* Nav */}
      <ul className="flex-1 px-2 py-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                data-tip={label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold
                            uppercase tracking-widest transition-all duration-200
                            is-drawer-close:justify-center is-drawer-close:tooltip
                            is-drawer-close:tooltip-right
                            ${active
                              ? 'bg-primary text-white'
                              : 'text-white/60 hover:bg-white/10 hover:text-white'
                            }`}
              >
                <Icon className="text-base shrink-0" />
                <span className="is-drawer-close:hidden">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Sign out */}
      <div className="px-2 py-4 border-t border-white/10">
        <button
          onClick={handleSignOut}
          data-tip="Sign Out"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold
                     uppercase tracking-widest text-rose-400 hover:bg-rose-500/20
                     hover:text-rose-300 transition-all duration-200
                     is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
        >
          <RiLogoutBoxLine className="text-base shrink-0" />
          <span className="is-drawer-close:hidden">Sign Out</span>
        </button>
      </div>
    </div>
  );
}