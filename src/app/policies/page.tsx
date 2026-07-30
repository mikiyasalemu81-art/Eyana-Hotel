'use client';

import React from 'react';
import { Shield, FileText, Lock, AlertTriangle } from 'lucide-react';

export default function PoliciesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-gray-300">
      
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Legal & Guest Compliance</span>
        </div>
        <h1 className="text-4xl font-serif font-bold text-white">
          Hotel Policies & Terms of Service
        </h1>
        <p className="text-xs text-gray-400">
          Required for payment gateway compliance (Chapa, Telebirr, Stripe) and Ethiopian guest registration regulations.
        </p>
      </div>

      {/* Cancellation Policy */}
      <section id="cancellation" className="bg-[#171A21] border border-white/10 p-8 rounded-3xl space-y-4 shadow-xl">
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-400" />
          <span>1. Cancellation & Refund Policy</span>
        </h2>
        <ul className="list-disc list-inside text-sm space-y-2 leading-relaxed">
          <li><strong>Free Cancellation:</strong> Bookings cancelled at least 24 hours prior to scheduled check-in (14:00 local time) are eligible for a 100% full refund via the original payment method.</li>
          <li><strong>Late Cancellations & No-Shows:</strong> Cancellations made within 24 hours of check-in will be charged a fee equal to 1 night stay.</li>
          <li><strong>Refund Processing:</strong> Mobile money refunds (Telebirr, Chapa) are processed within 24 hours. International credit card refunds (Stripe) may take 3-5 business days depending on the issuing bank.</li>
        </ul>
      </section>

      {/* Privacy & ID Compliance */}
      <section className="bg-[#171A21] border border-white/10 p-8 rounded-3xl space-y-4 shadow-xl">
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-400" />
          <span>2. Privacy & Guest ID Registration</span>
        </h2>
        <p className="text-sm leading-relaxed">
          Under Ethiopian Federal Hotel & Tourism Regulations, all lodging guests are required to present a valid national ID card, passport, or diplomatic credentials upon physical check-in.
        </p>
        <p className="text-sm leading-relaxed">
          Eyana Hotel adheres strictly to data privacy standards. Personal information collected during online booking or check-in is stored securely and used exclusively for guest registration and security verification.
        </p>
      </section>

      {/* House Rules */}
      <section className="bg-[#171A21] border border-white/10 p-8 rounded-3xl space-y-4 shadow-xl">
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>3. House Rules & Check-In Times</span>
        </h2>
        <ul className="list-disc list-inside text-sm space-y-2 leading-relaxed">
          <li><strong>Check-in Time:</strong> 14:00 (2:00 PM local time). Early check-in available upon request.</li>
          <li><strong>Check-out Time:</strong> 12:00 (12:00 PM noon local time). Late check-out until 16:00 available as a stay enhancement.</li>
          <li><strong>Smoking Policy:</strong> Non-smoking inside all guest bedrooms and common hallways. Designated smoking balconies available.</li>
          <li><strong>Pets:</strong> Pets are not permitted on hotel premises, with the exception of certified service animals.</li>
        </ul>
      </section>

    </div>
  );
}
