import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import Philosophy from "@/components/Philosophy";
import Products from "@/components/Products";
import Science from "@/components/Science";
import LifestyleStrip from "@/components/LifestyleStrip";
import Testimonials from "@/components/Testimonials";
import Signature from "@/components/Signature";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Carousel />
      <Philosophy />
      <Products />
      <Science />
      <LifestyleStrip />
      <Testimonials />
      <Signature />
      <Footer />
    </main>
  );
}
