'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '../page';
import { ArrowLeft, Calendar, Compass, Share2 } from 'lucide-react';

export default function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Travel Guides</span>
        </Link>
      </div>

      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-gray-400 border-b border-white/10 pb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" /> {post.date}
          </span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <div className="h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <div className="bg-[#171A21] border border-white/10 p-8 rounded-3xl space-y-6 text-gray-300 text-sm leading-relaxed whitespace-pre-line font-sans shadow-xl">
        {post.content}
      </div>

      <div className="bg-[#171A21] border border-amber-500/30 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <h4 className="font-serif font-bold text-white text-base">Planning a trip to Addis Ababa?</h4>
          <p className="text-xs text-gray-400">Stay at Eyana Hotel near Meskel Square for fast Wi-Fi and 24-hour spa.</p>
        </div>
        <Link
          href="/booking"
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-gray-950 font-bold text-xs hover:bg-amber-400 shrink-0"
        >
          Book Your Stay Now
        </Link>
      </div>

    </div>
  );
}
