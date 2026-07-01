import React, { useState } from "react";
import { sendContactToSheet } from "./webhook.js";
import { TRANSLATIONS } from "./translations.js";

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
  return { primary: sorted[0][0], secondary: sorted[1][0], context };
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

function LangToggle({ lang, setLang }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {["sk", "en"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            padding: "5px 11px",
            borderRadius: 999,
            border: `1.5px solid ${lang === l ? COLORS.gold : "rgba(201,169,122,0.3)"}`,
            background: lang === l ? COLORS.gold : "transparent",
            color: lang === l ? COLORS.bg : COLORS.lgray,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function ProgressBar({ current, total, t }) {
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
        <span>{t.question} {current} {t.of} {total}</span>
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

function ContactCapture({ onSubmit, t }) {
  const [method, setMethod] = useState("whatsapp");
  const [value, setValue] = useState("");
  const c = t.capture;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", animation: "fadeIn 0.5s ease" }}>
      <div style={{ fontSize: 44, marginBottom: 14 }}>{c.emoji}</div>
      <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, color: COLORS.parchment, marginBottom: 14, lineHeight: 1.25 }}>
        {c.heading}
      </h2>
      <p style={{ color: COLORS.lgray, fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
        {c.desc}
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, justifyContent: "center" }}>
        {[
          { id: "whatsapp", label: c.whatsapp },
          { id: "instagram", label: c.instagram },
          { id: "email", label: c.email },
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
        placeholder={c.placeholders[method]}
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
        {c.cta}
      </button>
    </div>
  );
}

function ResultScreen({ result, t }) {
  const { primary, secondary, context } = result;
  const profile = t.profileInfo[primary];
  const secProfile = t.profileInfo[secondary];
  const foreignKey = getForeignFitKey(context);
  const foreign = t.foreignFit[foreignKey];
  const barrierKey = getBarrierKey(context);
  const barrier = t.barrierInsight[barrierKey];
  const ui = t.ui;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", animation: "fadeIn 0.6s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 13, letterSpacing: 2, color: COLORS.gold, fontWeight: 700 }}>{ui.yourResult}</span>
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
        {ui.secondary} {secProfile.name} {ui.secondaryOf} {secProfile.secondary}.
      </p>

      <div style={{ background: COLORS.bgPanel, borderRadius: 18, padding: "28px 26px", marginBottom: 28, border: `1px solid rgba(201,169,122,0.15)` }}>
        <div style={{ fontSize: 12, letterSpacing: 1.5, color: COLORS.gold, fontWeight: 700, marginBottom: 10 }}>{ui.drawnTo}</div>
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
        <p style={{ fontSize: 16, color: COLORS.cream, lineHeight: 1.6 }}>
          {ui.contactText}
        </p>
      </div>

      <p style={{ textAlign: "center", fontSize: 13, color: COLORS.gray, marginTop: 30 }}>
        {ui.footer}
      </p>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("sk");
  const t = TRANSLATIONS[lang];
  const QUESTIONS = t.questions;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [result, setResult] = useState(null);

  const totalQuestions = QUESTIONS.length;
  const isContactStep = step === totalQuestions;
  const isResultStep = step === totalQuestions + 1;
  const currentQ = !isContactStep && !isResultStep ? QUESTIONS[step] : null;

  function handleLangChange(newLang) {
    setLang(newLang);
    setStep(0);
    setAnswers(Array(TRANSLATIONS[newLang].questions.length).fill(null));
    setResult(null);
  }

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
    console.log("webhook version 2");
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
        <div style={{ maxWidth: 640, margin: "0 auto 36px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, color: COLORS.gold, fontWeight: 700, marginBottom: 4 }}>
              {t.ui.brand}
            </div>
            <div style={{ fontSize: 13, color: COLORS.gray }}>{t.ui.subtitle}</div>
          </div>
          <LangToggle lang={lang} setLang={handleLangChange} />
        </div>
      )}

      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {currentQ && (
          <>
            <ProgressBar current={step + 1} total={totalQuestions} t={t.ui} />
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
                {t.ui.next}
              </button>
            )}
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                style={{ marginTop: 16, background: "none", border: "none", color: COLORS.gray, fontSize: 14, cursor: "pointer", padding: 0 }}
              >
                {t.ui.back}
              </button>
            )}
          </>
        )}

        {isContactStep && <ContactCapture onSubmit={handleContactSubmit} t={t} />}
        {isResultStep && result && <ResultScreen result={result} t={t} />}
      </div>
    </div>
  );
}
