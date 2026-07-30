'use client';

import React from 'react';
import Link from 'next/link';
import { useBookingStore } from '@/lib/store/bookingStore';
import { translations } from '@/lib/i18n/dict';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Shield, 
  FileText, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useBookingStore();
  const t = translations[language];

  return (
    <footer className="bg-[#0A0C0F] text-gray-400 border-t border-[#D4AF37]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        
        {/* Brand & Overview */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-gray-950 font-bold shadow-lg">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-lg font-serif font-bold text-amber-200">EYANA HOTEL</span>
              <span className="block text-xs text-amber-200/60 uppercase tracking-wider">Addis Ababa • Ethiopia</span>
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            3-Star boutique hotel situated in Kirkos, Addis Ababa. Offering authentic Ethiopian hospitality, luxurious rooms, 24-hour Kazi Spa, and high-speed Wi-Fi near Meskel Square.
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg w-fit">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Google Places 3.8★ (95 Reviews) • Tripadvisor 4.3★
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="space-y-3">
          <h4 className="text-white font-serif font-semibold text-base border-l-2 border-amber-400 rtl:border-l-0 rtl:border-r-2 px-2">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/rooms" className="hover:text-amber-300 transition-colors">Rooms & Accommodations</Link></li>
            <li><Link href="/booking" className="hover:text-amber-300 transition-colors">Direct Booking Engine</Link></li>
            <li><Link href="/spa" className="hover:text-amber-300 transition-colors">Kazi Beauty Salon & Spa</Link></li>
            <li><Link href="/gallery" className="hover:text-amber-300 transition-colors">Photo Gallery</Link></li>
            <li><Link href="/amenities" className="hover:text-amber-300 transition-colors">Amenities & Services</Link></li>
            <li><Link href="/location" className="hover:text-amber-300 transition-colors">Neighborhood & Airport Info</Link></li>
            <li><Link href="/blog" className="hover:text-amber-300 transition-colors">Local Travel Guides</Link></li>
          </ul>
        </div>

        {/* Contact Info & Location */}
        <div className="space-y-3">
          <h4 className="text-white font-serif font-semibold text-base border-l-2 border-amber-400 rtl:border-l-0 rtl:border-r-2 px-2">
            Contact & Directions
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Kirkos Sub-City, Near Meskel Square, Addis Ababa, Ethiopia</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <a href="tel:+251911234567" className="hover:text-amber-300">+251 91 123 4567</a>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href="https://wa.me/251911234567" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                WhatsApp Booking Chat <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href="mailto:reservations@eyanahotel.com" className="hover:text-amber-300">reservations@eyanahotel.com</a>
            </li>
          </ul>
        </div>

        {/* Payment Gateways & Compliance */}
        <div className="space-y-4">
          <h4 className="text-white font-serif font-semibold text-base border-l-2 border-amber-400 rtl:border-l-0 rtl:border-r-2 px-2">
            Accepted Payments
          </h4>
          <p className="text-xs text-gray-400">
            We accept local Ethiopian mobile money and international payment rails seamlessly:
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-semibold text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Chapa
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Telebirr
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-semibold text-blue-300">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span> CBE Birr
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-semibold text-purple-300">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span> Stripe Card
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4 text-xs">
            <Link href="/policies" className="hover:text-amber-300 underline flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Privacy & ID Policy
            </Link>
            <Link href="/policies#cancellation" className="hover:text-amber-300 underline flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> Refund Policy
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>{t.footer_rights}</p>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Link href="/policies" className="hover:text-gray-300">Terms of Service</Link>
          <span>•</span>
          <Link href="/policies" className="hover:text-gray-300">Privacy Policy</Link>
          <span>•</span>
          <Link href="/admin" className="text-amber-400/80 hover:text-amber-300 font-semibold">Staff Portal Login</Link>
        </div>
      </div>
    </footer>
  );
};
