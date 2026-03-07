// src/components/Navbar.jsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const links = [
  { href: '/',       label: 'Home' },
  { href: '/houses', label: 'All Houses' },
];

const Navbar = () => {
  const pathname             = usePathname();
  const router               = useRouter();
  const { data: session }    = useSession();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('#user-dropdown')) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (href) => pathname === href;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  return (
    <nav className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'
    } border-b border-primary/10`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/assets/domus.png"
            alt="Domus Logo"
            width={90}
            height={40}
            className="object-contain"
            style={{ maxHeight: '45px', width: 'auto' }}
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link, i) => (
            <React.Fragment key={link.href}>
              {i > 0 && <span className="w-1 h-1 rounded-full bg-primary opacity-40" />}
              <li>
                <Link
                  href={link.href}
                  className={`relative text-xs font-semibold uppercase tracking-widest transition-colors duration-200
                    after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:transition-all after:duration-300
                    ${isActive(link.href)
                      ? 'text-primary after:w-full after:bg-primary'
                      : 'text-secondary after:w-0 after:bg-primary hover:text-primary hover:after:w-full'
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {session ? (
            /* Logged in — show avatar + dropdown */
            <div className="relative" id="user-dropdown">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 group"
              >
                {/* Avatar */}
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-primary/30 group-hover:border-primary transition-colors duration-200"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-xs font-black shrink-0">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                {/* Name — desktop only */}
                <span className="hidden lg:block text-xs font-semibold text-secondary group-hover:text-primary transition-colors duration-200 max-w-[100px] truncate">
                  {session.user?.name?.split(' ')[0]}
                </span>
                {/* Chevron */}
                <svg className={`hidden lg:block w-3 h-3 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs font-bold text-secondary truncate">{session.user?.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{session.user?.email}</p>
                  </div>
                  {/* Menu items */}
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-secondary hover:text-primary hover:bg-orange-50 transition-colors duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                    </svg>
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-secondary hover:text-primary hover:bg-orange-50 transition-colors duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </Link>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-rose-500 hover:bg-rose-50 transition-colors duration-150"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Not logged in — show Login button */
            <Link
              href="/login"
              className="text-xs font-semibold uppercase tracking-widest text-primary
                         border border-primary px-5 py-2 rounded-sm
                         hover:bg-primary hover:text-white transition-all duration-300"
            >
              Login
            </Link>
          )}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center gap-[5px] p-1"
            aria-label="Toggle menu"
          >
            <span className={`block w-[22px] h-[2px] bg-secondary rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-[22px] h-[2px] bg-secondary rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-[22px] h-[2px] bg-secondary rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        menuOpen ? 'max-h-80 border-t-2 border-primary' : 'max-h-0'
      } bg-white`}>
        <ul className="flex flex-col px-6 py-4 gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-widest transition-colors duration-200
                  ${isActive(link.href) ? 'text-primary' : 'text-secondary hover:text-primary'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive(link.href) ? 'bg-primary' : 'bg-primary opacity-60'}`} />
                {link.label}
              </Link>
            </li>
          ))}

          <li className="border-t border-gray-100 pt-3">
            {session ? (
              <div className="space-y-3">
                {/* User info */}
                <div className="flex items-center gap-3">
                  {session.user?.image ? (
                    <Image src={session.user.image} alt="avatar" width={32} height={32} className="rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-black">
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-secondary">{session.user?.name}</p>
                    <p className="text-[11px] text-gray-400">{session.user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => { handleSignOut(); setMenuOpen(false); }}
                  className="w-full text-center text-xs font-semibold uppercase tracking-widest
                             text-rose-500 border border-rose-200 px-5 py-2 rounded-sm
                             hover:bg-rose-500 hover:text-white transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center text-xs font-semibold uppercase tracking-widest
                           text-primary border border-primary px-5 py-2 rounded-sm
                           hover:bg-primary hover:text-white transition-all duration-300"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;