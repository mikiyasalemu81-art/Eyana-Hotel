'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBookingStore } from '@/lib/store/bookingStore';
import { translations } from '@/lib/i18n/dict';
import { roomsData } from '@/lib/data/rooms';
import { hotelAmenities } from '@/lib/data/amenities';
import { spaServicesData } from '@/lib/data/spa';
import { BookingSearchWidget } from '@/components/BookingSearchWidget';
import {
  Sparkles,
  BedDouble,
  MapPin,
  Star,
  ShieldCheck,
  ArrowRight,
  Wifi,
  Bus,
  UtensilsCrossed,
  Clock,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

export default function HomePage() {
  const { language, formatPrice, setSelectedRoomId, reviews } = useBookingStore();
  const t = translations[language];

  const featuredRooms = roomsData.filter((r) => r.featured || r.popular);
  const featuredAmenities = hotelAmenities.filter((a) => a.featured);
  const featuredReviews = reviews.filter((r) => r.featured);

  return (
    <div className="space-y-20 pb-16">

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-16 pb-24 px-4 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hr-exterior.jpg"
            alt="Eyana Hotel Building Exterior"
            className="w-full h-full object-cover object-center filter brightness-[0.38] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-lg animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.hero_badge}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
            {t.hero_title}
          </h1>

          <p className="text-base md:text-xl text-amber-100/90 font-sans max-w-2xl mx-auto font-light leading-relaxed">
            {t.hero_subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/booking"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E6CA65] to-[#B8860B] hover:brightness-110 text-gray-950 font-bold text-base shadow-xl shadow-amber-500/25 flex items-center gap-2 transform hover:-translate-y-1 transition-all"
            >
              <span>{t.book_now}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/spa"
              className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>{t.explore_spa}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* AVAILABILITY SEARCH WIDGET */}
      <section className="px-4 max-w-7xl mx-auto">
        <BookingSearchWidget />
      </section>

      {/* HOTEL OVERVIEW & STORY */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs uppercase font-bold tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Hospitality Excellence</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
            {t.overview_title}
          </h2>

          <p className="text-gray-300 text-base leading-relaxed">
            {t.overview_text}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-[#171A21] p-4 rounded-xl border border-white/10">
              <span className="block text-2xl font-serif font-bold text-amber-400">15 Mins</span>
              <span className="text-xs text-gray-400">To Bole International Airport</span>
            </div>
            <div className="bg-[#171A21] p-4 rounded-xl border border-white/10">
              <span className="block text-2xl font-serif font-bold text-emerald-400">24 Hours</span>
              <span className="text-xs text-gray-400">On-Site Kazi Spa & Dining</span>
            </div>
          </div>

          <div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-amber-300 font-semibold hover:text-amber-200 text-sm group"
            >
              <span>Learn more about our amenities and staff story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Overview Photo Grid */}
        <div className="grid grid-cols-2 gap-4 relative">
          <img
            src="/images/hotel-lobby.jpg"
            alt="Eyana Hotel Lobby Lounge"
            className="rounded-2xl shadow-xl w-full h-64 object-cover border border-white/10"
          />
          <img
            src="/images/hr-bedroom-1.jpg"
            alt="Deluxe Room Bed"
            className="rounded-2xl shadow-xl w-full h-64 object-cover border border-white/10 mt-8"
          />
        </div>
      </section>

      {/* FEATURED ROOMS ACCOMMODATIONS */}
      <section className="bg-[#12151C] py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 space-y-12">

          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              {t.featured_rooms_title}
            </h2>
            <p className="text-gray-400 text-sm">
              {t.featured_rooms_sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-[#171A21] border border-white/10 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-xl group transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.name.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#0F1115]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-amber-500/30">
                    {formatPrice(room.priceETB)} {t.per_night}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white mb-1">
                      {room.name[language] || room.name.en}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {room.description[language] || room.description.en}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-amber-200/80 border-t border-white/10 pt-3">
                    <span>{room.bedType[language] || room.bedType.en}</span>
                    <span>{room.sizeSqm} m²</span>
                    <span>Max {room.capacity} Guests</span>
                  </div>

                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <Link
                      href={`/rooms/${room.slug}`}
                      className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs text-center transition-colors"
                    >
                      {t.view_details}
                    </Link>

                    <Link
                      href="/booking"
                      onClick={() => setSelectedRoomId(room.id)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-gray-950 font-bold text-xs text-center hover:brightness-110 shadow-md transition-all"
                    >
                      {t.book_now}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm transition-all"
            >
              <span>Explore All Room Categories</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>

        </div>
      </section>

      {/* KAZI BEAUTY SALON & SPA HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#1A1829] via-[#171A21] to-[#141C1A] border border-purple-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-bold uppercase">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>{t.spa_badge}</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                {t.spa_title}
              </h2>

              <p className="text-gray-300 text-base leading-relaxed">
                {t.spa_desc}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>24-Hour Operation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ethiopian Coffee Scrubs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Therapeutic Deep Tissue</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Master Hair & Salon Styling</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/spa"
                  className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2"
                >
                  <span>{t.book_spa}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/hotel-lobby.jpg"
                alt="Reception lounge near Kazi Beauty Salon and Spa"
                className="rounded-2xl shadow-2xl border border-white/10 w-full h-80 object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-[#0F1115] border border-purple-500/30 p-4 rounded-xl text-xs space-y-1 shadow-xl hidden md:block">
                <p className="font-bold text-amber-300">Kazi Spa Rating</p>
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1 text-white font-bold">4.6★ (10 Reviews)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AMENITIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-white">
            {t.amenities_title}
          </h2>
          <p className="text-gray-400 text-sm">
            {t.amenities_sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {featuredAmenities.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-[#171A21] border border-white/10 p-6 rounded-2xl space-y-3 hover:border-amber-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                {amenity.id === 'wifi' && <Wifi className="w-6 h-6" />}
                {amenity.id === 'shuttle' && <Bus className="w-6 h-6" />}
                {amenity.id === 'spa' && <Sparkles className="w-6 h-6" />}
                {amenity.id === 'breakfast' && <UtensilsCrossed className="w-6 h-6" />}
              </div>
              <h3 className="text-base font-serif font-bold text-white">
                {amenity.title[language] || amenity.title.en}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {amenity.description[language] || amenity.description.en}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* GUEST REVIEWS SECTION */}
      <section className="bg-[#12151C] py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 space-y-10">

          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1 text-amber-400 text-sm font-bold">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">
              {t.reviews_title}
            </h2>
            <p className="text-gray-400 text-sm">
              {t.reviews_sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#171A21] border border-white/10 p-6 rounded-2xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-400 font-semibold">{rev.source}</span>
                    <span className="text-xs text-gray-500">{rev.date}</span>
                  </div>
                  <p className="text-sm text-gray-300 italic leading-relaxed">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{rev.author}</p>
                    <p className="text-[11px] text-amber-200/60">{rev.roomType}</p>
                  </div>
                  <div className="flex items-center text-amber-400 text-xs">
                    {'★'.repeat(rev.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-amber-300 text-sm font-semibold hover:underline"
            >
              <span>View All Guest Testimonials & Submit a Review</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* LOCATION & NEIGHBORHOOD MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <MapPin className="w-4 h-4" />
            <span>Kirkos, Addis Ababa</span>
          </div>

          <h2 className="text-3xl font-serif font-bold text-white">
            {t.location_title}
          </h2>

          <p className="text-gray-300 text-sm leading-relaxed">
            Eyana Hotel is conveniently situated in the heart of Kirkos, giving guests immediate access to business districts, international conference venues, and famous cultural sights of Addis Ababa.
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-[#171A21] border border-white/10 rounded-xl flex items-center justify-between text-xs text-gray-300">
              <span className="font-semibold text-white">{t.near_meskel}</span>
              <span className="text-amber-400">1.2 km</span>
            </div>
            <div className="p-3 bg-[#171A21] border border-white/10 rounded-xl flex items-center justify-between text-xs text-gray-300">
              <span className="font-semibold text-white">{t.near_airport}</span>
              <span className="text-amber-400">6.8 km</span>
            </div>
            <div className="p-3 bg-[#171A21] border border-white/10 rounded-xl flex items-center justify-between text-xs text-gray-300">
              <span className="font-semibold text-white">{t.near_eca}</span>
              <span className="text-amber-400">2.5 km</span>
            </div>
          </div>

          <Link
            href="/location"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-gray-950 font-bold text-sm hover:bg-amber-400 transition-all"
          >
            <span>Explore Neighborhood Map & Airport Transfer</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Map Preview Embed */}
        <div className="bg-[#171A21] border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-80 relative">
          <iframe
            title="Eyana Hotel Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15762.673891823974!2d38.7512!3d9.0105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMzcuOCJOIDM4wrA0NScwNC4zIkU!5e0!3m2!1sen!2set!4v1620000000000!5m2!1sen!2set"
            className="w-full h-full filter brightness-90 contrast-125"
            loading="lazy"
          ></iframe>
        </div>
      </section>

    </div>
  );
}