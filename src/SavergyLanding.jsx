import { useEffect, useRef, useState } from "react";

/**
 * Savergy — Landing page (React)
 * Single-file component. Spanish only for now (i18n can be layered back in later).
 * Keeps the same visual language as the HTML version: dark theme, teal accent,
 * Space Grotesk / JetBrains Mono / Inter type system, editorial line-art panels.
 */

const FEATURES = [
  { t: "Reduce costes energéticos", d: "Arbitraje de tarifa y peak shaving" },
  { t: "Maximiza energía limpia", d: "Coordinación solar inteligente" },
  { t: "Resiliente por diseño", d: "Control en edge, cloud sincronizada" },
  { t: "Visibilidad en tiempo real", d: "Datos cada 1-3 segundos" },
];

const STATS = [
  { n: "1-3s", l: "Resolución de telemetría en tiempo real" },
  { n: "24h", l: "Horizonte de forecast de demanda y producción" },
  { n: "100%", l: "Compatible con cualquier fabricante de activos" },
  { n: "6", l: "Mercados europeos en operación y expansión" },
];

const WHY = [
  {
    t: "Costes energéticos evitables",
    b: "Identificamos picos de demanda, penalizaciones por potencia, producción solar desaprovechada y un uso ineficiente de la batería.",
  },
  {
    t: "Ahorro verificable, no promesas",
    b: "Cada acción de orquestación queda registrada con su impacto estimado en euros y un histórico auditable.",
  },
  {
    t: "Control local, en tiempo real",
    b: "La inteligencia opera en su instalación y sigue funcionando incluso sin conexión a la nube.",
  },
];

const HACEMOS_SECONDARY = [
  {
    t: "Diagnóstico continuo",
    b: "Auditamos a diario el rendimiento de cada activo. Detectamos degradación, fallos incipientes y desviaciones antes de que afecten a costes o disponibilidad.",
  },
  {
    t: "Auditoría energética",
    b: "Analizamos el perfil energético completo del facility para descubrir oportunidades de ahorro, eficiencia y nuevas palancas de valor.",
  },
  {
    t: "Forecast de demanda",
    b: "Modelos predictivos con horizonte de 24 horas que anticipan picos de consumo, producción fotovoltaica y ventanas tarifarias. Decisiones prospectivas, no reactivas.",
  },
];

const MERCADOS = [
  {
    n: "España · Mercado principal",
    d: "Tarifas 3.0TD y 6.1TD, mercado OMIE, RDL 7/2026. Instalaciones industriales y comerciales con potencia contratada superior a 100 kW.",
  },
  {
    n: "Europa · Expansión",
    d: "Mercados con estructuras tarifarias por franjas y creciente penetración de BESS industrial. Alemania, Francia, Italia, Países Bajos y Bélgica en horizonte.",
  },
  {
    n: "Verticales objetivo",
    d: "Logística frigorífica, real estate industrial, manufactura de alto consumo, centros de datos y flotas eléctricas.",
  },
];

const NAV_LINKS = [
  { href: "#quienes", label: "Quiénes somos" },
  { href: "#hacemos", label: "Qué hacemos" },
  { href: "#mercados", label: "Mercados" },
  { href: "#contacto", label: "Contacto" },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll(".fi");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Logo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="-20 -20 112 112" fill="none">
      <path d="M7.2,72H0V0H7.2" stroke="#00D4AA" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M64.8,72H72V0H64.8" stroke="#00D4AA" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9,36L19.8,61.2L30.6,10.8L41.4,61.2L52.2,10.8L63,36" stroke="#00D4AA" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19.8" cy="61.2" r="4.8" fill="#F59E0B" />
      <circle cx="52.2" cy="10.8" r="4.8" fill="#3B82F6" />
    </svg>
  );
}

function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hfade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#07090C" stopOpacity="0" />
            <stop offset="1" stopColor="#07090C" stopOpacity="1" />
          </linearGradient>
        </defs>
        <g stroke="#1C212C" strokeWidth="1" fill="none">
          <path d="M0,560 L180,560 L230,500 L420,500 L470,440 L720,440 L770,380 L1000,380 L1050,320 L1200,320" />
          <path d="M0,620 L120,620 L170,660 L340,660" />
          <path d="M300,500 L300,300 L520,300 L520,120" />
          <path d="M770,380 L770,180 L960,180 L960,60" />
          <path d="M1050,320 L1050,140" />
        </g>
        <g fill="#00D4AA">
          <circle cx="230" cy="500" r="3.2" /><circle cx="470" cy="440" r="3.2" /><circle cx="770" cy="380" r="3.2" />
          <circle cx="1050" cy="320" r="3.2" /><circle cx="520" cy="120" r="3.2" /><circle cx="960" cy="60" r="3.2" />
          <circle cx="1050" cy="140" r="3.2" /><circle cx="170" cy="660" r="3.2" />
        </g>
        <rect x="0" y="0" width="1200" height="700" fill="url(#hfade)" />
      </svg>
    </div>
  );
}

function ArtMonitor() {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="180" height="110" rx="2" stroke="#232B37" strokeWidth="1.2" />
      <path d="M20,110 L50,80 L75,95 L100,55 L125,70 L150,40 L180,60" stroke="#00D4AA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="80" r="3" fill="#00D4AA" /><circle cx="100" cy="55" r="3" fill="#00D4AA" /><circle cx="150" cy="40" r="3" fill="#00D4AA" />
      <path d="M20,130 L180,130" stroke="#232B37" strokeWidth="1" />
      <path d="M20,20 L20,130 M60,20 L60,130 M100,20 L100,130 M140,20 L140,130 M180,20 L180,130" stroke="#161B23" strokeWidth="1" />
    </svg>
  );
}

