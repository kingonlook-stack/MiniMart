import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Shirt,
  Home as HomeIcon,
  Sparkles,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  Smartphone,
  Puzzle,
  Zap,
  Laptop,
  Plug,
  Baby,
  Dumbbell,
  BookOpen,
  Sofa,
  User,
  Speaker,
  Camera,
  Lightbulb,
  Watch,
  Glasses,
  Backpack,
  Mouse,
  HardDrive,
  Fan,
  PlugZap,
  Droplet,
  UtensilsCrossed,
  Wind,
  AlarmClock,
  Armchair,
  Bed,
  Bike,
  BatteryCharging,
} from "lucide-react";

const TOKENS = {
  bg: "#F4F7F5",
  surface: "#FFFFFF",
  ink: "#10201B",
  inkMuted: "#5B6B64",
  primary: "#0E6B5C",
  primaryDark: "#0A4F44",
  accent: "#F2A93B",
  accentSoft: "#FCEBC8",
  urgent: "#E4572E",
  border: "#E1E8E4",
};

function formatINR(amount) {
  return `\u20B9${Math.round(amount).toLocaleString("en-IN")}`;
}

const CATEGORIES = [
  { name: "Fashion", icon: Shirt },
  { name: "Mobiles", icon: Smartphone },
  { name: "Electronics", icon: Zap },
  { name: "Laptops", icon: Laptop },
  { name: "Beauty", icon: Sparkles },
  { name: "Home", icon: HomeIcon },
  { name: "Appliances", icon: Plug },
  { name: "Toys", icon: Puzzle },
  { name: "Baby", icon: Baby },
  { name: "Sports", icon: Dumbbell },
  { name: "Books", icon: BookOpen },
  { name: "Furniture", icon: Sofa },
];

const CATEGORY_STYLE = {
  Fashion: { icon: Shirt, gradient: "linear-gradient(135deg, #10201B 0%, #33443D 100%)", tint: "#EEF1EF", iconColor: "#10201B" },
  Mobiles: { icon: Smartphone, gradient: "linear-gradient(135deg, #0E6B5C 0%, #14876F 100%)", tint: "#E6F2EF", iconColor: "#0A4F44" },
  Electronics: { icon: Zap, gradient: "linear-gradient(135deg, #1E3A5F 0%, #2C557F 100%)", tint: "#E9EEF5", iconColor: "#1E3A5F" },
  Laptops: { icon: Laptop, gradient: "linear-gradient(135deg, #334155 0%, #475569 100%)", tint: "#ECEEF1", iconColor: "#334155" },
  Beauty: { icon: Sparkles, gradient: "linear-gradient(135deg, #E9899D 0%, #F3B4C1 100%)", tint: "#FCEEF1", iconColor: "#C24866" },
  Home: { icon: HomeIcon, gradient: "linear-gradient(135deg, #6ECF5D 0%, #8FE07F 100%)", tint: "#EDF9EA", iconColor: "#3F8C32" },
  Appliances: { icon: Plug, gradient: "linear-gradient(135deg, #B4762B 0%, #D69A4E 100%)", tint: "#F7EEE1", iconColor: "#8C5A1F" },
  Toys: { icon: Puzzle, gradient: "linear-gradient(135deg, #F2A93B 0%, #F7C56B 100%)", tint: "#FCF1DD", iconColor: "#B4762B" },
  Baby: { icon: Baby, gradient: "linear-gradient(135deg, #7FB8D9 0%, #A9D3E8 100%)", tint: "#EAF4FA", iconColor: "#3E7EA3" },
  Sports: { icon: Dumbbell, gradient: "linear-gradient(135deg, #D9502B 0%, #E97A4E 100%)", tint: "#FBEAE4", iconColor: "#B23F1F" },
  Books: { icon: BookOpen, gradient: "linear-gradient(135deg, #6B3F5C 0%, #8C5878 100%)", tint: "#F1E9EE", iconColor: "#6B3F5C" },
  Furniture: { icon: Sofa, gradient: "linear-gradient(135deg, #8C5A34 0%, #A97744 100%)", tint: "#F3ECE4", iconColor: "#6E4527" },
};

const S3_IMAGE_BASE =
  "https://jaga-product-images.s3.ap-south-1.amazonaws.com";

const PRODUCT_IMAGES = {
  // Fashion
  1: "fashion/fashion-bag.jpg",
  2: "fashion/fashion-watch.jpg",
  3: "fashion/fashion-tee.jpg",
  4: "fashion/fashion-jacket.jpg",
  5: "fashion/fashion-boots.jpg",
  6: "fashion/fashion-skirt.jpg",
  7: "fashion/fashion-sweater.jpg",
  8: "fashion/fashion-sunglasses.jpg",
  9: "fashion/fashion-belt.jpg",
  10: "fashion/fashion-sling.jpg",

  // Mobiles
  11: "mobiles/mobiles-phone-1.jpg",
  12: "mobiles/mobiles-phone-2.jpg",
  13: "mobiles/mobiles-case.jpg",
  14: "mobiles/mobiles-phone-3.jpg",
  15: "mobiles/mobiles-charger.jpg",
  16: "mobiles/mobiles-charging-pad.jpg",
  17: "mobiles/mobiles-accessories.jpg",
  18: "mobiles/mobiles-accessories-1.jpg",
  19: "mobiles/mobiles-ring-light.jpg",
  20: "mobiles/mobiles-stand.jpg",

  // Electronics
  21: "Electronics/electronics-speaker.jpg",
  22: "Electronics/electronics-bulb.jpg",
  23: "Electronics/electronics-scale.jpg",
  24: "Electronics/electronics-hub.jpg",
  25: "Electronics/electronics-powerbank.jpg",
  26: "Electronics/electronics-plug.jpg",
  27: "Electronics/electronics-earphones.jpg",
  28: "Electronics/electronics-doorbell.jpg",
  29: "Electronics/electronics-clock.jpg",
  30: "Electronics/electronics-projector.jpg",

  // Laptops
  31: "Laptops/laptops-laptop-1.jpg",
  32: "Laptops/laptops-laptop-2.jpg",
  33: "Laptops/laptops-laptop-3.jpg",
  34: "Laptops/laptops-laptop-4.jpg",
  35: "Laptops/laptops-cooling-pad.jpg",
  36: "Laptops/laptops-sleeve.jpg",
  37: "Laptops/laptops-mouse.jpg",
  38: "Laptops/laptops-docking.jpg",
  39: "Laptops/laptops-ssd.jpg",
  40: "Laptops/laptops-backpack.jpg",

  // Beauty
  41: "Beauty/beauty-serum.jpg",
  42: "Beauty/beauty-moisturizer.jpg",
  43: "Beauty/beauty-lipstick.jpg",
  44: "Beauty/beauty-facewash.jpg",
  45: "Beauty/beauty-hairoil.jpg",
  46: "Beauty/beauty-sunscreen.jpg",
  47: "Beauty/beauty-toner.jpg",
  48: "Beauty/beauty-nailkit.jpg",
  49: "Beauty/beauty-hairbrush.jpg",
  50: "Beauty/beauty-eyepatches.jpg",

  // Home
  51: "Home/home-pourover.jpg",
  52: "Home/home-plants.jpg",
  53: "Home/home-diffuser.jpg",
  54: "Home/home-bedsheet.jpg",
  55: "Home/home-cookware.jpg",
  56: "Home/home-candle.jpg",
  57: "Home/home-baskets.jpg",
  58: "Home/home-wallclock.jpg",
  59: "Home/home-knifeset.jpg",
  60: "Home/home-doormat.jpg",

  // Appliances
  61: "Appliances/appliances-airfryer.jpg",
  62: "Appliances/appliances-blender.jpg",
  63: "Appliances/appliances-kettle.jpg",
  64: "Appliances/appliances-sandwichmaker.jpg",
  65: "Appliances/appliances-heater.jpg",
  66: "Appliances/appliances-fan.jpg",
  67: "Appliances/appliances-iron.jpg",
  68: "Appliances/appliances-mixer.jpg",
  69: "Appliances/appliances-purifier.jpg",
  70: "Appliances/appliances-vacuum.jpg",

  // Toys
  71: "Toys/toys-blocks.jpg",
  72: "Toys/toys-rccar.jpg",
  73: "Toys/toys-puzzlecube.jpg",
  74: "Toys/toys-boardgame.jpg",
  75: "Toys/toys-teddybear.jpg",
  76: "Toys/toys-blocks-1.jpg",
  77: "Toys/toys-artkit.jpg",
  78: "Toys/toys-rccar-1.jpg",
  79: "Toys/toys-keyboard.jpg",
  80: "Toys/toys-outdoor.jpg",

  // Baby
  81: "Baby/baby-onesie.jpg",
  82: "Baby/baby-blanket.jpg",
  83: "Baby/baby-bottle.jpg",
  84: "Baby/baby-wipes.jpg",
  85: "Baby/baby-diaperbag.jpg",
  86: "Baby/baby-rattle.jpg",
  87: "Baby/baby-nursingpillow.jpg",
  88: "Baby/baby-bathtub.jpg",
  89: "Baby/baby-monitor.jpg",
  90: "Baby/baby-shoes.jpg",

  // Sports
  91: "Sports/sports-yogamat.jpg",
  92: "Sports/sports-dumbbell.jpg",
  93: "Sports/sports-football.jpg",
  94: "Sports/sports-badminton.jpg",
  95: "Sports/sports-bands.jpg",
  96: "Sports/sports-bottle.jpg",
  97: "Sports/sports-rope.jpg",
  98: "Sports/sports-cricketbat.jpg",
  99: "Sports/sports-runningshoes.jpg",
  100: "Sports/sports-helmet.jpg",

  // Furniture
  111: "furniture/furniture-studytable.jpg",
  112: "furniture/furniture-officechair.jpg",
  113: "furniture/furniture-bookshelf.jpg",
  114: "furniture/furniture-bedsidetable.jpg",
  115: "furniture/furniture-sofa.jpg",
  116: "furniture/furniture-shoerack.jpg",
  117: "furniture/furniture-coathooks.jpg",
  118: "furniture/furniture-diningtable.jpg",
  119: "furniture/furniture-floorcushion.jpg",
  120: "furniture/furniture-tvconsole.jpg",
};

