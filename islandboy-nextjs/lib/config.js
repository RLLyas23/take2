export const BUSINESS = {
  NAME: "Island Boy Transportation & Tours",
  WHATSAPP_E164: "12428036388", // +1 242 803 6388
  CONTACT_EMAIL: "customerservice@islandboytnts.com",
  BASE_CITY: "Nassau, New Providence, Bahamas",
  CURRENCY: "USD"
};

export const PRICING = {
  taxi: { base: 8, perMile: 2.25, perMinute: 0.4, airportSurcharge: 5 },
  private: { hourly: 65, minHours: 2 }
};

export const TOURS = [
  { id: "montagu-beach", title: "Montagu Beach", durationHours: 3, price: 59, rating: 4.7, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop", blurb: "Relax and swim at Montagu Beach, one of Nassau's historic waterfronts.", includes: ["Hotel pickup", "Driver/guide", "Bottled water"] },
  { id: "cabbage-beach", title: "Cabbage Beach", durationHours: 4, price: 89, rating: 4.9, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop", blurb: "Experience Nassau’s famous Cabbage Beach on Paradise Island.", includes: ["Hotel pickup & drop-off", "Beach time", "Guide assistance"] },
  { id: "queens-staircase", title: "Queen's Staircase", durationHours: 1, price: 40, rating: 4.7, img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1600&auto=format&fit=crop", blurb: "Climb the historic Queen’s Staircase.", includes: ["Transport", "Guide commentary"] }
];
