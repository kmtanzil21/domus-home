// src/app/houses/loading.jsx

const SkeletonCard = () => (
  <div className="bg-orange-50 rounded-xl overflow-hidden border border-orange-100 shadow-sm flex flex-col animate-pulse">
    
    {/* Image skeleton */}
    <div className="h-52 bg-orange-100 relative">
      {/* Tag skeleton */}
      <div className="absolute top-3 left-3 w-16 h-5 bg-orange-200 rounded-sm" />
      {/* Price skeleton */}
      <div className="absolute bottom-3 right-3 w-24 h-6 bg-orange-200 rounded-sm" />
    </div>

    {/* Content skeleton */}
    <div className="p-4 flex flex-col flex-1 gap-3">
      {/* Title */}
      <div className="h-4 bg-orange-100 rounded w-3/4" />
      {/* Location */}
      <div className="h-3 bg-orange-100 rounded w-1/2" />
      {/* Description lines */}
      <div className="space-y-1.5">
        <div className="h-3 bg-orange-50 rounded w-full" />
        <div className="h-3 bg-orange-50 rounded w-5/6" />
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between py-3 border-t border-b border-orange-100">
        <div className="h-3 bg-orange-100 rounded w-14" />
        <div className="h-3 bg-orange-100 rounded w-14" />
        <div className="h-3 bg-orange-100 rounded w-14" />
      </div>

      {/* Owner hint */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-orange-200 shrink-0" />
        <div className="h-3 bg-orange-100 rounded w-36" />
      </div>

      {/* Button */}
      <div className="mt-auto h-9 bg-orange-200 rounded-sm w-full" />
    </div>
  </div>
);

export default function HousesLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* Header skeleton */}
      <div className="bg-secondary py-14 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <div className="absolute top-0 left-0 w-32 h-1 bg-primary" />
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="h-3 w-24 bg-orange-400/40 rounded animate-pulse" />
          <div className="h-10 w-72 bg-orange-400/30 rounded animate-pulse" />
          <div className="h-3 w-48 bg-orange-400/20 rounded animate-pulse" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-center gap-2 mt-14">
          <div className="h-9 w-20 bg-orange-100 rounded-sm animate-pulse" />
          {[1, 2].map((i) => (
            <div key={i} className="w-9 h-9 bg-orange-200 rounded-sm animate-pulse" />
          ))}
          <div className="h-9 w-20 bg-orange-100 rounded-sm animate-pulse" />
        </div>
      </div>
    </main>
  );
}