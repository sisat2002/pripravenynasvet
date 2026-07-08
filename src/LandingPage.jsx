import React, { useState, useEffect, useRef } from "react";
import "./landing.css";

/* ── Placeholder links — replace when ready ── */
const GUIDE_URL = "#";
const SUPPORT_URL = "#";
const TIKTOK_URL = "#";
const INSTAGRAM_URL = "#";

/* ── Bilingual content ── */
const T = {
  en: {
    nav: { quiz: "Free Quiz", guide: "The Guide", support: "Support" },
    hero: {
      eyebrow: "Study Abroad Resources by Simona Hutkova",
      h1: "Study Abroad Without Guesswork",
      sub: "Free quiz, practical guides and honest advice to help you choose the right country, university and funding plan.",
      cta1: "Get the Study Abroad Guide",
      cta2: "Take the Free Quiz",
      cta3: "Support my Master's journey →",
      trust: "Created by Simona — international business graduate, former student in the Netherlands & future Master's student at ESMT Berlin.",
    },
    product: {
      eyebrow: "Main Product",
      badge: "€15",
      h2: "Study Abroad Guide — Part 1",
      tagline: "Everything I wish I knew before choosing where to study abroad.",
      desc: "This practical workbook helps you decide whether studying abroad is right for you, choose the best country and university for your personality and goals, understand the real costs, break common money myths and build your own funding plan.",
      items: [
        "Decide if studying abroad is actually right for you",
        "Choose the country that fits your personality, budget and goals",
        "Compare universities beyond rankings",
        "Understand tuition, living costs and hidden expenses",
        "Learn about scholarships, grants, student finance and part-time jobs",
        "Use worksheets, checklists and decision frameworks",
      ],
      cta: "Buy the Guide — €15",
      sub: "Instant PDF download. Works on phone, tablet and laptop.",
    },
    quiz: {
      eyebrow: "100% Free",
      h2: "Not sure where you should study?",
      sub: "Take the free Study Abroad Quiz and discover which type of country might fit your personality, goals and lifestyle best.",
      cta: "Take the Free Quiz →",
    },
    fund: {
      eyebrow: "Help Fund My Master's",
      h2: "Help Fund My Dream Master's",
      text: "I was accepted to my dream Master's in Innovation & Entrepreneurship at ESMT Berlin. The tuition is €36,000, and I'm trying to fund it through my own work, digital products and community support.",
      goal: "Goal",
      goalAmount: "€36,000",
      guidePrice: "Guide price: €15",
      funFact: "2,400 guide purchases would fully fund my tuition.",
      cta1: "Buy the Study Abroad Guide",
      cta2: "Support Any Amount",
      closing: "If my content has helped you, buying the guide or sending a small support means more than you know. Every purchase helps me get one step closer while allowing me to keep creating free study abroad content for other students.",
    },
    support: {
      eyebrow: "Support Options",
      h2: "Choose how you want to help",
      cards: [
        { emoji: "📘", title: "Buy the Guide", desc: "Get the full Study Abroad Guide and support my Master's at the same time.", cta: "Buy for €15", href: GUIDE_URL, highlight: true },
        { emoji: "☕", title: "Buy Me a Coffee", desc: "Want to support without buying the guide? Even a small amount helps.", cta: "Support €5", href: SUPPORT_URL, highlight: false },
        { emoji: "🎓", title: "Support My Master's", desc: "Contribute any amount towards my ESMT Berlin tuition.", cta: "Support Any Amount", href: SUPPORT_URL, highlight: false },
      ],
    },
    about: {
      eyebrow: "About",
      h2: "Hi, I'm Simona",
      text: "I studied abroad in the Netherlands and it completely changed my life. But when I was applying, I had no idea where to start, how to choose the right country, whether I could afford it or what I should look out for. I created these resources because they are exactly what I wish I had before making one of the biggest decisions of my life.",
      creds: [
        "Studied International Business abroad — Netherlands (Honours)",
        "Lived and worked across Europe, UK, Middle East and Australia",
        "Accepted to ESMT Berlin Master's in Innovation & Entrepreneurship",
        "Creating practical study abroad resources for future international students",
      ],
    },
    mission: {
      eyebrow: "My Mission",
      h2: "My mission",
      text: "I want to make studying abroad feel less confusing, less intimidating and more accessible — especially for students who don't come from wealthy families and don't know where to start.",
      quote: "Studying abroad shouldn't feel like guessing. It should feel like making one of the most informed decisions of your life.",
    },
    gallery: {
      eyebrow: "Moments",
      h2: "From Slovakia to the world.",
      photos: [
        { file: "photo_hero.jpeg", caption: "Groningen, Netherlands" },
        { file: "photo_stage_saudi.jpeg", caption: "Riyadh, Saudi Arabia" },
        { file: "photo_startupbootcamp.jpeg", caption: "Startupbootcamp FutureXPO" },
        { file: "photo_naples.jpeg", caption: "Naples, Italy" },
        { file: "photo_warm.jpeg", caption: "Somewhere beautiful" },
        { file: "photo_fraunhofer.jpeg", caption: "Munich, Germany" },
        { file: "photo_award.jpeg", caption: "Focus Open 2025 — International Design Award" },
        { file: "photo_egypt.jpeg", caption: "Cairo, Egypt" },
      ],
    },
    testimonials: {
      eyebrow: "Student Stories",
      h2: "What students say.",
      cards: [
        { text: "Finally something that told me the truth. Not every country is for everyone and this guide helped me figure out which one is for me.", name: "Lucia K.", loc: "Slovakia", emoji: "🇸🇰" },
        { text: "I appreciate that it's not just motivational talk. There are concrete steps, websites, templates. This is what I needed.", name: "Jakub V.", loc: "Czech Republic", emoji: "🇨🇿" },
        { text: "Thanks to this guide I found out that the Netherlands is exactly right for me. I applied, got in, and I'm finishing my first semester - I couldn't be happier or recommend this more.", name: "Ondřej S.", loc: "Czech Republic", emoji: "🇨🇿" },
        { text: "Genuinely the most honest thing I've read about studying abroad. No fluff, just real advice.", name: "James W.", loc: "United Kingdom", emoji: "🇬🇧" },
        { text: "The accommodation chapter alone was worth it. I had no idea what to watch out for.", name: "Sophie B.", loc: "United Kingdom", emoji: "🇬🇧" },
        { text: "I took the quiz not expecting much. Ended up applying to the Netherlands three weeks later.", name: "Oliver T.", loc: "Croatia", emoji: "🇭🇷" },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      h2: "Frequently asked questions",
      items: [
        { q: "Is the Study Abroad Guide only for people who already know where they want to study?", a: "No. It is especially useful if you are still deciding whether to study abroad, which country fits you best, which university to choose and how to finance it." },
        { q: "Is this only for Bachelor's students?", a: "No. The frameworks are useful for Bachelor's and Master's applicants." },
        { q: "What do I get after buying?", a: "You get an instant PDF download of the Study Abroad Guide." },
        { q: "Can I support you without buying the guide?", a: "Yes. Use the 'Support Any Amount' option to contribute any amount towards my Master's journey." },
        { q: "Why did you create this?", a: "Because I spent hundreds of hours researching before studying abroad and wished someone had put everything into one clear, practical roadmap." },
        { q: "How early should I start planning?", a: "Earlier than you think. Most students start too late and miss deadlines. Ideally 12 months before you want to move - but even 6 months is enough if you act fast. The guide includes a full 12-month action plan." },
        { q: "Is this guide useful if I want to do Erasmus?", a: "Yes. Whether you're doing a full degree or an Erasmus semester, most of what's in this guide will help you — country selection, budget planning, accommodation, and all the bonus checklists." },
      ],
    },
    finalCta: {
      h2: "Ready to plan your study abroad journey?",
      cta1: "Buy the Guide",
      cta2: "Take the Free Quiz",
      cta3: "Support My Master's",
    },
    footer: {
      copy: "© 2025 Simona Hutkova. All rights reserved.",
      links: [
        { label: "TikTok", href: TIKTOK_URL },
        { label: "Instagram", href: INSTAGRAM_URL },
        { label: "Email", href: "mailto:sisat2002@gmail.com" },
      ],
    },
  },
  sk: {
    nav: { quiz: "Bezplatný kvíz", guide: "Sprievodca", support: "Podpora" },
    hero: {
      eyebrow: "Zdroje pre štúdium v zahraničí od Simony Hutkovej",
      h1: "Štúdium v zahraničí bez dohadovania",
      sub: "Bezplatný kvíz, praktické sprievodcovia a úprimné rady, ktoré ti pomôžu vybrať správnu krajinu, univerzitu a plán financovania.",
      cta1: "Získaj sprievodcu štúdiom v zahraničí",
      cta2: "Spusti bezplatný kvíz",
      cta3: "Podpor moje magisterské štúdium →",
      trust: "Vytvorila Simona — absolventka medzinárodného podnikania, bývalá študentka v Holandsku a budúca magistra na ESMT Berlin.",
    },
    product: {
      eyebrow: "Hlavný produkt",
      badge: "€15",
      h2: "Sprievodca štúdiom v zahraničí — Časť 1",
      tagline: "Všetko, čo by som chcela vedieť predtým, než som si vybrala, kde budem študovať.",
      desc: "Tento praktický pracovný zošit ti pomôže rozhodnúť sa, či je štúdium v zahraničí pre teba, vybrať najlepšiu krajinu a univerzitu pre tvoju osobnosť a ciele, pochopiť reálne náklady, vyvrátiť bežné mýty o peniazoch a zostaviť vlastný plán financovania.",
      items: [
        "Rozhodni sa, či je štúdium v zahraničí skutočne pre teba",
        "Vyber krajinu, ktorá sedí tvojej osobnosti, rozpočtu a cieľom",
        "Porovnaj univerzity mimo rebríčkov",
        "Pochop školné, životné náklady a skryté výdavky",
        "Zisti o štipendiách, grantoch, študentských financiách a práci popri štúdiu",
        "Využi pracovné listy, kontrolné zoznamy a rozhodovacie rámce",
      ],
      cta: "Kúp sprievodcu — €15",
      sub: "Okamžité stiahnutie PDF. Funguje na telefóne, tablete aj laptope.",
    },
    quiz: {
      eyebrow: "100% Zadarmo",
      h2: "Nie si si istý/á kde by si mal/a študovať?",
      sub: "Spusti bezplatný kvíz a zisti, ktorý typ krajiny by mohol najlepšie sedieť tvojej osobnosti, cieľom a životnému štýlu.",
      cta: "Spusti bezplatný kvíz →",
    },
    fund: {
      eyebrow: "Podpor moje magisterské štúdium",
      h2: "Pomôž financovať môj vysnívaný magistra",
      text: "Bola som prijatá na vysnívaný magisterský program v oblasti inovácií a podnikania na ESMT Berlin. Školné je €36 000 a snažím sa ho financovať vlastnou prácou, digitálnymi produktmi a podporou komunity.",
      goal: "Cieľ",
      goalAmount: "€36 000",
      guidePrice: "Cena sprievodcu: €15",
      funFact: "2 400 predaných sprievodcov by úplne pokrylo moje školné.",
      cta1: "Kúp sprievodcu štúdiom v zahraničí",
      cta2: "Podpor ľubovoľnou sumou",
      closing: "Ak ti môj obsah pomohol, kúpa sprievodcu alebo malá podpora znamená viac, ako vieš. Každý nákup mi pomáha priblížiť sa k cieľu a zároveň mi umožňuje ďalej tvoriť bezplatný obsah o štúdiu v zahraničí pre ostatných študentov.",
    },
    support: {
      eyebrow: "Možnosti podpory",
      h2: "Vyber, ako chceš pomôcť",
      cards: [
        { emoji: "📘", title: "Kúp sprievodcu", desc: "Získaj kompletného sprievodcu štúdiom v zahraničí a zároveň podpor moje magisterské štúdium.", cta: "Kúp za €15", href: GUIDE_URL, highlight: true },
        { emoji: "☕", title: "Kúp mi kávu", desc: "Chceš podporiť bez kúpy sprievodcu? Aj malá suma pomáha.", cta: "Podpor €5", href: SUPPORT_URL, highlight: false },
        { emoji: "🎓", title: "Podpor moje štúdium", desc: "Prispej ľubovoľnou sumou na moje školné na ESMT Berlin.", cta: "Podpor ľubovoľnou sumou", href: SUPPORT_URL, highlight: false },
      ],
    },
    about: {
      eyebrow: "O mne",
      h2: "Ahoj, som Simona",
      text: "Študovala som v zahraničí v Holandsku a úplne to zmenilo môj život. Ale keď som sa prihlasovala, nemala som ani potuchy, kde začať, ako si vybrať správnu krajinu, či si to môžem dovoliť alebo na čo si dať pozor. Vytvorila som tieto zdroje, pretože sú presne to, čo som si pred jedným z najväčších rozhodnutí môjho života priala mať.",
      creds: [
        "Absolventka medzinárodného podnikania v zahraničí — Holandsko (Honours)",
        "Žila a pracovala v Európe, Spojenom kráľovstve, na Strednom východe a v Austrálii",
        "Prijatá na magisterský program inovácií a podnikania na ESMT Berlin",
        "Tvorí praktické zdroje o štúdiu v zahraničí pre budúcich medzinárodných študentov",
      ],
    },
    mission: {
      eyebrow: "Moje poslanie",
      h2: "Moje poslanie",
      text: "Chcem, aby sa štúdium v zahraničí zdalo menej mätúce, menej zastrašujúce a dostupnejšie — najmä pre študentov, ktorí nepochádzajú z bohatých rodín a nevedia, kde začať.",
      quote: "Štúdium v zahraničí by nemalo byť o dohadovaní. Malo by byť o jednom z najlepšie informovaných rozhodnutí tvojho života.",
    },
    gallery: {
      eyebrow: "Momenty",
      h2: "Zo Slovenska do sveta.",
      photos: [
        { file: "photo_hero.jpeg", caption: "Groningen, Holandsko" },
        { file: "photo_stage_saudi.jpeg", caption: "Rijád, Saudská Arábia" },
        { file: "photo_startupbootcamp.jpeg", caption: "Startupbootcamp FutureXPO" },
        { file: "photo_naples.jpeg", caption: "Neapol, Taliansko" },
        { file: "photo_warm.jpeg", caption: "Niekde krásnom" },
        { file: "photo_fraunhofer.jpeg", caption: "Mníchov, Nemecko" },
        { file: "photo_award.jpeg", caption: "Focus Open 2025 — Medzinárodná cena za dizajn" },
        { file: "photo_egypt.jpeg", caption: "Káhira, Egypt" },
      ],
    },
    testimonials: {
      eyebrow: "Príbehy študentov",
      h2: "Čo hovoria študenti.",
      cards: [
        { text: "Konečne niečo, čo mi povedalo pravdu. Nie každá krajina je pre každého a táto príručka mi pomohla zistiť, ktorá je pre mňa.", name: "Lucia K.", loc: "Slovensko", emoji: "🇸🇰" },
        { text: "Oceňuji, že to není jen motivační řeči. Jsou tam konkrétní kroky, weby, šablony. Tohle jsem potřeboval.", name: "Jakub V.", loc: "Česká republika", emoji: "🇨🇿" },
        { text: "Díky téhle příručce jsem zjistil, že Nizozemsko je přesně pro mě. Přihlásil jsem se a dostal se a teraz končím první pololetí - nemůžu být šťastnější a víc tuto příručku doporučovat.", name: "Ondřej S.", loc: "Česká republika", emoji: "🇨🇿" },
        { text: "Úprimne najúprimnejšia vec, ktorú som čítal o štúdiu v zahraničí. Žiadne prázdne slová, len reálne rady.", name: "James W.", loc: "Spojené kráľovstvo", emoji: "🇬🇧" },
        { text: "Kapitola o ubytovaní samotná za to stála. Nemal som potuchy, na čo si dávať pozor.", name: "Sophie B.", loc: "Spojené kráľovstvo", emoji: "🇬🇧" },
        { text: "Spustil som kvíz bez veľkých očakávaní. O tri týždne som podával prihlášku do Holandska.", name: "Oliver T.", loc: "Chorvátsko", emoji: "🇭🇷" },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      h2: "Často kladené otázky",
      items: [
        { q: "Je sprievodca len pre ľudí, ktorí už vedia, kde chcú študovať?", a: "Nie. Je obzvlášť užitočný, ak sa ešte rozhoduješ, či vôbec ísť do zahraničia, ktorá krajina ti sedí, ktorú univerzitu si vybrať a ako to financovať." },
        { q: "Je to len pre bakalárskych študentov?", a: "Nie. Rámce sú užitočné pre uchádzačov o bakalárske aj magisterské štúdium." },
        { q: "Čo dostanem po kúpe?", a: "Dostaneš okamžité stiahnutie PDF sprievodcu." },
        { q: "Môžem ťa podporiť bez kúpy sprievodcu?", a: "Áno. Použij možnosť 'Podpor ľubovoľnou sumou' a prispej na moje magisterské štúdium." },
        { q: "Prečo si to vytvorila?", a: "Pretože som pred štúdiom v zahraničí strávila stovky hodín výskumom a priala som si, aby niekto dal všetko do jedného jasného, praktického plánu." },
        { q: "Kedy by som mal/a začať plánovať?", a: "Skôr, ako si myslíš. Väčšina študentov začína neskoro a nestíha deadliny. Ideálne 12 mesiacov pred odchodom - ale aj 6 mesiacov stačí, ak konáš rýchlo. Sprievodca obsahuje kompletný 12-mesačný akčný plán." },
        { q: "Je sprievodca užitočný aj pre Erasmus?", a: "Áno. Či robíš celý titul v zahraničí alebo len semester cez Erasmus, väčšina obsahu ti pomôže — výber krajiny, plánovanie rozpočtu, ubytovanie a všetky bonusové kontrolné zoznamy." },
      ],
    },
    finalCta: {
      h2: "Pripravený/á plánovať štúdium v zahraničí?",
      cta1: "Kúp sprievodcu",
      cta2: "Spusti bezplatný kvíz",
      cta3: "Podpor moje štúdium",
    },
    footer: {
      copy: "© 2025 Simona Hutkova. Všetky práva vyhradené.",
      links: [
        { label: "TikTok", href: TIKTOK_URL },
        { label: "Instagram", href: INSTAGRAM_URL },
        { label: "Email", href: "mailto:sisat2002@gmail.com" },
      ],
    },
  },
};

/* ── Scroll animation ── */
function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
function FadeUp({ children, className = "", delay = "" }) {
  const ref = useFadeUp();
  return <div ref={ref} className={`fade-up ${delay} ${className}`}>{children}</div>;
}

/* ── Photo helper ── */
function Photo({ src, alt, className }) {
  const [err, setErr] = useState(false);
  if (err || !src) return <div className={`${className}-placeholder`} />;
  return <img src={`/${src}`} alt={alt} className={className} onError={() => setErr(true)} />;
}

/* ── FAQ Item ── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen(!open)}>
        {q}<span className="faq-icon">+</span>
      </button>
      <div className="faq-a">{a}</div>
    </div>
  );
}

export default function LandingPage() {
  const [lang, setLang] = useState("en");
  const t = T[lang];

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="container nav-inner">
          <a href="/" className="nav-logo">Simona Hutkova</a>
          <div className="nav-links">
            <a href="#quiz" className="nav-link">{t.nav.quiz}</a>
            <a href="#guide" className="nav-link">{t.nav.guide}</a>
            <a href="#support" className="nav-link">{t.nav.support}</a>
          </div>
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
            <button className={`lang-btn ${lang === "sk" ? "active" : ""}`} onClick={() => setLang("sk")}>SK</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-text">
              <FadeUp>
                <div className="eyebrow">✦ {t.hero.eyebrow}</div>
              </FadeUp>
              <FadeUp delay="delay-1">
                <h1 className="hero-h1">{t.hero.h1}</h1>
              </FadeUp>
              <FadeUp delay="delay-2">
                <p className="hero-sub">{t.hero.sub}</p>
              </FadeUp>
            </div>
            <FadeUp delay="delay-1" className="hero-photo-wrap">
              <Photo src="photo_hero.jpeg" alt="Simona Hutkova" className="hero-photo" />
            </FadeUp>
            <FadeUp delay="delay-3" className="hero-ctas-wrap">
              <div className="hero-ctas">
                <a href={GUIDE_URL} className="btn-primary">{t.hero.cta1}</a>
                <a href="/quiz" className="btn-secondary">{t.hero.cta2}</a>
                <a href="#support" className="hero-support-link">{t.hero.cta3}</a>
              </div>
              <p className="hero-trust">✦ {t.hero.trust}</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── PRODUCT ── */}
      <section className="section" id="guide">
        <div className="container">
          <FadeUp>
            <div className="eyebrow">{t.product.eyebrow}</div>
            <div className="product-card">
              <div className="product-mockup">
                <div className="mockup-book">
                  <div className="mockup-spine" />
                  <div className="mockup-content">
                    <div className="mockup-tag">Study Abroad</div>
                    <div className="mockup-title">The Study Abroad Guide</div>
                    <div className="mockup-author">by Simona Hutkova</div>
                    <div className="mockup-bar" />
                  </div>
                </div>
              </div>
              <div className="product-body">
                <div className="product-badge">⭐ {t.product.badge}</div>
                <h2 className="section-h2">{t.product.h2}</h2>
                <p className="product-tagline">{t.product.tagline}</p>
                <p className="product-desc">{t.product.desc}</p>
                <ul className="checklist">
                  {t.product.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <a href={GUIDE_URL} className="btn-primary product-cta">{t.product.cta}</a>
                <p className="product-sub">{t.product.sub}</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── QUIZ ── */}
      <section className="section section-alt" id="quiz">
        <div className="container">
          <FadeUp>
            <div className="quiz-card">
              <div className="quiz-text">
                <div className="eyebrow">{t.quiz.eyebrow}</div>
                <h2 className="section-h2">{t.quiz.h2}</h2>
                <p className="section-sub">{t.quiz.sub}</p>
                <a href="/quiz" className="btn-gold">{t.quiz.cta}</a>
              </div>
              <div className="quiz-visual">
                <div className="quiz-emoji">🌍</div>
                <div className="quiz-visual-label">Study Abroad Quiz</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FUND MY MASTER'S ── */}
      <section className="section fund-section" id="support">
        <div className="container">
          <FadeUp>
            <div className="eyebrow eyebrow-light">{t.fund.eyebrow}</div>
            <h2 className="section-h2 light">{t.fund.h2}</h2>
            <p className="fund-text">{t.fund.text}</p>
            <div className="fund-stats">
              <div className="fund-stat">
                <div className="fund-stat-label">{t.fund.goal}</div>
                <div className="fund-stat-value">{t.fund.goalAmount}</div>
              </div>
              <div className="fund-divider" />
              <div className="fund-stat">
                <div className="fund-stat-label">{t.fund.guidePrice}</div>
                <div className="fund-stat-value fund-fact">"{t.fund.funFact}"</div>
              </div>
            </div>
            <div className="fund-ctas">
              <a href={GUIDE_URL} className="btn-primary">{t.fund.cta1}</a>
              <a href={SUPPORT_URL} className="btn-outline-light">{t.fund.cta2}</a>
            </div>
            <p className="fund-closing">{t.fund.closing}</p>
          </FadeUp>
        </div>
      </section>

      {/* ── SUPPORT OPTIONS ── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <div className="eyebrow">{t.support.eyebrow}</div>
            <h2 className="section-h2">{t.support.h2}</h2>
          </FadeUp>
          <div className="support-grid">
            {t.support.cards.map((card, i) => (
              <FadeUp key={i} delay={`delay-${i + 1}`}>
                <div className={`support-card ${card.highlight ? "highlight" : ""}`}>
                  <div className="support-emoji">{card.emoji}</div>
                  <div className="support-title">{card.title}</div>
                  <p className="support-desc">{card.desc}</p>
                  <a href={card.href} className={card.highlight ? "btn-primary" : "btn-gold"}>{card.cta}</a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="about-inner">
            <FadeUp className="about-photo-wrap">
              <Photo src="photo_extra.jpeg" alt="Simona" className="about-photo" />
            </FadeUp>
            <div className="about-text">
              <FadeUp>
                <div className="eyebrow">{t.about.eyebrow}</div>
                <h2 className="section-h2">{t.about.h2}</h2>
              </FadeUp>
              <FadeUp delay="delay-1">
                <p className="about-p">{t.about.text}</p>
              </FadeUp>
              <FadeUp delay="delay-2">
                <ul className="cred-list">
                  {t.about.creds.map((c, i) => (
                    <li key={i}><span className="cred-check">✔</span>{c}</li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="section mission-section">
        <div className="container">
          <FadeUp>
            <div className="eyebrow eyebrow-light">{t.mission.eyebrow}</div>
            <h2 className="section-h2 light">{t.mission.h2}</h2>
            <p className="mission-text">{t.mission.text}</p>
            <blockquote className="mission-quote">"{t.mission.quote}"</blockquote>
          </FadeUp>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section section-alt">
        <div className="container">
          <FadeUp>
            <div className="eyebrow">{t.gallery.eyebrow}</div>
            <h2 className="section-h2" style={{ marginBottom: 40 }}>{t.gallery.h2}</h2>
          </FadeUp>
          <FadeUp delay="delay-1">
            <div className="gallery-grid">
              {t.gallery.photos.map((photo, i) => (
                <div key={i} className="gallery-item">
                  <Photo src={photo.file} alt={photo.caption} className="gallery-img" />
                  <div className="gallery-caption">{photo.caption}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <div className="eyebrow">{t.testimonials.eyebrow}</div>
            <h2 className="section-h2" style={{ marginBottom: 40 }}>{t.testimonials.h2}</h2>
          </FadeUp>
          <div className="testimonials-grid">
            {t.testimonials.cards.map((card, i) => (
              <FadeUp key={i} delay={`delay-${(i % 3) + 1}`}>
                <div className="testimonial-card">
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-text">"{card.text}"</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{card.emoji}</div>
                    <div>
                      <div className="testimonial-name">{card.name}</div>
                      <div className="testimonial-loc">{card.loc}</div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section section-alt">
        <div className="container">
          <FadeUp>
            <div className="eyebrow">{t.faq.eyebrow}</div>
            <h2 className="section-h2" style={{ marginBottom: 40 }}>{t.faq.h2}</h2>
          </FadeUp>
          <FadeUp delay="delay-1">
            <div className="faq-list">
              {t.faq.items.map((item, i) => (
                <FaqItem key={`${lang}-${i}`} q={item.q} a={item.a} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section final-cta-section">
        <div className="container">
          <FadeUp>
            <h2 className="section-h2 light">{t.finalCta.h2}</h2>
            <div className="final-ctas">
              <a href={GUIDE_URL} className="btn-primary">{t.finalCta.cta1}</a>
              <a href="/quiz" className="btn-outline-light">{t.finalCta.cta2}</a>
              <a href={SUPPORT_URL} className="btn-outline-light">{t.finalCta.cta3}</a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-name">Simona Hutkova</div>
            <div className="footer-copy">{t.footer.copy}</div>
          </div>
          <div className="footer-links">
            {t.footer.links.map((l, i) => (
              <a key={i} href={l.href} className="footer-link">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