function getProductImage(productId) {
  const imageName = PRODUCT_IMAGES[productId];
  return imageName ? `${S3_IMAGE_BASE}/${imageName}` : null;
}

function Logo({ className = "w-8 h-8", textClassName = "text-lg" }) {
  return (
    <div
      className={`${className} rounded-lg flex items-center justify-center shrink-0`}
      style={{
        backgroundColor: TOKENS.surface,
        border: `1px solid ${TOKENS.border}`,
        boxShadow: "0 2px 6px -2px rgba(16,32,27,0.25)",
      }}
    >
      <span
        className={textClassName}
        style={{ fontFamily: "'Pirata One', cursive", color: TOKENS.ink, lineHeight: 1 }}
      >
        J
      </span>
    </div>
  );
}

function pickProductIcon(product) {
  const name = product.name.toLowerCase();
  const rules = [
    [["case", "cover", "guard"], ShieldCheck],
    [["charger", "charging pad", "charging"], BatteryCharging],
    [["earphone", "headphone", "earbud"], Headphones],
    [["speaker"], Speaker],
    [["camera"], Camera],
    [["bulb", "led"], Lightbulb],
    [["watch"], Watch],
    [["sunglasses", "glasses"], Glasses],
    [["backpack", "sling", "weekender", "diaper bag"], Backpack],
    [["smartphone", "phone"], Smartphone],
    [["laptop", "notebook", "aerobook"], Laptop],
    [["mouse", "keypad"], Mouse],
    [["ssd", "microsd", "hard drive"], HardDrive],
    [["cooling pad", "table fan"], Fan],
    [["docking", "hub", "adapter"], PlugZap],
    [["purifier", "kettle"], Droplet],
    [["cookware", "knife", "blender", "mixer", "sandwich", "fryer"], UtensilsCrossed],
    [["vacuum"], Wind],
    [["clock"], AlarmClock],
    [["sofa", "armchair", "chair"], Armchair],
    [["bed", "bedside"], Bed],
    [["bike", "cycling"], Bike],
  ];
  for (const [keywords, Icon] of rules) {
    if (keywords.some((k) => name.includes(k))) return Icon;
  }
  return (CATEGORY_STYLE[product.category] || CATEGORY_STYLE.Mobiles).icon;
}

