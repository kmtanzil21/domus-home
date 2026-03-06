"use client";

const testimonials = [
  {
    name: 'Fatema Begum',
    role: 'Renter — Dhaka, Dhaka Division',
    avatar: 'FB',
    rating: 5,
    text: 'Found my perfect flat within 3 days of signing up. The photos were spot on and the owner responded very quickly. Domus made the whole process so easy.',
  },
  {
    name: 'Md. Rakibul Hasan',
    role: 'Property Owner — Chittagong, Chattogram Division',
    avatar: 'RH',
    rating: 5,
    text: 'I listed my apartment on Friday and had 12 serious inquiries by Monday. The upload took less than 10 minutes. Absolutely love this platform!',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Renter — Sylhet, Sylhet Division',
    avatar: 'NJ',
    rating: 4,
    text: 'Being able to browse all listings without an account first was great. Once I logged in, the full details were totally worth it. Highly recommend Domus.',
  },
  {
    name: 'Ariful Islam',
    role: 'Renter — Rajshahi, Rajshahi Division',
    avatar: 'AI',
    rating: 5,
    text: 'The search experience is incredibly smooth. I found a great house in Rajshahi within a week. The owner details after login were very helpful.',
  },
  {
    name: 'Sumaiya Akter',
    role: 'Property Owner — Khulna, Khulna Division',
    avatar: 'SA',
    rating: 5,
    text: 'Managing my listings is so simple. I uploaded 3 properties and all of them got inquiries within days. Domus is the best platform for Bangladeshi landlords.',
  },
];

const Stars = ({ count }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-primary' : 'text-gray-200'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ t }) => (
  <div className="relative p-7 rounded-2xl border border-gray-100 shadow-sm bg-white group
                  w-[320px] shrink-0 mx-3">
    <span className="absolute top-5 right-6 text-6xl font-serif text-primary/10 leading-none select-none">
      "
    </span>
    <Stars count={t.rating} />
    <p className="text-gray-500 text-sm leading-relaxed mb-6 relative z-10">
      "{t.text}"
    </p>
    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-xs font-black shrink-0">
        {t.avatar}
      </div>
      <div>
        <p className="font-bold text-secondary text-sm">{t.name}</p>
        <p className="text-[11px] text-gray-400 uppercase tracking-wide">{t.role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  // Duplicate for seamless infinite loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-white overflow-hidden">

      {/* Header */}
      <div className="text-center mb-14 px-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
          Real stories
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-secondary">
          What Our <span className="text-primary">Users</span> Say
        </h2>
      </div>

      {/* Scrolling Track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee hover:pause-marquee">
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;