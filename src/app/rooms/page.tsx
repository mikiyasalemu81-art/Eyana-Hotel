'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBookingStore } from '@/lib/store/bookingStore';
import { translations } from '@/lib/i18n/dict';
import { roomsData } from '@/lib/data/rooms';
import { BedDouble, Users, Maximize, ArrowRight, Sparkles, Check } from 'lucide-react';

export default function RoomsPage() {
  const { language, formatPrice, setSelectedRoomId } = useBookingStore();
  const t = translations[language];
  const [capacityFilter, setCapacityFilter] = useState<number | 'all'>('all');

  const filteredRooms = roomsData.filter((r) => {
    if (capacityFilter === 'all') return true;
    return r.capacity >= capacityFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase">
          <BedDouble className="w-4 h-4 text-amber-400" />
          <span>Eyana Hotel Accommodations</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
          Rooms & Executive Suites
        </h1>
        <p className="text-gray-300 text-base leading-relaxed">
          Every room at Eyana Hotel is thoughtfully crafted for comfort, quiet relaxation, and productivity. Enjoy orthopedic mattresses, high-speed Wi-Fi, and rainfall showers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setCapacityFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            capacityFilter === 'all'
              ? 'bg-amber-500 text-gray-950 shadow-lg'
              : 'bg-[#171A21] border border-white/10 text-gray-300 hover:text-white'
          }`}
        >
          All Rooms ({roomsData.length})
        </button>
        <button
          onClick={() => setCapacityFilter(1)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            capacityFilter === 1
              ? 'bg-amber-500 text-gray-950 shadow-lg'
              : 'bg-[#171A21] border border-white/10 text-gray-300 hover:text-white'
          }`}
        >
          Single / Solo
        </button>
        <button
          onClick={() => setCapacityFilter(2)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            capacityFilter === 2
              ? 'bg-amber-500 text-gray-950 shadow-lg'
              : 'bg-[#171A21] border border-white/10 text-gray-300 hover:text-white'
          }`}
        >
          Double / King (2 Guests)
        </button>
        <button
          onClick={() => setCapacityFilter(4)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            capacityFilter === 4
              ? 'bg-amber-500 text-gray-950 shadow-lg'
              : 'bg-[#171A21] border border-white/10 text-gray-300 hover:text-white'
          }`}
        >
          Family Suites (4 Guests)
        </button>
      </div>

      {/* Rooms List */}
      <div className="space-y-8">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-[#171A21] border border-white/10 hover:border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all"
          >
            {/* Room Image Gallery Preview */}
            <div className="lg:col-span-5 relative h-72 lg:h-auto overflow-hidden">
              <img
                src={room.images[0]}
                alt={room.name.en}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-amber-500 text-gray-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {room.view[language] || room.view.en}
              </div>
            </div>

            {/* Room Content */}
            <div className="lg:col-span-7 p-6 lg:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h2 className="text-2xl font-serif font-bold text-white">
                    {room.name[language] || room.name.en}
                  </h2>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-amber-400">
                      {formatPrice(room.priceETB)}
                    </span>
                    <span className="text-xs text-gray-400 block">{t.per_night}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  {room.longDescription[language] || room.longDescription.en}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-3 bg-[#0F1115] p-3 rounded-xl border border-white/5 text-xs text-gray-300 mb-4">
                  <div className="flex items-center gap-1.5">
                    <BedDouble className="w-4 h-4 text-amber-400" />
                    <span>{room.bedType[language] || room.bedType.en}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize className="w-4 h-4 text-amber-400" />
                    <span>{room.sizeSqm} m²</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>Up to {room.capacity} Guests</span>
                  </div>
                </div>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((am) => (
                    <span
                      key={am}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-300 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      {am}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <Link
                  href={`/rooms/${room.slug}`}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-colors"
                >
                  {t.view_details}
                </Link>

                <Link
                  href="/booking"
                  onClick={() => setSelectedRoomId(room.id)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-gray-950 font-bold text-xs hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
                >
                  <span>Book This Room</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
