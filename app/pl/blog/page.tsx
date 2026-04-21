"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
  {
    slug: "nmn-nad-longevity-science",
    category: "Nauka",
    title: "Twój poziom energii spada o połowę między 25. a 60. rokiem życia — i możesz z tym zrobić więcej, niż myślisz",
    excerpt: "Dane dotyczące spadku NAD+ należą do najlepiej udokumentowanych w badaniach nad starzeniem. Rajman i wsp. (2018) ustalili mechanizm. Yoshino i wsp. (2021) dostarczyli pierwszego rygorystycznego badania na ludziach. Od tego czasu przeprowadzono osiem kolejnych RCT. Przeczytaliśmy je wszystkie. Oto co naprawdę popiera nauka — i czego nie.",
    date: "Marzec 2025",
    readTime: "8 min czytania",
    img: "/images/website/blog-longevity-woman.jpeg",
    featured: true,
  },
  {
    slug: "cortisol-ashwagandha-clinical-evidence",
    category: "Składniki",
    title: "Kortyzol po cichu niszczy Twój sen, wagę i regenerację — 22 badania wskazują na to samo rozwiązanie",
    excerpt: "Większość marek stosuje sproszkowany korzeń ashwagandhy. Badania kliniczne, które faktycznie wykazały redukcję kortyzolu, używały standaryzowanego ekstraktu 5% witanolidów w dawce 300–600 mg. Różnica w efektach nie jest marginalna — jest zasadnicza. Mechanistyczne i dawkowe zestawienie każdego opublikowanego RCT.",
    date: "Luty 2025",
    readTime: "6 min czytania",
    img: "/images/website/blog-ashwagandha-root.png",
    featured: false,
  },
  {
    slug: "gut-microbiome-immune-connection",
    category: "Nauka",
    title: "70% Twojego układu odpornościowego żyje w jelitach — i większość ludzi nieświadomie je niszczy",
    excerpt: "Tkanka limfatyczna związana z jelitami to największy narząd odpornościowy w ludzkim ciele. Różnorodność mikrobiomu koreluje bezpośrednio z produkcją komórek T-regulatorowych, sekrecją IgA śluzówkowej i ogólnoustrojowym tonem zapalnym. Śledzimy mechanizm od światła do krwioobiegu — i co go zakłóca.",
    date: "Luty 2025",
    readTime: "7 min czytania",
    img: "/images/website/blog-cell-macro.png",
    featured: false,
  },
  {
    slug: "proprietary-blends-problem",
    category: "Branża",
    title: "Większość firm suplementacyjnych legalnie ukrywa, ile aktywnego składnika jest w kapsułce — sprawdzenie zajmuje 60 sekund",
    excerpt: "»Zastrzeżona mieszanka« 500 mg zawierająca lwią grzywę, rhodiolę i ashwagandhę może legalnie zawierać 490 mg najtańszego składnika i 5 mg każdego aktywnego. Wyjaśniamy lukę regulacyjną, pokazujemy realne przykłady etykiet i dajemy czterostopniowy schemat czytania panelu składników.",
    date: "Styczeń 2025",
    readTime: "5 min czytania",
    img: "/images/website/blog-capsules-magnifier.png",
    featured: false,
  },
  {
    slug: "sleep-architecture-performance",
    category: "Wydajność",
    title: "Twoje ciało regeneruje się w jednym 90-minutowym oknie każdej nocy. Co je kradnie — i jak je odzyskać",
    excerpt: "Sen N3 stanowi 13–23% całkowitego czasu snu u zdrowych dorosłych — a ten udział maleje mierzalnie z wiekiem, alkoholem i późnymi sesjami treningowymi. Bez niego synteza białek staje w miejscu, a kortyzol nie zostaje wyeliminowany. Analizujemy fizjologię i interwencje z najmocniejszą bazą dowodową.",
    date: "Styczeń 2025",
    readTime: "9 min czytania",
    img: "/images/website/blog-sleep-night.png",
    featured: false,
  },
  {
    slug: "healthspan-wearables-whoop-garmin",
    category: "Nauka",
    title: "Twój wynik regeneracji znowu spadł. Oto co naprawdę dzieje się w Twoich komórkach",
    excerpt: "Whoop, Garmin, Oura — wszystkie mierzą ten sam sygnał z różnych kątów. HRV, body battery, wynik regeneracji: to efekty procesów komórkowych i hormonalnych, których większość ludzi nigdy nie adresuje bezpośrednio. Oto co te liczby naprawdę śledzą — i co na nie wpływa.",
    date: "Kwiecień 2025",
    readTime: "7 min czytania",
    img: "/images/website/blog-wearable-morning.png",
    featured: false,
  },
  {
    slug: "gmp-manufacturing-what-it-means",
    category: "Standardy",
    title: "Twój suplement przeszedł każdy test bezpieczeństwa i nadal może nie działać. Co etykieta przemilcza",
    excerpt: "Good Manufacturing Practice mówi Ci, że obiekt przeszedł audyt. Nie mówi Ci, co było w konkretnej partii. Testowanie tożsamości, weryfikacja mocy i badanie zanieczyszczeń to oddzielne procesy — a zdecydowana większość marek nie przeprowadza żadnego z nich niezależnie. Oto o co pytać.",
    date: "Grudzień 2024",
    readTime: "5 min czytania",
    img: "/images/website/blog-lab-capsule.png",
    featured: false,
  },
];

