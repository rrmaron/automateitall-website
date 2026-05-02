import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020817] text-slate-100">
      <Nav />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <CaseStudy />
        <Industries />
        <FreeTrial />
        <CTA />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

/* ─── Navigation ─────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#020817]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight">
          <span className="text-white">automate</span>
          <span className="text-cyan-400">it</span>
          <span className="text-white">all</span>
          <span className="text-cyan-400">.ai</span>
        </span>
        <a
          href="#contact"
          className="text-sm font-medium px-5 py-2 rounded-full bg-cyan-500 text-[#020817] hover:bg-cyan-400 transition-colors"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="pt-40 pb-28 px-6 text-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/30 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Business Process Automation
        </div>

        <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 border border-emerald-400/30 rounded-full px-5 py-2 mb-4 bg-emerald-400/5">
          🛁 Bath remodeling companies — 14-day free trial, no credit card required
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-8">
          Automate{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            any business process.
          </span>
          <br />
          For any industry.
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          We build fully integrated operations platforms tailored to how your business actually runs —
          sales, scheduling, inventory, payments, commissions, and customer communication in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#free-trial"
            className="px-8 py-4 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition-colors text-lg"
          >
            Start free trial →
          </a>
          <a
            href="#case-study"
            className="px-8 py-4 rounded-full border border-white/15 text-slate-300 hover:border-white/30 hover:text-white transition-colors text-lg"
          >
            See it in action
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "We learn your operation",
      description:
        "We embed in your workflow — talking to your team, mapping every handoff, every manual step, every spreadsheet. We find the friction before we write a line of code.",
    },
    {
      number: "02",
      title: "We build your platform",
      description:
        "A custom operations hub tailored to your exact process. Not a SaaS template you adapt to — software that adapts to you. Webhooks, integrations, dashboards, automations.",
    },
    {
      number: "03",
      title: "Your team runs faster",
      description:
        "Leads flow in automatically. Jobs are tracked. Inventory is counted. Commissions are calculated. Installers are scheduled. Nothing falls through the cracks.",
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How we work</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every engagement is different. The process is the same.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative p-8 rounded-2xl border border-white/8 bg-white/2 hover:border-cyan-400/30 hover:bg-white/4 transition-all">
              <div className="text-5xl font-bold text-cyan-400/20 mb-4 font-mono">{step.number}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Case Study ─────────────────────────────────────────────────────────── */
function CaseStudy() {
  const metrics = [
    { value: "100%", label: "Of leads captured automatically" },
    { value: "0", label: "Spreadsheets in the workflow" },
    { value: "1 platform", label: "Sales · Ops · Inventory · Pay" },
    { value: "Real-time", label: "Commissions & installer pay" },
  ];

  const features = [
    "Webhook-driven lead ingestion from CRM",
    "Automated job creation, assignment & tracking",
    "Live inventory with reorder alerts",
    "Installer scheduling & pay sheets",
    "Commission calculation engine",
    "Customer-facing quote signing portal",
    "Role-based access for every team member",
    "Multi-tenant platform — one codebase, many franchises",
  ];

  return (
    <section id="case-study" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/30 rounded-full px-4 py-1.5 mb-6">
            Live proof of concept
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Built for bath remodeling.
            <br />
            <span className="text-slate-400">The pattern works everywhere.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We built a full operations platform for a national bath remodeling company — replacing a
            patchwork of spreadsheets, emails, and manual processes with one integrated system.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {metrics.map((m) => (
            <div key={m.label} className="p-6 rounded-2xl border border-white/8 bg-white/2 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{m.value}</div>
              <div className="text-sm text-slate-400">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Feature list */}
        <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-3 p-4 rounded-xl border border-white/6 bg-white/2">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-slate-300">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Industries ─────────────────────────────────────────────────────────── */
function Industries() {
  const industries = [
    {
      icon: "🔧",
      name: "Home Services",
      examples: "HVAC, plumbing, electrical, remodeling, roofing",
    },
    {
      icon: "🏥",
      name: "Healthcare",
      examples: "Patient scheduling, billing, provider operations",
    },
    {
      icon: "🏗️",
      name: "Construction",
      examples: "Project tracking, subcontractor management, materials",
    },
    {
      icon: "🚚",
      name: "Field Operations",
      examples: "Dispatch, route optimization, technician pay",
    },
    {
      icon: "🏬",
      name: "Retail & Franchise",
      examples: "Multi-location ops, inventory, staff management",
    },
    {
      icon: "⚙️",
      name: "Any Industry",
      examples: "If your team has a process, we can automate it",
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The pattern is universal</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every industry has leads, jobs, people, inventory, and payments. We automate the
            connective tissue between all of it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="p-6 rounded-2xl border border-white/8 bg-white/2 hover:border-cyan-400/30 hover:bg-white/4 transition-all"
            >
              <div className="text-3xl mb-4">{ind.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{ind.name}</h3>
              <p className="text-sm text-slate-400">{ind.examples}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Free Trial ─────────────────────────────────────────────────────────── */
function FreeTrial() {
  const includes = [
    "Full access to the bath remodeling operations platform",
    "Webhook-driven lead ingestion from your CRM",
    "Automated job creation, assignment & tracking",
    "Live inventory with reorder alerts",
    "Installer scheduling & pay sheets",
    "Commission calculation engine",
    "Customer-facing quote signing portal",
    "Onboarding call with our team",
  ];

  return (
    <section id="free-trial" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-emerald-500/8 blur-3xl" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-400/30 rounded-full px-4 py-1.5 mb-6">
              Bath Remodeling Companies
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              14 days free.{" "}
              <span className="text-emerald-400">No credit card required.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Get full access to the same platform we built for a national bath remodeling company —
              configured for your operation in one onboarding call.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto mb-10">
              {includes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="mailto:hello@automateitall.ai?subject=14-Day Free Trial — Bath Remodeling"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-400 transition-colors"
            >
              Claim your free trial →
            </a>
            <p className="text-xs text-slate-500 mt-4">
              We&apos;ll reach out within one business day to get you set up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/8 blur-3xl" />
        </div>

        <div className="relative">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Different industry?
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Let&apos;s talk.
            </span>
          </h2>
          <p className="text-slate-400 text-xl mb-10 max-w-xl mx-auto">
            Tell us about your business. We&apos;ll show you exactly what your automation platform
            could look like.
          </p>

          <a
            href="mailto:hello@automateitall.ai"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-cyan-500 text-[#020817] font-bold text-lg hover:bg-cyan-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            hello@automateitall.ai
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <span>
          <span className="text-white font-medium">automateitall.ai</span> — Business process
          automation for any industry
        </span>
        <span>© {new Date().getFullYear()} AutomateItAll</span>
      </div>
    </footer>
  );
}
