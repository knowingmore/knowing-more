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

export default function HomePL() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar locale="pl" />
      <Hero locale="pl" />
      <Carousel />
      <Philosophy locale="pl" />
      <Products locale="pl" />
      <Science locale="pl" />
      <LifestyleStrip locale="pl" />
      <Testimonials locale="pl" />
      <Signature locale="pl" />
      <Footer locale="pl" />
    </main>
  );
}
