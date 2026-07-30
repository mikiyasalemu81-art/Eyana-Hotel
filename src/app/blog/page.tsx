'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Calendar, ArrowRight } from 'lucide-react';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'things-to-do-near-meskel-square',
    title: 'Top 5 Things to Do Near Meskel Square, Addis Ababa',
    excerpt: 'Explore the cultural heart of Addis Ababa just 5 minutes from Eyana Hotel, from the Red Terror Martyrs Memorial to national museums.',
    content: `Meskel Square is the iconic central plaza of Addis Ababa, vibrant with gatherings, concerts, and rich history. Located just 1.2 km from Eyana Hotel in Kirkos, guests can easily explore:

1. **Red Terror Martyrs' Memorial Museum:** Located directly on Meskel Square, this poignant museum offers deep historical insights into Ethiopia's modern history.
2. **National Museum of Ethiopia:** Home to the world-famous fossilized hominid "Lucy" (Dinkinesh), located a short drive up the avenue.
3. **Unity Park & Grand Palace:** Walk through lush gardens, historic royal halls, and view black-maned lions inside the renovated palace grounds.
4. **Ethiopian Coffee Tasting:** Enjoy ceremonial Ethiopian coffee served fresh with frankincense at traditional spots around Kirkos.
5. **Addis Light Rail Experience:** Hop on the modern light rail at Meskel station to tour the capital affordably.`,
    date: 'July 15, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    category: 'Local Guides',
  },
  {
    slug: 'yemeni-and-ethiopian-cuisine-kirkos',
    title: 'A Culinary Guide to Yemeni & Ethiopian Dining in Kirkos',
    excerpt: 'Discover why Kirkos is renowned for authentic Yemeni mandhi, traditional Ethiopian injera feasts, and freshly brewed coffees.',
    content: `Guests staying at Eyana Hotel are spoiled for choice when it comes to regional dining. The Kirkos sub-city is famous across Addis Ababa for hosting top Yemeni restaurants as well as traditional Ethiopian cultural eateries.

- **Yemeni Mandhi & Zurbian:** Savory slow-cooked lamb and fragrant spiced rice served on large communal trays with fresh flatbreads.
- **Traditional Ethiopian Injera:** Teff injera served with spicy doro wat (chicken stew), shiro, and tibs (sautéed beef).
- **Eyana Room Service:** For cozy evenings, enjoy authentic local dishes delivered straight to your room 24 hours a day.`,
    date: 'June 22, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    category: 'Dining & Food',
  },
  {
    slug: 'bole-airport-to-eyana-hotel-transit-guide',
    title: 'Navigating Bole Airport (ADD) to Eyana Hotel: Travel Guide',
    excerpt: 'Everything international travelers need to know about arrival procedures, SIM cards, currency exchange, and Eyana airport shuttles.',
    content: `Bole International Airport (ADD) is the primary gateway to East Africa. To make your journey to Eyana Hotel seamless:

1. **Airport Pickup:** Pre-book Eyana Hotel's VIP Express Shuttle for a hassle-free 15-minute transfer directly to our front desk.
2. **SIM Card Activation:** Ethio Telecom kiosks are available in the arrival terminal for local data SIM cards.
3. **Currency Exchange:** Banks and ATMs operate 24/7 at Bole Airport for converting USD, EUR, or GBP into Ethiopian Birr (ETB).`,
    date: 'May 10, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    category: 'Travel Tips',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Local SEO & Travel Guides</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
          Addis Ababa Local Guides
        </h1>
        <p className="text-gray-400 text-sm">
          Insider tips for exploring Kirkos, Meskel Square, dining spots, and Bole Airport transfers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.slug}
            className="bg-[#171A21] border border-white/10 hover:border-amber-500/30 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all"
          >
            <div>
              <div className="h-48 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-amber-500 text-gray-950 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-white leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold hover:underline"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
