// src/app/houses/[id]/page.jsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getWithOwner } from '@/lib/houses';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function HouseDetailPage({ params }) {
  const { id } = await params;

  // Not logged in → redirect to login, come back here after
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=/houses/${id}`);
  }

  const house = await getWithOwner(id);
  if (!house) notFound();

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back */}
        <Link
          href="/houses"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest
                     text-gray-500 hover:text-primary transition-colors duration-200 mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Houses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — Images + Details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Main Image */}
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-md">
              <Image
                src={house.image}
                alt={house.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
              {house.tag && (
                <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm bg-primary text-white">
                  {house.tag}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {house.images?.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {house.images.slice(0, 3).map((img, i) => (
                  <div key={i} className="relative h-24 rounded-xl overflow-hidden">
                    <Image src={img} alt={`Photo ${i + 1}`} fill sizes="33vw" className="object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Description</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{house.description}</p>
            </div>

            {/* Specs */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-widest text-primary mb-4">Property Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Type',     value: house.type },
                  { label: 'Beds',     value: `${house.beds} Bedrooms` },
                  { label: 'Baths',    value: `${house.baths} Bathrooms` },
                  { label: 'Area',     value: `${house.sqft} ft²` },
                  { label: 'Division', value: house.division },
                  { label: 'Status',   value: house.available ? 'Available' : 'Not Available' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#FAFAF8] rounded-xl p-3">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
                    <p className={`text-sm font-bold ${
                      item.label === 'Status'
                        ? house.available ? 'text-emerald-600' : 'text-rose-500'
                        : 'text-secondary'
                    }`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Price + Owner */}
          <div>
            <div className="bg-secondary rounded-2xl p-6 text-white shadow-lg sticky top-24">

              {/* Price */}
              <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Monthly Rent</p>
              <p className="text-4xl font-black text-white mb-1">
                ৳{house.price?.toLocaleString()}
              </p>
              <p className="text-white/40 text-xs mb-6">per {house.period || 'month'}</p>

              {/* Quick stats */}
              <div className="space-y-2 text-sm mb-6">
                <p className="text-white/60 flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {house.location}
                </p>
                <p className="text-white/60">{house.beds} Beds · {house.baths} Baths · {house.sqft} ft²</p>
              </div>

              {/* Owner Info */}
              <div className="border-t border-white/10 pt-5">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Owner Details</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-black text-sm shrink-0">
                      {house.owner?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{house.owner?.name}</p>
                      <p className="text-white/40 text-xs">Property Owner</p>
                    </div>
                  </div>
                  <a href={`tel:${house.owner?.phone}`}
                     className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                    <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {house.owner?.phone}
                  </a>
                  <a href={`mailto:${house.owner?.email}`}
                     className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                    <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {house.owner?.email}
                  </a>
                  <a href={`tel:${house.owner?.phone}`}
                     className="block w-full text-center mt-2 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary/90 transition-colors">
                    Contact Owner
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}