function ArtNetwork() {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="75" r="26" stroke="#00D4AA" strokeWidth="1.4" />
      <g stroke="#232B37" strokeWidth="1.2">
        <path d="M100,49 L100,20" /><path d="M126,75 L165,75" /><path d="M100,101 L100,130" /><path d="M74,75 L35,75" />
        <path d="M118,57 L145,32" /><path d="M118,93 L145,118" /><path d="M82,57 L55,32" /><path d="M82,93 L55,118" />
      </g>
      <g fill="#00D4AA">
        <circle cx="100" cy="20" r="3.4" /><circle cx="165" cy="75" r="3.4" /><circle cx="100" cy="130" r="3.4" /><circle cx="35" cy="75" r="3.4" />
        <circle cx="145" cy="32" r="3.4" /><circle cx="145" cy="118" r="3.4" /><circle cx="55" cy="32" r="3.4" /><circle cx="55" cy="118" r="3.4" />
      </g>
    </svg>
  );
}

function ArtOrchestrate() {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,120 L45,60 L70,100 L95,40 L120,90 L145,55 L180,30" stroke="#232B37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20,120 L45,95 L70,110 L95,70 L120,100 L145,80 L180,60" stroke="#00D4AA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="95" cy="70" r="3.4" fill="#00D4AA" /><circle cx="180" cy="60" r="3.4" fill="#00D4AA" />
      <path d="M20,130 L180,130" stroke="#232B37" strokeWidth="1" />
    </svg>
  );
}

function ArtInfra() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="90" width="16" height="26" fill="none" stroke="#00D4AA" strokeWidth="1.4" />
      <rect x="36" y="70" width="16" height="46" fill="none" stroke="#232B37" strokeWidth="1.2" />
      <rect x="58" y="50" width="16" height="66" fill="none" stroke="#00D4AA" strokeWidth="1.4" />
      <rect x="80" y="35" width="16" height="81" fill="none" stroke="#232B37" strokeWidth="1.2" />
      <path d="M10,118 L190,118" stroke="#232B37" strokeWidth="1" />
      <path d="M115,110 L130,80 L145,95 L160,55 L175,75 L190,40" stroke="#00D4AA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="130" cy="80" r="3" fill="#00D4AA" /><circle cx="160" cy="55" r="3" fill="#00D4AA" /><circle cx="190" cy="40" r="3" fill="#00D4AA" />
    </svg>
  );
}

// Country outlines projected from real coordinates (Natural Earth, simplified),
// equirectangular projection. Not a political/diplomatic reference.
const EU_PRT = "M22.5,189.0 L32.7,183.7 L36.0,190.1 L53.7,188.9 L57.4,195.5 L51.3,199.1 L48.5,217.6 L42.8,218.7 L48.1,226.6 L44.4,235.3 L49.0,239.2 L42.3,247.7 L43.4,252.1 L38.1,255.5 L31.1,253.7 L24.3,255.1 L26.3,244.8 L25.1,236.7 L19.2,235.4 L16.0,230.4 L17.1,221.8 L22.3,217.0 L26.0,203.7 L22.5,189.0 Z";
const EU_ESP = "M22.5,189.0 L23.2,179.6 L17.8,173.8 L36.4,164.3 L84.4,168.9 L116.7,168.6 L121.9,173.7 L146.2,179.7 L151.0,176.9 L165.9,182.8 L181.2,181.1 L181.9,188.8 L169.4,197.6 L152.4,200.4 L151.3,204.8 L143.2,212.1 L138.1,222.9 L143.2,230.4 L135.6,236.3 L132.7,244.9 L122.8,247.5 L113.4,257.7 L84.1,257.6 L70.8,267.3 L64.3,266.2 L55.7,254.1 L43.4,252.1 L42.3,247.7 L49.0,239.2 L44.4,235.3 L48.1,226.6 L42.8,218.7 L48.5,217.6 L51.3,199.1 L57.4,195.5 L53.7,188.9 L36.0,190.1 L32.7,183.7 L22.5,189.0 Z";
const EU_FRA = "M189.1,76.8 L198.3,83.0 L205.1,82.0 L229.6,92.3 L248.7,94.7 L242.0,103.8 L240.3,113.2 L236.7,115.4 L230.7,114.2 L231.1,117.6 L221.4,125.0 L221.2,131.0 L227.6,128.9 L232.1,134.7 L231.5,138.4 L235.4,143.4 L230.9,147.4 L234.3,157.6 L241.4,159.3 L239.9,165.0 L227.9,172.5 L201.9,168.9 L182.7,173.2 L181.2,181.1 L165.9,182.8 L151.0,176.9 L146.2,179.7 L121.9,173.7 L116.7,168.6 L123.5,160.7 L126.0,134.4 L102.6,113.8 L82.5,108.8 L81.1,99.1 L98.2,96.3 L120.4,99.7 L116.2,84.7 L128.7,90.4 L159.4,80.1 L163.4,69.3 L174.9,66.6 L176.8,71.3 L183.0,71.5 L189.1,76.8 Z";
const EU_BEL = "M185.5,64.0 L195.2,65.0 L207.4,62.3 L223.0,71.2 L221.5,80.1 L218.1,80.6 L216.6,88.0 L205.1,82.0 L198.3,83.0 L183.0,71.5 L176.8,71.3 L174.9,66.6 L185.5,64.0 Z";
const EU_NLD = "M221.9,35.4 L232.9,35.8 L235.4,40.3 L228.7,57.3 L220.8,57.3 L223.0,71.2 L207.4,62.3 L195.2,65.0 L185.5,64.0 L192.3,60.4 L203.9,41.0 L221.9,35.4 Z";
const EU_LUX = "M221.5,80.1 L224.2,83.1 L223.4,88.9 L216.6,88.0 L218.1,80.6 L221.5,80.1 Z";
const EU_CHE = "M268.4,114.4 L266.9,120.0 L279.6,122.8 L278.5,128.2 L272.7,130.4 L263.0,128.8 L260.1,134.1 L253.8,134.5 L251.5,132.4 L244.1,136.9 L237.8,137.5 L232.1,134.7 L227.6,128.9 L221.2,131.0 L221.4,125.0 L231.1,117.6 L230.7,114.2 L236.7,115.4 L240.3,113.2 L251.5,113.3 L254.2,110.4 L268.4,114.4 Z";
const EU_AUT = "M365.9,106.5 L364.9,111.9 L357.4,112.0 L360.0,114.8 L353.1,125.6 L341.6,125.9 L334.9,128.9 L305.1,124.4 L302.2,119.9 L289.1,122.1 L287.6,124.7 L266.9,120.0 L268.4,114.4 L272.4,113.7 L279.1,117.4 L280.9,113.9 L292.6,114.5 L302.0,112.1 L312.5,115.2 L311.8,104.4 L316.6,102.7 L321.2,96.6 L331.0,100.8 L343.1,94.5 L353.3,98.5 L359.5,97.8 L365.6,100.3 L365.9,106.5 Z";
const EU_DEU = "M272.7,16.0 L273.0,21.1 L286.3,24.2 L286.2,28.9 L307.0,22.8 L321.9,28.0 L328.1,32.2 L331.2,38.9 L327.5,42.4 L332.3,47.1 L335.6,54.2 L334.6,58.7 L340.0,67.2 L334.1,68.5 L330.6,67.0 L303.3,78.3 L307.0,87.8 L321.2,96.6 L316.6,102.7 L311.8,104.4 L312.5,115.2 L302.0,112.1 L292.6,114.5 L280.9,113.9 L279.1,117.4 L272.4,113.7 L254.2,110.4 L251.5,113.3 L240.3,113.2 L242.0,103.8 L248.7,94.7 L229.6,92.3 L223.4,88.9 L220.8,57.3 L228.7,57.3 L232.1,52.4 L235.4,40.3 L232.9,35.8 L235.5,33.0 L246.5,32.3 L249.0,35.2 L257.9,28.7 L254.9,23.8 L254.3,16.3 L264.3,18.0 L272.7,16.0 Z";
const EU_ITA_0 = "M305.1,124.4 L324.0,127.9 L322.6,134.4 L325.7,140.0 L315.2,138.1 L304.5,142.7 L303.6,153.1 L307.9,159.8 L320.3,166.4 L326.9,177.3 L341.6,188.0 L352.0,187.9 L355.2,190.8 L351.5,193.4 L373.0,202.2 L385.7,211.5 L383.2,216.3 L375.9,210.1 L364.4,207.9 L358.9,216.5 L368.4,221.4 L366.8,228.3 L361.3,229.0 L354.3,240.4 L348.8,241.4 L351.5,230.3 L354.4,227.4 L345.2,213.1 L339.7,211.5 L335.8,205.8 L327.4,203.4 L321.6,198.1 L311.9,197.2 L289.5,182.7 L280.5,175.1 L276.4,162.0 L259.1,156.1 L239.9,165.0 L241.4,159.3 L234.3,157.6 L230.9,147.4 L235.4,143.4 L231.5,138.4 L232.1,134.7 L237.8,137.5 L244.1,136.9 L251.5,132.4 L253.8,134.5 L260.1,134.1 L263.0,128.8 L272.7,130.4 L278.5,128.2 L279.6,122.8 L287.6,124.7 L289.1,122.1 L302.2,119.9 L305.1,124.4 Z";
const EU_ITA_1 = "M346.6,237.1 L341.9,247.5 L343.8,251.6 L341.1,258.4 L305.8,245.3 L307.7,238.5 L323.1,239.7 L346.6,237.1 Z";
const EU_ITA_2 = "M263.3,197.8 L271.2,207.2 L269.4,224.6 L263.4,223.8 L258.0,228.2 L253.0,224.7 L252.5,208.8 L249.5,201.2 L256.7,201.9 L263.3,197.8 Z";

