import { SpaService } from '../types';

export const spaServicesData: SpaService[] = [
  {
    id: 'deep-tissue-massage',
    title: {
      en: 'Signature Deep Tissue Massage',
      am: 'ሲግኔቸር ዲፕ ቲሹ ማሳጅ',
      ar: 'تدليك الأنسجة العميقة المميز',
      fr: 'Massage Suédois & Tissus Profonds',
    },
    category: 'massage',
    durationMinutes: 60,
    priceETB: 1800,
    description: {
      en: 'Therapeutic pressure targeted to release chronic muscle tension, fatigue from international travel, and back stiffness.',
      am: 'ከረጅም የጉዞ ድካም እና ከጡንቻ ህመም ለመገላገል የሚረዳ ውጤታማ የማሳጅ ህክምና።',
      ar: 'ضغط علاجي يستهدف التخلص من التوتر العضلي المزمن والتعب التراكمي من السفر الدولي.',
      fr: 'Pression thérapeutique visant à libérer les tensions musculaires chroniques et la fatigue du voyage.',
    },
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ethiopian-coffee-scrub',
    title: {
      en: 'Ethiopian Organic Coffee Body Scrub',
      am: 'የኢትዮጵያ ኦርጋኒክ ቡና አካል እስክራብ',
      ar: 'مقشر الجسم بالقهوة الإثيوبية العضوية',
      fr: 'Gommage Corporel au Café Éthiopien',
    },
    category: 'facial',
    durationMinutes: 45,
    priceETB: 1500,
    description: {
      en: 'Exfoliating ritual using freshly ground Yirgacheffe coffee beans mixed with organic botanical oils to revitalize skin.',
      am: 'በይርጋጨፌ ኦርጋኒክ ቡና እና በተፈጥሮ ዘይቶች የተሰራ ለቆዳ ውበትና ልስላሴ የሚረዳ ህክምና።',
      ar: 'طقس تقشير باستخدام حبوب قهوة يرقاتشيفي المطحونة طازجاً والمخلوطة بالزيوت النباتية العضوية لتجديد البشرة.',
      fr: 'Rituel exfoliant aux grains de café Yirgacheffe fraîchement moulus et huiles botaniques bio.',
    },
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'kazi-deluxe-facial',
    title: {
      en: 'Kazi Glowing Radiance Facial',
      am: 'ካዚ ግሎዊንግ ራዲያንስ ፌሻል',
      ar: 'جلسة العناية بالوجه ونضارة البشرة كازي',
      fr: 'Soin du Visage Éclat Kazi',
    },
    category: 'facial',
    durationMinutes: 60,
    priceETB: 2200,
    description: {
      en: 'Hydrating deep-cleansing facial designed to restore natural skin glow after exposure to high-altitude sun.',
      am: 'ቆዳን በጥልቀት የሚያጸዳ፣ የሚያጠጣ እና የተፈጥሮ ውበቱን የሚመልስ የፌሻል ህክምና።',
      ar: 'جلسة تنظيف عميق وترطيب للوجه مصممة لإعادة النضارة الطبيعية للبشرة بعد التعرض لأشعة الشمس.',
      fr: 'Soin du visage hydratant et nettoyant en profondeur pour restaurer l\'éclat naturel de la peau.',
    },
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'executive-grooming-package',
    title: {
      en: 'Executive Haircut & Salon Grooming',
      am: 'ኤክዚክዩቲቭ የፀጉር አቆራረጥ እና ግሩሚንግ',
      ar: 'حلاقة وتنظيف شعر تنفيذي متكامل',
      fr: 'Coiffure & Soin Salon Exécutif',
    },
    category: 'salon',
    durationMinutes: 45,
    priceETB: 1200,
    description: {
      en: 'Precision haircut, hot towel shave, beard trimming, and scalp treatment by master Kazi stylists.',
      am: 'የፀጉር ቁርጥ፣ የጺም መስተካከል እና የትኩስ ፎጣ ማሳጅ በካዚ ባለሙያዎች።',
      ar: 'حلاقة دقيقة، وحلاقة بالمنشفة الساخنة، وتشذيب اللحية، وعلاج فروة الرأس من قِبل خبراء كازي.',
      fr: 'Coupe de cheveux de précision, rasage à la serviette chaude et soin du cuir chevelu par nos maîtres coiffeurs.',
    },
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
  },
];
