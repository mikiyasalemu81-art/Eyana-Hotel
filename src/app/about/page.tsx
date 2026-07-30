'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase">
          <Building2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
          About Eyana Hotel
        </h1>
        <p className="text-gray-400 text-sm">
          A blend of modern boutique luxury and authentic Ethiopian warmth in Kirkos, Addis Ababa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <h2 className="text-2xl font-serif font-bold text-white">
            Rooted in Addis Ababa Hospitality
          </h2>
          <p>
            Eyana Hotel was established to offer business leaders, international diplomats, NGO representatives, and leisure travelers a sanctuary of peace in Kirkos sub-city.
          </p>
          <p>
            Located minutes from Meskel Square, Bole International Airport, and UN-ECA, we combine world-class amenities—including high-speed fiber Wi-Fi, 24-hour room service, and the acclaimed Kazi Beauty Salon & Spa—with personalized service that makes every guest feel at home.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4">
            <div className="bg-[#171A21] p-4 rounded-xl border border-white/10 space-y-1">
              <span className="block text-xl font-serif font-bold text-amber-400">3-Star Rated</span>
              <span className="text-xs text-gray-400">Official Ethiopian Tourism Classification</span>
            </div>
            <div className="bg-[#171A21] p-4 rounded-xl border border-white/10 space-y-1">
              <span className="block text-xl font-serif font-bold text-emerald-400">24/7 Service</span>
              <span className="text-xs text-gray-400">Round-the-clock Desk & Spa</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
            alt="Eyana Hotel Building"
            className="rounded-3xl border border-white/10 shadow-2xl w-full h-96 object-cover"
          />
        </div>
      </div>

    </div>
  );
}
