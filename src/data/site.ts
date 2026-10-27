/**
 * KATRIBO — business details.
 * Everything set to null is a PLACEHOLDER and is shown on the site as "to be confirmed".
 * Fill these in once the café confirms them.
 */
export const SITE = {
  name: 'KATRIBO',
  tagline: 'Welcome to Our Backyard',
  slogan: 'Good Coffee, Better People',
  intro: 'A cozy coffee spot serving great coffee, refreshing milkshakes, and good vibes by the bay.',

  address: 'Umangay, Patikul, Sulu, Philippines' as string | null,
  email: null as string | null,
  phone: null as string | null,
  hours: null as string | null, // e.g. 'Mon–Sun · 8:00 AM – 10:00 PM'
  mapEmbed: 'https://www.google.com/maps?q=Katribo+Slow+Coffee+Bar,+Umangay,+Patikul,+Sulu,+Philippines&output=embed' as string | null, // Google Maps embed URL

  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    tiktok: null as string | null,
  },
};

export const IMAGES = {
  hero: '/images/hero-katribo.jpg',
  heroSquare: '/images/hero-katribo-square.jpg',
  heroBg: '/images/hero-katribo-bg.jpg', // cup-free left strip of the hero photo, stretched behind the text
  interior: '/images/shop/katribo-interior-01.jpg',
  sign: '/images/shop/katribo-interior-02.jpg',
  staff: '/images/shop/katribo-staff.jpg',
  bay: '/images/shop/katribo-bay-view.jpg',
  bar: '/images/shop/katribo-espresso-bar.jpg',
};
