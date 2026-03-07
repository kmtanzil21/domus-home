"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const links = [
  { href: '/',        label: 'Home' },
  { href: '/houses',  label: 'All Houses' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) => pathname === href;

  return (
    <nav className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'
    } border-b border-primary/10`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Logo />
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
          <Link
            href="/login"
            className="text-xs font-semibold uppercase tracking-widest text-primary
                       border border-primary px-5 py-2 rounded-sm
                       hover:bg-primary hover:text-white transition-all duration-300"
          >
            Login
          </Link>

          {/* Hamburger */}
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
        menuOpen ? 'max-h-64 border-t-2 border-primary' : 'max-h-0'
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
                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                  isActive(link.href) ? 'bg-primary' : 'bg-primary opacity-60'
                }`} />
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-center text-xs font-semibold uppercase tracking-widest
                         text-primary border border-primary px-5 py-2 rounded-sm mt-1
                         hover:bg-primary hover:text-white transition-all duration-300"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;