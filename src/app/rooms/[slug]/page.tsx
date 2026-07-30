'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useBookingStore } from '@/lib/store/bookingStore';
import { translations } from '@/lib/i18n/dict';
import { roomsData } from '@/lib/data/rooms';
import { 
  BedDouble, 
  Users, 
  Maximize, 
  Check, 
  ArrowLeft, 
  CalendarCheck, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const room = roomsData.find((r) => r.slug === resolvedParams.slug);

  const { language, formatPrice, setSelectedRoomId } = useBookingStore();
  const t = translations[language];
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!room) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      
      {/* Back button */}
      <div>
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Accommodations</span>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={room.images[activeImageIdx]}
              alt={room.name.en}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {room.images.length > 1 && (
              <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                <button
                  onClick={() =>
                    setActiveImageIdx((prev) => (prev === 0 ? room.images.length - 1 : prev - 1))
                  }
                  className="p-2 rounded-full bg-black/60 text-white hover:bg-black pointer-events-auto"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIdx((prev) => (prev === room.images.length - 1 ? 0 : prev + 1))
                  }
                  className="p-2 rounded-full bg-black/60 text-white hover:bg-black pointer-events-auto"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-3">
            {room.images.map((img, idx) => (
              <button
                key={img}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIdx === idx ? 'border-amber-400 scale-95' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Info & Direct Booking Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#171A21] border border-amber-500/30 p-8 rounded-3xl space-y-6 shadow-2xl">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                {room.view[language] || room.view.en}
              </span>
              <h1 className="text-3xl font-serif font-bold text-white mb-2">
                {room.name[language] || room.name.en}
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-amber-400">
                  {formatPrice(room.priceETB)}
                </span>
                <span className="text-xs text-gray-400">{t.per_night}</span>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-4">
              {room.longDescription[language] || room.longDescription.en}
            </p>

            <div className="grid grid-cols-3 gap-2 bg-[#0F1115] p-3 rounded-xl border border-white/5 text-xs text-gray-300">
              <div>
                <span className="text-gray-500 block text-[10px]">BED</span>
                <span className="font-semibold">{room.bedType[language] || room.bedType.en}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">SIZE</span>
                <span className="font-semibold">{room.sizeSqm} m²</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">CAPACITY</span>
                <span className="font-semibold">{room.capacity} Guests</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                In-Room Amenities Included:
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                {room.amenities.map((am) => (
                  <div key={am} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link
                href="/booking"
                onClick={() => setSelectedRoomId(room.id)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-gray-950 font-bold text-base hover:brightness-110 flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20"
              >
                <CalendarCheck className="w-5 h-5" />
                <span>Reserve {room.name.en} Now</span>
              </Link>
              
              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free cancellation up to 24h before check-in</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
