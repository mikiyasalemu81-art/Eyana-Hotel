'use client';

import React, { useState } from 'react';
import { Sparkles, Maximize2, X } from 'lucide-react';

interface PhotoItem {
  id: string;
  title: string;
  category: 'rooms' | 'exterior' | 'dining' | 'spa' | 'lounge';
  src: string;
}

const galleryPhotos: PhotoItem[] = [
  { id: 'g1', title: 'Eyana Hotel Building Exterior', category: 'exterior', src: '/images/hr-exterior.jpg' },
  { id: 'g2', title: 'Room Kitchenette', category: 'rooms', src: '/images/hr-kitchenette.jpg' },
  { id: 'g3', title: 'Room Lounge Area', category: 'lounge', src: '/images/hr-room-lounge.jpg' },
  { id: 'g4', title: 'Deluxe Bedroom', category: 'rooms', src: '/images/hr-bedroom-1.jpg' },
  { id: 'g5', title: 'Guest Sofa Lounge', category: 'lounge', src: '/images/hr-sofa-lounge.jpg' },
  { id: 'g6', title: 'Bedroom with City View', category: 'rooms', src: '/images/hr-bedroom-2.jpg' },
  { id: 'g7', title: 'Bedroom with Mirrored Closet', category: 'rooms', src: '/images/hr-bedroom-3.jpg' },
  { id: 'g8', title: 'Suite Bedroom & Sofa', category: 'rooms', src: '/images/hr-bedroom-4.jpg' },
  { id: 'g9', title: 'Room Workspace & Wardrobe', category: 'rooms', src: '/images/hr-room-desk.jpg' },
  { id: 'g10', title: 'Room Detail — Lounge Corner', category: 'rooms', src: '/images/hr-room-detail.jpg' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<'all' | 'rooms' | 'exterior' | 'dining' | 'spa' | 'lounge'>('all');
  const [activeLightbox, setActiveLightbox] = useState<PhotoItem | null>(null);

  const filtered = filter === 'all' ? galleryPhotos : galleryPhotos.filter((p) => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">

      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Real Photography Showcase</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
          Eyana Hotel Photo Gallery
        </h1>
        <p className="text-gray-400 text-sm">
          Explore our rooms, lobby lounges, and guest spaces.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {['all', 'rooms', 'exterior', 'dining', 'spa', 'lounge'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${filter === cat
                ? 'bg-amber-500 text-gray-950 shadow-lg'
                : 'bg-[#171A21] border border-white/10 text-gray-400 hover:text-white'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActiveLightbox(photo)}
            className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 shadow-xl cursor-pointer"
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <span className="text-amber-400 text-xs uppercase font-bold tracking-wider">{photo.category}</span>
              <p className="text-white font-bold text-sm">{photo.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          onClick={() => setActiveLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute -top-10 right-0 text-white hover:text-amber-400 p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeLightbox.src}
              alt={activeLightbox.title}
              className="w-full max-h-[80vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
            />
            <p className="text-center text-white font-serif text-lg mt-3">{activeLightbox.title}</p>
          </div>
        </div>
      )}

    </div>
  );
}