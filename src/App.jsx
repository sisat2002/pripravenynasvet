import React, { useState } from "react";
import { sendContactToSheet } from "./webhook.js";

/* ============================================================
   PRIPRAVENÝ NA SVET — Test "Kam smeruješ?"
   ============================================================ */

const COLORS = {
  bg: "#120D08",
  bgPanel: "#1C1410",
  espresso: "#2A1D14",
  gold: "#C9A97A",
  goldBright: "#E0C49A",
  cream: "#F2E8D8",
  parchment: "#FAF3E6",
  gray: "#9B8268",
  lgray: "#C4AD8E",
  rust: "#A8542E",
};

/* ---------- QUESTION DATA ---------- */

const QUESTIONS = [
  {
    section: "Osobnosť",
    text: "Čo robíš najradšej vo voľnom čase?",
    options: [
      { label: "Cestujem, spoznávam nové miesta alebo o nich aspoň snívam", scores: { Explorer: 2 } },
      { label: "Riešim logické problémy, hry, hlavolamy, programujem", scores: { Analyst: 2 } },
      { label: "Tvorím — kreslím, píšem, strihám videá, fotím", scores: { Creator: 2 } },
      { label: "Organizujem akcie, vediem skupinové projekty", scores: { Builder: 2 } },
      { label: "Trávim čas s ľuďmi, počúvam ich problémy, pomáham", scores: { Helper: 2 } },
    ],
  },
  {
    section: "Osobnosť",
    text: "Ktorý školský predmet ťa najviac baví?",
    options: [
      { label: "Geografia, dejepis, jazyky", scores: { Explorer: 2 } },
      { label: "Matematika, fyzika, informatika", scores: { Analyst: 2 } },
      { label: "Výtvarná výchova, mediálna výchova, literatúra", scores: { Creator: 2 } },
      { label: "Ekonomika, manažment, predmety so skupinovými projektmi", scores: { Builder: 2 } },
      { label: "Biológia, psychológia, spoločenské vedy", scores: { Helper: 2 } },
    ],
  },
  {
    section: "Osobnosť",
    text: "Akú rolu zvyčajne zaujmeš v skupinovom projekte?",
    options: [
      { label: "Ten/tá čo prináša nové nápady a smery", scores: { Explorer: 1, Creator: 1 } },
      { label: "Ten/tá čo rieši dáta a fakty, kontroluje logiku", scores: { Analyst: 2 } },
      { label: "Ten/tá čo dizajnuje výstup, robí to vizuálne pekné", scores: { Creator: 2 } },
      { label: "Ten/tá čo vedie skupinu a rozdeľuje úlohy", scores: { Builder: 2 } },
      { label: "Ten/tá čo sa stará, aby sa všetci cítili zapojení", scores: { Helper: 2 } },
    ],
  },
  {
    section: "Osobnosť",
    text: "Čo ťa najviac frustruje?",
    options: [
      { label: "Stereotyp a rutina, robiť stále to isté", scores: { Explorer: 2 } },
      { label: "Nelogické rozhodnutia bez dát", scores: { Analyst: 2 } },
      { label: "Nezáujem o kvalitu alebo estetiku", scores: { Creator: 2 } },
      { label: "Chaos a nedostatok plánu", scores: { Builder: 2 } },
      { label: "Keď sa o niekoho v skupine nikto nestará", scores: { Helper: 2 } },
    ],
  },
  {
    section: "Jasnota budúcnosti",
    text: "Ako veľmi máš jasno v tom, čo chceš robiť po strednej škole?",
    options: [
      { label: "Mám úplne jasno", context: { uncertainty: "low" } },
      { label: "Mám hrubú predstavu, ale nie som si moc istý/á", context: { uncertainty: "medium" } },
      { label: "Vôbec neviem", context: { uncertainty: "high" } },
    ],
  },
  {
    section: "Jasnota budúcnosti",
    text: "Čo ťa najviac trápi pri rozhodovaní o budúcnosti? (vyber max 2)",
    multi: true,
    maxPick: 2,
    options: [
      { label: "Neviem, v čom som dobrý/á", context: { worry: "selfknowledge" } },
      { label: "Bojím sa, že urobím zlé rozhodnutie", context: { worry: "wrongchoice" } },
      { label: "Je príliš veľa možností", context: { worry: "overload" } },
      { label: "Rodičia / okolie majú iné očakávania", context: { worry: "parents" } },
      { label: "Neviem, čo na trhu práce vôbec existuje", context: { worry: "marketinfo" } },
      { label: "Nič ma vyslovene netrápi, len chcem potvrdenie", context: { worry: "none" } },
    ],
  },
  {
    section: "Jasnota budúcnosti",
    text: "Ako moc ťa zaujíma štúdium v zahraničí?",
    options: [
      { label: "Veľmi — aktívne to zvažujem", context: { foreignInterest: "high" } },
      { label: "Trochu — som zvedavý/á, ale neviem si to predstaviť", context: { foreignInterest: "medium" } },
      { label: "Vôbec — chcem zostať blízko domova", context: { foreignInterest: "low" } },
    ],
  },
  {
    section: "Vzdelanie",
    text: "Chceš ísť na vysokú školu?",
    options: [
      { label: "Áno, určite", context: { uniIntent: "yes" } },
      { label: "Asi áno, ale nie som si moc istý/á", context: { uniIntent: "unsure" } },
      { label: "Nie som si istý/á, či vôbec chcem univerzitu", context: { uniIntent: "no" } },
      { label: "Zvažujem aj alternatívy (prax, vlastný biznis, učilište)", context: { uniIntent: "alt" } },
    ],
  },
  {
    section: "Vzdelanie",
    text: "Aký spôsob učenia ti sedí najviac?",
    options: [
      { label: "Praktické skúšanie a experimentovanie", scores: { Analyst: 1, Creator: 1 } },
      { label: "Štúdium teórie do hĺbky", scores: { Analyst: 2 } },
      { label: "Diskusia a debata s ostatnými", scores: { Helper: 1, Builder: 1 } },
      { label: "Samostatný výskum vlastným tempom", scores: { Explorer: 1, Analyst: 1 } },
      { label: "Skupinové projekty a spolupráca", scores: { Builder: 2 } },
    ],
  },
  {
    section: "Vzdelanie",
    text: "Čo ťa najviac brzdí pri zvažovaní štúdia v zahraničí? (vyber max 2)",
    multi: true,
    maxPick: 2,
    options: [
      { label: "Financie", context: { barrier: "financie" } },
      { label: "Jazyková bariéra", context: { barrier: "jazyk" } },
      { label: "Strach zo samoty / odlúčenia od rodiny", context: { barrier: "samota" } },
      { label: "Neviem, kde začať s prihláškami", context: { barrier: "prihlasky" } },
      { label: "Rodičia nesúhlasia alebo majú obavy", context: { barrier: "rodicia" } },
      { label: "Nič ma nebrzdí", context: { barrier: "none" } },
      { label: "Netýka sa ma, nechcem ísť do zahraničia", context: { barrier: "notapplicable" } },
    ],
  },
  {
    section: "Vzdelanie",
    text: "Ako dôležité je pre teba prestížne meno školy?",
    options: [
      { label: "Veľmi dôležité — chcem najlepšiu možnú školu", context: { prestige: "high" } },
      { label: "Dôležitejšie je, či mi prostredie sedí", context: { prestige: "fit" } },
      { label: "Vôbec mi to nezáleží, ide mi o obsah štúdia", context: { prestige: "content" } },
    ],
  },
  {
    section: "Pracovný štýl",
    text: "S čím by si najradšej pracoval/a?",
    options: [
      { label: "S ľuďmi", scores: { Helper: 2 } },
      { label: "S technológiami a systémami", scores: { Analyst: 2 } },
      { label: "S dátami a číslami", scores: { Analyst: 1, Builder: 1 } },
      { label: "S vizuálnym alebo kreatívnym obsahom", scores: { Creator: 2 } },
      { label: "S nápadmi a stratégiou", scores: { Builder: 1, Explorer: 1 } },
    ],
  },
  {
    section: "Pracovný štýl",
    text: "Predstav si ideálny pracovný deň. Čo by v ňom určite bolo?",
    options: [
      { label: "Cestovanie alebo práca s ľuďmi z rôznych krajín", scores: { Explorer: 2 } },
      { label: "Jasná štruktúra, plán, žiadne prekvapenia", scores: { Analyst: 1, Builder: 1 } },
      { label: "Voľnosť robiť veci po svojom, kreatívna sloboda", scores: { Creator: 2 } },
      { label: "Vedenie tímu k spoločnému cieľu", scores: { Builder: 2 } },
      { label: "Hlboké rozhovory, podpora niekoho v probléme", scores: { Helper: 2 } },
    ],
  },
  {
    section: "Ašpirácie",
    text: "Keby bol úspech zaručený, čo by si robil/a?",
    options: [
      { label: "Cestoval/a by som a spoznával/a svet", scores: { Explorer: 2 } },
      { label: "Založil/a by som vlastnú firmu", scores: { Builder: 2 } },
      { label: "Vytváral/a by som niečo — hudbu, dizajn, obsah", scores: { Creator: 2 } },
      { label: "Robil/a by som výskum alebo riešil/a komplexné problémy", scores: { Analyst: 2 } },
      { label: "Pomáhal/a by som ľuďom s ich problémami", scores: { Helper: 2 } },
    ],
  },
  {
    section: "Ašpirácie",
    text: "Čo by si najviac ľutoval/a, keby si to v živote neskúsil/a?",
    options: [
      { label: "Žiť alebo študovať v inej krajine", scores: { Explorer: 2 } },
      { label: "Vybudovať niečo vlastné", scores: { Builder: 2 } },
      { label: "Vytvoriť niečo, na čo budem hrdý/á", scores: { Creator: 2 } },
      { label: "Skutočne pochopiť, ako svet funguje", scores: { Analyst: 2 } },
      { label: "Zmeniť niečí život k lepšiemu", scores: { Helper: 2 } },
    ],
  },
  {
    section: "Ašpirácie",
    text: "Akým slovom by ťa najčastejšie opísali kamaráti?",
    options: [
      { label: "Zvedavý/á", scores: { Explorer: 1 } },
      { label: "Ambiciózny/a", scores: { Builder: 1 } },
      { label: "Originálny/a", scores: { Creator: 1 } },
      { label: "Logický/á", scores: { Analyst: 1 } },
      { label: "Empatický/á", scores: { Helper: 1 } },
    ],
  },
  {
    section: "Zahraničie",
    text: "Aké prostredie ti vyhovuje viac?",
    options: [
      { label: "Pokojné, štruktúrované, predvídateľné", context: { envType: "structured" } },
      { label: "Intenzívne, ambiciózne, plné výziev", context: { envType: "ambitious" } },
      { label: "Spontánne, sociálne, plné energie", context: { envType: "social" } },
      { label: "Známe, bezpečné, blízke domovu", context: { envType: "home" } },
    ],
  },
  {
    section: "Zahraničie",
    text: "Ako veľmi ťa láka byť ďaleko od rodiny a priateľov?",
    options: [
      { label: "Vôbec sa toho nebojím, teším sa na to", context: { foreignReadiness: "high" } },
      { label: "Trochu ma to desí, ale chcem to skúsiť", context: { foreignReadiness: "medium" } },
      { label: "Radšej by som zostal/a bližšie", context: { foreignReadiness: "low" } },
    ],
  },
  {
    section: "Zahraničie",
    text: "Čo je pre teba dôležitejšie?",
    options: [
      { label: "Bezpečie a istota", context: { priority: "safety" } },
      { label: "Dobrodružstvo a nové skúsenosti", context: { priority: "adventure" } },
    ],
  },
];

