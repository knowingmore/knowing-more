"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
  {
    slug: "nmn-nad-longevity-science",
    category: "Science",
    title: "Your energy drops by half between 25 and 60 - and there's more you can do about it than you think",
    excerpt: "The data on NAD+ decline is some of the most reproducible in ageing research. Rajman et al. (2018) established the mechanistic case. Yoshino et al. (2021) gave us the first rigorous human trial. Since then, eight more RCTs have followed. We read all of them. This is what the evidence actually supports - and what it doesn't.",
    date: "March 2025",
    readTime: "8 min read",
    img: "/images/website/blog-longevity-woman.jpeg",
    featured: true,
  },
  {
    slug: "cortisol-ashwagandha-clinical-evidence",
    category: "Ingredients",
    title: "Cortisol is quietly wrecking your sleep, weight, and recovery - 22 trials point to the same fix",
    excerpt: "Most brands use ashwagandha root powder. The clinical trials that actually showed cortisol reduction used a standardised 5% withanolide extract at 300–600 mg. The difference in outcome is not marginal - it's categorical. Here is a mechanistic and dosing breakdown of every published RCT.",
    date: "February 2025",
    readTime: "6 min read",
    img: "/images/website/blog-ashwagandha-root.png",
    featured: false,
  },
  {
    slug: "gut-microbiome-immune-connection",
    category: "Science",
    title: "70% of your immune system lives in your gut - and most people are quietly damaging it without knowing",
    excerpt: "The gut-associated lymphoid tissue is the largest immune organ in the human body. Microbiome diversity correlates directly with T-regulatory cell output, mucosal IgA secretion, and systemic inflammatory tone. We trace the mechanism from the lumen to the bloodstream - and what disrupts it.",
    date: "February 2025",
    readTime: "7 min read",
    img: "/images/website/blog-cell-macro.png",
    featured: false,
  },
  {
    slug: "proprietary-blends-problem",
    category: "Industry",
    title: "Most supplement brands are legally hiding how little active ingredient is in your capsule - checking takes 60 seconds",
    excerpt: "A 'proprietary blend' of 500 mg listing lion's mane, rhodiola, and ashwagandha could legally contain 490 mg of the cheapest ingredient and 5 mg of each active. We explain the regulatory gap, show real label examples, and give you a four-step framework for reading any supplement fact panel.",
    date: "January 2025",
    readTime: "5 min read",
    img: "/images/website/blog-capsules-magnifier.png",
    featured: false,
  },
  {
    slug: "sleep-architecture-performance",
    category: "Performance",
    title: "Your body repairs itself in one 90-minute window each night. What's stealing it - and how to get it back",
    excerpt: "Stage N3 sleep accounts for 13–23% of total sleep time in healthy adults - and that share decreases measurably with age, alcohol, and late training loads. Without it, protein synthesis stalls and cortisol clearance is incomplete. We examine the physiology and the interventions with the strongest evidence base.",
    date: "January 2025",
    readTime: "9 min read",
    img: "/images/website/blog-sleep-night.png",
    featured: false,
  },
  {
    slug: "healthspan-wearables-whoop-garmin",
    category: "Science",
    title: "Your recovery score dropped again. Here's what's actually happening inside your cells",
    excerpt: "Whoop, Garmin, Oura - they all measure the same underlying signal from different angles. HRV, body battery, recovery score: these are outputs of cellular and hormonal processes most people never address directly. Here's what the numbers are actually tracking - and what moves them.",
    date: "April 2025",
    readTime: "7 min read",
    img: "/images/website/blog-wearable-morning.png",
    featured: false,
  },
  {
    slug: "gmp-manufacturing-what-it-means",
    category: "Standards",
    title: "Your supplement passed every safety test and might still not work. What the label isn't telling you",
    excerpt: "Good Manufacturing Practice tells you a facility passed an audit. It does not tell you what was in a specific batch. Identity testing, potency verification, and contaminant screening are separate processes - and the vast majority of supplement brands do none of them independently. Here's what to ask for.",
    date: "December 2024",
    readTime: "5 min read",
    img: "/images/website/blog-lab-capsule.png",
    featured: false,
  },
];

const categories = ["All", "Science", "Ingredients", "Performance", "Industry", "Standards"];

const categoryColor: Record<string, string> = {
  Science: "#C4682A",
  Ingredients: "#A0784A",
  Performance: "#111111",
  Industry: "#C4682A",
  Standards: "#888",
};

