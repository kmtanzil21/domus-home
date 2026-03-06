import Link from 'next/link';
import Image from 'next/image';

const houses = [
  {
    id: 1,
    title: 'Skyline Penthouse',
    location: 'Manhattan, NY',
    price: '$4,200/mo',
    beds: 3,
    baths: 2,
    sqft: '2,400',
    tag: 'Featured',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Ocean Breeze Villa',
    location: 'Malibu, CA',
    price: '$6,800/mo',
    beds: 4,
    baths: 3,
    sqft: '3,100',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Garden Retreat',
    location: 'Austin, TX',
    price: '$2,900/mo',
    beds: 2,
    baths: 2,
    sqft: '1,800',
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Downtown Loft',
    location: 'Chicago, IL',
    price: '$3,500/mo',
    beds: 2,
    baths: 1,
    sqft: '1,600',
    tag: 'Hot',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop',
  },
];

const tagColors = {
  Featured: 'bg-primary text-white',
  New: 'bg-emerald-500 text-white',
  Popular: 'bg-secondary text-white',
  Hot: 'bg-rose-500 text-white',
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

const FeaturedHouses = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
              Handpicked for you
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-tight">
              Featured <br className="hidden md:block" />
              <span className="text-primary">Properties</span>
            </h2>
          </div>
          <Link
            href="/houses"
            className="self-start md:self-auto text-sm font-semibold uppercase tracking-widest
                       text-secondary border-b-2 border-primary pb-0.5
                       hover:text-primary transition-colors duration-200"
          >
            View All Houses →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {houses.map((house) => (
            <Link href={`/houses/${house.id}`} key={house.id} className="group block">
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100">

                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={house.image}
                    alt={house.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Tag */}
                  <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm ${tagColors[house.tag]}`}>
                    {house.tag}
                  </span>
                  {/* Price */}
                  <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-secondary text-xs font-bold px-3 py-1 rounded-sm shadow">
                    {house.price}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-secondary text-base mb-0.5 group-hover:text-primary transition-colors duration-200">
                    {house.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                    <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {house.location}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1"><BedIcon />{house.beds} Beds</span>
                    <span className="flex items-center gap-1"><BathIcon />{house.baths} Baths</span>
                    <span className="flex items-center gap-1"><SqftIcon />{house.sqft} ft²</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHouses;