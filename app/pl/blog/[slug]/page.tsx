import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Article data ───────────────────────────────────────────────── */
const posts: {
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  img: string;
  body: string;
}[] = [
  {
    slug: "nmn-nad-longevity-science",
    category: "Nauka",
    title: "Twój poziom energii spada o połowę między 25. a 60. rokiem życia — i możesz z tym zrobić więcej, niż myślisz",
    date: "Marzec 2025",
    readTime: "8 min czytania",
    img: "/images/website/blog-longevity-woman.jpeg",
    body: `
      <h2>NAD+ i mitochondria: dlaczego energia spada z wiekiem</h2>
      <p>Między 25. a 60. rokiem życia poziom NAD+ w komórkach spada o około 50%. To nie jest hipoteza — to jeden z najlepiej udokumentowanych faktów w biologii starzenia się. NAD+ (dinukleotyd nikotynamidoadeninowy) jest kofaktorem niezbędnym dla ponad 500 enzymatycznych reakcji w organizmie. Bez wystarczającego poziomu NAD+ produkcja energii w mitochondriach spowalnia, a komórki tracą zdolność do skutecznej naprawy.</p>
      <p>Rajman, Chwalek i Sinclair opublikowali w 2018 roku przełomowe badanie w Cell Metabolism, które wyjaśniło mechanizm: NAD+ aktywuje sirtuiny — białka odpowiedzialne za naprawę DNA, regulację ekspresji genów i metabolizm mitochondrialny. Gdy NAD+ spada, sirtuiny tracą swoje kofaktory i przestają działać efektywnie. Skutek jest odczuwalny: wolniejsza regeneracja, gorsza koncentracja, ogólne zmęczenie mimo odpowiedniej ilości snu.</p>
      <h2>NMN vs NR: które badania są rzetelne?</h2>
      <p>Yoshino i wsp. opublikowali w 2021 roku pierwsze rygorystyczne badanie RCT na ludziach, sprawdzające NMN (mononukleotyd nikotynamidowy) — bezpośredni prekursor NAD+. Wyniki były jednoznaczne: suplementacja 250 mg NMN dziennie przez 10 tygodni zwiększyła poziom NAD+ w mięśniach szkieletowych i poprawiła wrażliwość na insulinę u kobiet po menopauzie. Od tego czasu przeprowadzono osiem kolejnych RCT.</p>
      <p>NR (rybozyd nikotynamidowy) był wcześniej popularniejszy ze względu na dostępność badań, ale metaanalizy z 2022–2023 roku sugerują, że NMN może być bardziej efektywny w podnoszeniu poziomu NAD+ w tkankach peryferyjnych. Kluczowa różnica: NMN jest bezpośrednim substratem dla syntezy NAD+, podczas gdy NR wymaga dodatkowego etapu konwersji.</p>
      <h2>Co faktycznie mówią badania — i czego nie mówią</h2>
      <p>Uczciwe podsumowanie literatury wygląda tak: istnieją solidne dowody na to, że suplementacja NMN podnosi poziom NAD+ u ludzi. Istnieją umiarkowane dowody na poprawę niektórych markerów metabolicznych. Dowody na poprawę subiektywnie odczuwanej energii i wydolności fizycznej są słabsze i bardziej zróżnicowane — choć kilka badań pokazuje pozytywne sygnały.</p>
      <p>To, czego badania na ludziach jeszcze nie udowodniły: przedłużenia życia (to dane na modelach zwierzęcych), cofnięcia chorób związanych z wiekiem, ani radykalnej poprawy sprawności u zdrowych młodych dorosłych. Każdy, kto twierdzi inaczej, przekracza to, co nauka faktycznie mówi.</p>
      <h2>Dawkowanie i biosdostępność: co ma znaczenie</h2>
      <p>Przebadane dawki NMN wahają się od 250 mg do 1200 mg dziennie. Większość badań używała 250–500 mg. Nie ma danych wskazujących na wyraźną korzyść ze stosowania dawek powyżej 600 mg u zdrowych dorosłych. Ważniejszy niż sama dawka jest czas podania i obecność tłuszczu w posiłku — NMN przyjęty z posiłkiem zawierającym tłuszcze ma znacząco wyższe wchłanianie jelitowe.</p>
      <p>W knowing more. Performance stosujemy 500 mg NMN na porcję — dawkę mieszczącą się w środku zakresu przebadanego w RCT i wystarczającą, by wywierać mierzalny efekt przy regularnym stosowaniu przez minimum 8 tygodni.</p>
    `,
  },
  {
    slug: "cortisol-ashwagandha-clinical-evidence",
    category: "Składniki",
    title: "Kortyzol po cichu niszczy Twój sen, wagę i regenerację — 22 badania wskazują na to samo rozwiązanie",
    date: "Luty 2025",
    readTime: "6 min czytania",
    img: "/images/website/blog-ashwagandha-root.png",
    body: `
      <h2>Kortyzol: hormon ratujący życie, który stał się problemem</h2>
      <p>Kortyzol ewoluował jako odpowiedź na ostre zagrożenie: spotkanie z drapieżnikiem, nagły niedobór jedzenia, fizyczny wysiłek walki lub ucieczki. Problem polega na tym, że dzisiejsze stresory — presja w pracy, powiadomienia z telefonu, nieregularny sen, intensywne treningi — aktywują dokładnie ten sam system. I robią to chronically, nie epizodycznie.</p>
      <p>Przewlekle podwyższony kortyzol to nie tylko uczucie stresu. Na poziomie fizjologicznym oznacza to: utrudnione zasypianie mimo zmęczenia (kortyzol blokuje melatoninę), odkładanie tkanki tłuszczowej w okolicach brzucha, obniżoną wrażliwość na insulinę, supresję układu odpornościowego i spowolnioną regenerację mięśni po treningu.</p>
      <h2>Ashwagandha: dlaczego forma i dawka mają znaczenie kluczowe</h2>
      <p>Ashwagandha (Withania somnifera) jest najlepiej przebadanym adaptogenem na rynku. Problem polega na tym, że jakość badań jest nierówna — i zależy niemal wyłącznie od formy ekstraktu i dawki. Większość tanich produktów używa sproszkowanego korzenia (root powder). Badania, które faktycznie wykazały redukcję kortyzolu, używały standaryzowanego ekstraktu 5% witanolidów — aktywnych glikosteoidów odpowiedzialnych za działanie adaptogenne.</p>
      <p>Najważniejszy ekstrakt w literaturze to KSM-66 — ekstrakt z korzenia Withania somnifera standaryzowany na minimum 5% witanolidów. Chandrasekhar i wsp. (2012) w randomizowanym, podwójnie zaślepionym badaniu kontrolowanym placebo pokazali 27,9% redukcję kortyzolu w surowicy po 60 dniach przy dawce 300 mg dwa razy dziennie. Ashwagandha Plus (ekstrakt KSM-66) przy dawce 600 mg wykazała podobne efekty w kolejnych badaniach.</p>
      <h2>Metaanaliza 22 RCT: co wynika z sumy dowodów?</h2>
      <p>Przegląd systematyczny Pratte i wsp. z 2014 roku oraz późniejsza metaanaliza Cheaha i wsp. (2021) obejmująca 22 randomizowane badania kontrolowane wykazały spójne efekty: redukcja markerów stresu (kortyzol, skala PSS), poprawa jakości snu i funkcji poznawczych przy standaryzowanym ekstrakcie w dawce 240–600 mg dziennie. Efekty te są statystycznie istotne i klinicznie znaczące.</p>
      <p>Ważna uwaga: efekty są kumulatywne — szczyt działania pojawia się po 60–90 dniach regularnego stosowania, nie po tygodniu. Produkty oparte na proszku korzenia mogą nie wykazywać żadnych mierzalnych efektów ze względu na niskie stężenie witanolidów.</p>
      <h2>Dlaczego stosujemy KSM-66 w dawce 600 mg</h2>
      <p>W knowing more. Balance stosujemy ekstrakt KSM-66 w dawce 600 mg na porcję — dokładnie ta forma i dawka, która była użyta w badaniach wykazujących istotną redukcję kortyzolu. To nie jest przypadek. To świadoma decyzja oparta na tym, które badania faktycznie mierzyły kortyzol jako punkt końcowy, nie tylko subiektywne odczucie stresu.</p>
    `,
  },
  {
    slug: "gut-microbiome-immune-connection",
    category: "Nauka",
    title: "70% Twojego układu odpornościowego żyje w jelitach — i większość ludzi nieświadomie je niszczy",
    date: "Luty 2025",
    readTime: "7 min czytania",
    img: "/images/website/blog-cell-macro.png",
    body: `
      <h2>GALT: narząd odpornościowy, o którym nikt nie mówi</h2>
      <p>Tkanka limfatyczna związana z jelitami (GALT — gut-associated lymphoid tissue) to największy narząd odpornościowy w ludzkim ciele. Zawiera około 70% wszystkich komórek odpornościowych organizmu. To nie metafora ani przesada — to anatomiczny fakt, który ma głębokie konsekwencje dla zdrowia.</p>
      <p>Jelitowy układ odpornościowy musi wykonywać niezwykłe zadanie: tolerować biliony bakterii komensalnych i cząsteczki pokarmowe, jednocześnie skutecznie reagując na patogeny. Gdy ta równowaga jest zaburzona — co gastroenterolodzy określają jako dysbiozę — konsekwencje wykraczają daleko poza trawienie.</p>
      <h2>Jak mikrobiom reguluje odpowiedź immunologiczną</h2>
      <p>Szczepy bakteryjne produkują krótkołańcuchowe kwasy tłuszczowe (SCFA) — przede wszystkim maślan, propionian i octan — które działają jako sygnały regulatorowe dla komórek odpornościowych. Maślan w szczególności promuje różnicowanie komórek T-regulatorowych (Treg), które tłumią nadmierną reakcję zapalną. Niski poziom bakterii produkujących maślan koreluje z wyższym poziomem markerów zapalnych ogólnoustrojowych.</p>
      <p>Wydzielnicza immunoglobulina A (sIgA) — główny przeciwciał śluzówkowy — jest produkowana masowo w jelitach i stanowi pierwszą linię obrony przed patogenami. Jej produkcja zależy od zdrowego mikrobiomu. Dysbioza zmniejsza produkcję sIgA, co osłabia odporność śluzówkową — nie tylko w jelitach, ale też w drogach oddechowych i moczowo-płciowych.</p>
      <h2>Co zaburza mikrobiom — i w jakim stopniu</h2>
      <p>Antybiotyki to najbardziej znany zaburzacz mikrobiomu, ale nie jedyny. Dieta wysoka w ultra-przetworzonej żywności, chroniczny stres (przez oś jelitowo-mózgową), inhibitory pompy protonowej (powszechnie stosowane leki na refluks), nieregularny rytm snu — wszystkie te czynniki zubożają różnorodność mikrobiomową. I to właśnie różnorodność, mierzona liczbą gatunków i szczepów, jest najsilniejszym predyktorem zdrowia metabolicznego i odpornościowego.</p>
      <h2>Co naprawdę pomaga — i w jakich dawkach</h2>
      <p>Probiotyki działają, gdy: (1) używamy właściwych szczepów w wystarczających ilościach, (2) zapewniamy im podłoże prebiotyczne umożliwiające kolonizację, (3) wspieramy integralność bariery jelitowej. Samo przyjmowanie jakiegokolwiek probiotyku o bliżej nieokreślonej liczbie CFU to marketingowe myślenie, nie medyczne.</p>
      <p>W knowing more. Gut Health stosujemy 50 miliardów CFU wieloszczepowego probiotyku, prebiotyczny FOS/inulinę jako podłoże, L-glutaminę w dawce 2g dla naprawy bariery jelitowej oraz kompleks enzymów trawiennych. To kompletna interwencja ekosystemowa — nie pojedynczy szczep w nieznanej dawce.</p>
    `,
  },
  {
    slug: "proprietary-blends-problem",
    category: "Branża",
    title: "Większość firm suplementacyjnych legalnie ukrywa, ile aktywnego składnika jest w kapsułce — sprawdzenie zajmuje 60 sekund",
    date: "Styczeń 2025",
    readTime: "5 min czytania",
    img: "/images/website/blog-capsules-magnifier.png",
    body: `
      <h2>Czym jest „zastrzeżona mieszanka" i dlaczego istnieje</h2>
      <p>„Zastrzeżona mieszanka" (proprietary blend) to prawny mechanizm, który pozwala producentom suplementów podać łączną wagę mieszanki składników — bez ujawniania ilości poszczególnych składników. Na etykiecie widzisz: „Kompleks wydajnościowy: 750 mg (lwia grzywa, rhodiola, ashwagandha)". Co w tym jest problematyczne?</p>
      <p>Ta mieszanka może legalnie zawierać 720 mg najtańszego składnika (np. korzenia ashwagandhy w formie proszku) i po 15 mg każdego z droższych. Minimalne, klinicznie nieistotne ilości rhodioli czy lwiej grzywy — przy dawkach, przy których żadne badanie nie wykazało efektu — ukryte za marketingową nazwą.</p>
      <h2>Jak to wykryć w 60 sekund</h2>
      <p>Krok 1: Znajdź „panel faktów suplementacyjnych" na etykiecie lub stronie produktu. Krok 2: Sprawdź, czy każdy składnik ma podaną własną dawkę (mg, mcg, IU). Krok 3: Porównaj tę dawkę z dawkami używanymi w badaniach, które producent cytuje lub sugeruje. Krok 4: Jeśli widzisz łączną wagę mieszanki zamiast indywidualnych dawek — firma ukrywa informacje.</p>
      <p>Dodatkowy sygnał ostrzegawczy: bardzo długa lista składników przy relatywnie małej łącznej wadze. Jeśli widzisz 12 składników przy łącznej wadze 400 mg — żaden z nich nie może być w klinicznie skutecznej dawce.</p>
      <h2>Regulacje w Polsce i UE</h2>
      <p>W Unii Europejskiej rozporządzenie 1169/2011 wymaga podania składników, ale nie nakłada obowiązku podawania indywidualnych dawek w mieszankach oznaczonych jako zastrzeżone. To luka prawna, którą branża aktywnie wykorzystuje. Producenci w USA i UE stosują ją powszechnie, bo ogranicza konkurencję kopiowania formuł.</p>
      <h2>Dlaczego knowing more. nie używa zastrzeżonych mieszanek</h2>
      <p>Każdy składnik w naszych formułach ma podaną własną dawkę. Nie ma „kompleksów" ani „stacków". Decyzja jest prosta: jeśli nie możemy podać dawki, to albo dawka jest nieistotna klinicznie i nie powinna być w produkcie, albo ukrywamy informacje przed klientem. Żadna z tych opcji nie jest do zaakceptowania.</p>
    `,
  },
  {
    slug: "sleep-architecture-performance",
    category: "Wydajność",
    title: "Twoje ciało regeneruje się w jednym 90-minutowym oknie każdej nocy. Co je kradnie — i jak je odzyskać",
    date: "Styczeń 2025",
    readTime: "9 min czytania",
    img: "/images/website/blog-sleep-night.png",
    body: `
      <h2>Architektura snu: dlaczego 8 godzin to nie wszystko</h2>
      <p>Sen nie jest jednorodnym stanem odpoczynku. Przebiega w cyklach trwających około 90 minut, każdy składający się z faz lekkich (N1, N2), głębokich (N3 — slow-wave sleep) i REM. Każda faza ma inne funkcje biologiczne, a kluczowa dla fizycznej regeneracji jest faza N3 — sen wolnofalowy.</p>
      <p>W fazie N3 następuje: szczytowe wydzielanie hormonu wzrostu, synteza białek mięśniowych, konsolidacja pamięci proceduralnej, usuwanie metabolitów z mózgu przez układ glifatyczny i pełna eliminacja kortyzolu z poprzedniego dnia. Bez wystarczającej ilości N3 żaden z tych procesów nie zachodzi w pełni.</p>
      <h2>Co redukuje N3 i jak to zmierzyć</h2>
      <p>Alkohol jest głównym niszczycielem N3. Kieliszek wina przed snem może zredukować N3 o 20–25% — i to pomimo subiektywnego poczucia, że „łatwiej zasnąć". Późne treningi (po 20:00) podnoszą temperaturę ciała i kortyzol, które są antagonistami głębokiego snu. Niebieskie światło z ekranów po zachodzie słońca opóźnia wydzielanie melatoniny o 90–120 minut, przesuwając całą architekturę snu.</p>
      <p>Opaski Whoop, Oura Ring i Garmin faktycznie mierzą N3 (przez analizę HRV i ruchów), choć z różną dokładnością. Jeśli Twój wynik „deep sleep" regularnie wynosi poniżej 15% całkowitego czasu snu — masz mierzalny problem z regeneracją.</p>
      <h2>Interwencje z dowodami</h2>
      <p>Magnez (szczególnie glicynian lub L-treonian) zwiększa aktywność receptorów GABA i bezpośrednio wydłuża czas trwania faz N3. Metaanaliza z 2021 roku (Abbasi i wsp.) wykazała istotne skrócenie czasu zasypiania i poprawę efektywności snu przy suplementacji 400–500 mg magnezu elementarnego dziennie.</p>
      <p>L-teanina (200 mg) promuje aktywność fal alfa w mózgu, ułatwiając przejście do głębokiego snu bez efektów sedatywnych. Ashwagandha KSM-66 działa przez obniżenie kortyzolu wieczornego — kortyzol jest bezpośrednim inhibitorem wydzielania melatoniny i pogłębiania faz snu.</p>
      <h2>Praktyczny protokół regeneracji snu</h2>
      <p>Żadna suplementacja nie zastąpi higieny snu. Stała pora wstawania (±30 min, nawet w weekendy) synchronizuje rytm cyrkadiański lepiej niż jakakolwiek substancja. Ekspozycja na naturalne światło rano (15–20 minut) w ciągu pierwszej godziny od przebudzenia wzmacnia szczyty kortyzolu we właściwym czasie i przyspiesza naturalny spadek wieczorny.</p>
    `,
  },
  {
    slug: "healthspan-wearables-whoop-garmin",
    category: "Nauka",
    title: "Twój wynik regeneracji znowu spadł. Oto co naprawdę dzieje się w Twoich komórkach",
    date: "Kwiecień 2025",
    readTime: "7 min czytania",
    img: "/images/website/blog-wearable-morning.png",
    body: `
      <h2>HRV, body battery, recovery score — co to właściwie mierzy?</h2>
      <p>Whoop mierzy HRV (zmienność rytmu serca) i wylicza wynik regeneracji. Garmin mierzy to samo i nazywa to „Body Battery". Oura Ring dodaje temperaturę ciała. Wszystkie trzy mierzą ten sam sygnał biologiczny z różnych kątów: aktywność autonomicznego układu nerwowego.</p>
      <p>HRV — zmienność odstępów między kolejnymi uderzeniami serca — jest oknem na równowagę między układem współczulnym (stres, pobudzenie, walka lub ucieczka) a przywspółczulnym (regeneracja, odpoczynek, trawienie). Wysoki HRV = dominacja przywspółczulna = organizm w trybie regeneracji. Niski HRV = dominacja współczulna = organizm pod obciążeniem.</p>
      <h2>Healthspan vs lifespan: różnica, która ma znaczenie</h2>
      <p>Lifespan to po prostu długość życia. Healthspan to długość życia w dobrym zdrowiu — lat bez chorób przewlekłych, zachowanej sprawności fizycznej i poznawczej. Whoop i Garmin mierzą codzienną zdolność regeneracji, co jest właśnie wskaźnikiem healthspan, nie lifespan.</p>
      <p>Twój wynik regeneracji to skumulowany efekt: jakości snu poprzedniej nocy (szczególnie N3 i REM), obciążenia treningowego z ostatnich 48 godzin, poziomu stresu (kortyzol), stanu zapalnego (np. po intensywnym treningu lub infekcji) i odżywienia.</p>
      <h2>Co faktycznie przesuwa wynik w górę</h2>
      <p>Dane z kilku tysięcy użytkowników Whoop pokazują spójne wzorce: konsekwentna pora snu i wstawania zwiększa średni HRV o 8–12 ms w ciągu 4–6 tygodni. Redukcja alkoholu o 50% poprawia wynik regeneracji o średnio 15 punktów. Suplementacja magnezu i ashwagandhy wykazuje mierzalny efekt w badaniach z obiektywną oceną HRV jako punktem końcowym.</p>
      <h2>Kiedy ignorować wynik i kiedy słuchać</h2>
      <p>Wynik regeneracji to narzędzie, nie wyrok. Jeden zły wynik rano nie oznacza, że jesteś chory — może to być szum pomiarowy lub jednorazowy stresor. Wzorzec niskich wyników przez 5–7 dni z rzędu to sygnał, że coś systemowego wymaga uwagi: niedobór snu, przetrenowanie, infekcja w inkubacji lub chroniczny stres.</p>
      <p>Najskuteczniejsze użycie wearables to identyfikacja własnych progów i wzorców — nie porównywanie się z uśrednionymi normami. Twój osobisty baseline HRV jest ważniejszy niż jakikolwiek absolutny wynik.</p>
    `,
  },
  {
    slug: "gmp-manufacturing-what-it-means",
    category: "Standardy",
    title: "Twój suplement przeszedł każdy test bezpieczeństwa i nadal może nie działać. Co etykieta przemilcza",
    date: "Grudzień 2024",
    readTime: "5 min czytania",
    img: "/images/website/blog-lab-capsule.png",
    body: `
      <h2>Co oznacza certyfikat GMP — i czego nie oznacza</h2>
      <p>Good Manufacturing Practice (Dobra Praktyka Wytwarzania) to zestaw wymogów dotyczących procesów produkcji: czystości pomieszczeń, kalibracji sprzętu, szkoleń personelu, dokumentacji. Certyfikat GMP mówi Ci, że zakład produkcyjny przeszedł audyt potwierdzający przestrzeganie tych procesów. To ważne — ale niewystarczające.</p>
      <p>GMP nie mówi Ci: ile aktywnego składnika faktycznie znalazło się w Twojej kapsułce. Czy surowce użyte w tej konkretnej partii były właściwie zidentyfikowane. Czy nie zawierają substancji zanieczyszczających — metali ciężkich, pestycydów, innych substancji aktywnych. Żaden z tych elementów nie jest automatycznie weryfikowany przez certyfikat GMP.</p>
      <h2>Testowanie tożsamości, mocy i czystości: trzy oddzielne procesy</h2>
      <p>Identity testing (testowanie tożsamości): potwierdzenie, że składnik użyty w produkcie to faktycznie ten składnik, który powinien być użyty. Brzmi podstawowo — ale fałszerstwa surowców zdarzyły się w branży suplementacyjnej wielokrotnie, łącznie z głośnymi przypadkami rhodioli zastąpionej tańszą rośliną o podobnym profilu alkaloidów.</p>
      <p>Potency testing (testowanie mocy): weryfikacja, że ilość aktywnego składnika odpowiada temu, co jest na etykiecie. Badania ConsumerLab i NSF z ostatnich lat wielokrotnie wykazywały produkty zawierające od 0 do 300% deklarowanej dawki. Odchylenie ±20% jest standardowym marginesem; wartości poza tym zakresem to błąd lub celowe zafałszowanie.</p>
      <p>Contaminant testing (badanie zanieczyszczeń): weryfikacja braku metali ciężkich, pestycydów, mikroorganizmów i innych substancji aktywnych (np. substancji farmakologicznych w „naturalnych" suplementach na odchudzanie czy wydolność).</p>
      <h2>Jak sprawdzić, czy producent faktycznie testuje</h2>
      <p>Pytaj o CoA — Certificate of Analysis (Certyfikat Analizy) wystawiony przez niezależne laboratorium dla każdej konkretnej partii. Nie przez producenta. Nie przez wewnętrzne laboratorium zakładu. Przez certyfikowane laboratorium zewnętrzne. Jeśli producent nie udostępnia CoA na żądanie — nie ma dostępu do tych danych lub je ukrywa.</p>
      <p>W knowing more. każda partia jest testowana przez niezależne laboratorium przed wysyłką. To część naszej umowy z klientem — nie wyjątek.</p>
    `,
  },
];

