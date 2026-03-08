"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const luxuryHomes = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
    title: 'Modern Mansion',
    location: 'Dhaka',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop',
    title: 'Contemporary Villa',
    location: 'Rajshahi',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop',
    title: 'Minimalist Retreat',
    location: 'Chattogram',
  },
];

const LuxuryHomeSlider = () => {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {luxuryHomes.map((home) => (
          <SwiperSlide
            key={home.id}
            style={{ position: 'relative', width: '100%', height: '100%' }}
          >
            <Image
              src={home.url}
              alt={`${home.title} in ${home.location}`}
              fill
              priority={home.id === 1}
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40 z-10" />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeInDown">
                  {home.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fadeInUp">
                  Discover refined living in {home.location}
                </p>
                <button className="btn btn-primary btn-lg text-white">
                  Explore Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40">
        &larr;
      </button>
      <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40">
        &rarr;
      </button>

      <style jsx global>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown { animation: fadeInDown 1s ease-out; }
        .animate-fadeInUp   { animation: fadeInUp  1s ease-out; }

        .swiper-slide { pointer-events: none; }
        .swiper-slide-active { pointer-events: auto; }

        .swiper-pagination-bullet-active {
          background-color: #C05621 !important;
        }
      `}</style>
    </div>
  );
};

export default LuxuryHomeSlider;