const PROFILE_INFO = {
  Explorer: {
    emoji: "🌍",
    name: "EXPLORER",
    desc: "Svet je pre teba veľký a ty ho chceš vidieť na vlastné oči. Nudíš sa, keď je všetko príliš predvídateľné — potrebuješ nové miesta, nových ľudí, nové perspektívy. Rutina ťa unavuje rýchlejšie než väčšinu ostatných. Nie si typ, čo čaká, až bude všetko isté — skôr typ, čo skočí a zistí to za behu.",
    secondary: "túžbu vidieť a zažiť viac, než ponúka jedno miesto",
  },
  Builder: {
    emoji: "🏗️",
    name: "BUILDER",
    desc: "Vidíš príležitosti tam, kde iní vidia len problémy. Rád/rada vedieš, organizuješ, posúvaš veci dopredu. Nie si spokojný/á sedieť a čakať — chceš vytvárať, riadiť, rozhodovať. Ambícia ťa poháňa a tlak ti často sedí lepšie než pokoj.",
    secondary: "chuť veci nielen robiť, ale aj viesť a posúvať dopredu",
  },
  Analyst: {
    emoji: "🔬",
    name: "ANALYST",
    desc: "Premýšľaš logicky, ideš po faktoch, nie po pocitoch. Chaos a unáhlené rozhodnutia ťa frustrujú — potrebuješ pochopiť, ako veci skutočne fungujú, predtým než urobíš krok. Nie si typ, čo robí rozhodnutia na základe trendov. Robíš ich na základe dôkazov.",
    secondary: "potrebu rozumieť veciam do hĺbky predtým, než sa pre niečo rozhodneš",
  },
  Creator: {
    emoji: "🎨",
    name: "CREATOR",
    desc: "Vnímaš svet inak než väčšina — vidíš možnosti tam, kde iní vidia len status quo. Potrebuješ priestor na vlastný výraz, či už je to vizuálne, písané, alebo akékoľvek iné. Štandardná cesta ťa nezaujíma — zaujíma ťa tvoja vlastná.",
    secondary: "potrebu robiť veci po svojom, nie podľa šablóny",
  },
  Helper: {
    emoji: "🤝",
    name: "HELPER",
    desc: "Ľudia okolo teba sú dôležitejší než akýkoľvek individuálny úspech. Cítiš, keď niekto potrebuje pomoc skôr, než to povie nahlas. Najviac ťa napĺňa, keď vidíš, že si niekomu skutočne pomohol/pomohla — nie potlesk, ale skutočný dopad.",
    secondary: "citlivosť na to, ako sa veci dotýkajú ľudí okolo teba",
  },
};

const FOREIGN_FIT = {
  structured: {
    title: "Pokojné a štruktúrované prostredie",
    countries: "Holandsko, Dánsko, Švédsko, Nemecko",
    desc: "Sedí ti pokoj, štruktúra a priestor dýchať. Krajiny ako Holandsko, Dánsko, Švédsko alebo Nemecko fungujú presne takto — veci tam majú jasné pravidlá, menej chaosu a vysokú kvalitu života. Nie je to nuda — je to priestor, kde sa dá skutočne sústrediť na to, čo robíš.",
  },
  ambitious: {
    title: "Ambiciózne a intenzívne prostredie",
    countries: "UK, USA",
    desc: "Ťahá ťa tlak, tempo a vysoké ciele. UK a USA sú presne o tomto — intenzívne, ambiciózne prostredie, kde sa od teba čaká veľa, ale aj ponúka veľa. Nie je to pre každého, ale ak ťa táto energia neuvádza do stresu, ale do pohybu, môže to byť presne tvoje miesto.",
  },
  social: {
    title: "Sociálne a spontánne prostredie",
    countries: "Španielsko, Taliansko, Portugalsko",
    desc: "Potrebuješ ľudí, energiu, menej štruktúry a viac životnej radosti. Južná Európa — Španielsko, Taliansko, Portugalsko — ponúka presne tento vibe. Štúdium tam nie je len o škole, je to celý životný štýl.",
  },
  home: {
    title: "Bližšie domov",
    countries: "Česko, Rakúsko",
    desc: "Možno ešte nie si pripravený/á na úplný skok ďaleko od domova — a to je úplne v poriadku. Krajiny ako Česko alebo Rakúsko ti dajú zahraničnú skúsenosť s menším rizikom a blízkosťou domov, ak by si ju potreboval/a.",
  },
};

