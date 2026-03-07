import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Large faded 404 behind everything */}
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      text-[20rem] font-black text-gray-50 select-none leading-none whitespace-nowrap">
          404
        </p>
        {/* Decorative orange dots */}
        <span className="absolute top-16 left-16 w-3 h-3 rounded-full bg-primary opacity-30" />
        <span className="absolute top-32 left-32 w-1.5 h-1.5 rounded-full bg-primary opacity-20" />
        <span className="absolute bottom-24 right-20 w-4 h-4 rounded-full bg-primary opacity-20" />
        <span className="absolute bottom-40 right-40 w-2 h-2 rounded-full bg-primary opacity-30" />
        <span className="absolute top-1/3 right-16 w-2 h-2 rounded-full bg-secondary opacity-10" />
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-24 h-1 bg-primary" />
        <div className="absolute top-0 left-0 w-1 h-24 bg-primary" />
        <div className="absolute bottom-0 right-0 w-24 h-1 bg-primary" />
        <div className="absolute bottom-0 right-0 w-1 h-24 bg-primary" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-lg">

        {/* House icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            {/* Small badge */}
            <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary
                             flex items-center justify-center text-white text-xs font-black">
              ?
            </span>
          </div>
        </div>

        {/* Text */}
        <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-3">
          Page Not Found
        </p>
        <h1 className="text-5xl md:text-6xl font-black text-secondary mb-4 leading-tight">
          Oops! This home <br />
          <span className="text-primary">doesn't exist.</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-sm mx-auto">
          The page you're looking for may have been moved, deleted, or never existed. Let's get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3.5 bg-primary text-white text-xs font-bold uppercase tracking-widest
                       rounded-sm hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20
                       flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/houses"
            className="px-8 py-3.5 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest
                       rounded-sm hover:border-primary hover:text-primary transition-all duration-200
                       flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Houses
          </Link>
        </div>

        {/* Bottom brand note */}
        <p className="mt-12 text-xs text-gray-300 uppercase tracking-widest">
          Domus Bangladesh · Your Trusted Home Platform
        </p>
      </div>
    </div>
  );
};

export default NotFound;