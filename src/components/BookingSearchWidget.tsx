'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/lib/store/bookingStore';
import { translations } from '@/lib/i18n/dict';
import { roomsData } from '@/lib/data/rooms';
import { Calendar, Users, BedDouble, Search } from 'lucide-react';

export const BookingSearchWidget: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const router = useRouter();
  const {
    language,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    guestCount,
    setGuestCount,
    selectedRoomId,
    setSelectedRoomId,
  } = useBookingStore();

  const t = translations[language];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/booking');
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-[#171A21]/90 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl shadow-2xl p-4 md:p-6 transition-all ${
        compact ? 'max-w-4xl mx-auto' : 'max-w-5xl mx-auto -mt-12 relative z-20'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        
        {/* Check In Date */}
        <div>
          <label className="block text-xs font-semibold text-amber-300/90 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            {t.check_in}
          </label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full bg-[#0F1115] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
            required
          />
        </div>

        {/* Check Out Date */}
        <div>
          <label className="block text-xs font-semibold text-amber-300/90 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            {t.check_out}
          </label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full bg-[#0F1115] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
            required
          />
        </div>

        {/* Guest & Room Select */}
        <div>
          <label className="block text-xs font-semibold text-amber-300/90 mb-1.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            {t.guests_count} & Room Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="bg-[#0F1115] border border-white/10 rounded-xl px-2 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4+ Family</option>
            </select>

            <select
              value={selectedRoomId || ''}
              onChange={(e) => setSelectedRoomId(e.target.value || null)}
              className="bg-[#0F1115] border border-white/10 rounded-xl px-2 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="">All Rooms</option>
              {roomsData.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name[language]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Action */}
        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-[#D4AF37] via-[#E6CA65] to-[#B8860B] hover:brightness-110 text-gray-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Search className="w-4 h-4" />
            <span>{t.search_availability}</span>
          </button>
        </div>

      </div>
    </form>
  );
};