const BARRIER_INSIGHT = {
  financie: {
    text: "Vedel/a si, že napríklad v Holandsku a Dánsku môžeš ako študent dostávať mesačnú štátnu podporu až do výšky 1000€? To ti môže pokryť skoro všetky náklady — niekedy aj úplne všetky. Financie sú často menší problém, než si myslíš.",
    question: "Chceš vedieť presne ako na to a ktoré krajiny to ponúkajú?",
  },
  jazyk: {
    text: "Tvoja angličtina je pravdepodobne lepšia, než si myslíš. Polovica študentov tam príde so strednou B1 úrovňou — a počas prvých pár mesiacov sa to v reálnom živote naučí oveľa rýchlejšie než akákoľvek hodina v škole.",
    question: "Chceš vedieť, ako sa na to čo najlepšie pripraviť ešte predtým, než tam odídeš?",
  },
  samota: {
    text: "Skoro každý tam ide so strachom zo samoty — a presne preto si kamarátov nájdeš veľmi rýchlo, často do pár dní. Všetci ich hľadajú rovnako ako ty. Navyše každá krajina má úplne inú „personality“ ľudí okolo seba.",
    question: "Chceš vedieť, kde presne nájdeš ľudí, ktorí ti budú sedieť najviac?",
  },
  prihlasky: {
    text: "Toto je presne to, čo robí celý proces zbytočne stresujúcim — nie nedostatok schopností, ale nedostatok jasného poradia krokov.",
    question: "Chcela by si, aby som ti poslala presné poradie krokov?",
  },
  rodicia: {
    text: "Toto počúvam často — a zvyčajne sa to dá vyriešiť konkrétnymi faktami, nie presviedčaním.",
    question: "Chcela by si, aby som ti poslala presné fakty, ktoré presvedčia tvojich rodičov?",
  },
  fallback: {
    text: "Vieš si predstaviť svoju budúcnosť — teraz potrebuješ už len plán, ako sa tam dostať.",
    question: "Chcela by si, aby som ti poslala personalizovaný plán, ako sa tam dostať?",
  },
};

