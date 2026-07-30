'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBookingStore } from '@/lib/store/bookingStore';
import { translations } from '@/lib/i18n/dict';
import { Language, Currency } from '@/lib/types';
import { 
  Building2, 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  CalendarCheck, 
  DollarSign, 
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { language, setLanguage, currency, setCurrency } = useBookingStore();
  const t = translations[language];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [currDropdown, setCurrDropdown] = useState(false);

  const navLinks = [
    { href: '/', label: t.nav_home },
    { href: '/rooms', label: t.nav_rooms },
    { href: '/booking', label: t.nav_booking },
    { href: '/spa', label: t.nav_spa },
    { href: '/gallery', label: t.nav_gallery },
    { href: '/amenities', label: t.nav_amenities },
    { href: '/location', label: t.nav_location },
    { href: '/reviews', label: t.nav_reviews },
    { href: '/admin', label: t.nav_admin, badge: 'Staff' },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'am', label: 'አማርኛ (Amharic)', flag: '🇪🇹' },
    { code: 'ar', label: 'العربية (Arabic - RTL)', flag: '🇸🇦' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  const currencies: { code: Currency; label: string }[] = [
    { code: 'ETB', label: 'ETB (Birr)' },
    { code: 'USD', label: 'USD ($)' },
    { code: 'EUR', label: 'EUR (€)' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0F1115]/95 backdrop-blur-md border-b border-[#D4AF37]/20 text-white shadow-xl transition-all">
      {/* Top Utility Bar */}
      <div className="bg-[#171A21] border-b border-white/5 py-1.5 px-4 text-xs font-medium text-amber-200/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Kirkos, Addis Ababa • 15 Mins from Bole Airport
            </span>
            <span className="hidden md:inline-block text-white/30">|</span>
            <a href="tel:+251911234567" className="hidden md:flex items-center gap-1 hover:text-amber-400 transition-colors">
              <PhoneCall className="w-3.5 h-3.5" /> +251 91 123 4567
            </a>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => { setCurrDropdown(!currDropdown); setLangDropdown(false); }}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <DollarSign className="w-3 h-3 text-amber-400" />
                <span>{currency}</span>
              </button>

              {currDropdown && (
                <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-1 w-32 bg-[#1C202B] border border-amber-500/20 rounded-lg shadow-2xl py-1 z-50">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c.code); setCurrDropdown(false); }}
                      className={`w-full text-left rtl:text-right px-3 py-1.5 hover:bg-amber-500/10 text-xs ${currency === c.code ? 'text-amber-400 font-bold' : 'text-gray-300'}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => { setLangDropdown(!langDropdown); setCurrDropdown(false); }}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 transition-colors"
              >
                <Globe className="w-3 h-3 text-amber-400" />
                <span className="uppercase">{language}</span>
              </button>

              {langDropdown && (
                <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-1 w-48 bg-[#1C202B] border border-amber-500/20 rounded-lg shadow-2xl py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setLangDropdown(false); }}
                      className={`w-full text-left rtl:text-right px-3 py-2 flex items-center justify-between hover:bg-amber-500/10 text-xs ${language === l.code ? 'text-amber-400 font-bold bg-amber-500/5' : 'text-gray-300'}`}
                    >
                      <span>{l.label}</span>
                      <span>{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] flex items-center justify-center text-gray-950 font-bold shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xl font-serif tracking-wide font-bold bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 bg-clip-text text-transparent">
              EYANA HOTEL
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-amber-200/60 font-sans">
              Addis Ababa • Ethiopia
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="text-[9px] bg-amber-400 text-gray-950 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/booking"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-gray-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <CalendarCheck className="w-4 h-4" />
            {t.nav_booking}
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-amber-300 hover:bg-white/10"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#171A21] border-b border-amber-500/20 px-4 py-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                pathname === link.href
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] bg-amber-400 text-gray-950 px-2 py-0.5 rounded font-bold uppercase">
                    {link.badge}
                  </span>
                )}
              </div>
            </Link>
          ))}
          
          <div className="pt-4 border-t border-white/10">
            <Link
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-gray-950 font-bold text-center block shadow-lg"
            >
              {t.nav_booking}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
