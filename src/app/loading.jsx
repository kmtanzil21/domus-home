// src/app/loading.jsx
// This shows for ANY page that doesn't have its own loading.jsx

export default function GlobalLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center gap-6">

      {/* Spinning house icon */}
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
          </svg>
        </div>

        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 border-t-primary animate-spin" />
      </div>

      {/* Brand name */}
      <div className="text-center space-y-1">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-primary animate-pulse">
          Domus
        </p>
        <p className="text-xs text-gray-400 uppercase tracking-widest">
          Loading...
        </p>
      </div>
    </main>
  );
}