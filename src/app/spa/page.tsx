'use client';

import React, { useState } from 'react';
import { useBookingStore } from '@/lib/store/bookingStore';
import { translations } from '@/lib/i18n/dict';
import { spaServicesData } from '@/lib/data/spa';
import { Sparkles, Clock, CheckCircle2, Star, Calendar, Phone } from 'lucide-react';

export default function SpaPage() {
  const { language, formatPrice, addSpaBooking } = useBookingStore();
  const t = translations[language];

  const [selectedServiceId, setSelectedServiceId] = useState(spaServicesData[0].id);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('14:00');
  const [isSuccess, setIsSuccess] = useState(false);

  const activeService = spaServicesData.find((s) => s.id === selectedServiceId) || spaServicesData[0];

  const handleSpaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    addSpaBooking({
      serviceId: activeService.id,
      serviceTitle: activeService.title.en,
      guestName,
      guestPhone,
      guestEmail,
      date: bookingDate,
      timeSlot,
    });

    setIsSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden p-8 md:p-14 border border-purple-500/30 bg-gradient-to-r from-[#1A1829] via-[#171A21] to-[#111818] shadow-2xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-bold uppercase">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>24-Hour On-Site Wellness Sanctuary</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
            Kazi Beauty Salon & Spa
          </h1>

          <p className="text-gray-300 text-base leading-relaxed font-light">
            Indulge in authentic Ethiopian coffee scrubs, therapeutic deep tissue massages, glowing radiance facials, and professional salon styling inside Eyana Hotel.
          </p>

          <div className="flex items-center gap-4 text-xs text-amber-300">
            <span className="flex items-center gap-1 font-bold">
              <Star className="w-4 h-4 fill-current text-amber-400" /> 4.6 / 5.0 (10 Verified Guest Reviews)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <Clock className="w-4 h-4" /> Open 24 Hours Daily
            </span>
          </div>
        </div>
      </div>

      {/* Services & Reservation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Services Catalog (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-white border-b border-white/10 pb-3">
            Spa & Salon Services Menu
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spaServicesData.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedServiceId(s.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 flex flex-col justify-between ${
                  selectedServiceId === s.id
                    ? 'bg-purple-500/10 border-purple-400 shadow-xl'
                    : 'bg-[#171A21] border-white/10 text-gray-400 hover:border-white/20'
                }`}
              >
                <div className="space-y-2">
                  <img
                    src={s.image}
                    alt={s.title.en}
                    className="w-full h-36 rounded-xl object-cover border border-white/10 mb-2"
                  />
                  <h3 className="font-serif font-bold text-white text-lg">
                    {s.title[language] || s.title.en}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {s.description[language] || s.description.en}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                  <span className="text-purple-300 font-semibold">{s.durationMinutes} Minutes</span>
                  <span className="text-amber-400 font-bold text-base">{formatPrice(s.priceETB)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reservation Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#171A21] border border-purple-500/30 p-8 rounded-3xl space-y-6 sticky top-24 shadow-2xl">
            {!isSuccess ? (
              <>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white mb-1">
                    Book Spa Appointment
                  </h3>
                  <p className="text-xs text-gray-400">
                    Selected Treatment: <strong className="text-purple-300">{activeService.title.en}</strong>
                  </p>
                </div>

                <form onSubmit={handleSpaSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="text-gray-300 block mb-1 font-semibold">Your Full Name *</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Helen Tewolde"
                      className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white focus:border-purple-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 block mb-1 font-semibold">Mobile Phone Number *</label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+251 91 222 3344"
                      className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white focus:border-purple-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-gray-300 block mb-1 font-semibold">Preferred Date</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-2.5 text-white font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 block mb-1 font-semibold">Time Slot</label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-2.5 text-white"
                      >
                        <option value="10:00">10:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="18:00">06:00 PM</option>
                        <option value="20:00">08:00 PM</option>
                        <option value="22:00">10:00 PM (Night Slot)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 transition-all"
                  >
                    Confirm Kazi Spa Appointment ({formatPrice(activeService.priceETB)})
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Appointment Reserved!
                </h3>
                <p className="text-xs text-gray-300">
                  Thank you, <strong className="text-purple-300">{guestName}</strong>. Your appointment for <strong>{activeService.title.en}</strong> on {bookingDate} at {timeSlot} has been logged.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20"
                >
                  Book Another Treatment
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
