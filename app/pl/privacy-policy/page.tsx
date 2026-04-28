import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPagePL() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar locale="pl" />
      <section className="pt-36 pb-24 px-6 md:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-[#C4682A] mb-6">Prawne</p>
        <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#111111] mb-16"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Polityka prywatności<span style={{ color: "#C4682A" }}>.</span>
        </h1>
        <div className="max-w-[720px] space-y-10 text-sm text-[#111111]/50 leading-relaxed">
          <p className="text-xs text-[#111111]/30">Ostatnia aktualizacja: styczeń 2026</p>
          {[
            { title: "1. Kim jesteśmy", body: "knowing more. („my\", „nas\", „nasze\") prowadzi stronę knowingmore.life. Zobowiązujemy się chronić Twoje dane osobowe i prawo do prywatności." },
            { title: "2. Aktualna faza działalności", body: "knowing more. znajduje się obecnie w fazie weryfikacji zainteresowania rynkowego (pre-market). Adresy e-mail zbierane przez formularze „Powiadom mnie\" lub rezerwacji zniżki są przetwarzane w konkretnym celu: zbadania zainteresowania rynkowego przed wprowadzeniem produktu oraz powiadomienia zarejestrowanych użytkowników, gdy produkty staną się dostępne. Na tym etapie nie zbieramy żadnych danych płatniczych." },
            { title: "3. Jakie dane zbieramy", body: "Zbieramy dane przekazywane bezpośrednio (adres e-mail, imię w przypadku podania) oraz dane zbierane automatycznie (adres IP, typ przeglądarki, odwiedzane strony, czas na stronie) przez pliki cookies i narzędzia analityczne. W przyszłości, gdy produkty staną się dostępne, będziemy również zbierać informacje związane z zamówieniem (adres dostawy, szczegóły zamówienia)." },
            { title: "4. Jak wykorzystujemy Twoje dane", body: "Obecnie wykorzystujemy Twoje dane, aby zarejestrować Twoje zainteresowanie nadchodzącymi produktami, powiadomić Cię, gdy produkty staną się dostępne, wysyłać komunikację marketingową, na którą wyraziłaś/wyraziłeś wyraźną zgodę, ulepszać naszą stronę oraz wypełniać obowiązki prawne." },
            { title: "5. Podstawa prawna przetwarzania", body: "Przetwarzamy Twoje dane na podstawie zgody (art. 6 ust. 1 lit. a RODO) dla komunikacji marketingowej i rejestracji zainteresowania pre-launch oraz na podstawie prawnie uzasadnionych interesów (art. 6 ust. 1 lit. f RODO) dla analityki strony i bezpieczeństwa. Możesz wycofać zgodę w dowolnym momencie." },
            { title: "6. Udostępnianie danych", body: "Nie sprzedajemy Twoich danych osobowych. Udostępniamy dane wyłącznie dostawcom usług niezbędnych do prowadzenia naszej działalności (platformy e-mail, hosting, narzędzia analityczne, a w przyszłości również operatorzy płatności i firmy kurierskie), na podstawie umów powierzenia przetwarzania danych." },
            { title: "7. Twoje prawa", body: "Zgodnie z RODO masz prawo dostępu, sprostowania, usunięcia i przeniesienia swoich danych osobowych oraz prawo do sprzeciwu wobec przetwarzania lub jego ograniczenia. Możesz również wycofać zgodę w dowolnym momencie i złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (UODO). Aby skorzystać z któregokolwiek z tych praw, skontaktuj się z nami pod adresem privacy@knowingmore.life." },
            { title: "8. Okres przechowywania danych", body: "Rejestracje zainteresowania pre-launch są przechowywane do momentu uruchomienia sprzedaży i przez maksymalnie 24 miesiące po nim, lub do momentu wypisania się z listy — w zależności od tego, co nastąpi wcześniej. Po uruchomieniu sprzedaży dane zamówień będą przechowywane przez 7 lat zgodnie z polskim prawem rachunkowym. Dane analityczne przechowywane są przez 26 miesięcy." },
            { title: "9. Kontakt", body: "We wszelkich kwestiach związanych z prywatnością prosimy o kontakt z naszym Administratorem Danych pod adresem privacy@knowingmore.life." },
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
