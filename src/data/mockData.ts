import croissantsImg from "@/assets/croissants.jpg";
import almondCroissantImg from "@/assets/almond-croissant.jpg";
import macaronsImg from "@/assets/macarons.jpg";
import breadImg from "@/assets/artisan-bread.jpg";
import cakeImg from "@/assets/wedding-cake.jpg";
import petitFoursImg from "@/assets/cookies-petitfours.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  ingredients?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "croissants",
    name: "Croissants & Viennoiseries",
    image: croissantsImg,
    description: "Buttery, flaky pastries made with finest French butter"
  },
  {
    id: "macarons",
    name: "Macarons & Petit Fours",
    image: macaronsImg,
    description: "Delicate almond cookies in exquisite flavors"
  },
  {
    id: "breads",
    name: "Artisan Breads",
    image: breadImg,
    description: "Traditional sourdough and specialty breads"
  },
  {
    id: "cakes",
    name: "Luxury Cakes",
    image: cakeImg,
    description: "Bespoke celebration cakes and desserts"
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Butter Croissant",
    price: 4.50,
    image: croissantsImg,
    description: "Hand-rolled with French butter, perfectly flaky and golden",
    category: "croissants",
    rating: 4.9,
    ingredients: ["French butter", "Organic flour", "Fresh yeast", "Sea salt"],
    isFeatured: true
  },
  {
    id: "2",
    name: "Rose Petal Macaron",
    price: 3.25,
    image: macaronsImg,
    description: "Delicate almond shells with rose-infused buttercream",
    category: "macarons",
    rating: 4.8,
    ingredients: ["Almond flour", "Rose petals", "Organic sugar", "French butter"],
    isFeatured: true,
    isNew: true
  },
  {
    id: "3",
    name: "Artisan Sourdough",
    price: 12.00,
    image: breadImg,
    description: "48-hour fermented sourdough with crispy crust",
    category: "breads",
    rating: 4.7,
    ingredients: ["Organic flour", "Wild yeast starter", "Sea salt", "Filtered water"]
  },
  {
    id: "4",
    name: "Celebration Cake",
    price: 145.00,
    image: cakeImg,
    description: "Three-tier vanilla bean cake with Swiss buttercream",
    category: "cakes",
    rating: 5.0,
    ingredients: ["Madagascar vanilla", "Swiss buttercream", "Organic flour", "Fresh eggs"],
    isFeatured: true
  },
  {
    id: "5",
    name: "Luxury Petit Fours",
    price: 8.75,
    image: petitFoursImg,
    description: "Miniature cakes with delicate glazes and decorations",
    category: "macarons",
    rating: 4.8,
    ingredients: ["Almond paste", "Royal icing", "Edible gold leaf", "Vanilla beans"]
  },
  {
    id: "6",
    name: "Croissant aux Amandes",
    price: 5.25,
    image: almondCroissantImg,
    description: "Twice-baked croissant filled with almond frangipane and toasted flakes",
    category: "croissants",
    rating: 4.6,
    ingredients: ["French butter", "Almond frangipane", "Organic flour", "Toasted almonds"]
  }
];

export const recipes = [
  {
    id: "recipe-1",
    title: "Classic French Macaron",
    image: macaronsImg,
    description: "Master the art of perfect macarons with our step-by-step guide",
    difficulty: "Advanced",
    time: "2 hours",
    servings: 24
  },
  {
    id: "recipe-2",
    title: "Artisan Croissant",
    image: croissantsImg,
    description: "Create buttery, flaky croissants using traditional French techniques",
    difficulty: "Expert",
    time: "3 days",
    servings: 12
  }
];