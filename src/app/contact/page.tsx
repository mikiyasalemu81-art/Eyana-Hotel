'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, ExternalLink, CheckCircle2, Clock } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase">
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>24/7 Guest Desk Support</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
          Contact Eyana Hotel
        </h1>
        <p className="text-gray-400 text-sm">
          We are available 24/7 for booking inquiries, airport shuttle coordination, and special requests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#171A21] border border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-xl font-serif font-bold text-white">Direct Channels</h3>

            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Hotel Address:</strong>
                  Kirkos Sub-City, Near Meskel Square, Addis Ababa, Ethiopia
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <strong className="text-white block">Front Desk Phone:</strong>
                  <a href="tel:+251911234567" className="hover:text-amber-300 font-mono">+251 91 123 4567</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-white block">WhatsApp Booking Assistant:</strong>
                  <a href="https://wa.me/251911234567" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1 font-mono">
                    +251 91 123 4567 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <strong className="text-white block">Reservations Email:</strong>
                  <a href="mailto:reservations@eyanahotel.com" className="hover:text-amber-300">reservations@eyanahotel.com</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <strong className="text-white block">Front Desk & Kazi Spa Hours:</strong>
                  Open 24 Hours / 7 Days a Week
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Inquiry Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-[#171A21] border border-amber-500/30 p-8 rounded-3xl space-y-6 shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-white">Send Us a Direct Message</h3>

            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 block mb-1 font-semibold">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tariq Al-Mansoor"
                      className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1 font-semibold">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="guest@example.com"
                      className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 block mb-1 font-semibold">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Group Booking / Long Stay Rate"
                    className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1 font-semibold">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Write your inquiry or request here..."
                    className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-gray-950 font-bold text-sm hover:brightness-110 shadow-lg"
                >
                  Send Inquiry to Eyana Front Desk
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif font-bold text-white">Message Dispatched</h4>
                <p className="text-xs text-gray-300">
                  Thank you! Our front desk team will reply to <strong>{email}</strong> within 1 hour.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