const PRODUCTS = [
  // Fashion
  { id: 1, name: "Canvas Weekender Bag", category: "Fashion", price: 1899, original: 2499, rating: 4.5, reviews: 203, badge: "Sale", specs: ["32L capacity, water-resistant canvas", "Fits a 15\" laptop"] },
  { id: 2, name: "Minimalist Steel Watch", category: "Fashion", price: 2999, original: null, rating: 4.3, reviews: 67, badge: null, specs: ["Stainless steel case, 40mm", "5 ATM water resistance"] },
  { id: 3, name: "Cotton Oversized Tee", category: "Fashion", price: 599, original: null, rating: 4.4, reviews: 312, badge: null, specs: ["100% combed cotton", "Relaxed unisex fit"] },
  { id: 4, name: "Slim-Fit Denim Jacket", category: "Fashion", price: 1999, original: 2699, rating: 4.5, reviews: 145, badge: "Sale", specs: ["Stonewashed stretch denim", "Machine washable"] },
  { id: 5, name: "Leather Ankle Boots", category: "Fashion", price: 3499, original: null, rating: 4.2, reviews: 98, badge: null, specs: ["Genuine leather upper", "Cushioned insole"] },
  { id: 6, name: "Pleated Midi Skirt", category: "Fashion", price: 1299, original: null, rating: 4.6, reviews: 76, badge: "New", specs: ["Lightweight georgette fabric", "Elasticated waistband"] },
  { id: 7, name: "Merino Wool Sweater", category: "Fashion", price: 2499, original: null, rating: 4.7, reviews: 54, badge: null, specs: ["100% merino wool", "Breathable, temperature-regulating"] },
  { id: 8, name: "Classic Aviator Sunglasses", category: "Fashion", price: 899, original: null, rating: 4.3, reviews: 187, badge: null, specs: ["UV400 protection", "Metal frame"] },
  { id: 9, name: "Woven Leather Belt", category: "Fashion", price: 799, original: null, rating: 4.5, reviews: 121, badge: null, specs: ["Genuine leather", "Adjustable buckle"] },
  { id: 10, name: "Everyday Crossbody Sling", category: "Fashion", price: 1099, original: 1499, rating: 4.4, reviews: 93, badge: "Sale", specs: ["Multiple compartments", "Adjustable strap"] },

  // Mobiles
  { id: 11, name: "Nova Lite 5G Smartphone", category: "Mobiles", price: 18999, original: 22999, rating: 4.4, reviews: 312, badge: "Sale", specs: ["6.5\" HD+ display, 128GB storage", "5000mAh battery, 18W fast charging"] },
  { id: 12, name: "Pulse Mini Smartphone", category: "Mobiles", price: 13999, original: null, rating: 4.2, reviews: 158, badge: "New", specs: ["6.1\" AMOLED display, 64GB storage", "4200mAh battery"] },
  { id: 13, name: "Slim Phone Case & Screen Guard", category: "Mobiles", price: 499, original: null, rating: 4.6, reviews: 89, badge: null, specs: ["Shockproof silicone case", "Tempered glass guard included"] },
  { id: 14, name: "Nova Max 5G Smartphone", category: "Mobiles", price: 27999, original: 32999, rating: 4.5, reviews: 201, badge: "Sale", specs: ["6.7\" AMOLED display, 256GB storage", "6000mAh battery, 33W charging"] },
  { id: 15, name: "20W Fast Charger Adapter", category: "Mobiles", price: 699, original: null, rating: 4.3, reviews: 167, badge: null, specs: ["Type-C output, 20W PD", "Compact travel size"] },
  { id: 16, name: "Wireless Charging Pad", category: "Mobiles", price: 999, original: null, rating: 4.1, reviews: 94, badge: null, specs: ["10W Qi wireless charging", "LED charge indicator"] },
  { id: 17, name: "Dual SIM Tray Eject Tool Kit", category: "Mobiles", price: 149, original: null, rating: 4.5, reviews: 58, badge: null, specs: ["Universal eject pin", "Fits most phone models"] },
  { id: 18, name: "128GB microSD Card", category: "Mobiles", price: 899, original: null, rating: 4.6, reviews: 241, badge: null, specs: ["Class 10, up to 100MB/s", "5-year warranty"] },
  { id: 19, name: "Selfie Ring Light with Clamp", category: "Mobiles", price: 599, original: null, rating: 4.2, reviews: 72, badge: null, specs: ["3 brightness modes", "Clips onto any phone"] },
  { id: 20, name: "Foldable Phone Stand", category: "Mobiles", price: 349, original: null, rating: 4.4, reviews: 103, badge: null, specs: ["Adjustable viewing angle", "Aluminum build"] },

  // Electronics
  { id: 21, name: "Portable Bluetooth Speaker", category: "Electronics", price: 1799, original: 2299, rating: 4.5, reviews: 289, badge: "Sale", specs: ["10W output, 12-hr battery", "IPX5 water resistant"] },
  { id: 22, name: "Smart LED Bulb (Wi-Fi)", category: "Electronics", price: 599, original: null, rating: 4.3, reviews: 176, badge: null, specs: ["16 million colors via app", "Works with Alexa/Google"] },
  { id: 23, name: "Digital Kitchen Weighing Scale", category: "Electronics", price: 449, original: null, rating: 4.4, reviews: 132, badge: null, specs: ["Up to 10kg, 1g precision", "LCD display"] },
  { id: 24, name: "USB-C Multiport Hub", category: "Electronics", price: 1299, original: null, rating: 4.2, reviews: 87, badge: null, specs: ["HDMI, USB-A x2, SD card", "Plug-and-play"] },
  { id: 25, name: "Power Bank 20,000mAh", category: "Electronics", price: 1499, original: 1899, rating: 4.6, reviews: 324, badge: "Sale", specs: ["18W fast charging, dual output", "Digital charge display"] },
  { id: 26, name: "Smart Plug (Wi-Fi)", category: "Electronics", price: 699, original: null, rating: 4.1, reviews: 64, badge: null, specs: ["App + voice control", "Schedule on/off timers"] },
  { id: 27, name: "Noise-Cancelling Wired Earphones", category: "Electronics", price: 999, original: null, rating: 4.3, reviews: 198, badge: null, specs: ["In-line mic and controls", "Braided tangle-free cable"] },
  { id: 28, name: "Wireless Doorbell Camera", category: "Electronics", price: 2499, original: null, rating: 4.4, reviews: 112, badge: "New", specs: ["1080p HD, night vision", "Two-way audio"] },
  { id: 29, name: "Digital Alarm Clock with USB", category: "Electronics", price: 599, original: null, rating: 4.2, reviews: 76, badge: null, specs: ["Dual alarm, USB charging port", "Adjustable display brightness"] },
  { id: 30, name: "Mini Projector", category: "Electronics", price: 3999, original: 4999, rating: 4.0, reviews: 93, badge: "Sale", specs: ["1080p support, HDMI/USB input", "Built-in speaker"] },

  // Laptops
  { id: 31, name: "AeroBook 14\" Slim Laptop", category: "Laptops", price: 32999, original: 37999, rating: 4.4, reviews: 178, badge: "Sale", specs: ["14\" FHD display, 8GB RAM", "256GB SSD, all-day battery"] },
  { id: 32, name: "AeroBook Pro 15\" Laptop", category: "Laptops", price: 54999, original: null, rating: 4.6, reviews: 94, badge: null, specs: ["15.6\" FHD, 16GB RAM", "512GB SSD, dedicated graphics"] },
  { id: 33, name: "Budget Notebook 11.6\"", category: "Laptops", price: 16999, original: null, rating: 4.0, reviews: 143, badge: null, specs: ["11.6\" HD display, 4GB RAM", "64GB eMMC storage"] },
  { id: 34, name: "2-in-1 Convertible Laptop", category: "Laptops", price: 42999, original: 47999, rating: 4.3, reviews: 67, badge: "Sale", specs: ["360\u00b0 hinge, touchscreen", "8GB RAM, 256GB SSD"] },
  { id: 35, name: "Laptop Cooling Pad", category: "Laptops", price: 999, original: null, rating: 4.2, reviews: 89, badge: null, specs: ["Dual quiet fans", "Adjustable height stand"] },
  { id: 36, name: "Laptop Sleeve 15.6\"", category: "Laptops", price: 699, original: null, rating: 4.5, reviews: 156, badge: null, specs: ["Water-resistant neoprene", "Fits up to 15.6\" laptops"] },
  { id: 37, name: "Wireless Mouse & Keypad Combo", category: "Laptops", price: 899, original: null, rating: 4.3, reviews: 201, badge: null, specs: ["2.4GHz wireless, plug-and-play", "Silent-click buttons"] },
  { id: 38, name: "USB-C Docking Station", category: "Laptops", price: 2499, original: null, rating: 4.1, reviews: 58, badge: null, specs: ["HDMI, Ethernet, USB 3.0 x3", "Single-cable connectivity"] },
  { id: 39, name: "External SSD 1TB", category: "Laptops", price: 5999, original: 6999, rating: 4.7, reviews: 224, badge: "Sale", specs: ["USB 3.2, up to 550MB/s", "Compact, shock-resistant"] },
  { id: 40, name: "Laptop Backpack, Anti-theft", category: "Laptops", price: 1799, original: null, rating: 4.6, reviews: 187, badge: null, specs: ["Hidden zip compartments", "Fits up to 15.6\" laptops"] },

  // Beauty
  { id: 41, name: "Vitamin C Face Serum", category: "Beauty", price: 899, original: 1199, rating: 4.7, reviews: 234, badge: "Low stock", specs: ["20% Vitamin C + Hyaluronic Acid", "30ml, all skin types"] },
  { id: 42, name: "Aloe Vera Gel Moisturizer", category: "Beauty", price: 349, original: null, rating: 4.5, reviews: 198, badge: null, specs: ["99% pure aloe vera", "Lightweight, non-greasy"] },
  { id: 43, name: "Matte Liquid Lipstick Set", category: "Beauty", price: 799, original: 999, rating: 4.3, reviews: 167, badge: "Sale", specs: ["Set of 6 shades", "Transfer-resistant, 8-hr wear"] },
  { id: 44, name: "Charcoal Face Wash", category: "Beauty", price: 299, original: null, rating: 4.4, reviews: 276, badge: null, specs: ["Deep pore cleansing", "Activated charcoal + tea tree"] },
  { id: 45, name: "Herbal Hair Oil", category: "Beauty", price: 349, original: null, rating: 4.6, reviews: 312, badge: null, specs: ["Blend of 9 herbs", "Reduces hair fall"] },
  { id: 46, name: "Sunscreen SPF 50", category: "Beauty", price: 549, original: null, rating: 4.5, reviews: 189, badge: "New", specs: ["Broad spectrum SPF 50 PA+++", "Non-sticky, matte finish"] },
  { id: 47, name: "Rose Water Facial Toner", category: "Beauty", price: 249, original: null, rating: 4.4, reviews: 143, badge: null, specs: ["100% pure rose water", "Alcohol-free"] },
  { id: 48, name: "Nail Care Kit", category: "Beauty", price: 599, original: null, rating: 4.2, reviews: 87, badge: null, specs: ["10-piece manicure set", "Stainless steel tools"] },
  { id: 49, name: "Bamboo Hair Brush", category: "Beauty", price: 399, original: null, rating: 4.5, reviews: 121, badge: null, specs: ["Eco-friendly bamboo bristles", "Detangles without static"] },
  { id: 50, name: "Under-Eye Cooling Patches", category: "Beauty", price: 449, original: null, rating: 4.3, reviews: 98, badge: null, specs: ["24 pairs, hydrogel formula", "Reduces puffiness"] },

  // Home
  { id: 51, name: "Ceramic Pour-Over Set", category: "Home", price: 1199, original: null, rating: 4.8, reviews: 156, badge: "New", specs: ["350ml capacity", "Includes reusable filter"] },
  { id: 52, name: "Desk Plant Trio", category: "Home", price: 899, original: null, rating: 4.7, reviews: 98, badge: null, specs: ["3 low-maintenance succulents", "Ceramic pots included"] },
  { id: 53, name: "Aroma Diffuser", category: "Home", price: 799, original: 1199, rating: 4.6, reviews: 187, badge: "Sale", specs: ["300ml tank, up to 8 hrs mist", "7-color LED mood light"] },
  { id: 54, name: "Cotton Bedsheet Set (Queen)", category: "Home", price: 1499, original: 1999, rating: 4.5, reviews: 213, badge: "Sale", specs: ["100% cotton, 210 TC", "Includes 2 pillow covers"] },
  { id: 55, name: "Non-Stick Cookware Set", category: "Home", price: 2299, original: null, rating: 4.4, reviews: 167, badge: null, specs: ["5-piece set, induction base", "PFOA-free coating"] },
  { id: 56, name: "Scented Soy Candle Trio", category: "Home", price: 699, original: null, rating: 4.6, reviews: 134, badge: null, specs: ["Natural soy wax, 30-hr burn each", "Set of 3 fragrances"] },
  { id: 57, name: "Storage Baskets, Set of 3", category: "Home", price: 899, original: null, rating: 4.3, reviews: 76, badge: null, specs: ["Foldable, woven fabric", "Stackable sizes"] },
  { id: 58, name: "Wall Clock, Minimal Dial", category: "Home", price: 799, original: null, rating: 4.5, reviews: 109, badge: null, specs: ["Silent sweep movement", "10-inch diameter"] },
  { id: 59, name: "Kitchen Knife Set", category: "Home", price: 1299, original: null, rating: 4.4, reviews: 145, badge: null, specs: ["5-piece stainless steel set", "Includes wooden block"] },
  { id: 60, name: "Door Mat, Coir", category: "Home", price: 449, original: null, rating: 4.2, reviews: 87, badge: null, specs: ["Natural coir, non-slip base", "Weather resistant"] },

  // Appliances
  { id: 61, name: "Compact Air Fryer 3.5L", category: "Appliances", price: 3499, original: 4299, rating: 4.5, reviews: 298, badge: "Sale", specs: ["3.5L capacity, 8 presets", "Oil-free frying"] },
  { id: 62, name: "Hand Blender, 3-Speed", category: "Appliances", price: 1299, original: null, rating: 4.3, reviews: 176, badge: null, specs: ["3-speed control, 250W motor", "Detachable stainless blade"] },
  { id: 63, name: "Electric Kettle 1.5L", category: "Appliances", price: 899, original: null, rating: 4.6, reviews: 234, badge: null, specs: ["1.5L capacity, auto shut-off", "Boils in under 5 minutes"] },
  { id: 64, name: "Sandwich & Grill Maker", category: "Appliances", price: 1599, original: null, rating: 4.2, reviews: 121, badge: null, specs: ["2-in-1 sandwich + grill plates", "Non-stick coating"] },
  { id: 65, name: "Room Heater, Ceramic", category: "Appliances", price: 1899, original: 2299, rating: 4.1, reviews: 98, badge: "Sale", specs: ["Ceramic PTC heating, 2000W", "Tip-over safety switch"] },
  { id: 66, name: "Table Fan, 16-inch", category: "Appliances", price: 1499, original: null, rating: 4.4, reviews: 187, badge: null, specs: ["3-speed, oscillating", "Adjustable tilt"] },
  { id: 67, name: "Steam Iron, Non-Stick Plate", category: "Appliances", price: 999, original: null, rating: 4.3, reviews: 165, badge: null, specs: ["Non-stick soleplate", "Adjustable steam control"] },
  { id: 68, name: "Mixer Grinder, 3-Jar", category: "Appliances", price: 2799, original: 3299, rating: 4.5, reviews: 213, badge: "Sale", specs: ["550W motor, 3 stainless jars", "5-year motor warranty"] },
  { id: 69, name: "Water Purifier, RO+UV", category: "Appliances", price: 6499, original: null, rating: 4.4, reviews: 143, badge: null, specs: ["7-stage RO+UV+UF purification", "8L storage tank"] },
  { id: 70, name: "Vacuum Cleaner, Handheld", category: "Appliances", price: 2299, original: null, rating: 4.2, reviews: 98, badge: null, specs: ["Cordless, 15-min runtime", "Washable filter"] },

  // Toys
  { id: 71, name: "Wooden Building Blocks Set", category: "Toys", price: 799, original: null, rating: 4.8, reviews: 76, badge: null, specs: ["120 pieces, non-toxic paint", "Ages 3+"] },
  { id: 72, name: "Remote Control Racer", category: "Toys", price: 1299, original: 1699, rating: 4.4, reviews: 121, badge: "Sale", specs: ["1:18 scale, 20 km/h top speed", "Rechargeable, 45-min play time"] },
  { id: 73, name: "Classic Puzzle Cube", category: "Toys", price: 349, original: null, rating: 4.5, reviews: 203, badge: null, specs: ["Smooth 360\u00b0 rotation", "Stickerless, fade-proof"] },
  { id: 74, name: "Board Game: Family Trivia", category: "Toys", price: 699, original: null, rating: 4.6, reviews: 89, badge: null, specs: ["500+ question cards", "2-6 players, ages 8+"] },
  { id: 75, name: "Soft Plush Teddy Bear", category: "Toys", price: 599, original: null, rating: 4.7, reviews: 167, badge: "New", specs: ["Hypoallergenic soft filling", "14-inch, machine washable"] },
  { id: 76, name: "Building Bricks Mega Set", category: "Toys", price: 1499, original: null, rating: 4.6, reviews: 145, badge: null, specs: ["500+ compatible bricks", "Storage box included"] },
  { id: 77, name: "Kids' Art & Craft Kit", category: "Toys", price: 899, original: null, rating: 4.5, reviews: 98, badge: null, specs: ["30+ pieces, non-toxic materials", "Ages 4+"] },
  { id: 78, name: "Battery-Free Pull-Back Cars", category: "Toys", price: 449, original: null, rating: 4.3, reviews: 112, badge: null, specs: ["Set of 4 cars", "No batteries needed"] },
  { id: 79, name: "Kids' Musical Keyboard", category: "Toys", price: 1199, original: 1499, rating: 4.2, reviews: 87, badge: "Sale", specs: ["24 keys, demo songs", "Built-in speaker"] },
  { id: 80, name: "Outdoor Frisbee & Ball Set", category: "Toys", price: 399, original: null, rating: 4.4, reviews: 76, badge: null, specs: ["Includes frisbee, ball, cones", "Durable outdoor plastic"] },

  // Baby
  { id: 81, name: "Baby Onesie Set (3-Pack)", category: "Baby", price: 899, original: null, rating: 4.6, reviews: 187, badge: null, specs: ["100% organic cotton", "0-6 months"] },
  { id: 82, name: "Soft Cotton Baby Blanket", category: "Baby", price: 699, original: null, rating: 4.7, reviews: 143, badge: null, specs: ["Breathable muslin cotton", "Machine washable"] },
  { id: 83, name: "BPA-Free Feeding Bottle Set", category: "Baby", price: 999, original: 1299, rating: 4.5, reviews: 198, badge: "Sale", specs: ["Set of 2, 250ml each", "Anti-colic nipple design"] },
  { id: 84, name: "Baby Wipes, Pack of 3", category: "Baby", price: 349, original: null, rating: 4.4, reviews: 276, badge: null, specs: ["Fragrance-free, 80 wipes each", "Dermatologically tested"] },
  { id: 85, name: "Diaper Bag, Water-Resistant", category: "Baby", price: 1599, original: null, rating: 4.3, reviews: 98, badge: null, specs: ["Multiple compartments", "Includes changing mat"] },
  { id: 86, name: "Baby Rattle Toy Set", category: "Baby", price: 449, original: null, rating: 4.6, reviews: 112, badge: null, specs: ["Set of 4, BPA-free", "Ages 0+"] },
  { id: 87, name: "Nursing Pillow", category: "Baby", price: 1199, original: null, rating: 4.5, reviews: 87, badge: null, specs: ["Ergonomic C-shape", "Removable washable cover"] },
  { id: 88, name: "Baby Bath Tub with Support", category: "Baby", price: 1399, original: null, rating: 4.4, reviews: 76, badge: null, specs: ["Non-slip base, mesh support", "0-12 months"] },
  { id: 89, name: "Baby Monitor, Audio", category: "Baby", price: 1899, original: 2299, rating: 4.2, reviews: 65, badge: "Sale", specs: ["Range up to 300m", "Two-way talk-back"] },
  { id: 90, name: "Soft-Sole Baby Shoes", category: "Baby", price: 599, original: null, rating: 4.5, reviews: 103, badge: null, specs: ["Flexible non-slip sole", "6-18 months"] },

  // Sports
  { id: 91, name: "Yoga Mat, Non-Slip", category: "Sports", price: 799, original: null, rating: 4.6, reviews: 234, badge: null, specs: ["6mm thickness, non-slip texture", "Includes carry strap"] },
  { id: 92, name: "Adjustable Dumbbell Set", category: "Sports", price: 2499, original: 2999, rating: 4.5, reviews: 167, badge: "Sale", specs: ["2.5kg-15kg adjustable per side", "Space-saving design"] },
  { id: 93, name: "Football, Size 5", category: "Sports", price: 699, original: null, rating: 4.4, reviews: 198, badge: null, specs: ["Machine-stitched, all-weather", "FIFA-standard size 5"] },
  { id: 94, name: "Badminton Racket Set of 2", category: "Sports", price: 899, original: null, rating: 4.3, reviews: 143, badge: null, specs: ["Aluminum frame, includes shuttlecocks", "Full cover included"] },
  { id: 95, name: "Resistance Bands Set", category: "Sports", price: 599, original: 799, rating: 4.5, reviews: 212, badge: "Sale", specs: ["5 resistance levels", "Includes door anchor"] },
  { id: 96, name: "Sports Water Bottle, 1L", category: "Sports", price: 349, original: null, rating: 4.4, reviews: 187, badge: null, specs: ["Leak-proof, BPA-free", "Wide mouth for easy filling"] },
  { id: 97, name: "Skipping Rope, Adjustable", category: "Sports", price: 299, original: null, rating: 4.2, reviews: 98, badge: null, specs: ["Ball-bearing handles", "Adjustable length"] },
  { id: 98, name: "Cricket Bat, Kashmir Willow", category: "Sports", price: 1899, original: null, rating: 4.3, reviews: 76, badge: null, specs: ["Kashmir willow, full size", "Pre-oiled, ready to use"] },
  { id: 99, name: "Running Shoes, Men's", category: "Sports", price: 2299, original: 2799, rating: 4.5, reviews: 289, badge: "Sale", specs: ["Breathable mesh upper", "Cushioned EVA sole"] },
  { id: 100, name: "Cycling Helmet", category: "Sports", price: 1199, original: null, rating: 4.4, reviews: 112, badge: null, specs: ["16 vents, adjustable fit", "Certified safety build"] },

  // Books
  { id: 101, name: "The Silent Orchard (Fiction)", category: "Books", price: 349, original: null, rating: 4.5, reviews: 167, badge: null, specs: ["Paperback, 312 pages", "Award-winning debut novel"] },
  { id: 102, name: "Learning Python the Simple Way", category: "Books", price: 449, original: null, rating: 4.6, reviews: 234, badge: null, specs: ["Beginner-friendly, 280 pages", "Includes practice exercises"] },
  { id: 103, name: "Atomic Focus (Self-Help)", category: "Books", price: 399, original: 499, rating: 4.4, reviews: 198, badge: "Sale", specs: ["Paperback, 240 pages", "Practical daily habits"] },
  { id: 104, name: "The Bangalore Diaries (Fiction)", category: "Books", price: 349, original: null, rating: 4.3, reviews: 89, badge: null, specs: ["Paperback, 296 pages", "Set in modern-day Bangalore"] },
  { id: 105, name: "Basics of Personal Finance", category: "Books", price: 399, original: null, rating: 4.5, reviews: 143, badge: null, specs: ["Paperback, 220 pages", "For first-time earners"] },
  { id: 106, name: "Children's Picture Book: The Kind Fox", category: "Books", price: 249, original: null, rating: 4.7, reviews: 176, badge: "New", specs: ["Hardcover, 32 pages", "Ages 3-7"] },
  { id: 107, name: "History of Modern India", category: "Books", price: 549, original: null, rating: 4.4, reviews: 98, badge: null, specs: ["Paperback, 420 pages", "Covers 1857-1947"] },
  { id: 108, name: "The Art of Slow Mornings", category: "Books", price: 299, original: null, rating: 4.6, reviews: 121, badge: null, specs: ["Paperback, 180 pages", "Essays on everyday calm"] },
  { id: 109, name: "Mind Maps for Students", category: "Books", price: 349, original: 449, rating: 4.3, reviews: 87, badge: "Sale", specs: ["Paperback, 160 pages", "Study technique guide"] },
  { id: 110, name: "Pocket Guide to Cloud Computing", category: "Books", price: 399, original: null, rating: 4.5, reviews: 103, badge: null, specs: ["Paperback, 210 pages", "Covers AWS, Azure, GCP basics"] },

  // Furniture
  { id: 111, name: "Wooden Study Table", category: "Furniture", price: 4499, original: 5299, rating: 4.4, reviews: 98, badge: "Sale", specs: ["Engineered wood, 3 drawers", "110 x 55 cm"] },
  { id: 112, name: "Ergonomic Office Chair", category: "Furniture", price: 6999, original: null, rating: 4.5, reviews: 167, badge: null, specs: ["Adjustable height & lumbar support", "360\u00b0 swivel"] },
  { id: 113, name: "Foldable Bookshelf, 4-Tier", category: "Furniture", price: 2299, original: null, rating: 4.3, reviews: 76, badge: null, specs: ["Engineered wood, tool-free assembly", "Holds up to 80 books"] },
  { id: 114, name: "Bedside Table, Compact", category: "Furniture", price: 1899, original: null, rating: 4.4, reviews: 89, badge: null, specs: ["Single drawer + open shelf", "Space-saving 40cm width"] },
  { id: 115, name: "2-Seater Fabric Sofa", category: "Furniture", price: 12999, original: 14999, rating: 4.5, reviews: 112, badge: "Sale", specs: ["Solid wood frame, fabric upholstery", "High-density foam cushions"] },
  { id: 116, name: "Shoe Rack, 5-Tier", category: "Furniture", price: 1699, original: null, rating: 4.2, reviews: 98, badge: null, specs: ["Holds up to 15 pairs", "Tool-free assembly"] },
  { id: 117, name: "Wall-Mounted Coat Hooks", category: "Furniture", price: 599, original: null, rating: 4.6, reviews: 143, badge: null, specs: ["Set of 5 hooks", "Solid wood backing"] },
  { id: 118, name: "Dining Table Set, 4-Seater", category: "Furniture", price: 14999, original: null, rating: 4.4, reviews: 76, badge: null, specs: ["Engineered wood, 4 chairs included", "Scratch-resistant finish"] },
  { id: 119, name: "Floor Cushion, Set of 2", category: "Furniture", price: 999, original: 1299, rating: 4.5, reviews: 98, badge: "Sale", specs: ["Cotton cover, washable", "50 x 50 cm"] },
  { id: 120, name: "TV Console Unit", category: "Furniture", price: 3999, original: null, rating: 4.3, reviews: 87, badge: null, specs: ["Fits up to 50\" TVs", "2 storage drawers"] },
];

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className="w-3.5 h-3.5"
          strokeWidth={0}
          fill={n <= Math.round(rating) ? TOKENS.accent : TOKENS.border}
        />
      ))}
    </div>
  );
}

