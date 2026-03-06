import Link from 'next/link';

const CTABanner = () => {
  return (
    <section className="py-20 px-4 bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-secondary overflow-hidden px-8 py-16 md:px-16 text-center">

          {/* Decorative circles */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary/10 blur-2xl" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-primary/10 blur-2xl" />
          <div className="absolute top-6 right-10 w-3 h-3 rounded-full bg-primary opacity-60" />
          <div className="absolute bottom-8 left-14 w-2 h-2 rounded-full bg-primary opacity-40" />

          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">
              Own a property?
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              List Your Home on <br className="hidden md:block" />
              <span className="text-primary">Domus</span> Today
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
              Reach thousands of potential tenants. Upload photos, set your price, and start getting inquiries — completely free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-3.5 bg-primary text-white text-sm font-bold uppercase tracking-widest
                           rounded-sm hover:bg-primary/90 transition-colors duration-200 shadow-lg shadow-primary/30"
              >
                Get Started Free
              </Link>
              <Link
                href="/houses"
                className="px-8 py-3.5 border border-white/30 text-white text-sm font-semibold uppercase tracking-widest
                           rounded-sm hover:bg-white/10 transition-colors duration-200"
              >
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;