function computeProfile(answers) {
  const scores = { Explorer: 0, Builder: 0, Analyst: 0, Creator: 0, Helper: 0 };
  const context = {
    uncertainty: null,
    worries: [],
    foreignInterest: null,
    uniIntent: null,
    barriers: [],
    prestige: null,
    envType: null,
    foreignReadiness: null,
    priority: null,
  };

  answers.forEach((ans) => {
    if (!ans) return;
    const list = Array.isArray(ans) ? ans : [ans];
    list.forEach((opt) => {
      if (!opt) return;
      if (opt.scores) {
        Object.entries(opt.scores).forEach(([k, v]) => {
          scores[k] = (scores[k] || 0) + v;
        });
      }
      if (opt.context) {
        Object.entries(opt.context).forEach(([k, v]) => {
          if (k === "worry") context.worries.push(v);
          else if (k === "barrier") context.barriers.push(v);
          else context[k] = v;
        });
      }
    });
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0];
  const secondary = sorted[1][0];

  return { primary, secondary, context };
}

function getForeignFitKey(context) {
  const lowReadiness = context.foreignReadiness === "low";
  const safetyFirst = context.foreignReadiness === "medium" && context.priority === "safety";
  if (lowReadiness || safetyFirst) return "home";
  if (context.envType === "home") return "home";
  if (context.envType === "ambitious") return "ambitious";
  if (context.envType === "social") return "social";
  return "structured";
}

function getBarrierKey(context) {
  const real = context.barriers.filter((b) => b !== "none" && b !== "notapplicable");
  if (real.length === 0) return "fallback";
  return real[0];
}

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ width: "100%", marginBottom: 28 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontSize: 13,
          color: COLORS.gray,
          letterSpacing: 1,
        }}
      >
        <span>OTÁZKA {current} / {total}</span>
        <span>{pct}%</span>
      </div>
      <div style={{ width: "100%", height: 4, background: COLORS.espresso, borderRadius: 2, overflow: "hidden" }}>
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldBright})`,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

function OptionButton({ label, selected, onClick, multi }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "18px 20px",
        marginBottom: 12,
        borderRadius: 14,
        border: `1.5px solid ${selected ? COLORS.gold : "rgba(201,169,122,0.25)"}`,
        background: selected ? "rgba(201,169,122,0.12)" : "rgba(255,255,255,0.02)",
        color: selected ? COLORS.parchment : COLORS.cream,
        fontSize: 16,
        fontFamily: "inherit",
        cursor: "pointer",
        transition: "all 0.18s ease",
        display: "flex",
        alignItems: "center",
        gap: 14,
        lineHeight: 1.4,
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: multi ? 6 : "50%",
          border: `2px solid ${selected ? COLORS.gold : "rgba(201,169,122,0.4)"}`,
          background: selected ? COLORS.gold : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selected && <span style={{ color: COLORS.bg, fontSize: 13, fontWeight: 700 }}>✓</span>}
      </span>
      {label}
    </button>
  );
}

function ContactCapture({ onSubmit }) {
  const [method, setMethod] = useState("whatsapp");
  const [value, setValue] = useState("");

  const placeholders = {
    whatsapp: "+421 9xx xxx xxx",
    instagram: "@tvoj_instagram",
    email: "tvoj@email.sk",
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", animation: "fadeIn 0.5s ease" }}>
      <div style={{ fontSize: 44, marginBottom: 14 }}>🎉</div>
      <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, color: COLORS.parchment, marginBottom: 14, lineHeight: 1.25 }}>
        Tvoj výsledok je hotový
      </h2>
      <p style={{ color: COLORS.lgray, fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
        Kam ti ho mám poslať, aby si ho nestratil/a aj keď sa ti táto stránka zatvorí?
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, justifyContent: "center" }}>
        {[
          { id: "whatsapp", label: "WhatsApp" },
          { id: "instagram", label: "Instagram" },
          { id: "email", label: "Email" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: `1.5px solid ${method === m.id ? COLORS.gold : "rgba(201,169,122,0.3)"}`,
              background: method === m.id ? COLORS.gold : "transparent",
              color: method === m.id ? COLORS.bg : COLORS.cream,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholders[method]}
        style={{
          width: "100%",
          padding: "16px 18px",
          borderRadius: 12,
          border: `1.5px solid rgba(201,169,122,0.3)`,
          background: "rgba(255,255,255,0.03)",
          color: COLORS.parchment,
          fontSize: 16,
          fontFamily: "inherit",
          marginBottom: 20,
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={() => value.trim() && onSubmit(method, value.trim())}
        disabled={!value.trim()}
        style={{
          width: "100%",
          padding: "18px",
          borderRadius: 12,
          border: "none",
          background: value.trim()
            ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldBright})`
            : COLORS.espresso,
          color: value.trim() ? COLORS.bg : COLORS.gray,
          fontSize: 17,
          fontWeight: 700,
          cursor: value.trim() ? "pointer" : "not-allowed",
          transition: "all 0.2s",
        }}
      >
        Zobraziť môj výsledok →
      </button>
    </div>
  );
}

