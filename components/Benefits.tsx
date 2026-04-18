"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FlaskConical, ShieldCheck, Leaf, BarChart3, Microscope, Zap } from "lucide-react";

const benefits = [
  {
    icon: Microscope,
    title: "Clinically Studied",
    desc: "Every formula is built on peer-reviewed research, using ingredients at doses proven to work.",
  },
  {
    icon: ShieldCheck,
    title: "3rd Party Tested",
    desc: "Independent labs verify purity, potency, and freedom from contaminants before every batch ships.",
  },
  {
    icon: FlaskConical,
    title: "No Proprietary Blends",
    desc: "Full transparency. Every ingredient listed with exact amounts - no hidden formulas, no guessing.",
  },
  {
    icon: Leaf,
    title: "Clean Ingredients",
    desc: "Zero unnecessary fillers, artificial colours, or excipients. Just what your body needs.",
  },
  {
    icon: BarChart3,
    title: "Optimal Dosing",
    desc: "Clinically effective doses - not the 'fairy dusting' that saturates the supplement market.",
  },
  {
    icon: Zap,
    title: "Bioavailable Forms",
    desc: "We select ingredient forms your body can actually absorb and use - not the cheapest alternatives.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Benefits() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-white">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20 max-w-2xl mx-auto"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E8920A] mb-4">
            Why knowing more.
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold leading-[1.1] text-[#1A1A1A] tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The standard we hold
            <br />
            <span className="italic">ourselves to.</span>
          </h2>
        </motion.div>

        {/* Two-column layout: features grid + lifestyle image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Benefits grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="bg-white rounded-2xl p-6 border border-[#E8DDD0]/60 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1B2A4A]/6 flex items-center justify-center mb-4">
                    <Icon size={20} strokeWidth={1.5} className="text-[#1B2A4A]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1A1A1A] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/50 leading-relaxed">
                    {b.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Lifestyle images stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[600px]">
              {/* Main image */}
              <div className="absolute top-0 right-0 w-[85%] h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/website/model-redhead.jpg"
                  alt="knowing more. - beauty editorial"
                  fill
                  className="object-cover object-top"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[white]/10" />
              </div>

              {/* Second image */}
              <div className="absolute bottom-0 left-0 w-[60%] h-[280px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/website/products-marble-2.jpg"
                  alt="knowing more. - all three products"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>

              {/* Floating quote card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
                className="absolute bottom-[170px] right-[-20px] bg-white rounded-2xl shadow-xl px-5 py-4 max-w-[220px] border border-[#E8DDD0]/60"
              >
                <p className="text-sm font-medium text-[#1A1A1A] leading-snug">
                  &ldquo;The only supplement brand I trust completely.&rdquo;
                </p>
                <p className="text-xs text-[#1A1A1A]/40 mt-2 font-medium">
                  - Sarah M., verified buyer
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
