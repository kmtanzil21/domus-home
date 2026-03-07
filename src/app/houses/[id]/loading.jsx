// src/app/houses/[id]/loading.jsx

export default function HouseDetailLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back button skeleton */}
        <div className="h-4 w-36 bg-orange-100 rounded animate-pulse mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            {/* Main image */}
            <div className="h-72 md:h-96 rounded-2xl bg-orange-100 animate-pulse relative overflow-hidden">
              {/* Tag */}
              <div className="absolute top-4 left-4 w-16 h-6 bg-orange-200 rounded-sm" />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-xl bg-orange-100 animate-pulse" />
              ))}
            </div>

            {/* Description card */}
            <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm space-y-3 animate-pulse">
              <div className="h-3 w-24 bg-orange-200 rounded" />
              <div className="h-3 w-full bg-orange-100 rounded" />
              <div className="h-3 w-5/6 bg-orange-100 rounded" />
              <div className="h-3 w-4/6 bg-orange-100 rounded" />
            </div>

            {/* Specs card */}
            <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm animate-pulse">
              <div className="h-3 w-32 bg-orange-200 rounded mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-orange-50 rounded-xl p-3 space-y-2">
                    <div className="h-2 w-10 bg-orange-200 rounded" />
                    <div className="h-3 w-16 bg-orange-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — price card */}
          <div>
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 shadow-sm sticky top-24 animate-pulse space-y-4">

              {/* Price */}
              <div className="h-2 w-20 bg-orange-200 rounded" />
              <div className="h-10 w-36 bg-orange-200 rounded" />
              <div className="h-2 w-16 bg-orange-100 rounded" />

              {/* Stats */}
              <div className="space-y-2 pb-4">
                <div className="h-3 w-32 bg-orange-100 rounded" />
                <div className="h-3 w-40 bg-orange-100 rounded" />
              </div>

              {/* Divider */}
              <div className="h-px bg-orange-200 w-full" />

              {/* Owner section */}
              <div className="h-2 w-24 bg-orange-200 rounded" />

              {/* Owner avatar + name */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-200 shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-3 w-28 bg-orange-200 rounded" />
                  <div className="h-2 w-20 bg-orange-100 rounded" />
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-200" />
                <div className="h-3 w-32 bg-orange-100 rounded" />
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-200" />
                <div className="h-3 w-40 bg-orange-100 rounded" />
              </div>

              {/* Button */}
              <div className="h-11 w-full bg-orange-200 rounded-sm" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}