import { createContext, useContext, useEffect, useState, type FormEvent } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Clock,
  Layers,
  Mail,
  MapPin,
  Menu,
  Shield,
  Sparkles,
  ThermometerSun,
  Wrench,
  X,
} from "lucide-react";

type Lang = "en" | "de" | "sk";
const LANGS: Lang[] = ["en", "de", "sk"];
const WEB3FORMS_KEY = "a0ae50af-f303-404d-a906-0118051a2a66";

const COPY = {
  en: {
    nav: { home: "Home", services: "Services", studio: "Studio & Process", contact: "Contact", cta: "Get a Quote" },
    seo: {
      home: ["APEX DETAILING — Ceramic Coating & PPF Studio", "Showroom gloss and permanent paint protection in Vienna & Munich."],
      services: ["Services & Packages | APEX DETAILING", "Paint correction, 9H ceramic coatings, and self-healing PPF pricing."],
      studio: ["Studio & 3-Step Process | APEX DETAILING", "Climate-controlled detailing facility, Rupes equipment & 5-year warranty."],
      contact: ["Request a Quote | APEX DETAILING", "Book ceramic coating or PPF installation in Vienna & Munich."],
    },
    hero: {
      badge: "Certified Ceramic & PPF Studio · Vienna & Munich",
      title: "Showroom gloss and permanent paint protection.",
      sub: "Multi-stage paint correction, 9H ceramic coatings, and self-healing PPF film for sports, exotic, and daily luxury vehicles.",
      cta1: "Request Quote",
      cta2: "Explore Packages",
      trust: ["5-Year Ceramic Warranty", "Dust-Free Climate Studio", "Fully Insured Handling"],
    },
    pillars: {
      eyebrow: "Core Capabilities",
      title: "Precision surface engineering",
      items: [
        {
          t: "Multi-Stage Paint Correction",
          d: "Eliminating up to 95% of swirl marks, wash scratches, and oxidation using Rupes & Koch-Chemie polishing systems.",
        },
        {
          t: "9H Ceramic Shield",
          d: "Extreme hydrophobic gloss and chemical resistance against UV rays, winter road salt, and environmental fallout.",
        },
        {
          t: "Self-Healing PPF Armor",
          d: "Invisible polyurethane paint protection film for front bumpers, hoods, and rockers against high-speed stone chips.",
        },
      ],
    },
    packages: {
      eyebrow: "Transparent Pricing",
      title: "Detailing & Protection Packages",
      sub: "Tailored protection tiers for every vehicle. Select a package to pre-fill your custom quote.",
      popular: "Most Popular",
      selectBtn: "Select Package",
      viewAllBtn: "Compare All Services",
      sizeNote: "Base prices apply to Coupes & Sedans. SUVs, G-Class, and Performance Wagons carry a +15% surface adjustment.",
      tiers: [
        {
          id: "essential",
          name: "Essential Gloss",
          price: "€290",
          duration: "1 Day",
          features: [
            "Deep chemical & clay bar decontamination",
            "1-stage machine gloss enhancement",
            "12-month hydrophobic polymer sealant",
            "Full interior vacuum & leather conditioning",
          ],
        },
        {
          id: "ceramic",
          name: "Ceramic Pro Shield",
          price: "€690",
          duration: "2–3 Days",
          popular: true,
          features: [
            "2-stage precision paint correction",
            "5-year 9H Ceramic Coating on bodywork",
            "Ceramic wheel face & brake caliper coating",
            "Hydrophobic windshield & deep interior care",
          ],
        },
        {
          id: "ppf",
          name: "Ultimate PPF + Ceramic",
          price: "€1,490",
          duration: "3–4 Days",
          features: [
            "Self-healing PPF on bumper, hood, fenders & mirrors",
            "Full-body 9H Ceramic Coating over PPF & paint",
            "Wrapped edges with zero visible seams",
            "5-year written warranty & annual inspection",
          ],
        },
      ],
    },
    ctaBanner: {
      title: "Ready to protect your vehicle?",
      sub: "Send us your car model and preferred package — receive a tailored quote within 24 hours.",
      btn: "Get Your Custom Quote",
    },
    studio: {
      eyebrow: "Facility & Methodology",
      title: "Inside the APEX Studio",
      sub: "Every vehicle undergoes a strictly controlled multi-day protocol in our climate-regulated bays.",
      steps: [
        {
          num: "01",
          t: "Digital Paint Inspection",
          d: "Micron-level clear coat thickness measurement across every panel and defect mapping under high-CRI LED lighting.",
        },
        {
          num: "02",
          t: "Precision Correction & Coating",
          d: "Dust-free multi-stage machine polishing followed by controlled-humidity application of 9H ceramic or computer-cut PPF.",
        },
        {
          num: "03",
          t: "IR Curing & Final Handover",
          d: "Short-wave infrared lamp curing for maximum molecular hardness, final quality check, and pH-neutral aftercare kit.",
        },
      ],
      standardsTitle: "Studio Standards & Equipment",
      standards: [
        { t: "Climate-Controlled Bays", d: "Constant 21°C temperature and HEPA filtration prevent airborne dust during coating curing." },
        { t: "Certified Pro Systems", d: "Authorized installers using Rupes BigFoot polishers, Koch-Chemie compounds, and XPEL/Gtechniq chemistry." },
        { t: "5-Year Written Warranty", d: "Registered digital service certificate preserving your vehicle's resale value across DACH." },
      ],
    },
    contact: {
      eyebrow: "Book Your Slot",
      title: "Request a Custom Quote",
      sub: "Tell us about your vehicle and goals. Our lead detailer will reply with availability and exact pricing.",
      viennaTitle: "Vienna Flagship Studio",
      viennaAddr: "Industriestraße 22, 1220 Wien, Austria",
      munichTitle: "Munich Partner Bay",
      munichAddr: "Landsberger Straße 185, 80687 München, Germany",
      hoursLabel: "Opening Hours",
      hours: "Mon – Sat: 08:30 – 18:00",
      formTitle: "Vehicle & Package Details",
      name: "Full Name",
      namePh: "Markus Weber",
      email: "Email Address",
      emailPh: "markus@example.at",
      car: "Car Make & Model",
      carPh: "e.g. Porsche 911 GT3 / BMW M3 Touring",
      pkg: "Desired Package",
      customOpt: "Custom / Full-Body PPF Inquiry",
      notes: "Vehicle Condition or Notes",
      notesPh: "New delivery, swirl marks, preferred dates...",
      submit: "Request Custom Quote",
      sending: "Sending Request...",
      success: "Request received! Our studio team will send your quote within 24 hours.",
      error: "Submission failed. Please try again or email us directly.",
      errRequired: "This field is required",
    },
    footer: "© 2026 APEX DETAILING Studio. Portfolio Concept by VAIRO STUDIO.",
  },
  de: {
    nav: { home: "Start", services: "Leistungen", studio: "Studio & Ablauf", contact: "Kontakt", cta: "Angebot anfordern" },
    seo: {
      home: ["APEX DETAILING — Keramikversiegelung & Lackschutzfolie", "Showroom-Glanz und dauerhafter Lackschutz in Wien & München."],
      services: ["Leistungen & Pakete | APEX DETAILING", "Lackkorrektur, 9H-Keramikversiegelung und selbstheilende PPF-Pakete."],
      studio: ["Studio & 3-Stufen-Prozess | APEX DETAILING", "Klimatisiertes Detailing-Studio, Rupes-Technik & 5 Jahre Garantie."],
      contact: ["Angebot anfordern | APEX DETAILING", "Termin für Keramikversiegelung oder PPF in Wien & München anfragen."],
    },
    hero: {
      badge: "Zertifiziertes Keramik- & PPF-Studio · Wien & München",
      title: "Showroom-Glanz und dauerhafter Lackschutz.",
      sub: "Mehrstufige Lackkorrektur, 9H-Keramikversiegelung und selbstheilende Lackschutzfolie (PPF) für Sport- und Premiumfahrzeuge.",
      cta1: "Angebot anfordern",
      cta2: "Pakete ansehen",
      trust: ["5 Jahre Keramik-Garantie", "Staubfreies Klimastudio", "Vollversicherte Fahrzeugpflege"],
    },
    pillars: {
      eyebrow: "Kernkompetenzen",
      title: "Präzision auf höchstem Niveau",
      items: [
        {
          t: "Mehrstufige Lackkorrektur",
          d: "Entfernung von bis zu 95 % aller Hologramme, Waschkratzer und Oxidationen mit Rupes- & Koch-Chemie-Systemen.",
        },
        {
          t: "9H-Keramikversiegelung",
          d: "Extremer Abperleffekt und Schutz vor UV-Strahlung, Streusalz, Vogelkot und Umwelteinflüssen.",
        },
        {
          t: "Selbstheilende PPF-Folie",
          d: "Unsichtbare Polyurethan-Steinschlagschutzfolie für Frontstoßstange, Motorhaube, Kotflügel und Schweller.",
        },
      ],
    },
    packages: {
      eyebrow: "Transparente Preise",
      title: "Detailing- & Schutzpakete",
      sub: "Abgestimmte Schutzpakete für jedes Fahrzeug. Wählen Sie ein Paket für Ihr unverbindliches Angebot.",
      popular: "Beliebtestes Paket",
      selectBtn: "Paket wählen",
      viewAllBtn: "Alle Leistungen vergleichen",
      sizeNote: "Basispreise gelten für Coupés & Limousinen. Für SUVs, G-Klasse und Kombis gilt ein Aufschlag von +15 %.",
      tiers: [
        {
          id: "essential",
          name: "Essential Gloss",
          price: "€290",
          duration: "1 Tag",
          features: [
            "Tiefenreinigung & Lackkneten (Dekontamination)",
            "1-stufige maschinelle Glanzpolitur",
            "12 Monate hydrophobe Polymer-Versiegelung",
            "Innenraumreinigung & Lederpflege",
          ],
        },
        {
          id: "ceramic",
          name: "Ceramic Pro Shield",
          price: "€690",
          duration: "2–3 Tage",
          popular: true,
          features: [
            "2-stufige Präzisions-Lackkorrektur",
            "5 Jahre 9H-Keramikversiegelung auf dem Lack",
            "Keramikversiegelung für Felgen & Bremssättel",
            "Scheibenversiegelung & intensive Innenraumpflege",
          ],
        },
        {
          id: "ppf",
          name: "Ultimate PPF + Ceramic",
          price: "€1.490",
          duration: "3–4 Tage",
          features: [
            "Selbstheilende PPF-Folie (Front, Haube, Kotflügel, Spiegel)",
            "Komplette 9H-Keramikversiegelung über PPF & Lack",
            "Umgelegte Kanten ohne sichtbare Schnittlinien",
            "5 Jahre schriftliche Garantie & Jahrescheck",
          ],
        },
      ],
    },
    ctaBanner: {
      title: "Bereit für perfekten Lackschutz?",
      sub: "Nennen Sie uns Ihr Fahrzeugmodell — Sie erhalten innerhalb von 24 Stunden ein maßgeschneidertes Angebot.",
      btn: "Jetzt Angebot anfordern",
    },
    studio: {
      eyebrow: "Ausstattung & Ablauf",
      title: "Einblick ins APEX Studio",
      sub: "Jedes Fahrzeug durchläuft einen streng kontrollierten Prozess in unseren klimatisierten Hallen.",
      steps: [
        {
          num: "01",
          t: "Digitale Lackanalyse",
          d: "Schichtdickenmessung im Mikrometerbereich an jedem Bauteil und Defektanalyse unter speziellen LED-Lampen.",
        },
        {
          num: "02",
          t: "Korrektur & Applikation",
          d: "Staubfreie Maschinenpolitur sowie präzises Auftragen von 9H-Keramik oder passgenauer PPF-Schutzfolie.",
        },
        {
          num: "03",
          t: "IR-Aushärtung & Übergabe",
          d: "Infrarot-Trocknung für maximale Härte, Endkontrolle und Übergabe eines pH-neutralen Pflege-Sets.",
        },
      ],
      standardsTitle: "Studiostandards & Technik",
      standards: [
        { t: "Klimatisierte Kabinen", d: "Konstante 21 °C und HEPA-Luftfilterung verhindern Staubeinschlüsse während der Aushärtung." },
        { t: "Zertifizierte Systeme", d: "Verarbeitung mit Rupes BigFoot Poliermaschinen, Koch-Chemie und XPEL/Gtechniq-Produkten." },
        { t: "5 Jahre Garantie", d: "Digitales Servicezertifikat zum Werterhalt Ihres Fahrzeugs im gesamten DACH-Raum." },
      ],
    },
    contact: {
      eyebrow: "Termin vereinbaren",
      title: "Individuelles Angebot anfragen",
      sub: "Teilen Sie uns Ihr Fahrzeug und Ihre Wünsche mit. Wir melden uns innerhalb von 24 Stunden.",
      viennaTitle: "Flagship-Studio Wien",
      viennaAddr: "Industriestraße 22, 1220 Wien, Österreich",
      munichTitle: "Partner-Studio München",
      munichAddr: "Landsberger Straße 185, 80687 München, Deutschland",
      hoursLabel: "Öffnungszeiten",
      hours: "Mo – Sa: 08:30 – 18:00",
      formTitle: "Fahrzeug- & Paketdaten",
      name: "Vollständiger Name",
      namePh: "Markus Weber",
      email: "E-Mail-Adresse",
      emailPh: "markus@beispiel.at",
      car: "Fahrzeugmarke & Modell",
      carPh: "z. B. Porsche 911 GT3 / BMW M3 Touring",
      pkg: "Gewünschtes Paket",
      customOpt: "Individuelle Anfrage / Vollfolierung PPF",
      notes: "Lackzustand oder Anmerkungen",
      notesPh: "Neuwagen, Waschkratzer, Wunschtermin...",
      submit: "Angebot anfordern",
      sending: "Wird gesendet...",
      success: "Anfrage erhalten! Wir senden Ihnen innerhalb von 24 Stunden Ihr Angebot.",
      error: "Fehler beim Senden. Bitte versuchen Sie es erneut.",
      errRequired: "Pflichtfeld",
    },
    footer: "© 2026 APEX DETAILING Studio. Portfolio-Konzept von VAIRO STUDIO.",
  },
  sk: {
    nav: { home: "Domov", services: "Služby", studio: "Štúdio a postup", contact: "Kontakt", cta: "Cenová ponuka" },
    seo: {
      home: ["APEX DETAILING — Keramická ochrana a PPF fólie", "Zrkadlový lesk a trvalá ochrana laku vo Viedni a Mníchove."],
      services: ["Služby a balíky | APEX DETAILING", "Leštenie laku, 9H keramika a samoopravná PPF fólia."],
      studio: ["Štúdio a 3-krokový postup | APEX DETAILING", "Klimatizované detailingové štúdio, technika Rupes a 5-ročná záruka."],
      contact: ["Cenová ponuka | APEX DETAILING", "Objednajte si keramickú ochranu alebo PPF fóliu vo Viedni a Mníchove."],
    },
    hero: {
      badge: "Certifikované Keramické & PPF Štúdio · Viedeň & Mníchov",
      title: "Zrkadlový lesk a trvalá ochrana laku.",
      sub: "Viackrokové leštenie laku, 9H keramická ochrana a samoopravné PPF fólie pre športové a prémiové vozidlá.",
      cta1: "Získať ponuku",
      cta2: "Pozrieť balíky",
      trust: ["5-ročná záruka na keramiku", "Bezprašné klimatizované štúdio", "Plne poistená manipulácia"],
    },
    pillars: {
      eyebrow: "Kľúčové technológie",
      title: "Precízna starostlivosť o povrch",
      items: [
        {
          t: "Viackrokové leštenie laku",
          d: "Odstránenie až 95 % mikroškrabancov, hologramov a oxidácie pomocou systémov Rupes a Koch-Chemie.",
        },
        {
          t: "9H Keramický štít",
          d: "Extrémny hydrofóbny efekt a chemická odolnosť voči UV žiareniu, posypovej soli a nečistotám.",
        },
        {
          t: "Samoopravná PPF fólia",
          d: "Neviditeľná polyuretánová ochrana predného nárazníka, kapoty a prahov proti kamienkom.",
        },
      ],
    },
    packages: {
      eyebrow: "Transparentný cenník",
      title: "Balíky detailingu a ochrany",
      sub: "Prehľadné balíky pre každé vozidlo. Vyberte si balík pre rýchle predvyplnenie dopytu.",
      popular: "Najobľúbenejší",
      selectBtn: "Vybrať balík",
      viewAllBtn: "Porovnať všetky služby",
      sizeNote: "Základné ceny platia pre kupé a sedany. Pri SUV, triede G a kombi platí príplatok +15 %.",
      tiers: [
        {
          id: "essential",
          name: "Essential Gloss",
          price: "€290",
          duration: "1 deň",
          features: [
            "Hĺbková chemická a mechanická dekontaminácia",
            "1-krokové strojové leštenie pre vysoký lesk",
            "12-mesačný hydrofóbny polymérový sealant",
            "Kompletné vysávanie a impregnácia kože v interiéri",
          ],
        },
        {
          id: "ceramic",
          name: "Ceramic Pro Shield",
          price: "€690",
          duration: "2–3 dni",
          popular: true,
          features: [
            "2-kroková precízna korekcia laku",
            "5-ročná 9H keramická ochrana karosérie",
            "Keramická ochrana diskov kolies a strmeňov",
            "Tekuté stierače a hĺbkový detailing interiéru",
          ],
        },
        {
          id: "ppf",
          name: "Ultimate PPF + Ceramic",
          price: "€1 490",
          duration: "3–4 dni",
          features: [
            "Samoopravná PPF fólia (nárazník, kapota, blatníky, zrkadlá)",
            "Celotelová 9H keramická ochrana na PPF aj lak",
            "Zahnuté okraje fólie bez viditeľných spojov",
            "5-ročná písomná záruka a ročná kontrola",
          ],
        },
      ],
    },
    ctaBanner: {
      title: "Chcete ochrániť svoje vozidlo?",
      sub: "Napíšte nám model auta a vybraný balík — presnú ponuku vám pošleme do 24 hodín.",
      btn: "Vyžiadať cenovú ponuku",
    },
    studio: {
      eyebrow: "Zázemie a metodika",
      title: "Ako pracujeme v APEX Studio",
      sub: "Každé vozidlo prechádza presne riadeným procesom v našich klimatizovaných priestoroch.",
      steps: [
        {
          num: "01",
          t: "Digitálna diagnostika laku",
          d: "Meranie hrúbky laku v mikrónoch na každom dieli a mapovanie defektov pod LED osvetlením.",
        },
        {
          num: "02",
          t: "Korekcia a aplikácia ochrany",
          d: "Bezprašné strojové leštenie a následná aplikácia 9H keramiky alebo presne rezanej PPF fólie.",
        },
        {
          num: "03",
          t: "IR vytvrdzovanie a odovzdanie",
          d: "Vytvrdzovanie infračervenými lampami pre maximálnu tvrdosť a odovzdanie sady pH-neutrálnej autokozmetiky.",
        },
      ],
      standardsTitle: "Štandardy štúdia a technika",
      standards: [
        { t: "Klimatizované boxy", d: "Stála teplota 21 °C a HEPA filtrácia vzduchu zabraňujú usadzovaniu prachu." },
        { t: "Certifikované systémy", d: "Pracujeme s leštičkami Rupes BigFoot, chémiou Koch-Chemie a fóliami XPEL." },
        { t: "5-ročná písomná záruka", d: "Digitálny certifikát zvyšujúci hodnotu vozidla pri ďalšom predaji." },
      ],
    },
    contact: {
      eyebrow: "Rezervácia termínu",
      title: "Vyžiadať cenovú ponuku",
      sub: "Uveďte model vášho vozidla a preferovaný balík. Odpovieme vám do 24 hodín.",
      viennaTitle: "Hlavné štúdio Viedeň",
      viennaAddr: "Industriestraße 22, 1220 Wien, Rakúsko",
      munichTitle: "Partnerské štúdio Mníchov",
      munichAddr: "Landsberger Straße 185, 80687 München, Nemecko",
      hoursLabel: "Otváracie hodiny",
      hours: "Po – So: 08:30 – 18:00",
      formTitle: "Údaje o vozidle a balíku",
      name: "Meno a priezvisko",
      namePh: "Martin Kováč",
      email: "E-mailová adresa",
      emailPh: "martin@priklad.sk",
      car: "Značka a model auta",
      carPh: "napr. Porsche 911 GT3 / BMW M3 Touring",
      pkg: "Vybraný balík",
      customOpt: "Individuálny dopyt / Celopolep PPF",
      notes: "Stav laku alebo poznámka",
      notesPh: "Nové vozidlo, mikroškrabance, preferovaný termín...",
      submit: "Odoslať dopyt",
      sending: "Odosiela sa...",
      success: "Dopyt prijatý! Cenovú ponuku vám pošleme do 24 hodín.",
      error: "Odoslanie zlyhalo. Skúste to prosím znova.",
      errRequired: "Povinné pole",
    },
    footer: "© 2026 APEX DETAILING Studio. Portfólio koncept od VAIRO STUDIO.",
  },
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} });
const useLang = () => useContext(LangContext);

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }, [title, description]);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = COPY[lang];

  const navLinks = [
    { to: "/", label: t.nav.home },
    { to: "/services", label: t.nav.services },
    { to: "/studio", label: t.nav.studio },
    { to: "/contact", label: t.nav.contact },
  ];

  const LangToggle = () => (
    <div className="flex items-center rounded-full border border-[#27272A] bg-[#141417] p-0.5 text-xs font-semibold">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            lang === l ? "bg-[#F97316] text-white" : "text-zinc-400 hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <div lang={lang} className="flex min-h-screen flex-col bg-[#09090B] text-[#FAFAFA]">
      <header className="sticky top-0 z-50 border-b border-[#27272A] bg-[#09090B]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-wider">
            <span className="flex size-8 items-center justify-center rounded-lg border border-[#F97316] bg-[#141417] text-xs font-black italic text-[#F97316]">
              AD
            </span>
            <span>
              APEX <span className="text-[#F97316]">DETAILING</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? "text-[#F97316]" : "text-zinc-400 hover:text-white"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LangToggle />
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F97316] px-4 py-2 text-xs font-bold text-white transition-transform hover:scale-105"
            >
              {t.nav.cta} <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <button className="text-zinc-300 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#27272A] bg-[#09090B] px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => `text-base font-medium ${isActive ? "text-[#F97316]" : "text-zinc-300"}`}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="flex items-center justify-between pt-2">
                <LangToggle />
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-[#F97316] px-4 py-2 text-xs font-bold text-white"
                >
                  {t.nav.cta}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[#27272A] bg-[#09090B]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-xs text-zinc-400 md:flex-row">
          <span className="font-display font-extrabold tracking-widest text-white">APEX DETAILING</span>
          <div className="flex gap-6">
            {navLinks.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
          <span>{t.footer}</span>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  const { lang } = useLang();
  const t = COPY[lang];
  usePageMeta(t.seo.home[0], t.seo.home[1]);
  const icons = [Sparkles, Shield, Layers];

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#27272A]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.16),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-24 text-center md:pt-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#27272A] bg-[#141417] px-4 py-1.5 text-xs font-medium text-zinc-300">
            <span className="size-1.5 rounded-full bg-[#F97316]" /> {t.hero.badge}
          </span>
          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-extrabold leading-[1.06] sm:text-6xl md:text-7xl">{t.hero.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">{t.hero.sub}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#F97316] px-7 font-semibold text-white shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-transform hover:scale-105"
            >
              {t.hero.cta1} <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#27272A] bg-[#141417] px-7 font-semibold text-white transition-colors hover:border-zinc-600"
            >
              {t.hero.cta2}
            </Link>
          </div>
          <div className="mx-auto mt-16 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3 border-t border-[#27272A] pt-8 text-sm text-zinc-400">
            {t.hero.trust.map((item) => (
              <span key={item} className="flex items-center gap-2">
                <Check className="size-4 text-[#F97316]" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#27272A] py-24">
        <div className="mx-auto max-w-6xl px-5">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">{t.pillars.eyebrow}</span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">{t.pillars.title}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {t.pillars.items.map((item, idx) => {
              const Icon = icons[idx]!;
              return (
                <div key={item.t} className="rounded-2xl border border-[#27272A] bg-[#141417] p-8">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316]">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{item.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">{t.packages.eyebrow}</span>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">{t.packages.title}</h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] hover:underline">
              {t.packages.viewAllBtn} <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {t.packages.tiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-2xl border bg-[#141417] p-8 ${
                  tier.popular ? "border-[#F97316] shadow-[0_0_35px_rgba(249,115,22,0.12)]" : "border-[#27272A]"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#F97316] px-3 py-1 text-xs font-bold text-white">
                    {t.packages.popular}
                  </span>
                )}
                <h3 className="text-lg font-bold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold">{tier.price}</span>
                  <span className="text-xs text-zinc-400">· {tier.duration}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-zinc-300">
                  {tier.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#F97316]" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/contact?pkg=${encodeURIComponent(`${tier.name} (${tier.price})`)}`}
                  className={`mt-8 inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    tier.popular ? "bg-[#F97316] text-white" : "border border-[#27272A] bg-[#09090B] text-white hover:border-zinc-600"
                  }`}
                >
                  {t.packages.selectBtn}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-20 rounded-3xl border border-[#27272A] bg-gradient-to-r from-[#141417] to-[#1c1410] p-10 text-center md:p-14">
            <h3 className="text-2xl font-extrabold sm:text-4xl">{t.ctaBanner.title}</h3>
            <p className="mx-auto mt-3 max-w-xl text-zinc-400">{t.ctaBanner.sub}</p>
            <Link
              to="/contact"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#F97316] px-8 font-semibold text-white"
            >
              {t.ctaBanner.btn} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  const { lang } = useLang();
  const t = COPY[lang];
  usePageMeta(t.seo.services[0], t.seo.services[1]);
  const icons = [Sparkles, Shield, Layers];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">{t.packages.eyebrow}</span>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{t.packages.title}</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">{t.packages.sub}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.packages.tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-2xl border bg-[#141417] p-8 ${
                tier.popular ? "border-[#F97316] shadow-[0_0_35px_rgba(249,115,22,0.12)]" : "border-[#27272A]"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#F97316] px-3 py-1 text-xs font-bold text-white">
                  {t.packages.popular}
                </span>
              )}
              <h2 className="text-xl font-bold">{tier.name}</h2>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl font-extrabold">{tier.price}</span>
                <span className="text-xs text-zinc-400">· {tier.duration}</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3 text-sm text-zinc-300">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#F97316]" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to={`/contact?pkg=${encodeURIComponent(`${tier.name} (${tier.price})`)}`}
                className={`mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold ${
                  tier.popular ? "bg-[#F97316] text-white" : "border border-[#27272A] bg-[#09090B] text-white hover:border-zinc-600"
                }`}
              >
                {t.packages.selectBtn} <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-6 rounded-xl border border-[#27272A] bg-[#141417]/60 px-5 py-3.5 text-xs text-zinc-400">
          * {t.packages.sizeNote}
        </p>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {t.pillars.items.map((item, idx) => {
            const Icon = icons[idx]!;
            return (
              <div key={item.t} className="rounded-2xl border border-[#27272A] bg-[#141417] p-8">
                <Icon className="size-6 text-[#F97316]" />
                <h3 className="mt-4 text-lg font-bold">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StudioPage() {
  const { lang } = useLang();
  const t = COPY[lang];
  usePageMeta(t.seo.studio[0], t.seo.studio[1]);
  const stdIcons = [ThermometerSun, Wrench, Award];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">{t.studio.eyebrow}</span>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{t.studio.title}</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">{t.studio.sub}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.studio.steps.map((s) => (
            <div key={s.num} className="rounded-2xl border border-[#27272A] bg-[#141417] p-8">
              <span className="font-display text-4xl font-extrabold text-[#F97316]">{s.num}.</span>
              <h2 className="mt-5 text-xl font-bold">{s.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.d}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-20 text-2xl font-extrabold sm:text-4xl">{t.studio.standardsTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.studio.standards.map((st, idx) => {
            const Icon = stdIcons[idx]!;
            return (
              <div key={st.t} className="rounded-2xl border border-[#27272A] bg-[#141417] p-8">
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316]">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{st.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{st.d}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#F97316] px-8 font-semibold text-white"
          >
            {t.ctaBanner.btn} <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  const { lang } = useLang();
  const t = COPY[lang];
  usePageMeta(t.seo.contact[0], t.seo.contact[1]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pkgOptions = [
    ...t.packages.tiers.map((tier) => `${tier.name} (${tier.price})`),
    t.contact.customOpt,
  ];

  const initialPkg = searchParams.get("pkg");
  const [selectedPkg, setSelectedPkg] = useState(initialPkg || pkgOptions[1]!);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    if (initialPkg) {
      setSelectedPkg(initialPkg);
      navigate("/contact", { replace: true });
    }
  }, [initialPkg, navigate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();

    const errs: typeof errors = {};
    if (!name) errs.name = t.contact.errRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t.contact.errRequired;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", `APEX DETAILING Quote — ${name}`);

    setSending(true);
    setStatus("idle");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await res.json();
      if (!data.success) throw new Error();
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    } finally {
      setSending(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-[#27272A] bg-[#09090B] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-[#F97316]";

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">{t.contact.eyebrow}</span>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{t.contact.title}</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">{t.contact.sub}</p>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 rounded-2xl border border-[#27272A] bg-[#141417] p-8 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#F97316]">
                <MapPin className="size-4" /> {t.contact.viennaTitle}
              </div>
              <p className="mt-1 text-sm text-zinc-300">{t.contact.viennaAddr}</p>
            </div>
            <div className="border-t border-[#27272A] pt-5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F97316]">
                <MapPin className="size-4" /> {t.contact.munichTitle}
              </div>
              <p className="mt-1 text-sm text-zinc-300">{t.contact.munichAddr}</p>
            </div>
            <div className="border-t border-[#27272A] pt-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Clock className="size-4 text-[#F97316]" /> {t.contact.hoursLabel}
              </div>
              <p className="mt-1 text-sm text-zinc-400">{t.contact.hours}</p>
            </div>
            <div className="border-t border-[#27272A] pt-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Mail className="size-4 text-[#F97316]" /> Email
              </div>
              <p className="mt-1 text-sm text-zinc-400">studio@apexdetailing-demo.at</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="grid gap-5 rounded-2xl border border-[#27272A] bg-[#141417] p-8 sm:grid-cols-2 lg:col-span-3">
            <h2 className="text-xl font-bold sm:col-span-2">{t.contact.formTitle}</h2>

            <label className="flex flex-col gap-2 text-sm font-medium">
              {t.contact.name}
              <input name="name" placeholder={t.contact.namePh} className={inputCls} />
              {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              {t.contact.email}
              <input name="email" type="email" placeholder={t.contact.emailPh} className={inputCls} />
              {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium sm:col-span-2">
              {t.contact.car}
              <input name="vehicle" placeholder={t.contact.carPh} className={inputCls} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium sm:col-span-2">
              {t.contact.pkg}
              <select name="package" value={selectedPkg} onChange={(e) => setSelectedPkg(e.target.value)} className={inputCls}>
                {pkgOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium sm:col-span-2">
              {t.contact.notes}
              <textarea name="message" rows={4} placeholder={t.contact.notesPh} className={inputCls} />
            </label>

            {status === "ok" && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300 sm:col-span-2">
                <CheckCircle2 className="size-5 shrink-0" /> {t.contact.success}
              </div>
            )}
            {status === "err" && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300 sm:col-span-2">
                {t.contact.error}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#F97316] font-semibold text-white transition-opacity disabled:opacity-60 sm:col-span-2"
            >
              {sending ? t.contact.sending : t.contact.submit} <ArrowRight className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function App() {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LangContext.Provider>
  );
}

export default App;
