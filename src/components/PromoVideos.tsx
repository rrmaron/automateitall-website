"use client";

import { useEffect, useRef, useState } from "react";

// Which video plays by itself comes from EVR Apps' Platform > Defaults > Website videos (Roger, 2026-11-08).
const SETTING_URL = "https://evrapps.com/api/public/site-videos";

type Key = "bath" | "any";

const VIDEOS: { key: Key; src: string; poster: string; title: string; text: string }[] = [
  {
    key: "bath",
    src: "/videos/evr-apps-bathroom-remodelers.mp4",
    poster: "/videos/evr-apps-bathroom-remodelers.jpg",
    title: "For bathroom remodelers",
    text: "Follow one customer from the first call to the last warranty visit: lead, appointment, sales visit, measure, inventory, install, her own portal and service.",
  },
  {
    key: "any",
    src: "/videos/evr-apps-any-business.mp4",
    poster: "/videos/evr-apps-any-business.jpg",
    title: "For any business",
    text: "Calls answered day and night, every lead in one list, texts and work phones, scheduling, quotes and payments, your team and your growth.",
  },
];

export default function PromoVideos() {
  const [autoplay, setAutoplay] = useState<Key | "none">("any");
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    fetch(SETTING_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && ["bath", "any", "none"].includes(d.autoplay)) setAutoplay(d.autoplay);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    for (const v of VIDEOS) {
      const el = refs.current[v.key];
      if (!el) continue;
      if (v.key === autoplay) {
        el.muted = true;
        el.loop = true;
        el.play().catch(() => {});
      } else if (!el.paused && el.muted) {
        el.pause();
      }
    }
  }, [autoplay]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {VIDEOS.map((v) => {
        const on = v.key === autoplay;
        return (
          <div key={v.src} className="rounded-2xl border border-white/8 bg-white/2 overflow-hidden flex flex-col">
            <video
              ref={(el) => {
                refs.current[v.key] = el;
              }}
              className="w-full aspect-video bg-black"
              controls
              playsInline
              poster={v.poster}
              preload={on ? "auto" : "none"}
              muted={on}
              loop={on}
            >
              <source src={v.src} type="video/mp4" />
            </video>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-slate-400">{v.text}</p>
              {on && <p className="text-xs text-slate-500 mt-2">Playing without sound: press the speaker icon to hear it.</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
