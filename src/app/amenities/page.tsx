'use client';

import React from 'react';
import { useBookingStore } from '@/lib/store/bookingStore';
import { hotelAmenities } from '@/lib/data/amenities';
import { Wifi, Bus, Sparkles, UtensilsCrossed, Car, Clock, ShieldCheck } from 'lucide-react';

export default function AmenitiesPage() {
  const { language } = useBookingStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Complete Guest Comfort</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
          Hotel Amenities & Guest Services
        </h1>
        <p className="text-gray-400 text-sm">
          Everything designed for international executives, NGO travelers, and families visiting Addis Ababa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotelAmenities.map((am) => (
          <div
            key={am.id}
            className="bg-[#171A21] border border-white/10 p-8 rounded-3xl space-y-4 hover:border-amber-500/30 transition-all shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              {am.id === 'wifi' && <Wifi className="w-7 h-7" />}
              {am.id === 'shuttle' && <Bus className="w-7 h-7" />}
              {am.id === 'spa' && <Sparkles className="w-7 h-7" />}
              {am.id === 'breakfast' && <UtensilsCrossed className="w-7 h-7" />}
              {am.id === 'parking' && <Car className="w-7 h-7" />}
              {am.id === 'room-service' && <Clock className="w-7 h-7" />}
            </div>

            <h3 className="text-xl font-serif font-bold text-white">
              {am.title[language] || am.title.en}
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed">
              {am.description[language] || am.description.en}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
