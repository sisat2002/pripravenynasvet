import React, { useState, useEffect, useRef } from "react";
import "./landing.css";

/* ── Bilingual content ── */
const T = {
  en: {
    nav: { quiz: "Free Quiz", guide: "The Guide" },
    hero: {
      eyebrow: "Study Abroad Guide",
      h1: "Study Abroad Starts Here.",
      sub: "I left Slovakia at 18 with no rich family background and no guarantee it would work out. I just knew I needed more than what was available to me at home. Now I help students make this decision with confidence — not confusion.",
      cta1: "🎓 Take the FREE Quiz",
      cta2: "📘 Get The Guide — €14.99",
    },
    trust: [
      "International Business graduate — Netherlands (Honours)",
      "Studied & worked across Europe, UK, Middle East, Australia",
      "Presented at international conferences on 3 continents",
      "Helped students navigate studying abroad",
    ],
    product: {
      label: "Most Popular",
      badge: "€14.99",
      h2: "The Study Abroad Guide",
      tagline: "Everything you wish someone had told you before you applied.",
      desc: "A complete step-by-step guide for students who want to study abroad but don't know where to start. Written from real experience — not from the internet.",
      items: [
        "Is studying abroad actually right for you?",
        "How to choose the right country (and avoid the #1 mistake)",
        "How to choose the right university and degree",
        "Real costs — tuition, living, hidden expenses",
        "Scholarships, student finance, working while studying",
        "Finding accommodation and avoiding scams",
        "Everything to do before you leave",
        "Surviving your first week abroad",
        "Making real friends (even as an introvert)",
        "The emotional side nobody talks about",
      ],
      bonusLabel: "Bonus resources included:",
      bonus: "Country Comparison Worksheet · Budget Planner · Scholarship Tracker · Accommodation Tracker · Motivation Letter Template · CV Template · Packing Checklist · Email Templates · 12-month Action Plan",
      cta: "Get The Study Abroad Guide →",
    },
    message: {
      line: 'There is no best country. There is only the best country for <em>YOU</em>.',
    },
    quiz: {
      label: "Free Quiz",
      h2: "Not sure if studying abroad is right for you?",
      sub: "Take my free quiz to find out:",
      bullets: [
        "Whether studying abroad fits your personality",
        "Which countries might suit you best",
        "What your biggest strengths and concerns are",
        "Where to start next",
      ],
      cta: "Start the Free Quiz →",
    },
    story: {
      label: "My Story",
      h2: "Hi, I'm Simona.",
      paragraphs: [
        "I grew up in Martin, Slovakia. I was always very shy. I had very low self-esteem. I didn't come from a wealthy family. My English was very bad.",
        "But I knew — I needed more than what I could see ahead of me in Slovakia.",
        "So at 18, I made a decision that changed everything.",
        "I spent weeks researching countries based on what actually mattered to me: affordability, student grants, safety, opportunities, international environment, and the potential to grow. I landed on the Netherlands — specifically Groningen — and the moment I arrived, it felt like home.",
        "I went on to complete a four-year Bachelor's degree in International Business (Honours Programme) at Hanze University of Applied Sciences. But studying was only part of it.",
        "From the very beginning, I said yes to every opportunity I could find.",
        "In my second year, I competed in the NIBS Case Study Competition in Ireland — as one of the only Bachelor's students in a room full of Master's candidates. I was the youngest. I had no idea what I was doing. I went anyway.",
        "I arranged my own internship in Australia — another continent, another leap.",
        "I worked with Fraunhofer IDMT, Europe's largest applied research institute, on an advanced AI-powered medical device to detect post-operative ileus — cutting-edge technology at the intersection of medicine and machine learning.",
        "I co-founded my own startup — GraphenePioneer — and flew to Saudi Arabia to pitch in front of hundreds of investors. I was 22. Every other person in that room was an experienced professional in their 50s. I was the only young woman. I presented anyway.",
        "I went to Egypt for high-level meetings with industry leaders and government ministries.",
        "I'm now heading to Berlin to study a Master's in Innovation and Entrepreneurship at ESMT Berlin — one of Europe's top business schools.",
        "None of this was planned. All of it started with one decision at 18.",
      ],
      closing: "I don't share this to impress you. I share it because I want you to see what's possible when you just go.",
    },
    gallery: {
      label: "Moments",
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
    resources: {
      label: "Resources",
      h2: "More Resources",
      cards: [
        { title: "The Study Abroad Guide", desc: "The complete step-by-step guide. Everything you need from decision to first week abroad.", badge: "available", badgeText: "Available now" },
        { title: "Country Comparison Pack", desc: "Compare top study abroad destinations side by side.", badge: "soon", badgeText: "Coming Soon" },
        { title: "Application Toolkit", desc: "Templates, checklists and timelines for your university applications.", badge: "soon", badgeText: "Coming Soon" },
      ],
    },
    testimonials: {
      label: "Student Stories",
      h2: "What students say.",
      cards: [
        { text: "Finally something that told me the truth. Not every country is for everyone and this guide helped me figure out which one is for me.", name: "Lucia K.", loc: "Slovakia", emoji: "🇸🇰" },
        { text: "I appreciate that it's not just motivational talk. There are concrete steps, websites, templates. This is what I needed.", name: "Jakub V.", loc: "Czech Republic", emoji: "🇨🇿" },
        { text: "Thanks to this guide I found out that the Netherlands is exactly right for me. I applied, got in, and I'm finishing my first semester — I couldn't be happier or recommend this more.", name: "Ondřej S.", loc: "Czech Republic", emoji: "🇨🇿" },
        { text: "Genuinely the most honest thing I've read about studying abroad. No fluff, just real advice.", name: "James W.", loc: "United Kingdom", emoji: "🇬🇧" },
        { text: "The accommodation chapter alone was worth it. I had no idea what to watch out for.", name: "Sophie B.", loc: "Arizona", emoji: "🇺🇸" },
        { text: "I took the quiz not expecting much. Ended up applying to the Netherlands three weeks later.", name: "Oliver T.", loc: "Croatia", emoji: "🇭🇷" },
      ],
    },
    faq: {
      label: "FAQ",
      h2: "Frequently asked questions.",
      items: [
        { q: "Who is this for?", a: "Anyone aged 16–25 who is thinking about studying abroad but doesn't know where to start." },
        { q: "Is the quiz really free?", a: "Yes. Completely free. No credit card needed." },
        { q: "Who should buy The Study Abroad Guide?", a: "Anyone who wants a clear, practical, honest guide written by someone who has been through the entire process." },
        { q: "Can high school students use this?", a: "Yes — this is actually the ideal time to start planning." },
        { q: "Can university students use this?", a: "Yes — especially if you're thinking about a Master's abroad or transferring." },
        { q: "Is the guide available in Slovak?", a: "Yes — the guide is available in both English and Slovak." },
      ],
    },
    email: {
      label: "Stay connected",
      h2: "Stay in the loop.",
      sub: "Practical study abroad tips, resources and updates — straight to your inbox.",
      placeholder: "your@email.com",
      cta: "Subscribe →",
      confirm: "✓ You're in! Check your inbox.",
    },
    footer: {
      copy: "© 2025 Simona Hutkova. All rights reserved.",
      links: [
        { label: "TikTok", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Email", href: "mailto:sisat2002@gmail.com" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
  },
  sk: {
    nav: { quiz: "Bezplatný kvíz", guide: "Sprievodca" },
    hero: {
      eyebrow: "Sprievodkyňa štúdiom v zahraničí",
      h1: "Štúdium v zahraničí začína tu.",
      sub: "Odišla som zo Slovenska v 18 rokoch bez bohatej rodiny a bez záruky, že to vyjde. Len som vedela, že potrebujem viac, ako mi bolo k dispozícii doma. Teraz pomáham študentom urobiť toto rozhodnutie s istotou — nie zmätkom.",
      cta1: "🎓 Spusti bezplatný kvíz",
      cta2: "📘 Získaj sprievodcu — €14.99",
    },
    trust: [
      "Absolventka International Business — Holandsko (Honours)",
      "Študovala a pracovala v Európe, Spojenom kráľovstve, na Strednom východe a v Austrálii",
      "Prezentovala na medzinárodných konferenciách na 3 kontinentoch",
      "Pomáhala študentom zorientovať sa v štúdiu v zahraničí",
    ],
    product: {
      label: "Najobľúbenejšie",
      badge: "€14.99",
      h2: "Sprievodca štúdiom v zahraničí",
      tagline: "Všetko, čo by ti niekto mal povedať ešte predtým, než sa prihlásiš.",
      desc: "Kompletný sprievodca krok za krokom pre študentov, ktorí chcú študovať v zahraničí, ale nevedia, kde začať. Napísaný zo skutočnej skúsenosti — nie z internetu.",
      items: [
        "Je štúdium v zahraničí skutočne pre teba?",
        "Ako si vybrať správnu krajinu (a vyhnúť sa chybe č. 1)",
        "Ako si vybrať správnu univerzitu a odbor",
        "Reálne náklady — školné, životné náklady, skryté výdavky",
        "Štipendiá, študentské financie, práca popri štúdiu",
        "Hľadanie ubytovania a ako sa vyhnúť podvodom",
        "Všetko, čo treba urobiť pred odchodom",
        "Ako prežiť prvý týždeň v zahraničí",
        "Ako si nájsť skutočných priateľov (aj ako introvert)",
        "Emocionálna stránka, o ktorej nikto nehovorí",
      ],
      bonusLabel: "Bonus materiály v cene:",
      bonus: "Porovnanie krajín · Plánovač rozpočtu · Sledovač štipendií · Sledovač ubytovania · Šablóna motivačného listu · Šablóna CV · Zoznam vecí na balenie · Emailové šablóny · 12-mesačný akčný plán",
      cta: "Získaj sprievodcu →",
    },
    message: {
      line: 'Neexistuje najlepšia krajina. Existuje iba najlepšia krajina pre <em>TEBA</em>.',
    },
    quiz: {
      label: "Bezplatný kvíz",
      h2: "Nie si si istý/á, či je štúdium v zahraničí pre teba?",
      sub: "Spusti môj bezplatný kvíz a zisti:",
      bullets: [
        "Či štúdium v zahraničí sedí tvojej osobnosti",
        "Ktoré krajiny by ti mohli vyhovovať najviac",
        "Aké sú tvoje silné stránky a obavy",
        "Kde začať ako prvý krok",
      ],
      cta: "Spusti bezplatný kvíz →",
    },
    story: {
      label: "Môj príbeh",
      h2: "Ahoj, som Simona.",
      paragraphs: [
        "Vyrastala som v Martine na Slovensku. Vždy som bola veľmi plachá. Mala som veľmi nízke sebavedomie. Nepochádzam z bohatej rodiny. Moja angličtina bola veľmi zlá.",
        "Ale vedela som — potrebujem viac, ako som mohla vidieť pred sebou na Slovensku.",
        "Tak som v 18 rokoch urobila rozhodnutie, ktoré zmenilo všetko.",
        "Strávila som týždne výskumom krajín podľa toho, na čom mi skutočne záležalo: dostupnosť, študentské granty, bezpečnosť, príležitosti, medzinárodné prostredie a potenciál rastu. Skončila som pri Holandsku — konkrétne Groningene — a keď som tam prišla, cítila som sa ako doma.",
        "Dokončila som štyri roky bakalárskeho štúdia International Business (Honours Programme) na Hanze University of Applied Sciences. Ale štúdium bolo len časť toho.",
        "Od samého začiatku som hovorila áno každej príležitosti, ktorú som našla.",
        "V druhom ročníku som súťažila na NIBS Case Study Competition v Írsku — ako jedna z mála bakalárskych študentiek v miestnosti plnej magisterských kandidátov. Bola som najmladšia. Nemala som tušenie, čo robím. Išla som aj tak.",
        "Zariadila som si vlastnú stáž v Austrálii — ďalší kontinent, ďalší skok.",
        "Pracovala som s Fraunhofer IDMT, najväčším európskym aplikovaným výskumným inštitútom, na vývoji pokročilého zdravotníckeho zariadenia s umelou inteligenciou na detekciu pooperatívneho ileu — technológia na hranici medicíny a strojového učenia.",
        "Spoluzaložila som vlastný startup — GraphenePioneer — a odletela som do Saudskej Arábie, kde som prezentovala pred stovkami investorov. Mala som 22 rokov. Každý v tej miestnosti bol skúsený profesionál po päťdesiatke. Bola som jediná mladá žena. Prezentovala som aj tak.",
        "Zúčastnila som sa rokovaní na vysokej úrovni s lídrami priemyslu a ministerstvami v Egypte.",
        "Teraz mirim do Berlína študovať magisterský program v oblasti inovácií a podnikania na ESMT Berlin — jednej z najlepších obchodných škôl v Európe.",
        "Nič z toho nebolo naplánované. Všetko začalo jedným rozhodnutím v 18 rokoch.",
      ],
      closing: "Nezdieľam to, aby som ťa ohromila. Zdieľam to, pretože chcem, aby si videl/a, čo je možné, keď jednoducho ideš.",
    },
    gallery: {
      label: "Momenty",
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
    resources: {
      label: "Materiály",
      h2: "Viac materiálov",
      cards: [
        { title: "Sprievodca štúdiom v zahraničí", desc: "Kompletný sprievodca krok za krokom. Všetko, čo potrebuješ od rozhodnutia po prvý týždeň v zahraničí.", badge: "available", badgeText: "Dostupné teraz" },
        { title: "Porovnanie krajín", desc: "Porovnaj top destinácie štúdia v zahraničí vedľa seba.", badge: "soon", badgeText: "Čoskoro" },
        { title: "Súbor pre prihlášky", desc: "Šablóny, zoznamy a časové harmonogramy pre prihlášky na univerzitu.", badge: "soon", badgeText: "Čoskoro" },
      ],
    },
    testimonials: {
      label: "Príbehy študentov",
      h2: "Čo hovoria študenti.",
      cards: [
        { text: "Konečne niečo, čo mi povedalo pravdu. Nie každá krajina je pre každého a táto príručka mi pomohla zistiť, ktorá je pre mňa.", name: "Lucia K.", loc: "Slovensko", emoji: "🇸🇰" },
        { text: "Oceňuji, že to není jen motivační řeči. Jsou tam konkrétní kroky, weby, šablony. Tohle jsem potřeboval.", name: "Jakub V.", loc: "Česká republika", emoji: "🇨🇿" },
        { text: "Díky téhle příručce jsem zjistil, že Nizozemsko je přesně pro mě. Přihlásil jsem se a dostal se a teraz končím první pololetí — nemůžu být šťastnější a víc tuto příručku doporučovat.", name: "Ondřej S.", loc: "Česká republika", emoji: "🇨🇿" },
        { text: "Úprimne najúprimnejšia vec, ktorú som čítal o štúdiu v zahraničí. Žiadne prázdne slová, len reálne rady.", name: "James W.", loc: "Spojené kráľovstvo", emoji: "🇬🇧" },
        { text: "Kapitola o ubytovaní samotná za to stála. Nemal som potuchy, na čo si dávať pozor.", name: "Sophie B.", loc: "Arizona", emoji: "🇺🇸" },
        { text: "Spustil som kvíz bez veľkých očakávaní. O tri týždne som podával prihlášku do Holandska.", name: "Oliver T.", loc: "Chorvátsko", emoji: "🇭🇷" },
      ],
    },
    faq: {
      label: "FAQ",
      h2: "Často kladené otázky.",
      items: [
        { q: "Pre koho je to určené?", a: "Pre kohokoľvek vo veku 16–25 rokov, kto uvažuje o štúdiu v zahraničí, ale nevie, kde začať." },
        { q: "Je kvíz skutočne zadarmo?", a: "Áno. Úplne zadarmo. Nie je potrebná kreditná karta." },
        { q: "Kto by si mal kúpiť Sprievodcu štúdiom v zahraničí?", a: "Ktokoľvek, kto chce jasného, praktického a úprimného sprievodcu napísaného niekým, kto celým procesom prešiel." },
        { q: "Môžu to použiť stredoškoláci?", a: "Áno — toto je vlastne ideálny čas začať plánovať." },
        { q: "Môžu to použiť vysokoškoláci?", a: "Áno — najmä ak uvažuješ o magisterskom štúdiu v zahraničí alebo prestupe." },
        { q: "Je sprievodca dostupný v slovenčine?", a: "Áno — sprievodca je dostupný v angličtine aj slovenčine." },
      ],
    },
    email: {
      label: "Zostaň v kontakte",
      h2: "Zostaň v obraze.",
      sub: "Praktické tipy o štúdiu v zahraničí, materiály a novinky — priamo do tvojej schránky.",
      placeholder: "tvoj@email.sk",
      cta: "Prihlásiť sa →",
      confirm: "✓ Super! Skontroluj svoju schránku.",
    },
    footer: {
      copy: "© 2025 Simona Hutkova. Všetky práva vyhradené.",
      links: [
        { label: "TikTok", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Email", href: "mailto:sisat2002@gmail.com" },
        { label: "Ochrana súkromia", href: "#" },
        { label: "Podmienky", href: "#" },
      ],
    },
  },
};

/* ── Scroll animation hook ── */
function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeUp({ children, className = "", delay = "" }) {
  const ref = useFadeUp();
  return (
    <div ref={ref} className={`fade-up ${delay} ${className}`}>
      {children}
    </div>
  );
}

/* ── Photo helper ── */
function Photo({ src, alt, className, placeholderLabel }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div className={`${className}-placeholder`}>
        <span style={{ textAlign: "center", padding: "16px" }}>{placeholderLabel || "📷 photo coming"}</span>
      </div>
    );
  }
  return <img src={`/${src}`} alt={alt} className={className} onError={() => setErr(true)} />;
}

/* ── FAQ Item ── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen(!open)}>
        {q}
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-a">{a}</div>
    </div>
  );
}

/* ── Main component ── */
export default function LandingPage() {
  const [lang, setLang] = useState("en");
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const t = T[lang];

  function handleEmailSubmit(e) {
    e.preventDefault();
    if (email.trim()) { setEmailSent(true); setEmail(""); }
  }

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="container nav-inner">
          <a href="/" className="nav-logo">Simona Hutkova</a>
          <div className="nav-links">
            <a href="#quiz" className="nav-link">{t.nav.quiz}</a>
            <a href="#guide" className="nav-link">{t.nav.guide}</a>
          </div>
          <div className="nav-right">
            <div className="lang-toggle">
              <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
              <button className={`lang-btn ${lang === "sk" ? "active" : ""}`} onClick={() => setLang("sk")}>SK</button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-text">
              <FadeUp>
                <div className="hero-eyebrow">✦ {t.hero.eyebrow}</div>
              </FadeUp>
              <FadeUp delay="delay-1">
                <h1 className="hero-h1">{t.hero.h1}</h1>
              </FadeUp>
              <FadeUp delay="delay-2">
                <p className="hero-sub">{t.hero.sub}</p>
              </FadeUp>
            </div>
            <FadeUp delay="delay-2" className="hero-photo-wrap">
              <Photo src="photo_hero.jpeg" alt="Simona Hutkova" className="hero-photo" placeholderLabel="photo_hero.jpeg" />
            </FadeUp>
            <FadeUp delay="delay-3" className="hero-ctas-wrap">
              <div className="hero-ctas">
                <a href="#quiz" className="btn-primary">{t.hero.cta1}</a>
                <a href="#guide" className="btn-secondary">{t.hero.cta2}</a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="trust">
        <div className="container">
          <FadeUp>
            <div className="trust-grid">
              {t.trust.map((item, i) => (
                <div key={i} className="trust-item">
                  <span className="trust-check">✔</span>
                  {item}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PRODUCT ── */}
      <section className="section" id="guide">
        <div className="container">
          <FadeUp>
            <div className="section-label">{t.product.label}</div>
            <div className="product-card">
              <div className="product-mockup">
                <div className="mockup-book">
                  <div className="mockup-book-spine" />
                  <div className="mockup-book-content">
                    <div className="mockup-book-tag">Study Abroad</div>
                    <div className="mockup-book-title">The Study Abroad Guide</div>
                    <div className="mockup-book-sub">by Simona Hutkova</div>
                    <div className="mockup-book-decor" />
                  </div>
                </div>
              </div>
              <div className="product-body">
                <div className="product-price-badge">⭐ {t.product.badge}</div>
                <h2 className="product-h2">{t.product.h2}</h2>
                <p className="product-tagline">{t.product.tagline}</p>
                <ul className="product-checklist">
                  {t.product.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <p className="product-bonus"><strong>{t.product.bonusLabel}</strong> {t.product.bonus}</p>
                <a href="#" className="btn-primary product-cta">{t.product.cta}</a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── MESSAGE STRIP ── */}
      <div className="message-strip">
        <div className="container">
          <FadeUp>
            <p dangerouslySetInnerHTML={{ __html: t.message.line }} />
          </FadeUp>
        </div>
      </div>

      {/* ── QUIZ ── */}
      <section className="section quiz-section" id="quiz">
        <div className="container">
          <FadeUp>
            <div className="quiz-card">
              <div>
                <div className="section-label">{t.quiz.label}</div>
                <h2 className="section-h2">{t.quiz.h2}</h2>
                <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 20 }}>{t.quiz.sub}</p>
                <ul className="quiz-bullets">
                  {t.quiz.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <a href="https://pripravenynasvet.vercel.app/quiz" className="btn-primary">{t.quiz.cta}</a>
              </div>
              <div className="quiz-visual">
                <div className="quiz-visual-emoji">🌍</div>
                <div className="quiz-visual-text">Kde smeruješ? / Where are you headed?</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="section" id="story">
        <div className="container">
          <div className="story-inner">
            <FadeUp className="story-photo">
              <Photo src="photo_extra.jpeg" alt="Simona" className="story-img" placeholderLabel="photo_extra.jpeg" />
            </FadeUp>
            <div className="story-text">
              <FadeUp>
                <div className="section-label">{t.story.label}</div>
                <h2 className="section-h2">{t.story.h2}</h2>
              </FadeUp>
              {t.story.paragraphs.map((p, i) => (
                <FadeUp key={i} delay={i % 2 === 0 ? "delay-1" : ""}>
                  <p>{p}</p>
                </FadeUp>
              ))}
              <FadeUp delay="delay-1">
                <p className="bold-line">{t.story.closing}</p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section section-alt">
        <div className="container">
          <FadeUp>
            <div className="section-label">{t.gallery.label}</div>
            <h2 className="section-h2" style={{ marginBottom: 40 }}>{t.gallery.h2}</h2>
          </FadeUp>
          <FadeUp delay="delay-1">
            <div className="gallery-grid">
              {t.gallery.photos.map((photo, i) => (
                <div key={i} className="gallery-item">
                  <Photo src={photo.file} alt={photo.caption} className="gallery-img" placeholderLabel={photo.file} />
                  <div className="gallery-caption">{photo.caption}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── RESOURCES ── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <div className="section-label">{t.resources.label}</div>
            <h2 className="section-h2" style={{ marginBottom: 40 }}>{t.resources.h2}</h2>
          </FadeUp>
          <div className="resources-grid">
            {t.resources.cards.map((card, i) => (
              <FadeUp key={i} delay={`delay-${i + 1}`}>
                <div className={`resource-card ${card.badge === "available" ? "available" : ""}`}>
                  <span className={`resource-badge ${card.badge}`}>{card.badgeText}</span>
                  <div className="resource-title">{card.title}</div>
                  <p className="resource-desc">{card.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section section-alt">
        <div className="container">
          <FadeUp>
            <div className="section-label">{t.testimonials.label}</div>
            <h2 className="section-h2" style={{ marginBottom: 40 }}>{t.testimonials.h2}</h2>
          </FadeUp>
          <div className="testimonials-grid">
            {t.testimonials.cards.map((card, i) => (
              <FadeUp key={i} delay={`delay-${i + 1}`}>
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
      <section className="section">
        <div className="container">
          <FadeUp>
            <div className="section-label">{t.faq.label}</div>
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

      {/* ── EMAIL ── */}
      <section className="section email-section">
        <div className="container">
          <FadeUp>
            <div className="section-label">{t.email.label}</div>
            <h2 className="section-h2">{t.email.h2}</h2>
            <p className="section-sub">{t.email.sub}</p>
            <form className="email-form" onSubmit={handleEmailSubmit}>
              <input
                type="email"
                className="email-input"
                placeholder={t.email.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-accent">{t.email.cta}</button>
            </form>
            <p className="email-confirm">{emailSent ? t.email.confirm : ""}</p>
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
