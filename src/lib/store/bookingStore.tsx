'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, Currency, Language, GuestReview, SpaBooking } from '../types';
import { reviewsData } from '../data/reviews';

interface BookingStoreContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  formatPrice: (priceETB: number) => string;
  
  // Search parameters
  checkInDate: string;
  setCheckInDate: (date: string) => void;
  checkOutDate: string;
  setCheckOutDate: (date: string) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  selectedRoomId: string | null;
  setSelectedRoomId: (id: string | null) => void;

  // Bookings state
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'bookingRef'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['bookingStatus'], paymentStatus?: Booking['paymentStatus']) => void;
  blackoutDates: string[];
  addBlackoutDate: (date: string) => void;
  removeBlackoutDate: (date: string) => void;

  // Reviews state
  reviews: GuestReview[];
  addReview: (review: Omit<GuestReview, 'id' | 'date'>) => void;

  // Spa Bookings state
  spaBookings: SpaBooking[];
  addSpaBooking: (booking: Omit<SpaBooking, 'id' | 'createdAt' | 'status'>) => SpaBooking;

  // Admin Role toggle
  adminRole: 'admin' | 'frontdesk';
  setAdminRole: (role: 'admin' | 'frontdesk') => void;
}

const BookingStoreContext = createContext<BookingStoreContextType | undefined>(undefined);

// Initial Mock Bookings
const initialBookings: Booking[] = [
  {
    id: 'b-101',
    bookingRef: 'EYN-77210',
    roomId: 'deluxe-king',
    roomName: 'Deluxe King Suite',
    checkIn: '2026-08-01',
    checkOut: '2026-08-05',
    guests: 2,
    totalNights: 4,
    totalPriceETB: 21600,
    guestName: 'Dr. Abdessamad Kaddouri',
    guestEmail: 'a.kaddouri@un-eca.org',
    guestPhone: '+251 91 123 4567',
    paymentMethod: 'chapa',
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdAt: '2026-07-25',
    addOns: ['VIP Airport Transfer', 'Daily Breakfast'],
  },
  {
    id: 'b-102',
    bookingRef: 'EYN-77211',
    roomId: 'classic-double',
    roomName: 'Classic Double Room',
    checkIn: '2026-07-29',
    checkOut: '2026-07-31',
    guests: 2,
    totalNights: 2,
    totalPriceETB: 7600,
    guestName: 'Bethlehem Tassew',
    guestEmail: 'bethlehem@gmail.com',
    guestPhone: '+251 91 888 9911',
    paymentMethod: 'telebirr',
    paymentStatus: 'paid',
    bookingStatus: 'checked_in',
    createdAt: '2026-07-28',
  },
  {
    id: 'b-103',
    bookingRef: 'EYN-77212',
    roomId: 'executive-family-suite',
    roomName: 'Executive Family Suite',
    checkIn: '2026-08-10',
    checkOut: '2026-08-15',
    guests: 4,
    totalNights: 5,
    totalPriceETB: 42500,
    guestName: 'Jean-Marc Dubois',
    guestEmail: 'dubois@safari-tours.fr',
    guestPhone: '+33 6 12 34 56 78',
    paymentMethod: 'stripe',
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdAt: '2026-07-20',
  },
];

export const BookingStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('ETB');
  
  // Dates default
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

  const [checkInDate, setCheckInDate] = useState<string>(today);
  const [checkOutDate, setCheckOutDate] = useState<string>(tomorrow);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [blackoutDates, setBlackoutDates] = useState<string[]>(['2026-09-11', '2026-09-12']); // Ethiopian New Year
  const [reviews, setReviews] = useState<GuestReview[]>(reviewsData);
  const [spaBookings, setSpaBookings] = useState<SpaBooking[]>([]);
  const [adminRole, setAdminRole] = useState<'admin' | 'frontdesk'>('admin');

  // Load state from localStorage on client mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('eyana_lang') as Language;
      if (savedLang) setLanguageState(savedLang);

      const savedBookings = localStorage.getItem('eyana_bookings');
      if (savedBookings) setBookings(JSON.parse(savedBookings));
    } catch {
      // fallback
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('eyana_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const formatPrice = (priceETB: number) => {
    if (currency === 'USD') {
      const usd = priceETB / 120;
      return `$${usd.toFixed(0)}`;
    }
    if (currency === 'EUR') {
      const eur = priceETB / 130;
      return `€${eur.toFixed(0)}`;
    }
    return `${priceETB.toLocaleString()} ETB`;
  };

  const addBooking = (newBookingData: Omit<Booking, 'id' | 'createdAt' | 'bookingRef'>): Booking => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newBooking: Booking = {
      ...newBookingData,
      id: `b-${Date.now()}`,
      bookingRef: `EYN-${randomNum}`,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    try {
      localStorage.setItem('eyana_bookings', JSON.stringify(updated));
    } catch {
      // ignore
    }
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['bookingStatus'], paymentStatus?: Booking['paymentStatus']) => {
    const updated = bookings.map((b) =>
      b.id === id
        ? { ...b, bookingStatus: status, ...(paymentStatus ? { paymentStatus } : {}) }
        : b
    );
    setBookings(updated);
    try {
      localStorage.setItem('eyana_bookings', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const addBlackoutDate = (date: string) => {
    if (!blackoutDates.includes(date)) setBlackoutDates([...blackoutDates, date]);
  };

  const removeBlackoutDate = (date: string) => {
    setBlackoutDates(blackoutDates.filter((d) => d !== date));
  };

  const addReview = (review: Omit<GuestReview, 'id' | 'date'>) => {
    const newRev: GuestReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([newRev, ...reviews]);
  };

  const addSpaBooking = (bookingData: Omit<SpaBooking, 'id' | 'createdAt' | 'status'>): SpaBooking => {
    const newSpa: SpaBooking = {
      ...bookingData,
      id: `spa-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'confirmed',
    };
    setSpaBookings([newSpa, ...spaBookings]);
    return newSpa;
  };

  return (
    <BookingStoreContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        formatPrice,
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        guestCount,
        setGuestCount,
        selectedRoomId,
        setSelectedRoomId,
        bookings,
        addBooking,
        updateBookingStatus,
        blackoutDates,
        addBlackoutDate,
        removeBlackoutDate,
        reviews,
        addReview,
        spaBookings,
        addSpaBooking,
        adminRole,
        setAdminRole,
      }}
    >
      {children}
    </BookingStoreContext.Provider>
  );
};

export const useBookingStore = () => {
  const context = useContext(BookingStoreContext);
  if (!context) throw new Error('useBookingStore must be used within BookingStoreProvider');
  return context;
};