function hashSeed(seed) {
  const str = String(seed ?? "0");
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function CategoryTile({
  category,
  className,
  iconClassName = "w-14 h-14",
  imageSeed,
  icon,
}) {
  const style = CATEGORY_STYLE[category] || CATEGORY_STYLE.Mobiles;
  const Icon = icon || style.icon;
  const imageUrl = getProductImage(imageSeed);

  const variant = imageSeed !== undefined ? hashSeed(imageSeed) % 3 : 1;
  const rotate = [-6, 0, 6][variant];

  return (
    <div
      className={`${className} relative flex items-center justify-center overflow-hidden`}
      style={{ backgroundColor: style.tint }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={category}
          className="w-full h-full object-cover"
        />
      ) : (
        <>
          <div
            className="absolute rounded-full"
            style={{
              width: "46%",
              height: "10%",
              bottom: "20%",
              backgroundColor: "rgba(16,32,27,0.10)",
              filter: "blur(5px)",
            }}
          />

          <Icon
            className={`${iconClassName} relative`}
            style={{
              color: style.iconColor,
              transform: `rotate(${rotate}deg)`,
              filter: "drop-shadow(0 8px 10px rgba(16,32,27,0.15))",
            }}
            strokeWidth={1.3}
          />
        </>
      )}
    </div>
  );
}