function FeaturedPost({ post }: { post: typeof posts[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#111111]/[0.07] mb-16"
    >
      <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
        <Image src={post.img} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="700px" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
      </div>
      <div className="p-10 md:p-14 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[8px] font-mono tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
            style={{ background: `${categoryColor[post.category]}18`, color: categoryColor[post.category] }}>
            {post.category}
          </span>
          <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-[#111111]/28 px-3 py-1.5 rounded-full bg-[#111111]/[0.04]">
            Featured
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111111] mb-4 leading-tight group-hover:text-[#C4682A] transition-colors duration-300"
          style={{ fontFamily: "var(--font-playfair)" }}>
          {post.title}<span style={{ color: "#C4682A" }}>.</span>
        </h2>
        <p className="text-sm text-[#111111]/42 leading-[1.85] mb-8">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#111111]/28">{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-[#111111]/15" />
            <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#111111]/28">{post.readTime}</span>
          </div>
          <span className="text-sm text-[#C4682A] group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
        </div>
      </div>
    </motion.div>
  );
}

function PostCard({ post, i }: { post: typeof posts[0]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
    >
      <div className="relative rounded-xl overflow-hidden aspect-[3/2] mb-5">
        <Image src={post.img} alt={post.title} fill
          className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="500px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        <div className="absolute top-3 left-3">
          <span className="text-[8px] font-mono tracking-[0.28em] uppercase px-2.5 py-1.5 rounded-full backdrop-blur-sm"
            style={{ background: `${categoryColor[post.category]}CC`, color: "white" }}>
            {post.category}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#111111]/28">{post.date}</span>
        <span className="w-1 h-1 rounded-full bg-[#111111]/15" />
        <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#111111]/28">{post.readTime}</span>
      </div>
      <h3 className="text-base md:text-lg font-bold tracking-[-0.02em] text-[#111111] mb-2 leading-snug group-hover:text-[#C4682A] transition-colors duration-300"
        style={{ fontFamily: "var(--font-playfair)" }}>
        {post.title}
      </h3>
      <p className="text-sm text-[#111111]/38 leading-[1.8] line-clamp-3">{post.excerpt}</p>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-[#C4682A] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Read more <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,146,10,0.05) 0%, transparent 55%)" }}
          aria-hidden />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#C4682A] mb-6">
            Journal - Longevity Intelligence
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h1
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="leading-[0.88] tracking-[-0.03em] text-[#111111]"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 7vw, 7rem)" }}
            >
              Science, not<br />
              <span className="text-[#111111]/25 italic">noise.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm text-[#111111]/38 leading-relaxed max-w-[300px] md:mb-3">
              Evidence-based articles on longevity, ingredients, and the science behind knowing more.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-t border-[#111111]/[0.07] py-6">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2 flex-wrap">
            {categories.map((cat, i) => (
              <button key={cat}
                className={`text-[9px] font-mono tracking-[0.22em] uppercase px-3.5 py-2 rounded-full transition-all duration-200 ${
                  i === 0
                    ? "bg-[#111111] text-white"
                    : "bg-[#111111]/[0.04] text-[#111111]/45 hover:bg-[#111111]/[0.08] hover:text-[#111111]"
                }`}>
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured + grid */}
      <section className="py-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          {/* Featured */}
          <Link href={`/blog/${featured.slug}`}>
            <FeaturedPost post={featured} />
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {rest.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <PostCard post={post} i={i} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-[#111111]/[0.07] py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[640px] mx-auto text-center"
          >
            <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#C4682A]/70 mb-4">Newsletter</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111111] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}>
              Longevity intelligence, delivered<span style={{ color: "#C4682A" }}>.</span>
            </h2>
            <p className="text-sm text-[#111111]/38 leading-relaxed mb-8">
              New articles, ingredient deep-dives, and early access - once a fortnight. No noise, no filler.
            </p>
            <form className="flex gap-3 max-w-[420px] mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3.5 rounded-full text-sm border border-[#111111]/12 text-[#111111] placeholder-[#111111]/25 outline-none focus:border-[#C4682A]/40 transition-colors"
              />
              <button type="submit"
                className="flex-shrink-0 px-6 py-3.5 rounded-full bg-[#111111] text-white text-sm font-semibold tracking-wide hover:bg-[#333] transition-colors duration-200">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
