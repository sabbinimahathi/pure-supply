import { Product, PromoCode } from "@/types/product";

export const products: Product[] = [
  // Cold Press Oils
  {
    id: "oil-1",
    name: "Premium Coconut Oil",
    category: "cold-press-oils",
    description: "Pure cold-pressed coconut oil extracted from fresh coconuts. Rich in MCT and perfect for cooking and skincare.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1000, unit: "ml", price: 450 },
      { value: 500, unit: "ml", price: 250 },
      { value: 250, unit: "ml", price: 140 },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "oil-2",
    name: "Organic Sesame Oil",
    category: "cold-press-oils",
    description: "Traditional cold-pressed sesame oil with rich nutty flavor. Perfect for cooking and Ayurvedic treatments.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1000, unit: "ml", price: 380 },
      { value: 500, unit: "ml", price: 210 },
      { value: 250, unit: "ml", price: 120 },
    ],
    inStock: true,
  },
  {
    id: "oil-3",
    name: "Cold Press Mustard Oil",
    category: "cold-press-oils",
    description: "Pungent and flavorful mustard oil, cold-pressed to retain all natural nutrients.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1000, unit: "ml", price: 320 },
      { value: 500, unit: "ml", price: 180 },
      { value: 250, unit: "ml", price: 100 },
    ],
    inStock: true,
  },
  
  // Dry Fruits
  {
    id: "df-1",
    name: "Premium Almonds",
    category: "dry-fruits",
    description: "Handpicked California almonds, rich in protein and healthy fats.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1, unit: "kg", price: 850 },
      { value: 500, unit: "g", price: 450 },
      { value: 250, unit: "g", price: 240 },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "df-2",
    name: "Organic Cashews",
    category: "dry-fruits",
    description: "Creamy whole cashews, perfect for snacking and cooking.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1, unit: "kg", price: 920 },
      { value: 500, unit: "g", price: 480 },
      { value: 250, unit: "g", price: 260 },
    ],
    inStock: true,
  },
  {
    id: "df-3",
    name: "Dried Figs",
    category: "dry-fruits",
    description: "Sweet and nutritious dried figs, naturally sweetened.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1, unit: "kg", price: 780 },
      { value: 500, unit: "g", price: 410 },
      { value: 250, unit: "g", price: 220 },
    ],
    inStock: false,
  },

  // Seeds
  {
    id: "seed-1",
    name: "Chia Seeds",
    category: "seeds",
    description: "Organic chia seeds packed with omega-3 and fiber.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1, unit: "kg", price: 650 },
      { value: 500, unit: "g", price: 350 },
      { value: 250, unit: "g", price: 190 },
    ],
    inStock: true,
  },
  {
    id: "seed-2",
    name: "Flax Seeds",
    category: "seeds",
    description: "Golden flax seeds rich in lignans and essential fatty acids.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1, unit: "kg", price: 320 },
      { value: 500, unit: "g", price: 180 },
      { value: 250, unit: "g", price: 100 },
    ],
    inStock: true,
  },

  // Rice
  {
    id: "rice-1",
    name: "Organic Basmati Rice",
    category: "rice",
    description: "Premium aged basmati rice with authentic aroma and long grains.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1, unit: "kg", price: 180 },
      { value: 500, unit: "g", price: 95 },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "rice-2",
    name: "Brown Rice",
    category: "rice",
    description: "Nutritious whole grain brown rice with natural fiber.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1, unit: "kg", price: 120 },
      { value: 500, unit: "g", price: 65 },
    ],
    inStock: true,
  },

  // Spices
  {
    id: "spice-1",
    name: "Organic Turmeric Powder",
    category: "spices",
    description: "Pure turmeric powder with high curcumin content.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1, unit: "kg", price: 380 },
      { value: 500, unit: "g", price: 210 },
      { value: 250, unit: "g", price: 120 },
    ],
    inStock: true,
  },
  {
    id: "spice-2",
    name: "Kashmiri Red Chili",
    category: "spices",
    description: "Vibrant red chili powder with mild heat and rich color.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1, unit: "kg", price: 450 },
      { value: 500, unit: "g", price: 240 },
      { value: 250, unit: "g", price: 130 },
    ],
    inStock: true,
  },

  // Honey
  {
    id: "honey-1",
    name: "Raw Forest Honey",
    category: "honey",
    description: "Unprocessed wildflower honey collected from forest hives.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1000, unit: "ml", price: 580 },
      { value: 500, unit: "ml", price: 310 },
      { value: 250, unit: "ml", price: 170 },
    ],
    inStock: true,
    featured: true,
  },

  // A2 Ghee
  {
    id: "ghee-1",
    name: "A2 Gir Cow Ghee",
    category: "a2-ghee",
    description: "Pure A2 ghee made from Gir cow milk using traditional bilona method.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    quantities: [
      { value: 1000, unit: "ml", price: 1850 },
      { value: 500, unit: "ml", price: 950 },
      { value: 250, unit: "ml", price: 500 },
    ],
    inStock: true,
    featured: true,
  },
];

export const promoCodes: PromoCode[] = [
  { code: "WELCOME10", discount: 10, active: true },
  { code: "ORGANIC20", discount: 20, active: true },
  { code: "FIRST50", discount: 50, active: false },
];

export const bannerImages = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

export const categoryLabels: Record<string, string> = {
  "cold-press-oils": "Cold Press Oils",
  "dry-fruits": "Dry Fruits",
  "seeds": "Seeds",
  "rice": "Rice Bags",
  "spices": "Spices",
  "honey": "Honey",
  "a2-ghee": "A2 Gir Cow Ghee",
};
