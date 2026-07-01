export const TRANSLATIONS = {
  sk: {
    ui: {
      brand: "PRIPRAVENÝ NA SVET",
      subtitle: "Kam smeruješ? — Test",
      question: "OTÁZKA",
      of: "/",
      next: "Pokračovať →",
      back: "← Späť",
      yourResult: "TVOJ VÝSLEDOK",
      drawnTo: "KAM ŤA TO ŤAHÁ",
      footer: "Pripravený na svet · pripravenynasvet.sk",
      contactText:
        "Ak máš otázky, napíš mi na sisat2002@gmail.com alebo na Instagram @simona.hutkova",
      capture: {
        emoji: "🎉",
        heading: "Tvoj výsledok je hotový",
        desc: "Kam ti ho mám poslať, aby si ho nestratil/a aj keď sa ti táto stránka zatvorí?",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        email: "Email",
        placeholders: {
          whatsapp: "+421 9xx xxx xxx",
          instagram: "@tvoj_instagram",
          email: "tvoj@email.sk",
        },
        cta: "Zobraziť môj výsledok →",
      },
      secondary: "A zároveň v sebe máš kúsok",
      secondaryOf: "-a —",
    },
    questions: [
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
    ],
    profileInfo: {
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
    },
    foreignFit: {
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
    },
    barrierInsight: {
      financie: {
        text: "Vedel/a si, že napríklad v Holandsku a Dánsku môžeš ako študent dostávať mesačnú štátnu podporu až do výšky 1000€? To ti môže pokryť skoro všetky náklady — niekedy aj úplne všetky. Financie sú často menší problém, než si myslíš.",
        question: "Chceš vedieť presne ako na to a ktoré krajiny to ponúkajú?",
      },
      jazyk: {
        text: "Tvoja angličtina je pravdepodobne lepšia, než si myslíš. Polovica študentov tam príde so strednou B1 úrovňou — a počas prvých pár mesiacov sa to v reálnom živote naučí oveľa rýchlejšie než akákoľvek hodina v škole.",
        question: "Chceš vedieť, ako sa na to čo najlepšie pripraviť ešte predtým, než tam odídeš?",
      },
      samota: {
        text: "Skoro každý tam ide so strachom zo samoty — a presne preto si kamarátov nájdeš veľmi rýchlo, často do pár dní. Všetci ich hľadajú rovnako ako ty. Navyše každá krajina má úplne inú 'personality' ľudí okolo seba.",
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
    },
  },

  en: {
    ui: {
      brand: "READY FOR THE WORLD",
      subtitle: "Where are you headed? — Quiz",
      question: "QUESTION",
      of: "/",
      next: "Continue →",
      back: "← Back",
      yourResult: "YOUR RESULT",
      drawnTo: "WHERE YOU'RE DRAWN TO",
      footer: "Ready for the World · pripravenynasvet.sk",
      contactText:
        "If you have questions, write to me at sisat2002@gmail.com or on Instagram @simona.hutkova",
      capture: {
        emoji: "🎉",
        heading: "Your result is ready",
        desc: "Where should I send it so you don't lose it when this page closes?",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        email: "Email",
        placeholders: {
          whatsapp: "+1 xxx xxx xxxx",
          instagram: "@your_instagram",
          email: "your@email.com",
        },
        cta: "Show my result →",
      },
      secondary: "And at the same time you carry a bit of",
      secondaryOf: "—",
    },
    questions: [
      {
        section: "Personality",
        text: "What do you most enjoy doing in your free time?",
        options: [
          { label: "I travel, discover new places, or at least dream about them", scores: { Explorer: 2 } },
          { label: "I solve logical problems, puzzles, games, or code", scores: { Analyst: 2 } },
          { label: "I create — drawing, writing, editing videos, photography", scores: { Creator: 2 } },
          { label: "I organise events and lead group projects", scores: { Builder: 2 } },
          { label: "I spend time with people, listen to their problems, help them", scores: { Helper: 2 } },
        ],
      },
      {
        section: "Personality",
        text: "Which school subject do you enjoy the most?",
        options: [
          { label: "Geography, history, languages", scores: { Explorer: 2 } },
          { label: "Maths, physics, computer science", scores: { Analyst: 2 } },
          { label: "Art, media studies, literature", scores: { Creator: 2 } },
          { label: "Economics, management, group project-based subjects", scores: { Builder: 2 } },
          { label: "Biology, psychology, social sciences", scores: { Helper: 2 } },
        ],
      },
      {
        section: "Personality",
        text: "What role do you usually take in a group project?",
        options: [
          { label: "The one who brings new ideas and directions", scores: { Explorer: 1, Creator: 1 } },
          { label: "The one who analyses data and facts, checks logic", scores: { Analyst: 2 } },
          { label: "The one who designs the output and makes it look good", scores: { Creator: 2 } },
          { label: "The one who leads the group and delegates tasks", scores: { Builder: 2 } },
          { label: "The one who makes sure everyone feels included", scores: { Helper: 2 } },
        ],
      },
      {
        section: "Personality",
        text: "What frustrates you the most?",
        options: [
          { label: "Routine and monotony — always doing the same thing", scores: { Explorer: 2 } },
          { label: "Decisions made without data or logic", scores: { Analyst: 2 } },
          { label: "A lack of care for quality or aesthetics", scores: { Creator: 2 } },
          { label: "Chaos and lack of planning", scores: { Builder: 2 } },
          { label: "When nobody in the group cares about someone being left out", scores: { Helper: 2 } },
        ],
      },
      {
        section: "Future clarity",
        text: "How clear are you on what you want to do after high school?",
        options: [
          { label: "Completely clear", context: { uncertainty: "low" } },
          { label: "I have a rough idea, but I'm not very sure", context: { uncertainty: "medium" } },
          { label: "No idea at all", context: { uncertainty: "high" } },
        ],
      },
      {
        section: "Future clarity",
        text: "What worries you most about deciding your future? (pick up to 2)",
        multi: true,
        maxPick: 2,
        options: [
          { label: "I don't know what I'm good at", context: { worry: "selfknowledge" } },
          { label: "I'm afraid of making the wrong decision", context: { worry: "wrongchoice" } },
          { label: "There are too many options", context: { worry: "overload" } },
          { label: "My parents / surroundings have different expectations", context: { worry: "parents" } },
          { label: "I don't know what even exists in the job market", context: { worry: "marketinfo" } },
          { label: "Nothing really worries me, I just want confirmation", context: { worry: "none" } },
        ],
      },
      {
        section: "Future clarity",
        text: "How interested are you in studying abroad?",
        options: [
          { label: "Very — I'm actively considering it", context: { foreignInterest: "high" } },
          { label: "A little — I'm curious, but can't quite picture it", context: { foreignInterest: "medium" } },
          { label: "Not at all — I want to stay close to home", context: { foreignInterest: "low" } },
        ],
      },
      {
        section: "Education",
        text: "Do you want to go to university?",
        options: [
          { label: "Yes, definitely", context: { uniIntent: "yes" } },
          { label: "Probably yes, but I'm not very sure", context: { uniIntent: "unsure" } },
          { label: "I'm not sure I even want university", context: { uniIntent: "no" } },
          { label: "I'm also considering alternatives (work experience, own business, vocational school)", context: { uniIntent: "alt" } },
        ],
      },
      {
        section: "Education",
        text: "What learning style suits you best?",
        options: [
          { label: "Hands-on experimentation and trying things out", scores: { Analyst: 1, Creator: 1 } },
          { label: "In-depth study of theory", scores: { Analyst: 2 } },
          { label: "Discussion and debate with others", scores: { Helper: 1, Builder: 1 } },
          { label: "Independent research at my own pace", scores: { Explorer: 1, Analyst: 1 } },
          { label: "Group projects and collaboration", scores: { Builder: 2 } },
        ],
      },
      {
        section: "Education",
        text: "What holds you back most from considering studying abroad? (pick up to 2)",
        multi: true,
        maxPick: 2,
        options: [
          { label: "Finances", context: { barrier: "financie" } },
          { label: "Language barrier", context: { barrier: "jazyk" } },
          { label: "Fear of loneliness / being away from family", context: { barrier: "samota" } },
          { label: "I don't know where to start with applications", context: { barrier: "prihlasky" } },
          { label: "My parents disagree or have concerns", context: { barrier: "rodicia" } },
          { label: "Nothing holds me back", context: { barrier: "none" } },
          { label: "Not applicable — I don't want to go abroad", context: { barrier: "notapplicable" } },
        ],
      },
      {
        section: "Education",
        text: "How important is a prestigious school name to you?",
        options: [
          { label: "Very important — I want the best possible school", context: { prestige: "high" } },
          { label: "More important that the environment suits me", context: { prestige: "fit" } },
          { label: "Doesn't matter at all, I care about the content of study", context: { prestige: "content" } },
        ],
      },
      {
        section: "Work style",
        text: "What would you most enjoy working with?",
        options: [
          { label: "People", scores: { Helper: 2 } },
          { label: "Technology and systems", scores: { Analyst: 2 } },
          { label: "Data and numbers", scores: { Analyst: 1, Builder: 1 } },
          { label: "Visual or creative content", scores: { Creator: 2 } },
          { label: "Ideas and strategy", scores: { Builder: 1, Explorer: 1 } },
        ],
      },
      {
        section: "Work style",
        text: "Imagine your ideal workday. What would definitely be in it?",
        options: [
          { label: "Travelling or working with people from different countries", scores: { Explorer: 2 } },
          { label: "A clear structure, a plan, no surprises", scores: { Analyst: 1, Builder: 1 } },
          { label: "Freedom to do things my own way, creative freedom", scores: { Creator: 2 } },
          { label: "Leading a team toward a shared goal", scores: { Builder: 2 } },
          { label: "Deep conversations, supporting someone through a problem", scores: { Helper: 2 } },
        ],
      },
      {
        section: "Aspirations",
        text: "If success were guaranteed, what would you do?",
        options: [
          { label: "I'd travel and explore the world", scores: { Explorer: 2 } },
          { label: "I'd start my own company", scores: { Builder: 2 } },
          { label: "I'd create something — music, design, content", scores: { Creator: 2 } },
          { label: "I'd do research or solve complex problems", scores: { Analyst: 2 } },
          { label: "I'd help people with their problems", scores: { Helper: 2 } },
        ],
      },
      {
        section: "Aspirations",
        text: "What would you regret most not having done in life?",
        options: [
          { label: "Living or studying in another country", scores: { Explorer: 2 } },
          { label: "Building something of my own", scores: { Builder: 2 } },
          { label: "Creating something I'd be proud of", scores: { Creator: 2 } },
          { label: "Truly understanding how the world works", scores: { Analyst: 2 } },
          { label: "Changing someone's life for the better", scores: { Helper: 2 } },
        ],
      },
      {
        section: "Aspirations",
        text: "What word would your friends most often use to describe you?",
        options: [
          { label: "Curious", scores: { Explorer: 1 } },
          { label: "Ambitious", scores: { Builder: 1 } },
          { label: "Original", scores: { Creator: 1 } },
          { label: "Logical", scores: { Analyst: 1 } },
          { label: "Empathetic", scores: { Helper: 1 } },
        ],
      },
      {
        section: "Abroad",
        text: "What kind of environment suits you better?",
        options: [
          { label: "Calm, structured, predictable", context: { envType: "structured" } },
          { label: "Intense, ambitious, full of challenges", context: { envType: "ambitious" } },
          { label: "Spontaneous, social, full of energy", context: { envType: "social" } },
          { label: "Familiar, safe, close to home", context: { envType: "home" } },
        ],
      },
      {
        section: "Abroad",
        text: "How much does being far from family and friends appeal to you?",
        options: [
          { label: "Not scared at all — I'm looking forward to it", context: { foreignReadiness: "high" } },
          { label: "It scares me a little, but I want to try it", context: { foreignReadiness: "medium" } },
          { label: "I'd rather stay closer", context: { foreignReadiness: "low" } },
        ],
      },
      {
        section: "Abroad",
        text: "What matters more to you?",
        options: [
          { label: "Safety and security", context: { priority: "safety" } },
          { label: "Adventure and new experiences", context: { priority: "adventure" } },
        ],
      },
    ],
    profileInfo: {
      Explorer: {
        emoji: "🌍",
        name: "EXPLORER",
        desc: "The world is big and you want to see it with your own eyes. You get bored when everything is too predictable — you need new places, new people, new perspectives. Routine drains you faster than most. You're not the type to wait until everything is certain — you're more the type to jump in and figure it out on the way.",
        secondary: "a desire to see and experience more than one place can offer",
      },
      Builder: {
        emoji: "🏗️",
        name: "BUILDER",
        desc: "You see opportunities where others see only problems. You like to lead, organise, and push things forward. You're not content sitting and waiting — you want to create, manage, decide. Ambition drives you and pressure often suits you better than calm.",
        secondary: "a drive not just to do things, but to lead them and push them forward",
      },
      Analyst: {
        emoji: "🔬",
        name: "ANALYST",
        desc: "You think logically, you go after facts, not feelings. Chaos and hasty decisions frustrate you — you need to understand how things truly work before taking a step. You're not the type who makes decisions based on trends. You make them based on evidence.",
        secondary: "a need to understand things deeply before committing to something",
      },
      Creator: {
        emoji: "🎨",
        name: "CREATOR",
        desc: "You perceive the world differently than most — you see possibilities where others see only the status quo. You need space for your own expression, whether that's visual, written, or anything else. The standard path doesn't interest you — your own path does.",
        secondary: "a need to do things your own way, not from a template",
      },
      Helper: {
        emoji: "🤝",
        name: "HELPER",
        desc: "The people around you matter more than any individual success. You can sense when someone needs help before they say it out loud. What fulfils you most is seeing that you've truly helped someone — not applause, but real impact.",
        secondary: "a sensitivity to how things affect the people around you",
      },
    },
    foreignFit: {
      structured: {
        title: "A calm and structured environment",
        countries: "Netherlands, Denmark, Sweden, Germany",
        desc: "You thrive in calm, structure, and room to breathe. Countries like the Netherlands, Denmark, Sweden, or Germany work exactly like this — things there have clear rules, less chaos, and a high quality of life. It's not boring — it's a space where you can truly focus on what you do.",
      },
      ambitious: {
        title: "An ambitious and intense environment",
        countries: "UK, USA",
        desc: "You're drawn to pressure, pace, and high goals. The UK and USA are exactly about this — an intense, ambitious environment where a lot is expected of you, but a lot is also offered. It's not for everyone, but if this energy moves you rather than stresses you, this could be exactly your place.",
      },
      social: {
        title: "A social and spontaneous environment",
        countries: "Spain, Italy, Portugal",
        desc: "You need people, energy, less structure and more joy of life. Southern Europe — Spain, Italy, Portugal — offers exactly this vibe. Studying there isn't just about school, it's a whole lifestyle.",
      },
      home: {
        title: "Closer to home",
        countries: "Czech Republic, Austria",
        desc: "Maybe you're not quite ready for a full leap far from home — and that's completely fine. Countries like the Czech Republic or Austria will give you an international experience with less risk and proximity to home if you need it.",
      },
    },
    barrierInsight: {
      financie: {
        text: "Did you know that in the Netherlands and Denmark, for example, you can receive monthly state support of up to €1,000 as a student? That can cover almost all your costs — sometimes all of them. Finances are often a smaller problem than you think.",
        question: "Do you want to know exactly how and which countries offer this?",
      },
      jazyk: {
        text: "Your English is probably better than you think. Half of students arrive with a middle B1 level — and in real life you'll learn it much faster in a few months than in any classroom.",
        question: "Do you want to know how to prepare as well as possible before you go?",
      },
      samota: {
        text: "Almost everyone goes there with a fear of loneliness — and that's exactly why you'll make friends very quickly, often within a few days. Everyone is looking for them just like you are. Plus every country has a completely different personality of the people around you.",
        question: "Do you want to know where exactly you'll find the people who will suit you best?",
      },
      prihlasky: {
        text: "This is exactly what makes the whole process unnecessarily stressful — not a lack of ability, but a lack of a clear step-by-step order.",
        question: "Would you like me to send you the exact steps in order?",
      },
      rodicia: {
        text: "I hear this a lot — and it can usually be solved with concrete facts, not persuasion.",
        question: "Would you like me to send you the exact facts that will convince your parents?",
      },
      fallback: {
        text: "You can picture your future — now you just need a plan to get there.",
        question: "Would you like me to send you a personalised plan on how to get there?",
      },
    },
  },
};