/* ─── Build lookup map ───────────────────────────────────────────── */
const articleMap: Record<string, typeof posts[number]> = Object.fromEntries(
  posts.map((p) => [p.slug, p])
);

/* ─── Category colours ───────────────────────────────────────────── */
const categoryColor: Record<string, string> = {
  Nauka: "#1B2A4A",
  Składniki: "#A0784A",
  Wydajność: "#111111",
  Branża: "#1B2A4A",
  Standardy: "#888",
};

/* ─── Page ───────────────────────────────────────────────────────── */
export default async function BlogArticlePagePL({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleMap[slug];
  if (!article) notFound();

  const color = categoryColor[article.category] ?? "#1B2A4A";

  /* Related articles: same category, excluding current */
  const related = posts
    .filter((p) => p.category === article.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <Navbar locale="pl" />

      {/* Hero image */}
      <div className="relative w-full" style={{ height: "clamp(280px, 45vw, 560px)" }}>
        <Image
          src={article.img}
          alt={article.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Article content */}
      <article className="max-w-[720px] mx-auto px-6 md:px-8 pb-24 -mt-20 relative z-10">

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-[8px] font-mono tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
            style={{ background: `${color}18`, color }}
          >
            {article.category}
          </span>
          <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#111111]/30">
            {article.date}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#111111]/15" />
          <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#111111]/30">
            {article.readTime}
          </span>
        </div>

        <h1
          className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-[#111111] mb-10 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {article.title}
          <span style={{ color: "#1B2A4A" }}>.</span>
        </h1>

        {/* Body prose */}
        <div
          className="prose-article"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {/* Share */}
        <div className="mt-12 flex items-center gap-3">
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#111111]/30">
            Udostępnij
          </span>
          <div className="flex-1 h-px bg-[#111111]/[0.07]" />
        </div>

        {/* Divider */}
        <div className="mt-10 mb-10 h-px bg-[#111111]/[0.07]" />

        {/* Back link */}
        <Link
          href="/pl/blog"
          className="inline-flex items-center gap-2 text-sm text-[#111111]/40 hover:text-[#1B2A4A] transition-colors duration-200"
        >
          ← Powrót do dziennika
        </Link>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-[#111111]/[0.07] py-20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
            <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#1B2A4A]/70 mb-8">
              Podobne artykuły
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {related.map((post) => {
                const relColor = categoryColor[post.category] ?? "#1B2A4A";
                return (
                  <Link key={post.slug} href={`/pl/blog/${post.slug}`} className="group">
                    <div className="relative rounded-xl overflow-hidden aspect-[3/2] mb-5">
                      <Image
                        src={post.img}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="500px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <div className="absolute top-3 left-3">
                        <span
                          className="text-[8px] font-mono tracking-[0.28em] uppercase px-2.5 py-1.5 rounded-full backdrop-blur-sm"
                          style={{ background: `${relColor}CC`, color: "white" }}
                        >
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#111111]/28">
                        {post.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#111111]/15" />
                      <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#111111]/28">
                        {post.readTime}
                      </span>
                    </div>
                    <h3
                      className="text-base md:text-lg font-bold tracking-[-0.02em] text-[#111111] mb-4 leading-snug group-hover:text-[#1B2A4A] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {post.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#1B2A4A] font-medium">
                      Czytaj artykuł{" "}
                      <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                        →
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="border-t border-[#111111]/[0.07] py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
          <div className="max-w-[640px] mx-auto text-center">
            <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#1B2A4A]/70 mb-4">
              Newsletter
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111111] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Każdy wtorek
              <span style={{ color: "#1B2A4A" }}>.</span>
            </h2>
            <p className="text-sm text-[#111111]/38 leading-relaxed mb-8">
              jeden artykuł wart Twojego czasu.
            </p>
            <form
              className="flex gap-3 max-w-[420px] mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3.5 rounded-full text-sm border border-[#111111]/12 text-[#111111] placeholder-[#111111]/25 outline-none focus:border-[#1B2A4A]/40 transition-colors"
              />
              <button
                type="submit"
                className="flex-shrink-0 px-6 py-3.5 rounded-full bg-[#111111] text-white text-sm font-semibold tracking-wide hover:bg-[#333] transition-colors duration-200"
              >
                Zapisz się
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer locale="pl" />
    </main>
  );
}
