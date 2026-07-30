'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useBookingStore } from '@/lib/store/bookingStore';
import { Room } from '@/lib/types';
import { 
  X, 
  Smartphone, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room;
  totalNights: number;
  totalPriceETB: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  passportOrId?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  addOns: string[];
  onSuccess: (bookingRef: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  room,
  totalNights,
  totalPriceETB,
  guestName,
  guestEmail,
  guestPhone,
  passportOrId,
  checkIn,
  checkOut,
  guests,
  addOns,
  onSuccess,
}) => {
  const { addBooking, formatPrice, language } = useBookingStore();
  const [method, setMethod] = useState<'chapa' | 'telebirr' | 'cbe_birr' | 'stripe'>('chapa');
  const [phoneNumber, setPhoneNumber] = useState(guestPhone || '+251 9');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [generatedRef, setGeneratedRef] = useState('');

  if (!isOpen) return null;

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const created = addBooking({
        roomId: room.id,
        roomName: room.name.en,
        checkIn,
        checkOut,
        guests,
        totalNights,
        totalPriceETB,
        guestName,
        guestEmail,
        guestPhone: phoneNumber || guestPhone,
        passportOrId,
        paymentMethod: method,
        paymentStatus: 'paid',
        bookingStatus: 'confirmed',
        addOns,
      });

      setGeneratedRef(created.bookingRef);
      setIsProcessing(false);
      setIsCompleted(true);

      // Trigger celebratory confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#171A21] border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 text-white relative shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <>
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs uppercase font-bold tracking-widest">PCI-DSS Compliant Secure Payment</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">
              Complete Your Eyana Reservation
            </h3>

            {/* Price Summary */}
            <div className="bg-[#0F1115] border border-white/10 rounded-xl p-4 mb-5 flex justify-between items-center">
              <div>
                <p className="font-semibold text-amber-200">{room.name[language] || room.name.en}</p>
                <p className="text-xs text-gray-400">{totalNights} Nights • {guests} Guests</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Total Amount</p>
                <p className="text-lg font-bold text-amber-400">{formatPrice(totalPriceETB)}</p>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-4 gap-2 mb-5">
              <button
                type="button"
                onClick={() => setMethod('chapa')}
                className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center ${
                  method === 'chapa'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                Chapa
              </button>
              <button
                type="button"
                onClick={() => setMethod('telebirr')}
                className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center ${
                  method === 'telebirr'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                Telebirr
              </button>
              <button
                type="button"
                onClick={() => setMethod('cbe_birr')}
                className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center ${
                  method === 'cbe_birr'
                    ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                CBE Birr
              </button>
              <button
                type="button"
                onClick={() => setMethod('stripe')}
                className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center ${
                  method === 'stripe'
                    ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                Stripe Card
              </button>
            </div>

            {/* Dynamic Gateway Form */}
            <form onSubmit={handleExecutePayment} className="space-y-4">
              {method !== 'stripe' ? (
                <div className="space-y-3 bg-[#0F1115] p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-xs text-amber-300">
                    <Smartphone className="w-4 h-4" />
                    <span>Enter {method.toUpperCase()} Registered Phone Number</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-[#171A21] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                    placeholder="+251 91 123 4567"
                    required
                  />
                  <p className="text-[11px] text-gray-400">
                    A USSD / PIN payment prompt will be pushed to your phone.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 bg-[#0F1115] p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-xs text-purple-300">
                    <CreditCard className="w-4 h-4" />
                    <span>International Visa / Mastercard</span>
                  </div>
                  <input
                    type="text"
                    placeholder="4000 1234 5678 9010"
                    className="w-full bg-[#171A21] border border-white/10 rounded-xl px-4 py-2 text-white font-mono text-sm"
                    required
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="bg-[#171A21] border border-white/10 rounded-xl px-3 py-2 text-white text-xs font-mono"
                      required
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="bg-[#171A21] border border-white/10 rounded-xl px-3 py-2 text-white text-xs font-mono"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-gray-950 font-bold text-base hover:brightness-110 flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Processing Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay {formatPrice(totalPriceETB)} Now</span>
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-white">
              Booking Confirmed!
            </h3>
            <p className="text-sm text-gray-300">
              Thank you, <strong className="text-amber-300">{guestName}</strong>. Your reservation at Eyana Hotel has been logged and paid.
            </p>

            <div className="bg-[#0F1115] border border-amber-500/20 rounded-xl p-4 text-left font-mono text-xs space-y-1">
              <p className="text-amber-400 font-bold text-sm">Booking Ref: {generatedRef}</p>
              <p className="text-gray-400">Room: {room.name.en}</p>
              <p className="text-gray-400">Dates: {checkIn} to {checkOut}</p>
              <p className="text-gray-400">Paid via: {method.toUpperCase()}</p>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>A confirmation email & SMS receipt has been dispatched to {guestEmail}.</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onSuccess(generatedRef);
              }}
              className="w-full py-3 rounded-xl bg-amber-500 text-gray-950 font-bold hover:bg-amber-400 flex items-center justify-center gap-2"
            >
              <span>View Full Printable Voucher</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