function ProductCard({ product, onAdd, onView }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - py) * 12, y: (px - 0.5) * 12 });
  }

  function handleLeave() {
    setTilt({ x: 0, y: 0 });
    setHovering(false);
  }

  const discount =
    product.original && Math.round(100 - (product.price / product.original) * 100);

  return (
    <div
      className="relative"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleLeave}
    >
      <button
        onClick={() => onView(product)}
        className="w-full text-left rounded-2xl overflow-hidden transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:outline-none"
        style={{
          backgroundColor: TOKENS.surface,
          border: `1px solid ${TOKENS.border}`,
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
            hovering ? 1.02 : 1
          })`,
          boxShadow: hovering
            ? "0 24px 40px -16px rgba(16,32,27,0.25)"
            : "0 2px 8px -2px rgba(16,32,27,0.08)",
        }}
      >
        <div className="relative aspect-square overflow-hidden">
          <CategoryTile category={product.category} className="w-full h-full" imageSeed={product.id} icon={pickProductIcon(product)} />
          {product.badge && (
            <span
              className="absolute top-3 left-3 -rotate-3 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor:
                  product.badge === "Low stock" ? TOKENS.urgent : TOKENS.primary,
                color: TOKENS.surface,
              }}
            >
              {product.badge}
            </span>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs font-medium mb-1" style={{ color: TOKENS.inkMuted }}>
            {product.category}
          </p>
          <h3
            className="font-semibold text-sm mb-1.5 leading-snug"
            style={{ color: TOKENS.ink, fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mb-3">
            <Stars rating={product.rating} />
            <span className="text-xs" style={{ color: TOKENS.inkMuted }}>
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div
              className="flex items-baseline gap-2"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <span className="font-semibold text-base" style={{ color: TOKENS.ink }}>
                {formatINR(product.price)}
              </span>
              {product.original && (
                <span className="text-xs line-through" style={{ color: TOKENS.inkMuted }}>
                  {formatINR(product.original)}
                </span>
              )}
            </div>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onAdd(product);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  e.preventDefault();
                  onAdd(product);
                }
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:outline-none"
              style={{ backgroundColor: TOKENS.primary, color: TOKENS.surface }}
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </button>

      {discount > 0 && (
        <div
          className="absolute -top-3 -right-3 rotate-6 text-xs font-bold px-2.5 py-1.5 rounded-xl"
          style={{
            backgroundColor: TOKENS.accent,
            color: TOKENS.ink,
            fontFamily: "'IBM Plex Mono', monospace",
            boxShadow: "0 10px 20px -6px rgba(242,169,59,0.55)",
          }}
        >
          -{discount}%
        </div>
      )}
    </div>
  );
}

function ProductDetailModal({ product, onClose, onAdd }) {
  if (!product) return null;
  const discount =
    product.original && Math.round(100 - (product.price / product.original) * 100);

  return (
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center"
      style={{ zIndex: 70 }}
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(16,32,27,0.5)" }} />
      <div
        className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{ backgroundColor: TOKENS.surface, maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center focus-visible:ring-2 focus-visible:outline-none"
          style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative aspect-square sm:aspect-video">
          <CategoryTile category={product.category} className="w-full h-full" iconClassName="w-16 h-16" imageSeed={product.id} icon={pickProductIcon(product)} />
          {discount > 0 && (
            <span
              className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: TOKENS.accent, color: TOKENS.ink }}
            >
              -{discount}%
            </span>
          )}
        </div>

        <div className="p-5 overflow-y-auto" style={{ maxHeight: "45vh" }}>
          <p className="text-xs font-medium mb-1" style={{ color: TOKENS.inkMuted }}>
            {product.category}
          </p>
          <h3
            className="text-xl font-bold mb-2"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: TOKENS.ink }}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <Stars rating={product.rating} />
            <span className="text-xs" style={{ color: TOKENS.inkMuted }}>
              {product.rating} \u00b7 {product.reviews} reviews
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: TOKENS.ink }}>
            Specifications
          </p>
          <ul className="flex flex-col gap-1.5 mb-5">
            {product.specs.map((s) => (
              <li key={s} className="text-sm flex items-start gap-2" style={{ color: TOKENS.inkMuted }}>
                <span
                  className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: TOKENS.primary }}
                />
                {s}
              </li>
            ))}
          </ul>

          <div
            className="flex items-center justify-between pt-4"
            style={{ borderTop: `1px solid ${TOKENS.border}` }}
          >
            <div className="flex items-baseline gap-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <span className="text-xl font-bold" style={{ color: TOKENS.ink }}>
                {formatINR(product.price)}
              </span>
              {product.original && (
                <span className="text-sm line-through" style={{ color: TOKENS.inkMuted }}>
                  {formatINR(product.original)}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                onAdd(product);
                onClose();
              }}
              className="px-5 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:outline-none"
              style={{ backgroundColor: TOKENS.primary, color: TOKENS.surface }}
            >
              <Plus className="w-4 h-4" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-6"
      style={{ zIndex: 80 }}
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(16,32,27,0.5)" }} />
      <div
        className="relative w-full max-w-md rounded-3xl p-6"
        style={{ backgroundColor: TOKENS.surface }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center focus-visible:ring-2 focus-visible:outline-none"
          style={{ backgroundColor: TOKENS.bg }}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <h3
          className="text-xl font-bold mb-3"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: TOKENS.ink }}
        >
          About MiniMart
        </h3>
        <p className="text-sm mb-5" style={{ color: TOKENS.inkMuted }}>
          MiniMart is a small, fast-moving shop spanning twelve everyday categories —
          fashion to furniture — priced fairly in rupees and shipped across India.
        </p>
        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: TOKENS.ink }}>
          Address
        </p>
        <p className="text-sm" style={{ color: TOKENS.inkMuted }}>
          Bannerghatta Road, Bangalore, Karnataka 560083
        </p>
      </div>
    </div>
  );
}

function LoginModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-6"
      style={{ zIndex: 80 }}
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(16,32,27,0.5)" }} />
      <div
        className="relative w-full max-w-sm rounded-3xl p-6"
        style={{ backgroundColor: TOKENS.surface }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center focus-visible:ring-2 focus-visible:outline-none"
          style={{ backgroundColor: TOKENS.bg }}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <h3
          className="text-xl font-bold mb-1"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: TOKENS.ink }}
        >
          Log in to MiniMart
        </h3>
        <p className="text-sm mb-5" style={{ color: TOKENS.inkMuted }}>
          Account sign-in will connect to the backend once it's wired up. This is a preview form for now.
        </p>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <input
            type="email"
            placeholder="you@email.com"
            className="text-sm px-4 py-2.5 rounded-full outline-none"
            style={{ border: `1px solid ${TOKENS.border}`, color: TOKENS.ink }}
          />
          <input
            type="password"
            placeholder="Password"
            className="text-sm px-4 py-2.5 rounded-full outline-none"
            style={{ border: `1px solid ${TOKENS.border}`, color: TOKENS.ink }}
          />
          <button
            type="submit"
            className="mt-1 py-2.5 rounded-full font-semibold text-sm focus-visible:ring-2 focus-visible:outline-none"
            style={{ backgroundColor: TOKENS.primary, color: TOKENS.surface }}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

function ProductRow({ product, onAdd, onView }) {
  const discount =
    product.original && Math.round(100 - (product.price / product.original) * 100);
  return (
    <button
      onClick={() => onView(product)}
      className="w-full flex items-stretch gap-5 py-5 text-left focus-visible:ring-2 focus-visible:outline-none rounded-xl"
      style={{ borderBottom: `1px solid ${TOKENS.border}` }}
    >
      <div
        className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden shrink-0"
        style={{ border: `1px solid ${TOKENS.border}` }}
      >
        <CategoryTile category={product.category} className="w-full h-full" iconClassName="w-14 h-14" imageSeed={product.id} icon={pickProductIcon(product)} />
        {product.badge && (
          <span
            className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: product.badge === "Low stock" ? TOKENS.urgent : TOKENS.primary,
              color: TOKENS.surface,
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <p className="text-xs font-medium mb-1" style={{ color: TOKENS.inkMuted }}>
          {product.category}
        </p>
        <h3
          className="font-semibold text-base sm:text-lg mb-1.5 leading-snug"
          style={{ color: TOKENS.ink, fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-2">
          <Stars rating={product.rating} />
          <span className="text-xs" style={{ color: TOKENS.inkMuted }}>
            {product.rating} ({product.reviews})
          </span>
        </div>
        <ul className="hidden sm:flex flex-col gap-1">
          {product.specs.slice(0, 2).map((s) => (
            <li key={s} className="text-xs flex items-start gap-2" style={{ color: TOKENS.inkMuted }}>
              <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: TOKENS.primary }} />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-end justify-center gap-2 shrink-0 pl-2">
        <div className="flex items-baseline gap-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <span className="font-bold text-base sm:text-lg" style={{ color: TOKENS.ink }}>
            {formatINR(product.price)}
          </span>
        </div>
        {product.original && (
          <div className="flex items-center gap-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <span className="text-xs line-through" style={{ color: TOKENS.inkMuted }}>
              {formatINR(product.original)}
            </span>
            <span className="text-xs font-semibold" style={{ color: TOKENS.primary }}>
              {discount}% off
            </span>
          </div>
        )}
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              e.preventDefault();
              onAdd(product);
            }
          }}
          className="mt-1 w-9 h-9 rounded-full flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:outline-none"
          style={{ backgroundColor: TOKENS.primary, color: TOKENS.surface }}
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
        </span>
      </div>
    </button>
  );
}

function SubPage({ title, products, onBack, onAdd, onView }) {
  return (
    <section className="w-full mm-gutter py-10">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-semibold mb-6 focus-visible:ring-2 focus-visible:outline-none rounded"
        style={{ color: TOKENS.primary }}
      >
        <ChevronLeft className="w-4 h-4" />
        Back to shopping
      </button>
      <h2
        className="text-2xl font-bold mb-1"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
      >
        {title}
      </h2>
      <p className="text-sm mb-4" style={{ color: TOKENS.inkMuted }}>
        {products.length} {products.length === 1 ? "result" : "results"}
      </p>

      {products.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-semibold text-sm mb-1" style={{ color: TOKENS.ink }}>
            Nothing here yet.
          </p>
          <p className="text-sm" style={{ color: TOKENS.inkMuted }}>
            Try a different search or category.
          </p>
        </div>
      ) : (
        <div className="flex flex-col rounded-2xl overflow-hidden px-2 sm:px-4" style={{ backgroundColor: TOKENS.surface, border: `1px solid ${TOKENS.border}` }}>
          {products.map((p) => (
            <ProductRow key={p.id} product={p} onAdd={onAdd} onView={onView} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function MiniMartStorefront() {
  const [showIntro, setShowIntro] = useState(true);
  const [introZoomed, setIntroZoomed] = useState(false);
  const [introFading, setIntroFading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const [toast, setToast] = useState(null);
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.qty * i.price, 0);

  const isSearching = searchQuery.trim().length > 0;
  const isDeals = activeCategory === "Deals";
  const showingSubPage = isSearching || !!activeCategory;
  const pageProducts = isSearching
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : isDeals
    ? PRODUCTS.filter((p) => p.original)
    : activeCategory
    ? PRODUCTS.filter((p) => p.category === activeCategory)
    : [];
  const pageTitle = isSearching ? `Results for "${searchQuery.trim()}"` : activeCategory || "";

  const featuredHome = CATEGORIES.slice(0, 8)
    .map((c) => PRODUCTS.find((p) => p.category === c.name))
    .filter(Boolean);

  useEffect(() => {
    const zoomTimer = setTimeout(() => setIntroZoomed(true), 50);
    const fadeTimer = setTimeout(() => setIntroFading(true), 2300);
    const openTimer = setTimeout(() => {
      setShowIntro(false);
      setLoaded(true);
    }, 2800);
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(fadeTimer);
      clearTimeout(openTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function addToCart(product) {
    setCartItems((items) => {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        return items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...items, { ...product, qty: 1 }];
    });
    setBump(true);
    setTimeout(() => setBump(false), 400);
    setToast(product);
    setTimeout(() => setToast(null), 2200);
  }

  function removeFromCart(id) {
    setCartItems((items) => items.filter((i) => i.id !== id));
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((items) => items.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  function goHome() {
    setActiveCategory(null);
    setSearchQuery("");
  }

  function goToCategory(name) {
    setSearchQuery("");
    setActiveCategory((current) => (current === name ? null : name));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleHeroMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroTilt({ x: px, y: py });
  }

  const reveal = () =>
    `transition-all duration-700 ease-out ${
      loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`;

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: TOKENS.bg, color: TOKENS.ink }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&family=Berkshire+Swash&family=Pirata+One&display=swap"
      />
      <style>{`
        * { font-family: 'Inter', sans-serif; }
        @keyframes cartBump { 0% { transform: scale(1); } 40% { transform: scale(1.3); } 100% { transform: scale(1); } }
        .cart-bump { animation: cartBump 0.4s ease-out; }
        .mm-gutter { padding-left: 1rem; padding-right: 1rem; }
        @media (min-width: 640px) {
          .mm-gutter { padding-left: 1.5cm; padding-right: 1.5cm; }
        }
        @media (min-width: 1024px) {
          .mm-gutter { padding-left: 2.5cm; padding-right: 2.5cm; }
        }
        .mm-trust-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 1.5rem; }
        .mm-category-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 1rem; }
        .mm-product-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 1.25rem; }
        @media (min-width: 640px) {
          .mm-trust-grid { grid-template-columns: repeat(4, minmax(0,1fr)); }
          .mm-category-grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
          .mm-product-grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
        }
        @media (min-width: 900px) {
          .mm-category-grid { grid-template-columns: repeat(4, minmax(0,1fr)); }
          .mm-product-grid { grid-template-columns: repeat(4, minmax(0,1fr)); gap: 2rem; }
        }
        @media (min-width: 1280px) {
          .mm-category-grid { grid-template-columns: repeat(6, minmax(0,1fr)); }
        }
        .mm-scroll::-webkit-scrollbar { display: none; }
        .mm-scroll { scrollbar-width: none; }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* Intro splash */}
      {showIntro && (
        <div
          className={`fixed inset-0 flex items-center justify-center transition-opacity duration-500 ${
            introFading ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundColor: "#FFFFFF", zIndex: 100 }}
        >
          <span
            className={`block transition-all duration-700 ease-out ${
              introZoomed ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
            style={{
              fontFamily: "'Pirata One', cursive",
              fontSize: "clamp(7rem, 26vw, 14rem)",
              lineHeight: 1,
              color: TOKENS.ink,
              filter: "drop-shadow(0 14px 28px rgba(16,32,27,0.3))",
            }}
          >
            J
          </span>
        </div>
      )}

      {/* Header */}
      <header
        className="sticky top-0 z-30 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(244,247,245,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? `1px solid ${TOKENS.border}` : "1px solid transparent",
        }}
      >
        <div className="w-full mm-gutter py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => {
              goHome();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`flex items-center gap-2 overflow-hidden ${reveal()} focus-visible:ring-2 focus-visible:outline-none rounded`}
          >
            <Logo className="w-8 h-8" textClassName="text-lg" />
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              MiniMart
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1 flex-1 max-w-sm">
            <div
              className="flex items-center gap-2 w-full px-3 py-2 rounded-full"
              style={{ backgroundColor: TOKENS.surface, border: `1px solid ${TOKENS.border}` }}
            >
              <Search className="w-4 h-4 shrink-0" style={{ color: TOKENS.inkMuted }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setActiveCategory(null);
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search products"
                className="bg-transparent outline-none text-sm w-full"
                style={{ color: TOKENS.ink }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="shrink-0 focus-visible:ring-2 focus-visible:outline-none rounded"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" style={{ color: TOKENS.inkMuted }} />
                </button>
              )}
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goHome();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:outline-none rounded"
              style={{ color: TOKENS.ink }}
            >
              Shop
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goHome();
                setTimeout(
                  () => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" }),
                  50
                );
              }}
              className="hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:outline-none rounded"
              style={{ color: TOKENS.ink }}
            >
              Categories
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSearchQuery("");
                setActiveCategory("Deals");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:outline-none rounded"
              style={{ color: TOKENS.ink }}
            >
              Deals
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setAboutOpen(true);
              }}
              className="hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:outline-none rounded"
              style={{ color: TOKENS.ink }}
            >
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLoginOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:outline-none"
              style={{ color: TOKENS.ink }}
            >
              <User className="w-4.5 h-4.5" />
              Login
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative w-10 h-10 rounded-full flex items-center justify-center focus-visible:ring-2 focus-visible:outline-none"
              style={{ backgroundColor: TOKENS.surface, border: `1px solid ${TOKENS.border}` }}
              aria-label="Open cart"
            >
              <ShoppingCart className={`w-4.5 h-4.5 ${bump ? "cart-bump" : ""}`} />
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                    bump ? "cart-bump" : ""
                  }`}
                  style={{ backgroundColor: TOKENS.accent, color: TOKENS.ink }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: TOKENS.surface, border: `1px solid ${TOKENS.border}` }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setActiveCategory(null);
                setSearchQuery(e.target.value);
                setMenuOpen(false);
              }}
              placeholder="Search products"
              className="text-sm px-3 py-2 rounded-full outline-none"
              style={{ border: `1px solid ${TOKENS.border}`, color: TOKENS.ink }}
            />
            <a href="#" onClick={(e) => { e.preventDefault(); goHome(); setMenuOpen(false); }} className="text-sm font-medium" style={{ color: TOKENS.ink }}>Shop</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goHome(); setMenuOpen(false); setTimeout(() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" }), 50); }} className="text-sm font-medium" style={{ color: TOKENS.ink }}>Categories</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory("Deals"); setSearchQuery(""); setMenuOpen(false); }} className="text-sm font-medium" style={{ color: TOKENS.ink }}>Deals</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setAboutOpen(true); setMenuOpen(false); }} className="text-sm font-medium" style={{ color: TOKENS.ink }}>About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setLoginOpen(true); setMenuOpen(false); }} className="text-sm font-medium" style={{ color: TOKENS.ink }}>Login</a>
          </div>
        )}

        {/* Category tab strip */}
        <div className="mm-gutter mm-scroll flex items-center gap-6 overflow-x-auto pb-3 pt-1">
          {[{ name: "All", icon: Sparkles }, ...CATEGORIES].map(({ name, icon: Icon }) => {
            const isActive = name === "All" ? !activeCategory && !isSearching : activeCategory === name;
            return (
              <button
                key={name}
                onClick={() => (name === "All" ? goHome() : goToCategory(name))}
                className="flex flex-col items-center gap-1.5 shrink-0 pb-1 focus-visible:ring-2 focus-visible:outline-none rounded"
                style={{ borderBottom: `2px solid ${isActive ? TOKENS.primary : "transparent"}` }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: isActive ? TOKENS.primary : TOKENS.inkMuted }}
                  strokeWidth={1.6}
                />
                <span
                  className="text-xs font-medium whitespace-nowrap"
                  style={{ color: isActive ? TOKENS.ink : TOKENS.inkMuted }}
                >
                  {name}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {showingSubPage ? (
        <SubPage
          title={pageTitle}
          products={pageProducts}
          onBack={() => {
            goHome();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onAdd={addToCart}
          onView={setSelectedProduct}
        />
      ) : (
        <>
          {/* Hero */}
          <section
            className="w-full mm-gutter pt-10 pb-16 grid md:grid-cols-2 gap-10 items-center"
            onMouseMove={handleHeroMove}
            onMouseLeave={() => setHeroTilt({ x: 0, y: 0 })}
          >
            <div className={reveal()}>
              <div
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: TOKENS.accentSoft, color: TOKENS.primaryDark }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Chosen by people
              </div>
              <h1
                className="text-4xl md:text-5xl font-extrabold leading-tight mb-5"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Everything you need.
              </h1>
              <p className="text-base mb-7 max-w-md" style={{ color: TOKENS.inkMuted }}>
                Real prices in rupees, across twelve categories — shipped from Bangalore to your door.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:outline-none"
                  style={{ backgroundColor: TOKENS.primary, color: TOKENS.surface }}
                >
                  Shop the collection
                  <ChevronRight className="w-4 h-4" />
                </button>
                <a
                  href="#categories"
                  className="text-sm font-semibold underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none rounded"
                  style={{ color: TOKENS.ink }}
                >
                  Browse categories
                </a>
              </div>
            </div>

            <div className={`relative h-72 md:h-96 ${reveal()}`} style={{ perspective: "1200px" }}>
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateX(${-heroTilt.y * 10}deg) rotateY(${heroTilt.x * 10}deg)`,
                  boxShadow: "0 30px 60px -20px rgba(16,32,27,0.3)",
                }}
              >
                <CategoryTile category="Mobiles" className="w-full h-full" iconClassName="w-16 h-16" imageSeed="hero-mobiles" />
              </div>
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl overflow-hidden hidden sm:block transition-transform duration-200 ease-out"
                style={{
                  transform: `translate3d(${heroTilt.x * -20}px, ${heroTilt.y * -20}px, 0) rotate(-6deg)`,
                  boxShadow: "0 20px 40px -16px rgba(16,32,27,0.35)",
                  border: `4px solid ${TOKENS.bg}`,
                }}
              >
                <CategoryTile category="Toys" className="w-full h-full" iconClassName="w-8 h-8" imageSeed="hero-toys" />
              </div>
            </div>
          </section>

          {/* Trust strip */}
          <section
            style={{
              backgroundColor: TOKENS.surface,
              borderTop: `1px solid ${TOKENS.border}`,
              borderBottom: `1px solid ${TOKENS.border}`,
            }}
          >
            <div className="w-full mm-gutter py-6 mm-trust-grid">
              {[
                { icon: Truck, text: "Free delivery over \u20B9999" },
                { icon: ShieldCheck, text: "Secure checkout, every time" },
                { icon: RotateCcw, text: "7-day easy returns" },
                { icon: Headphones, text: "Real humans, 24/7" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="w-5 h-5 shrink-0" style={{ color: TOKENS.primary }} />
                  <span className="text-sm font-medium" style={{ color: TOKENS.ink }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section id="categories" className="w-full mm-gutter py-14">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Shop by category
            </h2>
            <div className="mm-category-grid">
              {CATEGORIES.map(({ name, icon: Icon }) => {
                const isActive = activeCategory === name;
                return (
                  <button
                    key={name}
                    onClick={() => goToCategory(name)}
                    className="flex flex-col items-start gap-3 p-5 rounded-2xl text-left transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:outline-none"
                    style={{
                      backgroundColor: isActive ? TOKENS.primary : TOKENS.surface,
                      border: `1px solid ${isActive ? TOKENS.primary : TOKENS.border}`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: isActive ? "rgba(255,255,255,0.2)" : TOKENS.accentSoft }}
                    >
                      <Icon className="w-5 h-5" style={{ color: isActive ? TOKENS.surface : TOKENS.primaryDark }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: isActive ? TOKENS.surface : TOKENS.ink }}>
                        {name}
                      </p>
                      <p className="text-xs" style={{ color: isActive ? "#CFE3DC" : TOKENS.inkMuted }}>
                        10 items
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Featured */}
          <section className="w-full mm-gutter py-6">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  This week's picks
                </h2>
                <p className="text-sm mt-1" style={{ color: TOKENS.inkMuted }}>
                  Hover a card — it moves with you. Tap one for full details.
                </p>
              </div>
            </div>
            <div className="mm-product-grid">
              {featuredHome.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} onView={setSelectedProduct} />
              ))}
            </div>
          </section>

          {/* Promo banner */}
          <section className="w-full mm-gutter py-14">
            <div
              className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              style={{ backgroundColor: TOKENS.primary }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: TOKENS.accent }}>
                  Weekend reset
                </p>
                <h3
                  className="text-2xl md:text-3xl font-extrabold mb-2"
                  style={{ color: TOKENS.surface, fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  Up to 30% off this week
                </h3>
                <p className="text-sm" style={{ color: "#CFE3DC" }}>
                  Marked-down picks across every category, this weekend only.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Deals");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full font-semibold text-sm shrink-0 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:outline-none"
                style={{ backgroundColor: TOKENS.accent, color: TOKENS.ink }}
              >
                Shop the sale
              </button>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer style={{ backgroundColor: TOKENS.surface, borderTop: `1px solid ${TOKENS.border}` }}>
        <div className="w-full mm-gutter py-12 grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Logo className="w-7 h-7" textClassName="text-base" />
              <span className="text-base font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                MiniMart
              </span>
            </div>
            <p className="text-sm mb-2 max-w-xs" style={{ color: TOKENS.inkMuted }}>
              A small, fast-moving shop for things you'll actually use.
            </p>
            <p className="text-xs mb-4" style={{ color: TOKENS.inkMuted }}>
              Bannerghatta Road, Bangalore, Karnataka 560083
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="text-sm px-3 py-2 rounded-full flex-1 outline-none"
                style={{ border: `1px solid ${TOKENS.border}`, color: TOKENS.ink }}
              />
              <button
                className="px-4 py-2 rounded-full text-sm font-semibold shrink-0 focus-visible:ring-2 focus-visible:outline-none"
                style={{ backgroundColor: TOKENS.primary, color: TOKENS.surface }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {[
            { title: "Shop", links: ["Mobiles", "Fashion", "Electronics", "Home", "Deals"] },
            { title: "Help", links: ["Shipping", "Returns", "Track order", "Contact"] },
            { title: "Company", links: ["About", "Careers", "Sustainability"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold mb-3" style={{ color: TOKENS.ink }}>
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm hover:opacity-70 transition-opacity" style={{ color: TOKENS.inkMuted }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="w-full mm-gutter py-5 text-xs flex flex-col sm:flex-row justify-between gap-2"
          style={{ borderTop: `1px solid ${TOKENS.border}`, color: TOKENS.inkMuted }}
        >
          <span>\u00a9 2026 MiniMart. All rights reserved.</span>
          <span>Built for the CloudOps Enterprise Platform capstone.</span>
        </div>
      </footer>

      {/* Cart drawer backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(16,32,27,0.45)" }}
        onClick={() => setCartOpen(false)}
      />

      {/* Cart drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 z-50 flex flex-col transition-transform duration-300 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: TOKENS.surface, boxShadow: "-24px 0 60px -20px rgba(16,32,27,0.35)" }}
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${TOKENS.border}` }}>
          <h2 className="text-lg font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Your cart {cartItems.length > 0 && `(${cartCount})`}
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center focus-visible:ring-2 focus-visible:outline-none"
            style={{ backgroundColor: TOKENS.bg }}
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-2 py-16">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: TOKENS.accentSoft }}
              >
                <ShoppingCart className="w-6 h-6" style={{ color: TOKENS.primaryDark }} />
              </div>
              <p className="font-semibold text-sm" style={{ color: TOKENS.ink }}>
                Your cart's taking a break.
              </p>
              <p className="text-sm max-w-52" style={{ color: TOKENS.inkMuted }}>
                Add something from any category — it'll show up here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div
                    className="w-16 h-16 rounded-xl overflow-hidden shrink-0"
                    style={{ border: `1px solid ${TOKENS.border}` }}
                  >
                    <CategoryTile category={item.category} className="w-full h-full" iconClassName="w-6 h-6" imageSeed={item.id} icon={pickProductIcon(item)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: TOKENS.ink }}>
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 my-1.5">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center focus-visible:ring-2 focus-visible:outline-none"
                        style={{ backgroundColor: TOKENS.bg }}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="w-3 h-3" style={{ color: TOKENS.ink }} />
                      </button>
                      <span className="text-xs font-semibold w-4 text-center" style={{ color: TOKENS.ink }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center focus-visible:ring-2 focus-visible:outline-none"
                        style={{ backgroundColor: TOKENS.bg }}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="w-3 h-3" style={{ color: TOKENS.ink }} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: TOKENS.ink, fontFamily: "'IBM Plex Mono', monospace" }}>
                      {formatINR(item.price * item.qty)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 focus-visible:ring-2 focus-visible:outline-none"
                    style={{ backgroundColor: TOKENS.bg, height: "fit-content" }}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <X className="w-3.5 h-3.5" style={{ color: TOKENS.inkMuted }} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="px-5 py-4" style={{ borderTop: `1px solid ${TOKENS.border}` }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium" style={{ color: TOKENS.inkMuted }}>
                Subtotal
              </span>
              <span className="text-lg font-bold" style={{ color: TOKENS.ink, fontFamily: "'IBM Plex Mono', monospace" }}>
                {formatINR(subtotal)}
              </span>
            </div>
            <button
              className="w-full py-3 rounded-full font-semibold text-sm transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:outline-none"
              style={{ backgroundColor: TOKENS.primary, color: TOKENS.surface }}
            >
              Checkout — {formatINR(subtotal)}
            </button>
          </div>
        )}
      </aside>

      {/* Toast */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        {toast && (
          <div
            className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-full"
            style={{ backgroundColor: TOKENS.ink, boxShadow: "0 20px 40px -12px rgba(16,32,27,0.5)" }}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
              <CategoryTile category={toast.category} className="w-full h-full" iconClassName="w-4 h-4" imageSeed={toast.id} icon={pickProductIcon(toast)} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold" style={{ color: TOKENS.surface }}>
                Added to cart
              </p>
              <p className="text-xs truncate max-w-40" style={{ color: "#9FB0A9" }}>
                {toast.name}
              </p>
            </div>
            <button
              onClick={() => {
                setCartOpen(true);
                setToast(null);
              }}
              className="ml-1 text-xs font-semibold underline underline-offset-2 shrink-0 focus-visible:ring-2 focus-visible:outline-none"
              style={{ color: TOKENS.accent }}
            >
              View cart
            </button>
          </div>
        )}
      </div>

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />
      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </div>
  );
}
