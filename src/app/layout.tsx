import type { Metadata } from 'next';
import './globals.css';
import { BookingStoreProvider } from '@/lib/store/bookingStore';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Configure luxury fonts
import { Playfair_Display as PlayfairFont, Plus_Jakarta_Sans as JakartaFont } from 'next/font/google';

const playfair = PlayfairFont({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = JakartaFont({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Eyana Hotel Addis Ababa | 3-Star Hotel in Kirkos near Meskel Square',
  description: 'Book your stay at Eyana Hotel, Kirkos, Addis Ababa. Luxury rooms, 24-hour Kazi Spa, high-speed Wi-Fi, Ethiopian dining, and free Bole airport transfer.',
  keywords: [
    'Eyana Hotel',
    'Eyana Hotel Addis Ababa',
    'Kirkos Hotel',
    'Hotels near Meskel Square',
    'Addis Ababa 3 Star Hotel',
    'Kazi Spa Addis Ababa',
    'Bole Airport Hotel Shuttle',
  ],
  openGraph: {
    title: 'Eyana Hotel Addis Ababa | Authentic Ethiopian Hospitality',
    description: '3-Star luxury in Kirkos near Meskel Square. Rooms, 24/7 Kazi Spa, restaurant, and direct online booking.',
    url: 'https://eyanahotel.com',
    siteName: 'Eyana Hotel',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Eyana Hotel Building Exterior',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

// JSON-LD Structured Data for Google Hotel Ads & Rich Cards
const hotelJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'Eyana Hotel',
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  description: '3-star boutique hotel in Kirkos district, Addis Ababa, featuring 24-hour Kazi Spa and direct booking.',
  starRating: {
    '@type': 'Rating',
    ratingValue: '3',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '3.8',
    reviewCount: '95',
    bestRating: '5',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kirkos Sub-City',
    addressLocality: 'Addis Ababa',
    addressCountry: 'ET',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '9.0105',
    longitude: '38.7612',
  },
  telephone: '+251911234567',
  priceRange: '2900 ETB - 8500 ETB',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'High-Speed Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Airport Transfer', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Kazi Spa', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Room Service', value: true },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0F1115] text-[#F9F6F0] font-sans antialiased">
        <BookingStoreProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </BookingStoreProvider>
      </body>
    </html>
  );
}
