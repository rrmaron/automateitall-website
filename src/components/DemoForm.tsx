"use client";

import { useEffect, useMemo, useState } from "react";

// The intake form: what the demo line asks a caller (business, industry, team, what is done by hand, the
// biggest frustration, name, phone, email, ZIP and city, a partner to include) and a time for the demo from
// the platform's open times. Bot-proofing: a trap field people never see, the signed timestamp from the server,
// and Cloudflare Turnstile when the site key is set (src/lib/human.ts checks all three on submit).

type Slot = { key: string; day: string; time: string };
type Booked = { key: string; day: string; time: string } | null;

const INDUSTRIES = [
  "Bathroom or kitchen remodeling",
  "Roofing, siding or windows",
  "HVAC, plumbing or electrical",
  "General contractor or construction",
  "Dental, medical or veterinary practice",
  "Salon, spa or massage",
  "Restaurant or shop",
  "Franchisor or multi-location business",
  "Other",
];

const TEAM = ["Just me", "2 to 5", "6 to 15", "16 to 50", "More than 50"];

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: { sitekey: string; theme?: string }) => string };
  }
}

export default function DemoForm({ formStamp, turnstileSiteKey, trial }: { formStamp: string; turnstileSiteKey: string; trial: boolean }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsNote, setSlotsNote] = useState("Loading open times…");
  const [slot, setSlot] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ booked: Booked; posted: boolean } | null>(null);
  const [values, setValues] = useState<Record<string, string>>({
    name: "", business: "", industry: trial ? INDUSTRIES[0] : "", team_size: "", manual_processes: "", biggest_pain: "",
    phone: "", email: "", zip: "", city: "", partner: "", website: "",
  });
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/demo/times", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { times?: Slot[]; detail?: string }) => {
        if (!alive) return;
        const times = data.times ?? [];
        setSlots(times);
        setSlotsNote(times.length ? "" : "No times to pick right now; send the form and we will call you to set one.");
      })
      .catch(() => alive && setSlotsNote("Times could not be loaded; send the form and we will call you to set one."));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || document.getElementById("cf-turnstile-script")) return;
    const s = document.createElement("script");
    s.id = "cf-turnstile-script";
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    document.head.appendChild(s);
  }, [turnstileSiteKey]);

  const days = useMemo(() => {
    const out: { day: string; slots: Slot[] }[] = [];
    for (const s of slots) {
      const last = out[out.length - 1];
      if (last && last.day === s.day) last.slots.push(s);
      else out.push({ day: s.day, slots: [s] });
    }
    return out;
  }, [slots]);

  function set(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const token = (document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value ?? "";
    try {
      const r = await fetch("/api/demo/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, slot, consent: consent ? "yes" : "", trial: trial ? "yes" : "", form_stamp: formStamp,
                               "cf-turnstile-response": token }),
      });
      const data = (await r.json()) as { ok?: boolean; error?: string; booked?: Booked; posted?: boolean };
      if (!r.ok || !data.ok) {
        setError(data.error || "Something went wrong. Please try again or call us.");
        return;
      }
      setDone({ booked: data.booked ?? null, posted: Boolean(data.posted) });
    } catch {
      setError("Something went wrong. Please try again or call us.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-8">
        <h2 className="text-2xl font-bold mb-3">Thank you, {values.name.split(" ")[0] || "and welcome"}.</h2>
        {done.booked ? (
          <p className="text-slate-300 text-lg">
            Your {trial ? "onboarding call" : "demo"} is booked for <strong>{done.booked.day} at {done.booked.time}</strong>, by phone or video.
          </p>
        ) : (
          <p className="text-slate-300 text-lg">We have your details. We will call you shortly to set a time.</p>
        )}
        {done.posted && (
          <p className="text-slate-400 mt-3">A text and an email with your next steps and your roadmap are on their way.</p>
        )}
        <p className="text-slate-500 text-sm mt-6">Need us sooner? Call (320) 703-4271; our AI answers around the clock.</p>
      </div>
    );
  }

  const input = "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400";
  const label = "block text-sm font-semibold text-slate-300 mb-1";

  return (
    <form onSubmit={submit} className="space-y-8" noValidate>
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Your business</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={label} htmlFor="business">Business name</label>
            <input id="business" className={input} value={values.business} onChange={(e) => set("business", e.target.value)} required />
          </div>
          <div>
            <label className={label} htmlFor="industry">What the business does</label>
            <select id="industry" className={input} value={values.industry} onChange={(e) => set("industry", e.target.value)} required>
              <option value="">Choose one</option>
              {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="team_size">How many people work there</label>
            <select id="team_size" className={input} value={values.team_size} onChange={(e) => set("team_size", e.target.value)}>
              <option value="">Choose one</option>
              {TEAM.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="partner">A partner or co-owner who should see the demo too</label>
            <input id="partner" className={input} value={values.partner} onChange={(e) => set("partner", e.target.value)} placeholder="Name, if there is one" />
          </div>
        </div>
        <div>
          <label className={label} htmlFor="manual_processes">What do you do by hand today that you wish you didn&apos;t?</label>
          <textarea id="manual_processes" className={input} rows={3} value={values.manual_processes} onChange={(e) => set("manual_processes", e.target.value)} />
        </div>
        <div>
          <label className={label} htmlFor="biggest_pain">Your biggest frustration with how the phone, bookings or follow-up work now</label>
          <textarea id="biggest_pain" className={input} rows={3} value={values.biggest_pain} onChange={(e) => set("biggest_pain", e.target.value)} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">How to reach you</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={label} htmlFor="name">Your name</label>
            <input id="name" className={input} value={values.name} onChange={(e) => set("name", e.target.value)} required autoComplete="name" />
          </div>
          <div>
            <label className={label} htmlFor="phone">Mobile number</label>
            <input id="phone" className={input} type="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} placeholder="214-555-0123" autoComplete="tel" />
          </div>
          <div>
            <label className={label} htmlFor="email">Email</label>
            <input id="email" className={input} type="email" value={values.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label} htmlFor="zip">ZIP</label>
              <input id="zip" className={input} inputMode="numeric" maxLength={5} value={values.zip} onChange={(e) => set("zip", e.target.value.replace(/\D/g, ""))} autoComplete="postal-code" />
            </div>
            <div>
              <label className={label} htmlFor="city">City</label>
              <input id="city" className={input} value={values.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" />
            </div>
          </div>
        </div>
        {/* A field people never see; a bot that fills every box fills this one. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Pick a time</h2>
        <p className="text-slate-400 text-sm">Thirty minutes by phone or video with our founder. Times are shown in Central time.</p>
        {slotsNote && <p className="text-slate-400">{slotsNote}</p>}
        <div className="space-y-4">
          {days.map((d) => (
            <div key={d.day}>
              <div className="text-sm font-semibold text-slate-300 mb-2">{d.day}</div>
              <div className="flex flex-wrap gap-2">
                {d.slots.map((s) => (
                  <button
                    type="button"
                    key={s.key}
                    onClick={() => setSlot(slot === s.key ? "" : s.key)}
                    aria-pressed={slot === s.key}
                    className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                      slot === s.key ? "bg-cyan-500 text-[#020817] border-cyan-500 font-bold" : "border-white/15 text-slate-300 hover:border-cyan-400"
                    }`}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <label className="flex items-start gap-3 text-sm text-slate-300">
          <input type="checkbox" className="mt-1" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
          <span>
            You may call, text and email me about my demo. Message and data rates may apply; reply STOP to end texts.
          </span>
        </label>
        {turnstileSiteKey && <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="dark" />}
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-cyan-500 text-[#020817] font-bold text-lg hover:bg-cyan-400 transition-colors disabled:opacity-60"
        >
          {busy ? "Sending…" : slot ? (trial ? "Book my onboarding call" : "Book my demo") : "Send and have us call me"}
        </button>
      </section>
    </form>
  );
}
