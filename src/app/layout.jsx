// src/app/layout.jsx
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthSessionProvider from '@/components/SessionProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Domus — Find Your Perfect Home in Bangladesh',
  description: 'Browse thousands of properties across Bangladesh. Connect with owners and find your dream home with Domus.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <AuthSessionProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}