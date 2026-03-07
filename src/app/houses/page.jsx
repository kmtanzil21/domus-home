// src/app/houses/page.jsx
import { getAll } from '@/lib/houses';
import Image from 'next/image';
import Link from 'next/link';

const ITEMS_PER_PAGE = 8;

const tagColors = {
  Featured: 'bg-primary text-white',
  New:      'bg-emerald-500 text-white',
  Popular:  'bg-secondary text-white',
  Hot:      'bg-rose-500 text-white',
};

const BedIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12V7a1 1 0 011-1h16a1 1 0 011 1v5M3 12h18M3 12v5m18-5v5M3 17h18" />
  </svg>
);
const BathIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4zM6 12V7a3 3 0 016 0" />
  </svg>
);
const SqftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
  </svg>
);

export default async function HousesPage({ searchParams }) {
  const allHouses = await getAll();

  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const totalPages  = Math.ceil(allHouses.length / ITEMS_PER_PAGE);

  // Slice the houses for the current page
  const start  = (currentPage - 1) * ITEMS_PER_PAGE;
  const houses = allHouses.slice(start, start + ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* Page Header */}
      <div className="bg-secondary py-14 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <div className="absolute top-0 left-0 w-32 h-1 bg-primary" />
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-2">
            Browse all
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white">
            Available Properties
          </h1>
          <p className="text-white/50 text-sm mt-2">
            {allHouses.length} properties listed across Bangladesh
          </p>
        </div>
      </div>

      {/* Houses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {houses.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">No properties found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {houses.map((house) => (
                <div
                  key={house._id}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl
                             border border-gray-100 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={house.image}
                      alt={house.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {house.tag && (
                      <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm ${tagColors[house.tag] || 'bg-gray-500 text-white'}`}>
                        {house.tag}
                      </span>
                    )}
                    {!house.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xs font-black uppercase tracking-widest bg-black/60 px-3 py-1.5 rounded-sm">
                          Not Available
                        </span>
                      </div>
                    )}
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-secondary text-xs font-bold px-3 py-1 rounded-sm shadow">
                      ৳{house.price?.toLocaleString()}/{house.period || 'month'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-secondary text-base mb-1 group-hover:text-primary transition-colors duration-200">
                      {house.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                      <svg className="w-3 h-3 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {house.location}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                      {house.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500 py-3 border-t border-b border-gray-100 mb-4">
                      <span className="flex items-center gap-1"><BedIcon />{house.beds} Beds</span>
                      <span className="flex items-center gap-1"><BathIcon />{house.baths} Baths</span>
                      <span className="flex items-center gap-1"><SqftIcon />{house.sqft} ft²</span>
                    </div>

                    {/* Owner hint */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-400 italic">Owner info unlocked after login</p>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link
                        href={`/houses/${house._id}`}
                        className="block w-full text-center text-xs font-bold uppercase tracking-widest
                                   bg-secondary text-white py-2.5 rounded-sm
                                   hover:bg-primary transition-colors duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14">

                {/* Prev */}
                <Link
                  href={`/houses?page=${currentPage - 1}`}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm border transition-all duration-200
                    ${currentPage === 1
                      ? 'border-gray-200 text-gray-300 pointer-events-none'
                      : 'border-secondary text-secondary hover:bg-secondary hover:text-white'
                    }`}
                  aria-disabled={currentPage === 1}
                >
                  ← Prev
                </Link>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`/houses?page=${page}`}
                    className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded-sm border transition-all duration-200
                      ${page === currentPage
                        ? 'bg-primary border-primary text-white'
                        : 'border-gray-200 text-secondary hover:border-primary hover:text-primary'
                      }`}
                  >
                    {page}
                  </Link>
                ))}

                {/* Next */}
                <Link
                  href={`/houses?page=${currentPage + 1}`}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm border transition-all duration-200
                    ${currentPage === totalPages
                      ? 'border-gray-200 text-gray-300 pointer-events-none'
                      : 'border-secondary text-secondary hover:bg-secondary hover:text-white'
                    }`}
                  aria-disabled={currentPage === totalPages}
                >
                  Next →
                </Link>
              </div>
            )}

            {/* Page info */}
            {totalPages > 1 && (
              <p className="text-center text-xs text-gray-400 mt-4 uppercase tracking-widest">
                Page {currentPage} of {totalPages} · {allHouses.length} total properties
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}