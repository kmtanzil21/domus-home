// src/components/MyListingsClient.jsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  RiEyeLine, RiToggleLine, RiToggleFill,
  RiAddBoxLine, RiHome2Line, RiLoader4Line,
} from 'react-icons/ri';

export default function MyListingsClient({ initialHouses }) {
  const [houses,     setHouses]     = useState(initialHouses);
  const [loadingId,  setLoadingId]  = useState(null); // which house is toggling

  const handleToggle = async (id, currentAvailable) => {
    setLoadingId(id);
    try {
      const res  = await fetch('/api/houses/toggle-available', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ id, available: currentAvailable }),
      });
      const data = await res.json();

      if (res.ok) {
        // Update locally — no page reload needed
        setHouses((prev) =>
          prev.map((h) => h._id === id ? { ...h, available: data.available } : h)
        );
      }
    } catch {
      // silent fail — UI stays unchanged
    } finally {
      setLoadingId(null);
    }
  };

  if (houses.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16
                      flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <RiHome2Line className="text-3xl text-primary" />
        </div>
        <div>
          <p className="text-secondary font-black text-lg">No listings yet</p>
          <p className="text-gray-400 text-sm mt-1">Start by adding your first property</p>
        </div>
        <Link
          href="/dashboard/add-house"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs
                     font-bold uppercase tracking-widest rounded-lg hover:bg-primary/90
                     transition-colors duration-200"
        >
          <RiAddBoxLine />
          Add House
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Add new button */}
      <div className="flex justify-end mb-2">
        <Link
          href="/dashboard/add-house"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-xs
                     font-bold uppercase tracking-widest rounded-lg hover:bg-primary/90
                     transition-colors duration-200"
        >
          <RiAddBoxLine />
          Add New
        </Link>
      </div>

      {houses.map((house) => (
        <div
          key={house._id}
          className={`bg-white rounded-2xl border shadow-sm overflow-hidden
                      flex flex-col sm:flex-row transition-all duration-200
                      ${house.available ? 'border-gray-100' : 'border-rose-100 opacity-70'}`}
        >
          {/* Image */}
          <div className="relative w-full sm:w-44 h-40 sm:h-auto shrink-0">
            <Image
              src={house.image}
              alt={house.title}
              fill
              sizes="(max-width: 640px) 100vw, 176px"
              className="object-cover"
            />
            {/* Available badge */}
            <span className={`absolute top-2 left-2 text-[10px] font-black uppercase tracking-widest
                              px-2 py-1 rounded-sm
                              ${house.available
                                ? 'bg-emerald-500 text-white'
                                : 'bg-rose-500 text-white'
                              }`}>
              {house.available ? 'Available' : 'Unavailable'}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 p-5 flex flex-col justify-between gap-3">
            <div>
              {house.tag && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {house.tag}
                </span>
              )}
              <h3 className="text-secondary font-black text-base mt-0.5 leading-tight">
                {house.title}
              </h3>
              <p className="text-gray-400 text-xs mt-1">{house.location} · {house.division}</p>
              <p className="text-xs text-gray-500 mt-1">
                {house.beds} Beds · {house.baths} Baths · {house.sqft} ft²
              </p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              {/* Price */}
              <p className="text-secondary font-black text-lg">
                ৳{house.price?.toLocaleString()}
                <span className="text-gray-400 text-xs font-normal">/{house.period}</span>
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2">

                {/* View details */}
                <Link
                  href={`/houses/${house._id}`}
                  className="flex items-center gap-1.5 px-3 py-2 border border-gray-200
                             text-secondary text-xs font-bold uppercase tracking-widest rounded-lg
                             hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  <RiEyeLine className="text-sm" />
                  View
                </Link>

                {/* Toggle availability */}
                <button
                  onClick={() => handleToggle(house._id, house.available)}
                  disabled={loadingId === house._id}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase
                              tracking-widest rounded-lg transition-all duration-200
                              disabled:opacity-50 disabled:cursor-not-allowed
                              ${house.available
                                ? 'bg-rose-50 text-rose-500 hover:bg-rose-100 border border-rose-200'
                                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                              }`}
                >
                  {loadingId === house._id ? (
                    <RiLoader4Line className="text-sm animate-spin" />
                  ) : house.available ? (
                    <RiToggleFill className="text-sm" />
                  ) : (
                    <RiToggleLine className="text-sm" />
                  )}
                  {house.available ? 'Make Unavailable' : 'Make Available'}
                </button>

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}