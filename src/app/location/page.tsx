'use client';

import React, { useState } from 'react';
import { MapPin, Bus, Phone, Mail, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function LocationPage() {
  const [shuttleName, setShuttleName] = useState('');
  const [shuttleFlight, setShuttleFlight] = useState('');
  const [shuttleDate, setShuttleDate] = useState('');
  const [isRequested, setIsRequested] = useState(false);

  const handleShuttleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shuttleName || !shuttleFlight) return;
    setIsRequested(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Kirkos Sub-City, Addis Ababa</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
          Location & Airport Transfer
        </h1>
        <p className="text-gray-400 text-sm">
          Centrally positioned near Meskel Square, ECA Conference Centre, and 15 minutes from Bole International Airport (ADD).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Map & Landmark Info (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#171A21] border border-white/10 rounded-3xl overflow-hidden h-96 shadow-2xl relative">
            <iframe
              title="Eyana Hotel Interactive Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15762.673891823974!2d38.7512!3d9.0105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMzcuOCJOIDM4wrA0NScwNC4zIkU!5e0!3m2!1sen!2set!4v1620000000000!5m2!1sen!2set"
              className="w-full h-full filter brightness-90 contrast-125"
              loading="lazy"
            ></iframe>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#171A21] p-4 rounded-xl border border-white/10 space-y-1">
              <span className="font-bold text-amber-400 block text-sm">Meskel Square</span>
              <span className="text-gray-400">1.2 km • 5 Min Drive</span>
            </div>
            <div className="bg-[#171A21] p-4 rounded-xl border border-white/10 space-y-1">
              <span className="font-bold text-amber-400 block text-sm">Bole Airport (ADD)</span>
              <span className="text-gray-400">6.8 km • 15 Min Shuttle</span>
            </div>
            <div className="bg-[#171A21] p-4 rounded-xl border border-white/10 space-y-1">
              <span className="font-bold text-amber-400 block text-sm">UN-ECA Centre</span>
              <span className="text-gray-400">2.5 km • 8 Min Drive</span>
            </div>
          </div>
        </div>

        {/* Airport Shuttle Request (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#171A21] border border-amber-500/30 p-8 rounded-3xl space-y-6 shadow-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
              <Bus className="w-4 h-4" />
              <span>Airport Shuttle Request</span>
            </div>

            <h3 className="text-xl font-serif font-bold text-white">
              Reserve Bole Airport Pickup
            </h3>

            {!isRequested ? (
              <form onSubmit={handleShuttleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-gray-300 block mb-1 font-semibold">Guest Name *</label>
                  <input
                    type="text"
                    value={shuttleName}
                    onChange={(e) => setShuttleName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1 font-semibold">Flight Number *</label>
                  <input
                    type="text"
                    value={shuttleFlight}
                    onChange={(e) => setShuttleFlight(e.target.value)}
                    placeholder="e.g. ET 702 / MS 841"
                    className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1 font-semibold">Arrival Date & Time</label>
                  <input
                    type="datetime-local"
                    value={shuttleDate}
                    onChange={(e) => setShuttleDate(e.target.value)}
                    className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-gray-950 font-bold text-sm hover:brightness-110 shadow-lg"
                >
                  Send Shuttle Transfer Request
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold text-white">Shuttle Request Confirmed</h4>
                <p className="text-xs text-gray-300">
                  Our driver will monitor flight <strong>{shuttleFlight}</strong> and meet you at the Bole International Airport arrival hall with an Eyana Hotel sign.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