function ResultScreen({ result }) {
  const { primary, secondary, context } = result;
  const profile = PROFILE_INFO[primary];
  const secProfile = PROFILE_INFO[secondary];
  const foreignKey = getForeignFitKey(context);
  const foreign = FOREIGN_FIT[foreignKey];
  const barrierKey = getBarrierKey(context);
  const barrier = BARRIER_INSIGHT[barrierKey];

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", animation: "fadeIn 0.6s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 13, letterSpacing: 2, color: COLORS.gold, fontWeight: 700 }}>TVOJ VÝSLEDOK</span>
      </div>

      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>{profile.emoji}</div>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 48, color: COLORS.parchment, margin: 0, letterSpacing: 1 }}>
          {profile.name}
        </h1>
      </div>

      <p style={{ fontSize: 18, lineHeight: 1.7, color: COLORS.cream, marginBottom: 18 }}>{profile.desc}</p>

      <p
        style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: COLORS.lgray,
          fontStyle: "italic",
          marginBottom: 36,
          paddingLeft: 18,
          borderLeft: `3px solid ${COLORS.gold}`,
        }}
      >
        A zároveň v sebe máš kúsok {secProfile.name}-a — {secProfile.secondary}.
      </p>

      <div style={{ background: COLORS.bgPanel, borderRadius: 18, padding: "28px 26px", marginBottom: 28, border: `1px solid rgba(201,169,122,0.15)` }}>
        <div style={{ fontSize: 12, letterSpacing: 1.5, color: COLORS.gold, fontWeight: 700, marginBottom: 10 }}>KAM ŤA TO ŤAHÁ</div>
        <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 24, color: COLORS.parchment, margin: "0 0 6px 0" }}>{foreign.title}</h3>
        <div style={{ fontSize: 14, color: COLORS.gray, marginBottom: 14 }}>{foreign.countries}</div>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: COLORS.cream, margin: 0 }}>{foreign.desc}</p>
      </div>

      <div
        style={{
          background: `linear-gradient(135deg, rgba(201,169,122,0.08), rgba(201,169,122,0.02))`,
          borderRadius: 18,
          padding: "30px 26px",
          textAlign: "center",
          border: `1.5px solid rgba(201,169,122,0.3)`,
        }}
      >
        <p style={{ fontSize: 16, lineHeight: 1.7, color: COLORS.cream, marginBottom: 18 }}>{barrier.text}</p>
        <p style={{ fontSize: 19, fontWeight: 700, color: COLORS.parchment, marginBottom: 22, lineHeight: 1.4 }}>{barrier.question}</p>
        <a
          href="https://pripravenynasvet.sk"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "16px 36px",
            borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldBright})`,
            color: COLORS.bg,
            fontSize: 16,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Áno, chcem vedieť →
        </a>
      </div>

      <p style={{ textAlign: "center", fontSize: 13, color: COLORS.gray, marginTop: 30 }}>
        Pripravený na svet · pripravenynasvet.sk
      </p>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [result, setResult] = useState(null);

  const totalQuestions = QUESTIONS.length;
  const isContactStep = step === totalQuestions;
  const isResultStep = step === totalQuestions + 1;
  const currentQ = !isContactStep && !isResultStep ? QUESTIONS[step] : null;

  function selectOption(opt) {
    const newAnswers = [...answers];
    if (currentQ.multi) {
      const existing = Array.isArray(newAnswers[step]) ? newAnswers[step] : [];
      const already = existing.includes(opt);
      let updated;
      if (already) {
        updated = existing.filter((o) => o !== opt);
      } else {
        if (existing.length >= (currentQ.maxPick || 99)) {
          updated = [...existing.slice(1), opt];
        } else {
          updated = [...existing, opt];
        }
      }
      newAnswers[step] = updated;
      setAnswers(newAnswers);
    } else {
      newAnswers[step] = opt;
      setAnswers(newAnswers);
      setTimeout(() => setStep((s) => s + 1), 220);
    }
  }

  function nextFromMulti() {
    setStep((s) => s + 1);
  }

  function handleContactSubmit(method, value) {
    const computed = computeProfile(answers);
    setResult(computed);
    setStep((s) => s + 1);
    sendContactToSheet({ method, value, result: computed });
  }

  function isOptionSelected(opt) {
    if (!currentQ) return false;
    const ans = answers[step];
    if (currentQ.multi) {
      return Array.isArray(ans) && ans.includes(opt);
    }
    return ans === opt;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(ellipse at top, ${COLORS.bgPanel} 0%, ${COLORS.bg} 60%)`,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "48px 20px 60px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity:0; transform: translateY(8px);} to { opacity:1; transform:none; } }
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(196,173,142,0.5); }
        input:focus { border-color: ${COLORS.gold} !important; }
      `}</style>

      {!isResultStep && (
        <div style={{ maxWidth: 640, margin: "0 auto 36px" }}>
          <div style={{ fontSize: 12, letterSpacing: 2, color: COLORS.gold, fontWeight: 700, marginBottom: 4 }}>
            PRIPRAVENÝ NA SVET
          </div>
          <div style={{ fontSize: 13, color: COLORS.gray }}>Kam smeruješ? — Test</div>
        </div>
      )}

      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {currentQ && (
          <>
            <ProgressBar current={step + 1} total={totalQuestions} />
            <div style={{ fontSize: 12, letterSpacing: 1.5, color: COLORS.gold, marginBottom: 10, fontWeight: 700 }}>
              {currentQ.section.toUpperCase()}
            </div>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, lineHeight: 1.3, color: COLORS.parchment, marginBottom: 28 }}>
              {currentQ.text}
            </h2>
            <div>
              {currentQ.options.map((opt, i) => (
                <OptionButton
                  key={i}
                  label={opt.label}
                  selected={isOptionSelected(opt)}
                  onClick={() => selectOption(opt)}
                  multi={currentQ.multi}
                />
              ))}
            </div>
            {currentQ.multi && (
              <button
                onClick={nextFromMulti}
                disabled={!Array.isArray(answers[step]) || answers[step].length === 0}
                style={{
                  marginTop: 8,
                  width: "100%",
                  padding: "16px",
                  borderRadius: 12,
                  border: "none",
                  background:
                    Array.isArray(answers[step]) && answers[step].length > 0
                      ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldBright})`
                      : COLORS.espresso,
                  color: Array.isArray(answers[step]) && answers[step].length > 0 ? COLORS.bg : COLORS.gray,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: Array.isArray(answers[step]) && answers[step].length > 0 ? "pointer" : "not-allowed",
                }}
              >
                Pokračovať →
              </button>
            )}
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                style={{ marginTop: 16, background: "none", border: "none", color: COLORS.gray, fontSize: 14, cursor: "pointer", padding: 0 }}
              >
                ← Späť
              </button>
            )}
          </>
        )}

        {isContactStep && <ContactCapture onSubmit={handleContactSubmit} />}
        {isResultStep && result && <ResultScreen result={result} />}
      </div>
    </div>
  );
}