const EUROPE_COUNTRIES = [
  EU_PRT, EU_ESP, EU_FRA, EU_BEL, EU_NLD, EU_LUX, EU_CHE, EU_AUT, EU_DEU,
  EU_ITA_0, EU_ITA_1, EU_ITA_2,
];

const EUROPE_MAP_W = 401.7;
const EUROPE_MAP_H = 283.3;

function EuropeMap() {
  // City markers projected with the same equirectangular transform as the
  // country outlines above, so they land in the right place automatically.
  const cities = [
    { x: 92.9, y: 208.3, label: "MADRID", primary: true, big: true },
    { x: 172.8, y: 96.9, label: "PARÍS" },
    { x: 318.7, y: 48.5, label: "BERLÍN" },
    { x: 263.1, y: 141.6, label: "MILÁN" },
    { x: 206.5, y: 50.5, label: "ÁMSTERDAM" },
    { x: 199.2, y: 70.6, label: "BRUSELAS" },
  ];
  return (
    <svg viewBox={`0 0 ${EUROPE_MAP_W} ${EUROPE_MAP_H}`} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Mapa de Europa">
      <rect x="0" y="0" width={EUROPE_MAP_W} height={EUROPE_MAP_H} fill="#0C0F14" />
      <g stroke="#232B37" strokeWidth="1" opacity="0.35">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2={EUROPE_MAP_H} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2={EUROPE_MAP_W} y2={i * 40} />
        ))}
      </g>
      {EUROPE_COUNTRIES.map((d, i) => (
        <path key={i} d={d} fill="#151B24" stroke="#2E3644" strokeWidth="1.2" strokeLinejoin="round" />
      ))}
      {cities.map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy={c.y} r={c.big ? 4.5 : 3} fill={c.primary ? "#00D4AA" : "#0C0F14"} stroke={c.primary ? "none" : "#6B7280"} strokeWidth="1.4" />
          <text x={c.x} y={c.y + (c.big ? 17 : -7)} textAnchor="middle" fontSize={c.big ? 11 : 9.5} fontWeight={c.big ? 600 : 400} fill={c.primary ? "#F5F7FA" : "#98A0AC"} letterSpacing="1.5">
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function SavergyLanding() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [sent, setSent] = useState(false);
  const rootRef = useReveal();

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean);
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const company = (data.get("company") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();
    if (!name || !email || !message) {
      form.reportValidity?.();
      return;
    }
    const subject = `Consulta web — ${name}${company ? " · " + company : ""}`;
    const body = [
      `Nombre: ${name}`,
      `Empresa: ${company || "—"}`,
      `Email: ${email}`,
      `Teléfono: ${phone || "—"}`,
      "",
      message,
    ].join("\n");
    setSent(true);
    window.location.href = `mailto:info@savergy.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div ref={rootRef} className="sv-root">
      <style>{CSS}</style>

      <nav className={navSolid ? "solid" : ""}>
        <a href="#" className="nv-logo">
          <Logo />
          <span className="nv-name">Savergy</span>
        </a>
        <ul className="nv-links">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={activeSection === l.href.slice(1) ? "active" : ""}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nv-right">
          <a href="https://app.savergy.io" className="nv-portal">Portal clientes</a>
          <a href="#contacto" className="nv-cta">Contactar</a>
          <button className={`nv-burger${mobileOpen ? " open" : ""}`} aria-label="Menú" onClick={() => setMobileOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mnav ${mobileOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
        ))}
        <a href="https://app.savergy.io" onClick={() => setMobileOpen(false)}>Portal clientes</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <HeroBackground />
        <div className="hero-inner">
          <div className="hero-eyebrow">// Orquestación energética industrial</div>
          <h1>Orqueste su energía.<br /><em>Controle su coste.</em></h1>
          <p className="h-sub">
            Ayudamos a empresas de alto consumo a reducir su factura eléctrica y a controlar su energía:
            predicción, control y orquestación sobre sus activos existentes.
          </p>
          <div className="h-actions">
            <a href="#contacto" className="btn btn-teal"><span>Solicitar demo</span></a>
            <a href="#hacemos" className="link">
              <span>Cómo funciona</span>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2,7H12M8,3L12,7L8,11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="stats">
        <div className="wrap stats-grid">
          {STATS.map((s) => (
            <div className="stat-cell" key={s.n}>
              <div className="stat-num">{s.n}</div>
              <div className="stat-lb">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="feat">
        <div className="wrap feat-grid">
          {FEATURES.map((f, i) => (
            <div className={`fi d${i}`} key={f.t}>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POR QUÉ */}
      <section className="sec sec-soft" id="why">
        <div className="wrap">
          <div className="fi">
            <div className="ey">Por qué Savergy</div>
            <h2 className="h2">La mayoría de instalaciones paga<br /><em>más de lo necesario</em> por la energía</h2>
          </div>
          <div className="wlist">
            {WHY.map((w, i) => (
              <div className={`wrow fi d${i}`} key={w.t}>
                <div className="wt">{w.t}</div>
                <div className="wb">{w.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIÉNES */}
      <section className="sec" id="quienes">
        <div className="wrap qs-grid">
          <div>
            <div className="fi">
              <div className="ey">Quiénes somos</div>
              <h2 className="h2">Infraestructura<br />para la <em>energía</em><br />inteligente</h2>
            </div>
            <div className="ed-art fi d1" style={{ marginTop: 36, aspectRatio: "16/10" }}>
              <ArtInfra />
            </div>
          </div>
          <div>
            <p className="lead fi d1">
              Savergy nace de la convergencia entre ingeniería eléctrica industrial y desarrollo de plataformas
              SaaS escalables. Un equipo técnico fundador con experiencia directa en la gestión de instalaciones
              de gran consumo en España.
            </p>
            <p className="lead fi d2">
              Somos la capa de inteligencia que hace que todos los activos de una instalación trabajen juntos:
              integramos, monitorizamos y orquestamos sobre la infraestructura existente, sea del fabricante
              que sea. La misma plataforma que hoy optimiza electricidad coordinará mañana frío industrial y
              flotas eléctricas.
            </p>
          </div>
        </div>
      </section>

      {/* MISIÓN */}
      <section className="mission">
        <div className="wrap">
          <div className="mis-lb fi">Nuestra misión</div>
          <div className="mis-tx fi d1">
            Hacer que cada<br />kilovatio-hora<br />trabaje con <em>propósito</em>
          </div>
        </div>
      </section>

      {/* HACEMOS */}
      <section className="sec sec-soft" id="hacemos">
        <div className="wrap">
          <div className="fi">
            <div className="ey">Qué hacemos</div>
            <h2 className="h2">Una plataforma,<br /><em>todos sus activos</em></h2>
          </div>

          <div className="ed-list">
            <div className="ed-row fi">
              <div className="ed-art"><ArtMonitor /></div>
              <div className="ed-txt">
                <div className="ed-num">01</div>
                <h3>Monitoreo en tiempo real</h3>
                <p>Capturamos datos de consumo, generación y almacenamiento cada 1-3 segundos. Visibilidad total sobre todos los activos del sitio desde una única plataforma.</p>
              </div>
            </div>

            <div className="ed-row rev fi">
              <div className="ed-art"><ArtNetwork /></div>
              <div className="ed-txt">
                <div className="ed-num">02</div>
                <h3>Unificación de señales</h3>
                <p>Cada equipo suele traer su propia plataforma aislada. Integramos inversores, baterías, medidores y cargadores —de cualquier fabricante— en una única capa de datos.</p>
              </div>
            </div>

            <div className="ed-row fi">
              <div className="ed-art"><ArtOrchestrate /></div>
              <div className="ed-txt">
                <div className="ed-num">03</div>
                <h3>Orquestación activa</h3>
                <p>Almacenamos energía cuando es barata y la usamos cuando es cara: coordinamos batería, fotovoltaica y demanda en tiempo real, siempre dentro de las restricciones físicas del sitio.</p>
              </div>
            </div>
          </div>

          <div className="hg">
            {HACEMOS_SECONDARY.map((h, i) => (
              <div className={`fi d${i}`} key={h.t}>
                <h3>{h.t}</h3>
                <p>{h.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MERCADOS */}
      <section className="sec" id="mercados">
        <div className="wrap mg">
          <div>
            <div className="fi">
              <div className="ey">Mercados</div>
              <h2 className="h2">Dónde<br /><em>operamos</em></h2>
            </div>
            <p className="lead fi d1" style={{ marginTop: 20 }}>
              Operamos en mercados con precios de energía estructuralmente altos, regulación favorable a la
              flexibilidad y alta densidad de instalaciones industriales.
            </p>
            <div className="mlist">
              {MERCADOS.map((m, i) => (
                <div className={`mrow fi d${i + 1}`} key={m.n}>
                  <div className="mn">{m.n}</div>
                  <div className="md">{m.d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mmap fi d2">
            <EuropeMap />
            <div className="map-legend">
              <span className="ml-i"><span className="ml-dot" />Mercado principal</span>
              <span className="ml-i"><span className="ml-ring" />En expansión</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="sec" id="contacto">
        <div className="wrap ct-grid">
          <div className="fi">
            <div className="ey">Contacto</div>
            <h2 className="h2">¿Trabaja con<br />activos <em>energéticos?</em></h2>
            <p className="lead" style={{ marginTop: 20 }}>
              Si gestiona instalaciones con consumo eléctrico significativo, estamos disponibles para una
              conversación técnica sin compromiso.
            </p>
            <a href="mailto:info@savergy.io" className="ct-a">
              info@savergy.io
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M3,10H17M12,4L17,10L12,16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <form className="cform fi d2" onSubmit={handleSubmit} noValidate>
            <div className="cf-h">Hablemos de su instalación</div>
            <div className="cf-s">Cuéntenos qué activos gestiona y le respondemos con un análisis técnico inicial.</div>
            <div className="cf-row">
              <div className="cf-f">
                <label htmlFor="cf-name">Nombre</label>
                <input id="cf-name" name="name" type="text" placeholder="Su nombre" required />
              </div>
              <div className="cf-f">
                <label htmlFor="cf-company">Empresa</label>
                <input id="cf-company" name="company" type="text" placeholder="Su empresa" />
              </div>
            </div>
            <div className="cf-row">
              <div className="cf-f">
                <label htmlFor="cf-email">Email</label>
                <input id="cf-email" name="email" type="email" placeholder="nombre@empresa.com" required />
              </div>
              <div className="cf-f">
                <label htmlFor="cf-phone">Teléfono</label>
                <input id="cf-phone" name="phone" type="tel" placeholder="+34 ..." />
              </div>
            </div>
            <div className="cf-f">
              <label htmlFor="cf-msg">Mensaje</label>
              <textarea id="cf-msg" name="message" placeholder="Potencia contratada, activos instalados (BESS, FV…), tipo de instalación…" required />
            </div>
            <button type="submit" className="cf-btn"><span>Enviar mensaje</span></button>
            <div className="cf-note" style={sent ? { color: "#00D4AA" } : undefined}>
              {sent ? "Abriendo su cliente de correo…" : "Respuesta en menos de 24h hábiles · Sin compromiso"}
            </div>
          </form>
        </div>
      </section>

      <footer>
        <div className="ft-top">
          <a href="#" className="ft-br">
            <Logo size={20} />
            <span className="ft-nm">Savergy</span>
          </a>
          <ul className="ft-lk">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
            <li><a href="https://app.savergy.io">Portal clientes</a></li>
          </ul>
        </div>
        <div className="ft-legal">
          <div className="ft-cp">
            © 2026 Savergy Energy, S.L. — Todos los derechos reservados. Savergy® y el logotipo Savergy son
            marcas registradas de Savergy Energy, S.L. Plataforma de orquestación energética inteligente ·
            Madrid, España.
          </div>
          <div className="ft-legal-lk">
            <a href="/aviso-legal">Aviso legal</a>
            <a href="/privacidad">Privacidad</a>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
.sv-root{
  --bg:#07090C; --soft:#0C0F14; --soft2:#10141C;
  --ink:#F5F7FA; --gray:#98A0AC; --gray2:#6B7280; --dark:#07090C;
  --teal:#00D4AA; --teal-ink:#00D4AA; --line:#1C212C; --border2:#252C3A;
  --f-body:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  --f-head:'Space Grotesk',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  --f-mono:'JetBrains Mono','SF Mono',Consolas,monospace;
  background:var(--bg);color:var(--ink);font-family:var(--f-body);
  -webkit-font-smoothing:antialiased;overflow-x:hidden;position:relative;
}
.sv-root *,.sv-root *::before,.sv-root *::after{box-sizing:border-box}
.sv-root .wrap{max-width:1040px;margin:0 auto;padding:0 24px}

.sv-root nav{
  position:fixed;inset:0 0 auto 0;z-index:300;height:68px;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 clamp(20px,4vw,48px);
  background:rgba(7,9,12,.72);backdrop-filter:blur(20px) saturate(1.6);
  border-bottom:1px solid transparent;transition:background .3s,border-color .3s;
}
.sv-root nav.solid{background:rgba(7,9,12,.9);border-bottom-color:var(--line)}
.sv-root .nv-logo{display:flex;align-items:center;gap:11px;text-decoration:none;line-height:1}
.sv-root .nv-name{font-family:var(--f-mono);font-size:13px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--ink)}
.sv-root .nv-links{display:flex;gap:40px;list-style:none;margin:0;padding:0}
.sv-root .nv-links a{font-size:13px;font-weight:400;color:var(--gray);text-decoration:none;transition:color .2s;position:relative}
.sv-root .nv-links a:hover{color:var(--ink)}
.sv-root .nv-links a.active{color:var(--teal-ink)}
.sv-root .nv-links a.active::after{content:'';position:absolute;left:0;right:0;bottom:-7px;height:1.5px;background:var(--teal-ink);border-radius:2px}
.sv-root .nv-right{display:flex;align-items:center;gap:22px}
.sv-root .nv-portal{font-size:13px;font-weight:400;color:var(--gray);text-decoration:none;transition:color .2s;white-space:nowrap}
.sv-root .nv-portal:hover{color:var(--ink)}
.sv-root .nv-cta{padding:7px 4px;background:transparent;border-bottom:1px solid var(--gray2);font-size:13px;font-weight:400;color:var(--ink);text-decoration:none;transition:border-color .25s,color .25s,transform .25s cubic-bezier(.16,1,.3,1);white-space:nowrap}
.sv-root .nv-cta:hover{border-color:var(--teal);color:var(--teal-ink);transform:translateY(-1px)}
.sv-root .nv-burger{display:none;background:none;border:none;cursor:pointer;padding:8px}
.sv-root .nv-burger span{display:block;width:20px;height:1.6px;background:var(--ink);margin:4.5px 0;border-radius:2px;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s ease}
.sv-root .nv-burger.open span:nth-child(1){transform:translateY(6.1px) rotate(45deg)}
.sv-root .nv-burger.open span:nth-child(2){opacity:0}
.sv-root .nv-burger.open span:nth-child(3){transform:translateY(-6.1px) rotate(-45deg)}
.sv-root .mnav{position:fixed;inset:68px 0 auto 0;z-index:290;background:rgba(10,12,16,.97);backdrop-filter:blur(20px);border-bottom:1px solid transparent;padding:0 24px;display:flex;flex-direction:column;max-height:0;opacity:0;overflow:hidden;pointer-events:none;transition:max-height .4s cubic-bezier(.16,1,.3,1),opacity .3s ease,padding .4s cubic-bezier(.16,1,.3,1),border-color .3s ease}
.sv-root .mnav.open{display:flex;max-height:420px;opacity:1;padding:6px 24px 18px;pointer-events:auto;border-bottom-color:var(--line)}
.sv-root .mnav a{padding:14px 0;font-size:15px;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--line);transition:color .2s,padding-left .2s ease}
.sv-root .mnav a:hover{color:var(--teal-ink);padding-left:6px}
.sv-root .mnav a:last-child{border-bottom:none}

.sv-root .ey{font-family:var(--f-mono);font-size:11.5px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--teal-ink);margin-bottom:18px}
.sv-root .ey::before{content:'// ';color:var(--gray2)}
.sv-root .h2{font-family:var(--f-head);font-size:clamp(30px,4vw,46px);font-weight:500;line-height:1.15;letter-spacing:-.014em;color:var(--ink);margin:0}
.sv-root .h2 em,.sv-root h1 em{font-style:normal;color:var(--teal-ink)}
.sv-root .lead{font-size:16.5px;line-height:1.75;color:var(--gray);max-width:560px;margin:0}
.sv-root .sec{padding:clamp(96px,12vw,160px) 0}
.sv-root .sec-soft{background:var(--soft)}
.sv-root #mercados{padding-bottom:clamp(48px,6vw,76px)}
.sv-root #contacto{padding-top:clamp(48px,6vw,76px)}

.sv-root .hero{position:relative;padding:clamp(170px,24vh,240px) 24px clamp(80px,10vw,120px);text-align:center;overflow:hidden;border-bottom:1px solid var(--line)}
.sv-root .hero-bg{position:absolute;inset:0;z-index:0;opacity:.5;pointer-events:none}
.sv-root .hero-bg svg{width:100%;height:100%;display:block}
.sv-root .hero-inner{position:relative;z-index:1}
.sv-root .hero-eyebrow{font-family:var(--f-mono);font-size:12px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--teal-ink);margin-bottom:26px}
.sv-root .hero h1{font-family:var(--f-head);font-size:clamp(46px,7.2vw,88px);font-weight:600;line-height:1.05;letter-spacing:-.02em;color:var(--ink);max-width:960px;margin:0 auto 30px}
.sv-root .hero .h-sub{font-size:clamp(16px,1.7vw,19px);line-height:1.7;color:var(--gray);max-width:560px;margin:0 auto 46px;font-weight:300}
.sv-root .h-actions{display:flex;align-items:center;justify-content:center;gap:34px;flex-wrap:wrap}
.sv-root .btn{display:inline-flex;align-items:center;gap:9px;padding:15px 32px;border-radius:2px;font-family:var(--f-mono);font-size:13px;font-weight:500;text-decoration:none;letter-spacing:.04em;text-transform:uppercase;transition:opacity .25s ease,transform .25s cubic-bezier(.16,1,.3,1)}
.sv-root .btn-teal{background:var(--teal);color:var(--dark)}
.sv-root .btn-teal:hover{opacity:.86;transform:translateY(-2px)}
.sv-root .btn-teal:active{transform:translateY(0)}
.sv-root .link{display:inline-flex;align-items:center;gap:7px;font-size:14px;font-weight:400;color:var(--gray);text-decoration:none;transition:color .2s}
.sv-root .link:hover{color:var(--ink)}
.sv-root .link svg{transition:transform .25s cubic-bezier(.16,1,.3,1)}
.sv-root .link:hover svg{transform:translateX(3px)}

.sv-root .stats{background:var(--soft2);border-bottom:1px solid var(--line)}
.sv-root .stats-grid{display:grid;grid-template-columns:repeat(4,1fr)}
.sv-root .stat-cell{padding:clamp(40px,5vw,56px) clamp(20px,3vw,36px);border-left:1px solid var(--line);text-align:left;transition:background .3s ease}
.sv-root .stat-cell:hover{background:rgba(0,212,170,.04)}
.sv-root .stat-cell:first-child{border-left:none}
.sv-root .stat-num{font-family:var(--f-head);font-size:clamp(30px,4vw,46px);font-weight:600;letter-spacing:-.02em;color:var(--teal-ink);line-height:1;transition:transform .3s cubic-bezier(.16,1,.3,1)}
.sv-root .stat-cell:hover .stat-num{transform:translateY(-3px)}
.sv-root .stat-lb{font-family:var(--f-mono);font-size:11px;font-weight:400;letter-spacing:.03em;color:var(--gray2);margin-top:10px;line-height:1.5}

.sv-root .feat{padding:0 0 clamp(96px,12vw,140px)}
.sv-root .feat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:48px 40px;padding-top:clamp(64px,8vw,90px);border-top:1px solid var(--line)}
.sv-root .feat-grid .fi{position:relative;padding-top:15px;transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .35s cubic-bezier(.16,1,.3,1)}
.sv-root .feat-grid .fi::before{content:'';position:absolute;top:0;left:0;width:18px;height:2px;background:var(--teal);transition:width .35s cubic-bezier(.16,1,.3,1)}
.sv-root .feat-grid .fi:hover{transform:translateY(-4px)}
.sv-root .feat-grid .fi:hover::before{width:100%}
.sv-root .feat-grid h3{font-family:var(--f-head);font-size:15px;font-weight:500;color:var(--ink);margin:0 0 9px;letter-spacing:-.005em;transition:color .25s ease}
.sv-root .feat-grid .fi:hover h3{color:var(--teal-ink)}
.sv-root .feat-grid p{font-size:13.5px;line-height:1.65;color:var(--gray2);margin:0}

.sv-root .qs-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(48px,7vw,100px);align-items:start}

.sv-root .wlist{margin-top:clamp(56px,6vw,76px)}
.sv-root .wrow{display:grid;grid-template-columns:minmax(220px,340px) 1fr;gap:14px clamp(28px,4vw,64px);padding:38px 0;border-top:1px solid var(--line)}
.sv-root .wlist .wrow{transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1),background .3s ease,padding-left .3s cubic-bezier(.16,1,.3,1)}
.sv-root .wrow:hover{background:rgba(0,212,170,.03);padding-left:10px}
.sv-root .wrow:last-child{border-bottom:1px solid var(--line)}
.sv-root .wt{font-family:var(--f-head);font-size:clamp(18px,2vw,21px);font-weight:500;letter-spacing:-.01em;color:var(--ink);line-height:1.3;transition:color .25s ease}
.sv-root .wrow:hover .wt{color:var(--teal-ink)}
.sv-root .wb{font-size:14.5px;line-height:1.75;color:var(--gray2);max-width:620px}

.sv-root .ed-art{background:var(--soft2);border:1px solid var(--line);border-radius:2px;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;overflow:hidden;transition:transform .4s cubic-bezier(.16,1,.3,1),border-color .3s ease}
.sv-root .ed-art svg{width:72%;height:72%;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.sv-root .ed-row:hover .ed-art{transform:scale(1.02);border-color:var(--teal)}
.sv-root .ed-row:hover .ed-art svg{transform:scale(1.04)}

.sv-root .mission{background:var(--soft2);padding:clamp(120px,15vw,180px) 0;text-align:center;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.sv-root .mis-lb{font-family:var(--f-mono);font-size:11.5px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--gray2);margin-bottom:30px}
.sv-root .mis-tx{font-family:var(--f-head);font-size:clamp(32px,4.6vw,56px);font-weight:500;line-height:1.2;letter-spacing:-.016em;color:#F5F7FA;max-width:760px;margin:0 auto}
.sv-root .mis-tx em{font-style:normal;color:var(--teal)}

.sv-root .ed-list{margin-top:clamp(56px,7vw,80px);display:flex;flex-direction:column;gap:clamp(64px,8vw,100px)}
.sv-root .ed-row{display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,80px);align-items:center}
.sv-root .ed-row.rev .ed-art{order:2}
.sv-root .ed-row.rev .ed-txt{order:1}
.sv-root .ed-num{font-family:var(--f-mono);font-size:12px;color:var(--teal-ink);letter-spacing:.1em;margin-bottom:16px}
.sv-root .ed-txt h3{font-family:var(--f-head);font-size:clamp(20px,2.4vw,26px);font-weight:500;color:var(--ink);margin:0 0 14px;letter-spacing:-.01em;line-height:1.3}
.sv-root .ed-txt p{font-size:15px;line-height:1.75;color:var(--gray2);max-width:480px;margin:0}
.sv-root .hg{display:grid;grid-template-columns:repeat(3,1fr);gap:44px 40px;margin-top:clamp(64px,8vw,90px);padding-top:clamp(40px,5vw,56px);border-top:1px solid var(--line)}
.sv-root .hg h3{font-family:var(--f-head);font-size:15px;font-weight:500;color:var(--ink);margin:0 0 9px;letter-spacing:-.005em}
.sv-root .hg p{font-size:13.5px;line-height:1.65;color:var(--gray2);margin:0}

.sv-root .mg{display:grid;grid-template-columns:1fr minmax(300px,420px);gap:clamp(36px,5vw,80px);align-items:center}
.sv-root .mg>*{min-width:0}
.sv-root .mmap svg{width:100%;height:auto;display:block}
.sv-root .map-legend{display:flex;justify-content:center;gap:26px;margin-top:16px}
.sv-root .ml-i{display:inline-flex;align-items:center;gap:8px;font-family:var(--f-mono);font-size:11px;letter-spacing:.03em;color:var(--gray)}
.sv-root .ml-dot{width:9px;height:9px;border-radius:50%;background:var(--teal)}
.sv-root .ml-ring{width:9px;height:9px;border-radius:50%;border:1.5px solid var(--gray2)}
.sv-root .mlist{margin-top:clamp(44px,5vw,64px)}
.sv-root .mrow{display:grid;grid-template-columns:minmax(200px,290px) 1fr;gap:14px clamp(28px,4vw,64px);padding:26px 0;border-top:1px solid var(--line)}
.sv-root .mlist .mrow{transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1),background .3s ease,padding-left .3s cubic-bezier(.16,1,.3,1)}
.sv-root .mrow:hover{background:rgba(0,212,170,.03);padding-left:10px}
.sv-root .mrow:last-child{border-bottom:1px solid var(--line)}
.sv-root .mn{font-family:var(--f-head);font-size:16.5px;font-weight:500;color:var(--ink);letter-spacing:-.005em;transition:color .25s ease}
.sv-root .mrow:hover .mn{color:var(--teal-ink)}
.sv-root .md{font-size:14.5px;line-height:1.65;color:var(--gray);max-width:640px}

.sv-root .ct-grid{display:grid;grid-template-columns:1fr minmax(340px,440px);gap:clamp(48px,7vw,100px);align-items:start}
.sv-root .ct-a{display:inline-flex;align-items:center;gap:10px;margin-top:34px;font-size:clamp(18px,2vw,21px);font-weight:400;letter-spacing:-.005em;color:var(--teal-ink);text-decoration:none}
.sv-root .ct-a:hover{text-decoration:underline;text-underline-offset:4px}
.sv-root .ct-a svg{transition:transform .25s cubic-bezier(.16,1,.3,1)}
.sv-root .ct-a:hover svg{transform:translateX(4px)}
.sv-root .cform{background:transparent;border:none;padding:0}
.sv-root .cf-h{font-family:var(--f-head);font-size:18px;font-weight:500;letter-spacing:-.005em;color:var(--ink);margin-bottom:8px}
.sv-root .cf-s{font-size:13.5px;line-height:1.65;color:var(--gray2);margin-bottom:32px}
.sv-root .cf-row{display:grid;grid-template-columns:1fr 1fr;gap:0 24px}
.sv-root .cf-f{margin-bottom:24px}
.sv-root .cf-f label{display:block;font-family:var(--f-mono);font-size:10.5px;font-weight:400;letter-spacing:.06em;text-transform:uppercase;color:var(--gray2);margin-bottom:9px}
.sv-root .cf-f input,.sv-root .cf-f textarea{width:100%;background:transparent;border:none;border-bottom:1px solid var(--border2);border-radius:0;padding:8px 0 10px;font-family:inherit;font-size:14.5px;color:var(--ink);transition:border-color .2s;outline:none}
.sv-root .cf-f input::placeholder,.sv-root .cf-f textarea::placeholder{color:var(--gray2)}
.sv-root .cf-f input:focus,.sv-root .cf-f textarea:focus{border-color:var(--teal)}
.sv-root .cf-f textarea{resize:vertical;min-height:80px;line-height:1.6}
.sv-root .cf-btn{width:auto;display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:13px 30px;background:var(--teal);color:var(--dark);border:none;border-radius:2px;font-family:var(--f-mono);font-size:13px;font-weight:500;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;transition:opacity .25s ease,transform .25s cubic-bezier(.16,1,.3,1);margin-top:10px}
.sv-root .cf-btn:hover{opacity:.86;transform:translateY(-2px)}
.sv-root .cf-btn:active{transform:translateY(0)}
.sv-root .cf-note{font-size:11.5px;color:var(--gray2);text-align:left;margin-top:16px}

.sv-root footer{background:var(--soft);padding:60px clamp(20px,4vw,48px) 40px}
.sv-root .ft-top{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}
.sv-root .ft-br{display:flex;align-items:center;gap:10px;line-height:1;text-decoration:none}
.sv-root .ft-nm{font-family:var(--f-mono);font-size:11.5px;font-weight:400;letter-spacing:2.5px;text-transform:uppercase;color:var(--gray2)}
.sv-root .ft-lk{display:flex;gap:32px;list-style:none;flex-wrap:wrap;margin:0;padding:0}
.sv-root .ft-lk a{font-size:12.5px;color:var(--gray2);text-decoration:none;transition:color .2s}
.sv-root .ft-lk a:hover{color:var(--ink)}
.sv-root .ft-legal{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-top:32px;margin-top:36px;border-top:1px solid var(--line)}
.sv-root .ft-cp{font-size:11.5px;color:var(--gray2);line-height:1.7;max-width:680px}
.sv-root .ft-legal-lk{display:flex;gap:22px;flex-wrap:wrap}
.sv-root .ft-legal-lk a{font-size:11.5px;color:var(--gray2);text-decoration:none;transition:color .2s;white-space:nowrap}
.sv-root .ft-legal-lk a:hover{color:var(--ink)}

.sv-root .fi{opacity:0;transform:translateY(18px) scale(.98);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.sv-root .fi.on{opacity:1;transform:translateY(0) scale(1)}
.sv-root .fi.d1{transition-delay:.08s}.sv-root .fi.d2{transition-delay:.16s}.sv-root .fi.d3{transition-delay:.24s}

@keyframes svHeroIn{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
.sv-root .hero-eyebrow{animation:svHeroIn .7s cubic-bezier(.16,1,.3,1) .05s both}
.sv-root .hero h1{animation:svHeroIn .8s cubic-bezier(.16,1,.3,1) .16s both}
.sv-root .hero .h-sub{animation:svHeroIn .8s cubic-bezier(.16,1,.3,1) .28s both}
.sv-root .h-actions{animation:svHeroIn .8s cubic-bezier(.16,1,.3,1) .4s both}

@media(max-width:1000px){
  .sv-root .nv-links{display:none}
  .sv-root .nv-burger{display:block}
  .sv-root .feat-grid{grid-template-columns:1fr 1fr}
  .sv-root .qs-grid,.sv-root .ct-grid,.sv-root .mg{grid-template-columns:1fr}
  .sv-root .mmap{max-width:460px;margin:0 auto;width:100%}
  .sv-root .hg{grid-template-columns:1fr 1fr}
  .sv-root .stats-grid{grid-template-columns:1fr 1fr}
  .sv-root .stat-cell:nth-child(3){border-left:none}
  .sv-root .ed-row,.sv-root .ed-row.rev{grid-template-columns:1fr}
  .sv-root .ed-row.rev .ed-art{order:1}
  .sv-root .ed-row.rev .ed-txt{order:2}
  .sv-root .ed-art{aspect-ratio:16/9}
}
@media(max-width:600px){
  .sv-root .feat-grid,.sv-root .hg{grid-template-columns:1fr}
  .sv-root .mrow,.sv-root .wrow{grid-template-columns:1fr;gap:8px}
  .sv-root .h-actions{flex-direction:column;gap:18px}
  .sv-root .cf-row{grid-template-columns:1fr}
  .sv-root .nv-right .nv-portal{display:none}
  .sv-root .ft-legal{flex-direction:column;align-items:flex-start;gap:14px}
  .sv-root .stats-grid{grid-template-columns:1fr 1fr}
  .sv-root .stat-cell{border-left:none;border-top:1px solid var(--line)}
  .sv-root .stat-cell:first-child{border-top:none}
}
@media(prefers-reduced-motion:reduce){
  .sv-root *{animation:none!important;transition:none!important}
  .sv-root .fi{opacity:1;transform:none}
}
`;
