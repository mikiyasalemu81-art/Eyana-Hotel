'use client';

import React, { useState } from 'react';
import { useBookingStore } from '@/lib/store/bookingStore';
import { roomsData } from '@/lib/data/rooms';
import { Booking } from '@/lib/types';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Plus, 
  Lock, 
  ShieldAlert,
  Search,
  Filter,
  Sparkles,
  BedDouble
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    bookings,
    updateBookingStatus,
    blackoutDates,
    addBlackoutDate,
    removeBlackoutDate,
    reviews,
    formatPrice,
    adminRole,
    setAdminRole,
    addBooking,
  } = useBookingStore();

  const [activeTab, setActiveTab] = useState<'bookings' | 'rates' | 'reviews'>('bookings');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [newBlackout, setNewBlackout] = useState('');

  // Manual Walk-in Modal State
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualRoomId, setManualRoomId] = useState(roomsData[0].id);
  const [manualGuestName, setManualGuestName] = useState('');
  const [manualGuestEmail, setManualGuestEmail] = useState('');
  const [manualGuestPhone, setManualGuestPhone] = useState('');
  const [manualNights, setManualNights] = useState(1);

  // Compute Metrics
  const totalBookingsCount = bookings.length;
  const totalRevenueETB = bookings.reduce((acc, b) => acc + (b.paymentStatus === 'paid' ? b.totalPriceETB : 0), 0);
  const activeCheckIns = bookings.filter((b) => b.bookingStatus === 'checked_in').length;
  const confirmedArrivals = bookings.filter((b) => b.bookingStatus === 'confirmed').length;

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'all') return true;
    return b.bookingStatus === statusFilter;
  });

  const handleAddManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const rm = roomsData.find((r) => r.id === manualRoomId) || roomsData[0];
    const today = new Date().toISOString().split('T')[0];
    const checkOut = new Date(Date.now() + 86400000 * manualNights).toISOString().split('T')[0];

    addBooking({
      roomId: rm.id,
      roomName: rm.name.en,
      checkIn: today,
      checkOut: checkOut,
      guests: 2,
      totalNights: manualNights,
      totalPriceETB: rm.priceETB * manualNights,
      guestName: manualGuestName,
      guestEmail: manualGuestEmail || 'frontdesk@eyanahotel.com',
      guestPhone: manualGuestPhone,
      paymentMethod: 'chapa',
      paymentStatus: 'paid',
      bookingStatus: 'checked_in',
    });

    setIsManualModalOpen(false);
    setManualGuestName('');
    setManualGuestPhone('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      
      {/* Header & Role Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">Eyana Hotel Management System</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Staff Admin Dashboard</h1>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-3 bg-[#171A21] p-1.5 rounded-xl border border-white/10 text-xs">
          <span className="text-gray-400 px-2 font-medium">Role:</span>
          <button
            onClick={() => setAdminRole('admin')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              adminRole === 'admin' ? 'bg-amber-500 text-gray-950 shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Hotel Manager (Admin)
          </button>
          <button
            onClick={() => setAdminRole('frontdesk')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              adminRole === 'frontdesk' ? 'bg-amber-500 text-gray-950 shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Front-Desk Staff
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#171A21] border border-white/10 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Current Occupancy</span>
            <BedDouble className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-serif font-bold text-white">
            {activeCheckIns} <span className="text-sm font-sans font-normal text-gray-400">/ 24 Rooms</span>
          </p>
          <p className="text-[11px] text-emerald-400 font-medium">78% Occupancy Rate</p>
        </div>

        <div className="bg-[#171A21] border border-white/10 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Total Logged Revenue</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-serif font-bold text-amber-400">
            {formatPrice(totalRevenueETB)}
          </p>
          <p className="text-[11px] text-gray-400">From {totalBookingsCount} Reservations</p>
        </div>

        <div className="bg-[#171A21] border border-white/10 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Upcoming Arrivals</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-3xl font-serif font-bold text-white">{confirmedArrivals}</p>
          <p className="text-[11px] text-blue-300">Ready for Check-In Today</p>
        </div>

        <div className="bg-[#171A21] border border-white/10 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Guest Reviews</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-serif font-bold text-white">{reviews.length}</p>
          <p className="text-[11px] text-purple-300">3.8★ Google Places Baseline</p>
        </div>

      </div>

      {/* Dashboard Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'bookings' ? 'bg-amber-500 text-gray-950' : 'bg-[#171A21] text-gray-400 hover:text-white'
            }`}
          >
            Reservations Manager ({bookings.length})
          </button>
          {adminRole === 'admin' && (
            <>
              <button
                onClick={() => setActiveTab('rates')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'rates' ? 'bg-amber-500 text-gray-950' : 'bg-[#171A21] text-gray-400 hover:text-white'
                }`}
              >
                Rates & Date Blackouts
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'reviews' ? 'bg-amber-500 text-gray-950' : 'bg-[#171A21] text-gray-400 hover:text-white'
                }`}
              >
                Review Moderation
              </button>
            </>
          )}
        </div>

        {activeTab === 'bookings' && (
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-gray-950 font-bold text-xs flex items-center gap-1.5 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Record Walk-In Reservation</span>
          </button>
        )}
      </div>

      {/* TAB 1: RESERVATIONS MANAGER */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          
          {/* Status Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">Filter Status:</span>
            {['all', 'confirmed', 'checked_in', 'checked_out', 'cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-bold capitalize transition-all ${
                  statusFilter === st ? 'bg-white/15 text-amber-300' : 'bg-[#171A21] text-gray-400 hover:text-white'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Bookings Table */}
          <div className="bg-[#171A21] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#0F1115] text-amber-300 uppercase tracking-wider font-bold border-b border-white/10">
                  <tr>
                    <th className="p-4">Ref Code</th>
                    <th className="p-4">Guest Name</th>
                    <th className="p-4">Room Type</th>
                    <th className="p-4">Stay Dates</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono font-bold text-amber-400">{b.bookingRef}</td>
                      <td className="p-4 font-semibold text-white">
                        {b.guestName}
                        <span className="block text-[10px] text-gray-500 font-sans">{b.guestPhone}</span>
                      </td>
                      <td className="p-4">{b.roomName}</td>
                      <td className="p-4 font-mono">
                        {b.checkIn} → {b.checkOut}
                        <span className="block text-[10px] text-gray-500 font-sans">{b.totalNights} Night(s)</span>
                      </td>
                      <td className="p-4 font-bold text-white">
                        {formatPrice(b.totalPriceETB)}
                        <span className="block text-[10px] text-emerald-400 font-normal uppercase">{b.paymentMethod}</span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            b.bookingStatus === 'confirmed'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : b.bookingStatus === 'checked_in'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : b.bookingStatus === 'checked_out'
                              ? 'bg-gray-500/20 text-gray-300'
                              : 'bg-red-500/20 text-red-300'
                          }`}
                        >
                          {b.bookingStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1">
                        {b.bookingStatus === 'confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'checked_in')}
                            className="px-2.5 py-1 rounded bg-emerald-500 text-gray-950 font-bold text-[10px] hover:bg-emerald-400"
                          >
                            Check In
                          </button>
                        )}
                        {b.bookingStatus === 'checked_in' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'checked_out')}
                            className="px-2.5 py-1 rounded bg-blue-500 text-white font-bold text-[10px] hover:bg-blue-400"
                          >
                            Check Out
                          </button>
                        )}
                        {b.bookingStatus !== 'cancelled' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'cancelled', 'refunded')}
                            className="px-2 py-1 rounded bg-red-500/20 text-red-300 font-bold text-[10px] hover:bg-red-500/30"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RATES & BLACKOUTS */}
      {activeTab === 'rates' && adminRole === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Blackout Dates */}
          <div className="bg-[#171A21] border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Date Blackout Locks (Maintenance & Events)</span>
            </h3>

            <div className="flex gap-2">
              <input
                type="date"
                value={newBlackout}
                onChange={(e) => setNewBlackout(e.target.value)}
                className="bg-[#0F1115] border border-white/10 rounded-xl p-2.5 text-white text-xs"
              />
              <button
                onClick={() => {
                  if (newBlackout) {
                    addBlackoutDate(newBlackout);
                    setNewBlackout('');
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-500 text-gray-950 font-bold text-xs"
              >
                Block Date
              </button>
            </div>

            <div className="space-y-2 pt-2">
              {blackoutDates.map((d) => (
                <div key={d} className="p-3 bg-[#0F1115] rounded-xl border border-white/5 flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-300">{d}</span>
                  <button
                    onClick={() => removeBlackoutDate(d)}
                    className="text-red-400 hover:underline font-semibold"
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Base Rate Overrides */}
          <div className="bg-[#171A21] border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-serif font-bold text-white">
              Room Base Nightly Rates
            </h3>

            <div className="space-y-3">
              {roomsData.map((rm) => (
                <div key={rm.id} className="p-3 bg-[#0F1115] rounded-xl border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">{rm.name.en}</p>
                    <p className="text-[10px] text-gray-500">{rm.bedType.en}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-amber-400">{formatPrice(rm.priceETB)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Manual Booking Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#171A21] border border-amber-500/30 rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl">
            <h3 className="text-lg font-serif font-bold">Record Walk-in / Phone Reservation</h3>

            <form onSubmit={handleAddManualBooking} className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 font-semibold text-gray-300">Room Category</label>
                <select
                  value={manualRoomId}
                  onChange={(e) => setManualRoomId(e.target.value)}
                  className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-2.5 text-white"
                >
                  {roomsData.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name.en} ({formatPrice(r.priceETB)}/night)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-300">Guest Name *</label>
                <input
                  type="text"
                  value={manualGuestName}
                  onChange={(e) => setManualGuestName(e.target.value)}
                  placeholder="e.g. Solomon Girma"
                  className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-2.5 text-white"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-300">Guest Phone *</label>
                <input
                  type="tel"
                  value={manualGuestPhone}
                  onChange={(e) => setManualGuestPhone(e.target.value)}
                  placeholder="+251 91 111 2233"
                  className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-2.5 text-white"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-300">Number of Nights</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={manualNights}
                  onChange={(e) => setManualNights(Number(e.target.value))}
                  className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-500 text-gray-950 font-bold"
                >
                  Save & Check In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
