'use client';

import React, { useState } from 'react';
import { useBookingStore } from '@/lib/store/bookingStore';
import { translations } from '@/lib/i18n/dict';
import { Star, MessageSquarePlus, CheckCircle2 } from 'lucide-react';

export default function ReviewsPage() {
  const { reviews, addReview, language } = useBookingStore();
  const t = translations[language];

  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [roomType, setRoomType] = useState('Classic Double Room');
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    addReview({
      author,
      rating,
      source: 'Direct Guest',
      language,
      comment,
      roomType,
    });

    setIsSubmitted(true);
    setAuthor('');
    setComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex justify-center gap-1 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
          Guest Testimonials & Reviews
        </h1>
        <p className="text-gray-400 text-sm">
          Verified ratings: Google Places 3.8★ (95 Reviews) • Tripadvisor 4.3★
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Reviews List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-serif font-bold text-white border-b border-white/10 pb-3">
            Recent Guest Feedback
          </h2>

          <div className="space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#171A21] border border-white/10 p-6 rounded-2xl space-y-3 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-base">{rev.author}</span>
                    <span className="text-xs text-gray-500 block">{rev.roomType || 'Verified Guest'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-amber-400 font-semibold block">{rev.source}</span>
                    <span className="text-amber-400 text-xs">{'★'.repeat(rev.rating)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 italic leading-relaxed">&quot;{rev.comment}&quot;</p>
                <span className="text-[10px] text-gray-500 block text-right">{rev.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Review Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#171A21] border border-amber-500/30 p-8 rounded-3xl space-y-6 sticky top-24 shadow-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
              <MessageSquarePlus className="w-4 h-4" />
              <span>Share Your Experience</span>
            </div>

            <h3 className="text-xl font-serif font-bold text-white">
              Leave a Guest Review
            </h3>

            {!isSubmitted ? (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                <div>
                  <label className="text-gray-300 block mb-1 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Samuel Bekele"
                    className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-gray-300 block mb-1 font-semibold">Rating (1 to 5 Stars)</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-2.5 text-white"
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-300 block mb-1 font-semibold">Room Stayed</label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-2.5 text-white"
                    >
                      <option value="Classic Double Room">Classic Double</option>
                      <option value="Deluxe King Suite">Deluxe King</option>
                      <option value="Executive Family Suite">Executive Family</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 block mb-1 font-semibold">Your Testimonial *</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Tell us about your stay, cleanliness, staff, or Kazi spa..."
                    className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-3 text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-gray-950 font-bold text-sm hover:brightness-110 shadow-lg"
                >
                  Submit Guest Review
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold text-white">Review Submitted!</h4>
                <p className="text-xs text-gray-300">
                  Thank you! Your testimonial has been posted to our guest feed.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20"
                >
                  Submit Another Review
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
