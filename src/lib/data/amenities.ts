import { Language } from '../types';

export interface HotelAmenity {
  id: string;
  iconName: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  category: 'general' | 'dining' | 'wellness' | 'business';
  featured?: boolean;
}

export const hotelAmenities: HotelAmenity[] = [
  {
    id: 'wifi',
    iconName: 'Wifi',
    title: {
      en: 'High-Speed Fiber Wi-Fi',
      am: 'ከፍተኛ ፍጥነት ያለው ዋይፋይ',
      ar: 'إنترنت واي فاي عالي السرعة',
      fr: 'Wi-Fi haut débit par fibre',
    },
    description: {
      en: 'Complimentary high-speed fiber internet throughout all guest rooms, conference spaces, and common lounges.',
      am: 'በሁሉም ክፍሎች፣ መሰብሰቢያ ቦታዎች እና ሳሎን ውስጥ በነጻ የሚገኝ ፈጣን ኢንተርኔት።',
      ar: 'إنترنت ألياف ضوئية فائق السرعة مجاناً في جميع الغرف وقاعات المؤتمرات والصالات.',
      fr: 'Internet haut débit gratuit dans toutes les chambres et espaces communs.',
    },
    category: 'general',
    featured: true,
  },
  {
    id: 'shuttle',
    iconName: 'Bus',
    title: {
      en: 'Airport Express Shuttle',
      am: 'የአየር መንገድ ትራንስፖርት',
      ar: 'خدمة التوصيل من وإلى المطار',
      fr: 'Navette Aéroport Express',
    },
    description: {
      en: 'Seamless 15-minute transfer to/from Bole International Airport (ADD) available 24/7 upon reservation.',
      am: 'ከቦሌ ዓለም አቀፍ አየር መንገድ የ15 ደቂቃ ጉዞ በ24 ሰዓት የትራንስፖርት አገልግሎት።',
      ar: 'توصيل سلس خلال 15 دقيقة من وإلى مطار بول الدولي على مدار 24 ساعة بموجب الحجز.',
      fr: 'Navette directe en 15 min depuis/vers l\'aéroport international de Bole disponible 24h/24.',
    },
    category: 'general',
    featured: true,
  },
  {
    id: 'spa',
    iconName: 'Sparkles',
    title: {
      en: 'Kazi Beauty Salon & Spa',
      am: 'ካዚ ቢዩቲ ሳሎን እና ስፓ',
      ar: 'صالون وسبا كازي للتجميل',
      fr: 'Kazi Salon de Beauté & Spa',
    },
    description: {
      en: 'On-site full-service wellness spa (4.6★) operating 24 hours with therapeutic massages, facials, and hair care.',
      am: 'በሆቴሉ ውስጥ የሚገኝ የ24 ሰዓት የውበትና ስፓ አገልግሎት (4.6★) ከማሳጅ እና የእንክብካቤ ስራዎች ጋር።',
      ar: 'سبا صحي كامل في الموقع (4.6★) يعمل على مدار 24 ساعة مع جلسات تدليك علاجية والعناية بالبشرة والشعر.',
      fr: 'Spa complet sur place (4.6★) ouvert 24h/24 proposant massages thérapeutiques et soins.',
    },
    category: 'wellness',
    featured: true,
  },
  {
    id: 'breakfast',
    iconName: 'UtensilsCrossed',
    title: {
      en: 'Traditional & Continental Breakfast',
      am: 'ባህላዊ እና አህጉራዊ ቁርስ',
      ar: 'إفطار تقليدي وقاري',
      fr: 'Petit-déjeuner Traditionnel & Continental',
    },
    description: {
      en: 'Daily breakfast buffet showcasing authentic Ethiopian coffee, fresh juices, pastries, and hot regional specialties.',
      am: 'የኢትዮጵያ ቡና፣ ትኩስ ጭማቂዎች እና የተለያዩ የቁርስ ምግቦች በየቀኑ በቡፌ ይቀርባሉ።',
      ar: 'بوفيه إفطار يومي يقدم القهوة الإثيوبية الأصيلة والعصائر الطازجة والمأكولات الإقليمية الساخنة.',
      fr: 'Buffet de petit-déjeuner quotidien avec véritable café éthiopien et spécialités chaudes.',
    },
    category: 'dining',
    featured: true,
  },
  {
    id: 'parking',
    iconName: 'Car',
    title: {
      en: 'Secure On-Site Parking',
      am: 'ደህንነቱ የተጠበቀ የመኪና ማቆሚያ',
      ar: 'موقف سيارات آمن في الموقع',
      fr: 'Parking Sécurisé sur Place',
    },
    description: {
      en: 'Gated parking courtyard with 24/7 security personnel and CCTV surveillance for guest vehicles.',
      am: 'በ24 ሰዓት ጥበቃ እና ካሜራ የተጠበቀ የውስጥ ግቢ የመኪና ማቆሚያ።',
      ar: 'موقف سيارات مغلق مع حراسة أمنية ومراقبة بالكاميرات على مدار 24/7 لسيارات النزلاء.',
      fr: 'Parking fermé avec sécurité 24h/24 et vidéosurveillance pour les véhicules des clients.',
    },
    category: 'general',
    featured: false,
  },
  {
    id: 'room-service',
    iconName: 'Clock',
    title: {
      en: '24/7 Room Service & Dining',
      am: 'የ24 ሰዓት የክፍል አገልግሎት',
      ar: 'خدمة الغرف وتناول الطعام على مدار 24/7',
      fr: 'Service en Chambre 24h/24',
    },
    description: {
      en: 'Order hot Ethiopian cuisine, international dishes, and beverages straight to your room at any hour.',
      am: 'የኢትዮጵያ እና የአለም አቀፍ ምግቦችንና መጠጦችን በፈለጉት ሰዓት ወደ ክፍልዎ ይዘዙ።',
      ar: 'طلب المأكولات الإثيوبية الساخنة والأطباق العالمية والمشروبات مباشرة إلى غرفتك في أي وقت.',
      fr: 'Commandez des plats éthiopiens chauds, de la cuisine internationale et des boissons en chambre à toute heure.',
    },
    category: 'dining',
    featured: false,
  },
];
