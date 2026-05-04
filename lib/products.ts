export interface Ingredient {
  name: string;
  dose: string;
  benefit: string;
}

export interface Product {
  slug: string;
  name: string;
  fullName: string;
  tagline: string;
  headline: string;
  description: string;
  longDescription: string;
  price: string;
  originalPrice: string;
  img: string;
  hoverImg: string;
  detailImg: string;
  accentImg: string;
  gallery: string[];
  color: string;
  colorLight: string;
  glow: string;
  index: string;
  benefits: string[];
  ingredients: Ingredient[];
  usage: string;
  servings: string;
}

export const products: Product[] = [
  {
    slug: "performance",
    name: "Performance",
    fullName: "knowing more. Performance",
    tagline: "Energy · Recovery · Focus",
    headline: "Built for those who\ndemand more.",
    description: "Clinically-dosed actives for sustained output and measurable recovery.",
    longDescription:
      "Performance is engineered for the high-output individual — someone who refuses to accept cognitive fog, afternoon crashes, or prolonged recovery as inevitable. Every ingredient is dosed at clinically-effective levels, backed by peer-reviewed research, and manufactured to the highest GMP standards. No proprietary blends. No hiding behind vague dosages. Just precision nutrition for the long game.",
    price: "129,00 zł",
    originalPrice: "159,00 zł",
    img: "/images/products/studio-performance.png",
    hoverImg: "/images/website/hero-movement-woman.jpg",
    detailImg: "/images/website/store-performance-detail.jpg",
    accentImg: "/images/website/store-performance-accent.jpg",
    gallery: [
      "/images/website/perf-real-product.png",
      "/images/website/perf-minimalist-lifestyle.png",
      "/images/website/perf-authentic-2.png",
      "/images/website/perf-authentic-6.png",
    ],
    color: "#111111",
    colorLight: "rgba(17,17,17,0.06)",
    glow: "rgba(17,17,17,0.07)",
    index: "001",
    benefits: [
      "Sustained energy without jitters or crash",
      "Enhanced cognitive clarity and focus",
      "Accelerated post-training recovery",
      "Supports mitochondrial health",
    ],
    ingredients: [
      { name: "NMN", dose: "500mg", benefit: "NAD+ precursor for cellular energy production" },
      { name: "CoQ10", dose: "200mg", benefit: "Mitochondrial efficiency and antioxidant protection" },
      { name: "Alpha-GPC", dose: "300mg", benefit: "Choline precursor for focus and memory" },
      { name: "Rhodiola Rosea", dose: "400mg", benefit: "Adaptogen for stress and fatigue resistance" },
      { name: "Vitamin B Complex", dose: "Full-spectrum", benefit: "Energy metabolism and neurological function" },
    ],
    usage: "Take 2 capsules with breakfast. NMN absorption is significantly enhanced in the presence of dietary fat, and morning dosing aligns with the body's natural NAD+ synthesis rhythm. CoQ10 is fat-soluble — food increases bioavailability by up to 3×. Rhodiola is best taken early in the day; its mild stimulatory effect on the HPA axis can interfere with sleep onset if taken after 2pm. Consistent daily use for a minimum of 8 weeks is required to observe measurable changes in energy metabolism and recovery time.",
    servings: "60 capsules / 30 servings",
  },
  {
    slug: "balance",
    name: "Balance",
    fullName: "knowing more. Balance",
    tagline: "Cortisol · Sleep · Hormones",
    headline: "Harmony from\nthe inside out.",
    description: "Adaptogenic support for the demands of modern high-performance life.",
    longDescription:
      "Balance addresses what modern life consistently disrupts: cortisol rhythm, sleep architecture, and hormonal equilibrium. Formulated around the most rigorously-studied adaptogenic compounds, each dosed at the exact level used in clinical research. Whether you're managing a company, training hard, or simply navigating the relentless pace of contemporary existence — Balance is the foundation that lets everything else perform.",
    price: "129,00 zł",
    originalPrice: "159,00 zł",
    img: "/images/products/studio-balance.png",
    hoverImg: "/images/website/store-balance-hover2.png",
    detailImg: "/images/website/store-balance-detail.jpg",
    accentImg: "/images/website/store-balance-accent.jpg",
    gallery: [
      "/images/website/bal-real-product-3.jpeg",
      "/images/website/bal-minimalist-5.jpeg",
      "/images/website/bal-editorial-4.jpeg",
    ],
    color: "#A0784A",
    colorLight: "rgba(160,120,74,0.07)",
    glow: "rgba(160,120,74,0.09)",
    index: "002",
    benefits: [
      "Regulates cortisol and stress response",
      "Improves sleep quality and architecture",
      "Supports hormonal balance",
      "Reduces anxiety and emotional reactivity",
    ],
    ingredients: [
      { name: "Ashwagandha KSM-66", dose: "600mg", benefit: "Clinically proven cortisol reduction" },
      { name: "L-Theanine", dose: "200mg", benefit: "Calm focus without sedation" },
      { name: "Magnesium Glycinate", dose: "400mg", benefit: "Sleep quality and muscle relaxation" },
      { name: "Phosphatidylserine", dose: "300mg", benefit: "Cortisol regulation and cognitive support" },
      { name: "Lemon Balm Extract", dose: "500mg", benefit: "Anxiety reduction and sleep onset" },
    ],
    usage: "Take 2 capsules 60–90 minutes before sleep. Magnesium glycinate raises intracellular magnesium levels that support GABA receptor activity and muscle relaxation — both most relevant in the hours preceding sleep. Ashwagandha's cortisol-lowering effect is cumulative and peaks when taken consistently in the evening, aligning with the body's natural cortisol decline after 6pm. Phosphatidylserine blunts exercise-induced cortisol spikes; evening dosing helps complete the cortisol clearance cycle. L-Theanine promotes alpha-wave brain activity, facilitating the transition from wakefulness to rest. Allow 4–6 weeks of consistent use before assessing sleep quality changes.",
    servings: "60 capsules / 30 servings",
  },
  {
    slug: "gut-health",
    name: "Gut Health",
    fullName: "knowing more. Gut Health",
    tagline: "Microbiome · Digestion · Immunity",
    headline: "The foundation\nof everything.",
    description: "Precision probiotic and prebiotic formula for systemic wellbeing.",
    longDescription:
      "The gut is the second brain, the seat of immunity, and the origin of most chronic inflammation. Gut Health delivers a comprehensive ecosystem intervention — 50 billion CFU of rigorously selected probiotic strains paired with a prebiotic substrate to ensure survival and colonisation. L-Glutamine supports the integrity of the gut barrier, while the digestive enzyme complex ensures complete nutrient extraction from every meal. This is not a basic probiotic. This is a complete gut architecture formula.",
    price: "129,00 zł",
    originalPrice: "159,00 zł",
    img: "/images/products/studio-gut-health.png",
    hoverImg: "/images/website/store-gutHealth-hover2.png",
    detailImg: "/images/website/store-gutHealth-detail.jpg",
    accentImg: "/images/website/store-gutHealth-accent.jpg",
    gallery: [
      "/images/website/gut-minimalist.jpeg",
      "/images/website/gut-editorial-3.jpeg",
      "/images/website/gut-a-artistic-3.png",
    ],
    color: "#C4682A",
    colorLight: "rgba(196,104,42,0.07)",
    glow: "rgba(196,104,42,0.09)",
    index: "003",
    benefits: [
      "50B CFU multi-strain probiotic complex",
      "Supports gut barrier integrity",
      "Enhances immune system function",
      "Improves nutrient absorption",
    ],
    ingredients: [
      { name: "Multi-Strain Probiotic", dose: "50B CFU", benefit: "Microbiome diversity and resilience" },
      { name: "Prebiotic FOS/Inulin", dose: "3g", benefit: "Probiotic substrate and colonisation support" },
      { name: "L-Glutamine", dose: "2g", benefit: "Gut lining repair and barrier integrity" },
      { name: "Digestive Enzyme Complex", dose: "250mg", benefit: "Complete macronutrient breakdown" },
      { name: "Zinc", dose: "15mg", benefit: "Gut barrier and immune function" },
    ],
    usage: "Take 1 capsule on an empty stomach 20–30 minutes before breakfast. The gut lining is most receptive to L-Glutamine during the fasted state — food triggers digestive enzyme activity that may degrade supplemental glutamine before it reaches the intestinal mucosa. Probiotic strains colonise most effectively when gastric acid secretion is at its lowest, which occurs in the early morning pre-meal window. Prebiotic FOS/Inulin ferments slowly in the large intestine; morning dosing aligns peak fermentation activity with the gut's natural circadian motility patterns. Allow 6–8 weeks of consistent use before assessing microbiome shifts — the time required for meaningful changes in microbial diversity. Refrigerate after opening to preserve CFU viability.",
    servings: "30 capsules / 30 servings",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
