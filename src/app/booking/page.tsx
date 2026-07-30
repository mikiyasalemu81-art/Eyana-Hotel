'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBookingStore } from '@/lib/store/bookingStore';
import { translations } from '@/lib/i18n/dict';
import { roomsData } from '@/lib/data/rooms';
import { Room } from '@/lib/types';
import { PaymentModal } from '@/components/PaymentModal';
import { 
  Calendar, 
  Users, 
  BedDouble, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  PlusCircle,
  CreditCard,
  Printer,
  QrCode,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function BookingPage() {
  const {
    language,
    formatPrice,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    guestCount,
    setGuestCount,
    selectedRoomId,
    setSelectedRoomId,
    bookings,
  } = useBookingStore();

  const t = translations[language];

  // Current Step: 1: Dates & Room -> 2: Addons & Info -> 3: Payment -> 4: Complete Voucher
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Inputs
  const [chosenRoomId, setChosenRoomId] = useState<string>(selectedRoomId || roomsData[0].id);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['Daily Breakfast']);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [passportId, setPassportId] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Payment Modal Trigger State
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [confirmedBookingRef, setConfirmedBookingRef] = useState<string | null>(null);

  const selectedRoom = roomsData.find((r) => r.id === chosenRoomId) || roomsData[0];

  // Calculate Nights
  const d1 = new Date(checkInDate);
  const d2 = new Date(checkOutDate);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const calculatedNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Calculate Base & Addon Prices
  let addOnTotalETB = 0;
  if (selectedAddOns.includes('VIP Airport Transfer')) addOnTotalETB += 1200;
  if (selectedAddOns.includes('Daily Breakfast')) addOnTotalETB += 800 * calculatedNights;
  if (selectedAddOns.includes('Kazi Spa Voucher')) addOnTotalETB += 1500;
  if (selectedAddOns.includes('Late Checkout')) addOnTotalETB += 600;

  const roomTotalETB = selectedRoom.priceETB * calculatedNights;
  const grandTotalETB = roomTotalETB + addOnTotalETB;

  const toggleAddOn = (addon: string) => {
    if (selectedAddOns.includes(addon)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a !== addon));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleGoToInfo = () => {
    setStep(2);
  };

  const handleOpenPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert('Please fill in required guest contact information.');
      return;
    }
    setIsPaymentOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      
      {/* Page Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>Direct Reservation Platform</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">
          Eyana Hotel Booking Engine
        </h1>
        <p className="text-gray-400 text-sm">
          Best Rate Guarantee • Instant Confirmation • Zero Booking Fees
        </p>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-3 gap-2 max-w-xl mx-auto text-xs font-bold">
        <div
          className={`p-3 rounded-xl border text-center transition-all ${
            step === 1
              ? 'bg-amber-500 text-gray-950 border-amber-400 shadow-lg'
              : 'bg-[#171A21] border-white/10 text-gray-400'
          }`}
        >
          1. Room & Dates
        </div>
        <div
          className={`p-3 rounded-xl border text-center transition-all ${
            step === 2
              ? 'bg-amber-500 text-gray-950 border-amber-400 shadow-lg'
              : 'bg-[#171A21] border-white/10 text-gray-400'
          }`}
        >
          2. Guest Details
        </div>
        <div
          className={`p-3 rounded-xl border text-center transition-all ${
            step === 3 || confirmedBookingRef
              ? 'bg-amber-500 text-gray-950 border-amber-400 shadow-lg'
              : 'bg-[#171A21] border-white/10 text-gray-400'
          }`}
        >
          3. Payment & Voucher
        </div>
      </div>

      {!confirmedBookingRef ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form Body (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {step === 1 && (
              <div className="bg-[#171A21] border border-white/10 p-6 rounded-3xl space-y-6 animate-fadeIn">
                <h3 className="text-lg font-serif font-bold text-white">
                  Step 1: Select Stay Dates & Room Type
                </h3>

                {/* Dates Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0F1115] p-4 rounded-2xl border border-white/5 text-xs">
                  <div>
                    <label className="text-gray-400 block mb-1 font-semibold">{t.check_in}</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-[#171A21] border border-white/10 rounded-lg p-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1 font-semibold">{t.check_out}</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-[#171A21] border border-white/10 rounded-lg p-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1 font-semibold">{t.guests_count}</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full bg-[#171A21] border border-white/10 rounded-lg p-2 text-white"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4+ Family</option>
                    </select>
                  </div>
                </div>

                {/* Room Options Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                    Choose Room Category:
                  </label>

                  {roomsData.map((rm) => (
                    <div
                      key={rm.id}
                      onClick={() => setChosenRoomId(rm.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        chosenRoomId === rm.id
                          ? 'bg-amber-500/10 border-amber-400 text-white shadow-lg'
                          : 'bg-[#0F1115] border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={rm.images[0]}
                          alt={rm.name.en}
                          className="w-14 h-14 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-bold text-sm text-white">{rm.name[language] || rm.name.en}</p>
                          <p className="text-xs text-gray-400">{rm.bedType.en} • {rm.sizeSqm}m²</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-amber-400 text-sm">{formatPrice(rm.priceETB)}</p>
                        <p className="text-[10px] text-gray-500">{t.per_night}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleGoToInfo}
                  className="w-full py-3.5 rounded-xl bg-amber-500 text-gray-950 font-bold hover:bg-amber-400 flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleOpenPayment} className="bg-[#171A21] border border-white/10 p-6 rounded-3xl space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-white">
                    Step 2: Guest Details & Enhancements
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-amber-300 hover:underline flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Rooms
                  </button>
                </div>

                {/* Add-ons List */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                    Select Optional Stay Enhancements:
                  </label>
                  
                  <div className="space-y-2">
                    <div
                      onClick={() => toggleAddOn('Daily Breakfast')}
                      className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${
                        selectedAddOns.includes('Daily Breakfast')
                          ? 'bg-amber-500/10 border-amber-400 text-amber-300'
                          : 'bg-[#0F1115] border-white/10 text-gray-400'
                      }`}
                    >
                      <span className="font-semibold">Daily Ethiopian & Continental Breakfast</span>
                      <span className="font-bold">+800 ETB / night</span>
                    </div>

                    <div
                      onClick={() => toggleAddOn('VIP Airport Transfer')}
                      className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${
                        selectedAddOns.includes('VIP Airport Transfer')
                          ? 'bg-amber-500/10 border-amber-400 text-amber-300'
                          : 'bg-[#0F1115] border-white/10 text-gray-400'
                      }`}
                    >
                      <span className="font-semibold">VIP Airport Transfer (Bole ADD)</span>
                      <span className="font-bold">+1,200 ETB flat</span>
                    </div>

                    <div
                      onClick={() => toggleAddOn('Kazi Spa Voucher')}
                      className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${
                        selectedAddOns.includes('Kazi Spa Voucher')
                          ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                          : 'bg-[#0F1115] border-white/10 text-gray-400'
                      }`}
                    >
                      <span className="font-semibold">Kazi Spa Treatment Credit Voucher</span>
                      <span className="font-bold">+1,500 ETB</span>
                    </div>

                    <div
                      onClick={() => toggleAddOn('Late Checkout')}
                      className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${
                        selectedAddOns.includes('Late Checkout')
                          ? 'bg-amber-500/10 border-amber-400 text-amber-300'
                          : 'bg-[#0F1115] border-white/10 text-gray-400'
                      }`}
                    >
                      <span className="font-semibold">Guaranteed Late Check-Out (4 PM)</span>
                      <span className="font-bold">+600 ETB</span>
                    </div>
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="space-y-4 border-t border-white/10 pt-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Primary Guest Information:
                  </h4>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Dr. Abdessamad Kaddouri"
                      className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="guest@example.com"
                        className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Phone Number (Mobile) *</label>
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+251 91 123 4567"
                        className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">
                      Passport / National ID Number <span className="text-gray-500">(Optional - Ethiopian Hotel Regulation Compliance)</span>
                    </label>
                    <input
                      type="text"
                      value={passportId}
                      onChange={(e) => setPassportId(e.target.value)}
                      placeholder="EP-8492019"
                      className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white text-sm font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Special Requests</label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Quiet room, high floor, early check-in preference"
                      rows={2}
                      className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-gray-950 font-bold text-base hover:brightness-110 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Proceed to Payment Gateway ({formatPrice(grandTotalETB)})</span>
                </button>
              </form>
            )}

          </div>

          {/* Booking Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#171A21] border border-amber-500/30 p-6 rounded-3xl space-y-5 sticky top-24 shadow-2xl">
              <h3 className="text-lg font-serif font-bold text-white border-b border-white/10 pb-3">
                Reservation Summary
              </h3>

              <div className="flex items-center gap-3">
                <img
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.name.en}
                  className="w-16 h-16 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <p className="font-bold text-white text-sm">{selectedRoom.name[language] || selectedRoom.name.en}</p>
                  <p className="text-xs text-gray-400">{selectedRoom.bedType.en}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-300 bg-[#0F1115] p-3 rounded-xl border border-white/5">
                <div className="flex justify-between">
                  <span className="text-gray-400">Check-In:</span>
                  <span className="font-semibold text-white">{checkInDate} (from 14:00)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Check-Out:</span>
                  <span className="font-semibold text-white">{checkOutDate} (until 12:00)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="font-semibold text-amber-300">{calculatedNights} Night(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Guests:</span>
                  <span className="font-semibold text-white">{guestCount} Adult(s)</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs border-t border-white/10 pt-3">
                <div className="flex justify-between text-gray-300">
                  <span>Room Rate ({calculatedNights} nights)</span>
                  <span>{formatPrice(roomTotalETB)}</span>
                </div>

                {selectedAddOns.map((addon) => (
                  <div key={addon} className="flex justify-between text-amber-300/90">
                    <span>+ {addon}</span>
                    <span>Included</span>
                  </div>
                ))}

                <div className="flex justify-between text-base font-bold text-white border-t border-white/10 pt-3">
                  <span>Total Due</span>
                  <span className="text-amber-400 text-xl">{formatPrice(grandTotalETB)}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Confirmation & Free Cancellation included.</span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Final Voucher Printable Screen */
        <div className="max-w-2xl mx-auto bg-[#171A21] border border-amber-500/40 rounded-3xl p-8 space-y-6 text-center shadow-2xl animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-serif font-bold text-white">
            Eyana Hotel Official Voucher
          </h2>

          <div className="bg-[#0F1115] border border-white/10 rounded-2xl p-6 text-left space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-amber-400 font-bold text-base">Booking Reference: {confirmedBookingRef}</span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-sans text-[10px] font-bold uppercase">PAID & CONFIRMED</span>
            </div>

            <p className="text-gray-300"><strong className="text-white">Guest:</strong> {guestName}</p>
            <p className="text-gray-300"><strong className="text-white">Email:</strong> {guestEmail}</p>
            <p className="text-gray-300"><strong className="text-white">Room:</strong> {selectedRoom.name.en}</p>
            <p className="text-gray-300"><strong className="text-white">Check-in:</strong> {checkInDate} (14:00)</p>
            <p className="text-gray-300"><strong className="text-white">Check-out:</strong> {checkOutDate} (12:00)</p>
            <p className="text-gray-300"><strong className="text-white">Total Amount Paid:</strong> {formatPrice(grandTotalETB)}</p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF Voucher</span>
            </button>

            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-sm"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        room={selectedRoom}
        totalNights={calculatedNights}
        totalPriceETB={grandTotalETB}
        guestName={guestName}
        guestEmail={guestEmail}
        guestPhone={guestPhone}
        passportOrId={passportId}
        checkIn={checkInDate}
        checkOut={checkOutDate}
        guests={guestCount}
        addOns={selectedAddOns}
        onSuccess={(ref) => {
          setConfirmedBookingRef(ref);
          setStep(3);
        }}
      />

    </div>
  );
}
