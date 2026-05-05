import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPagePL() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar locale="pl" />
      <section className="pt-36 pb-24 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#C4682A] mb-6">Prawne</p>
        <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#111111] mb-16"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Regulamin<span style={{ color: "#C4682A" }}>.</span>
        </h1>
        <div className="max-w-[720px] space-y-10 text-sm text-[#111111]/50 leading-relaxed">
          <p className="text-xs text-[#111111]/30">Ostatnia aktualizacja: styczeń 2026</p>
          {[
            { title: "1. Status marki", body: "knowing more. znajduje się obecnie w fazie weryfikacji zainteresowania rynkowego (pre-market). Produkty prezentowane na stronie są w fazie rozwoju i nie są jeszcze dostępne do sprzedaży. Wysyłając adres e-mail przez którykolwiek z formularzy „Powiadom mnie\" lub rezerwacji zniżki, użytkownik potwierdza, że rozumie, iż produkty nie są jeszcze w sprzedaży, i wyraża wolę otrzymania informacji o ich dostępności. Na tym etapie nie są przyjmowane żadne płatności ani składane zamówienia. Ceny i opisy produktów prezentowane na stronie mają charakter informacyjny i mogą ulec zmianie przed oficjalnym uruchomieniem sprzedaży." },
            { title: "2. Akceptacja", body: "Korzystając ze strony knowingmore.life, akceptujesz niniejszy Regulamin. Jeśli się z nim nie zgadzasz, prosimy o niekorzystanie ze strony." },
            { title: "3. Produkty", body: "Nasze produkty są suplementami diety. Nie są lekami i nie są przeznaczone do diagnozowania, leczenia, łagodzenia ani zapobiegania jakimkolwiek chorobom. Suplement diety nie może być stosowany jako substytut zróżnicowanej diety. Skonsultuj się z lekarzem przed użyciem, zwłaszcza w ciąży, podczas karmienia piersią lub przyjmowania leków." },
            { title: "4. Przyszłe zamówienia i płatności", body: "Po udostępnieniu produktów wszystkie ceny będą w polskich złotych (PLN) i zawierać VAT, gdy ma zastosowanie. Zastrzegamy sobie prawo odmowy lub anulowania zamówienia według własnego uznania. Płatność jest pobierana wyłącznie w momencie złożenia zamówienia, po udostępnieniu produktów do sprzedaży." },
            { title: "5. Lista powiadomień", body: "Dołączenie do listy powiadomień lub rezerwacji zniżki nie stanowi zakupu ani rezerwacji produktu. Rejestruje wyłącznie adres e-mail w celu otrzymania informacji o dostępności produktu. Oferty rabatowe komunikowane przez listę zależą od dostępności i mogą zostać wycofane lub zmodyfikowane przed uruchomieniem sprzedaży." },
            { title: "6. Własność intelektualna", body: "Cała zawartość strony — w tym teksty, obrazy, formuły i elementy marki — stanowi własność knowing more. i nie może być reprodukowana bez pisemnej zgody." },
            { title: "7. Ograniczenie odpowiedzialności", body: "W maksymalnym zakresie dozwolonym przez prawo, knowing more. nie ponosi odpowiedzialności za szkody pośrednie, przypadkowe lub wynikowe powstałe w związku z korzystaniem z naszych produktów lub strony." },
            { title: "8. Prawo właściwe", body: "Niniejszy Regulamin podlega prawu polskiemu. Wszelkie spory podlegają wyłącznej jurysdykcji sądów warszawskich." },
            { title: "9. Zmiany", body: "Możemy zaktualizować niniejszy Regulamin w dowolnym momencie. Dalsze korzystanie ze strony po wprowadzeniu zmian oznacza akceptację zaktualizowanej wersji." },
          ].map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-bold text-[#111111] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>{s.title}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer locale="pl" />
    </main>
  );
}
