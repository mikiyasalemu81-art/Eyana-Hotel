export type Language = 'en' | 'am' | 'ar' | 'fr';

export type Currency = 'ETB' | 'USD' | 'EUR';

export interface Room {
  id: string;
  slug: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  longDescription: Record<Language, string>;
  priceETB: number;
  capacity: number;
  bedType: Record<Language, string>;
  sizeSqm: number;
  view: Record<Language, string>;
  images: string[];
  amenities: string[];
  popular?: boolean;
  featured?: boolean;
}

export interface Booking {
  id: string;
  bookingRef: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalNights: number;
  totalPriceETB: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  passportOrId?: string;
  specialRequests?: string;
  paymentMethod: 'chapa' | 'telebirr' | 'cbe_birr' | 'stripe';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  bookingStatus: 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
  createdAt: string;
  addOns?: string[];
}

export interface GuestReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  source: 'Google Places' | 'Tripadvisor' | 'Direct Guest';
  language: Language;
  comment: string;
  roomType?: string;
  featured?: boolean;
}

export interface SpaService {
  id: string;
  title: Record<Language, string>;
  category: 'massage' | 'facial' | 'salon' | 'package';
  durationMinutes: number;
  priceETB: number;
  description: Record<Language, string>;
  image: string;
}

export interface SpaBooking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}