const categories = ["Wszystkie", "Nauka", "Składniki", "Wydajność", "Branża", "Standardy"];

const categoryColor: Record<string, string> = {
  Nauka: "#1B2A4A",
  Składniki: "#A0784A",
  Wydajność: "#111111",
  Branża: "#1B2A4A",
  Standardy: "#888",
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
            Wyróżniony
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111111] mb-4 leading-tight group-hover:text-[#1B2A4A] transition-colors duration-300"
          style={{ fontFamily: "var(--font-playfair)" }}>
          {post.title}<span style={{ color: "#1B2A4A" }}>.</span>
        </h2>
        <p className="text-sm text-[#111111]/42 leading-[1.85] mb-8">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#111111]/28">{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-[#111111]/15" />
            <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#111111]/28">{post.readTime}</span>
          </div>
          <span className="text-sm text-[#1B2A4A] group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
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
      <h3 className="text-base md:text-lg font-bold tracking-[-0.02em] text-[#111111] mb-2 leading-snug group-hover:text-[#1B2A4A] transition-colors duration-300"
        style={{ fontFamily: "var(--font-playfair)" }}>
        {post.title}
      </h3>
      <p className="text-sm text-[#111111]/38 leading-[1.8] line-clamp-3">{post.excerpt}</p>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-[#1B2A4A] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Czytaj dalej <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main className="min-h-screen bg-white">
      <Navbar locale="pl" />

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,146,10,0.05) 0%, transparent 55%)" }}
          aria-hidden />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#1B2A4A] mb-6">
            Dziennik — Longevity Intelligence
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h1
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="leading-[0.88] tracking-[-0.03em] text-[#111111]"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 7vw, 7rem)" }}
            >
              Nauka, nie<br />
              <span className="text-[#111111]/25 italic">szum.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm text-[#111111]/38 leading-relaxed max-w-[300px] md:mb-3">
              Artykuły oparte na dowodach naukowych o longevity, składnikach i nauce stojącej za knowing more.
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
          <Link href={`/pl/blog/${featured.slug}`}>
            <FeaturedPost post={featured} />
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {rest.map((post, i) => (
              <Link key={post.slug} href={`/pl/blog/${post.slug}`}>
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
            <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#1B2A4A]/70 mb-4">Newsletter</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111111] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}>
              Longevity intelligence, prosto do skrzynki<span style={{ color: "#1B2A4A" }}>.</span>
            </h2>
            <p className="text-sm text-[#111111]/38 leading-relaxed mb-8">
              Nowy artykuł co wtorek. Nauka, nie szum.
            </p>
            <form className="flex gap-3 max-w-[420px] mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3.5 rounded-full text-sm border border-[#111111]/12 text-[#111111] placeholder-[#111111]/25 outline-none focus:border-[#1B2A4A]/40 transition-colors"
              />
              <button type="submit"
                className="flex-shrink-0 px-6 py-3.5 rounded-full bg-[#111111] text-white text-sm font-semibold tracking-wide hover:bg-[#333] transition-colors duration-200">
                Zapisz się
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer locale="pl" />
    </main>
  );
}
