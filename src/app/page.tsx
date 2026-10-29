import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020817] text-slate-100">
      <Nav />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Platform />
        <Franchisors />
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
        <div className="flex items-center gap-3">
          <a
            href="tel:+13207034271"
            className="hidden sm:flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (320) 703-4271
          </a>
          <a
            href="#contact"
            className="text-sm font-medium px-5 py-2 rounded-full bg-cyan-500 text-[#020817] hover:bg-cyan-400 transition-colors"
          >
            Get in touch
          </a>
        </div>
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
          One platform, built around how your business actually runs: an AI that answers and makes your
          phone calls, appointment booking and confirmation, customer service, hiring and HR, scheduling,
          inventory and payments — with your existing systems imported on day one.
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
        "Leads flow in and are called back within a minute. The phone is answered. Appointments are booked and confirmed. Jobs, inventory, pay and commissions are tracked. Nothing falls through the cracks.",
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

/* ─── Platform ───────────────────────────────────────────────────────────── */
function Platform() {
  const areas = [
    {
      icon: "📞",
      title: "Inbound calling",
      lede: "An AI receptionist answers your main line and deals with the call itself.",
      points: [
        "Recognises the caller by number and greets them by name",
        "Books an appointment against real availability and writes it to the calendar",
        "Logs service and warranty issues and texts a photo-upload link",
        "Reads back project progress; confirms, moves or cancels appointments",
        "Takes complaints as urgent and alerts the owners; turns away sales calls",
        "Live transfer for emergencies — if nobody answers, it says so and takes the details",
        "Your team can listen in or take over any live call, from any page",
      ],
    },
    {
      icon: "📲",
      title: "Outbound calling & texting",
      lede: "New leads are called and texted within a minute, then followed up on a schedule.",
      points: [
        "Speed to lead: an AI setter calls and texts the moment a lead arrives",
        "A follow-up cadence of calls and texts, inside your calling window",
        "Confirmation calls within 36 hours of every appointment",
        "Service-call follow-ups, with redials after voicemail or no answer",
        "Campaigns: timed text and email sequences; a reply queues a callback that can book",
        "A shared team inbox for texts, with a record of every consent and opt-out",
      ],
    },
    {
      icon: "🛠️",
      title: "Customer service",
      lede: "Every call, text and email about a customer lands in one thread.",
      points: [
        "Service calls from phone and email, with photos, urgency and assignment",
        "Quotes with built-in e-signing, change orders signed by link, invoices",
        "Card payment links by text; balances read out only after a texted code",
        "Printable and online forms, filled and signed by link",
        "Customer notifications by stage and channel, each one approved before it goes",
        "Complaints logged as urgent, with the owners notified",
      ],
    },
    {
      icon: "📅",
      title: "Appointment booking & confirmation",
      lede: "One set of booking rules for your office, the AI and your website.",
      points: [
        "Assigns the right person, checks conflicts and creates the calendar event",
        "Each person's hours, time off and slots; a coordinator grid; the install schedule",
        "Night-before allocation: reps see tomorrow's appointments, nothing further out",
        "AI confirmation calls; results recorded; closing rate texted daily",
        "Google Calendar and ServiceMinder sync",
        "Lead-flow monitoring that flags a drop from any source and can email the rep",
      ],
    },
    {
      icon: "👥",
      title: "Employees, hiring & HR",
      lede: "From job posting to trained, paid employee, with the paperwork done.",
      points: [
        "Job postings with an Indeed feed; applications behind an anti-bot check",
        "DISC assessment, NDA and contract e-signing, study materials and quizzes",
        "An AI phone interview and a Checkr background check",
        "Hands-on training on the real screens, each section ending in a quiz",
        "Employee roster showing missing paperwork, a private document vault, self-service HR",
        "Installer pay sheets with approvals and advances; commissions on signed contracts",
      ],
    },
    {
      icon: "🔌",
      title: "Your existing systems, imported",
      lede: "History comes with you, so day one isn't a blank screen.",
      points: [
        "CompanyCam, One Click Contractor, ServiceMinder, Hatch, ProNexis, Ingage",
        "Lead emails parsed from Angi, Modernize, HomeBuddy, Yelp, Bark, Google LSA and Facebook",
        "Google Calendar shared by role; a vendor webhook and a public form for leads",
        "Inventory with receiving, check-out and a nightly reorder queue",
        "Presentations in the browser, with your Google reviews pulled in",
        "Reports: sales stats, profitability, and a call log with recordings and transcripts",
      ],
    },
  ];

  return (
    <section id="platform" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What the platform does</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Phone, texts, bookings, service, people and pay in one system. All of it runs today for a
            national bath remodeling brand; the wording changes with your industry, the machinery doesn&apos;t.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((a) => (
            <div
              key={a.title}
              className="p-6 rounded-2xl border border-white/8 bg-white/2 hover:border-cyan-400/30 hover:bg-white/4 transition-all flex flex-col"
            >
              <div className="text-3xl mb-4">{a.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{a.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{a.lede}</p>
              <ul className="space-y-2 mt-auto">
                {a.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Franchisors ────────────────────────────────────────────────────────── */
function Franchisors() {
  const points = [
    {
      title: "Every location on one platform",
      text: "Each location is its own company: its own people, roles, calendars, inventory, phone line and data. You see all of them from the platform dashboard, and a franchisor\u2019s person can be given access to any set of locations and switch between them.",
    },
    {
      title: "One master setup, applied everywhere",
      text: "The inbound phone line and its call flow, the master sales presentation, the price list and line-item rules: set once, applied to every location in one click, and kept in step when they change.",
    },
    {
      title: "The sales process, measured, not assumed",
      text: "Every location runs the same booking rules, the same confirmation calls and the same presentation. In-home appointments are recorded, transcribed and graded against the sales method, and each salesperson\u2019s closing rate is tracked and sent to them daily.",
    },
    {
      title: "Every location's sales on one page",
      text: "Appointments, sales, cancellations, close rate and dollars for every location side by side, month to date or any range, with a total; one click opens that location's own report. Plus profitability, lead flow by source, the call log with recordings and balance alerts per location, without asking anyone for a spreadsheet.",
    },
    {
      title: "New locations open ready to sell",
      text: "A new location is created with its calendars, its copy of the master presentation and its starter inventory. Hiring and training run the same way everywhere: job postings, DISC, e-signing, background checks and hands-on training with quizzes.",
    },
    {
      title: "History moves with them",
      text: "A location joining from CompanyCam, One Click Contractor, ServiceMinder, Hatch, ProNexis or Ingage brings its jobs, contacts, calls and decks along, so day one is not a blank screen.",
    },
  ];

  return (
    <section id="franchisors" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/30 rounded-full px-4 py-1.5 mb-6">
            For franchisors
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See every location&apos;s sales.
            <br />
            <span className="text-slate-400">Run every location the same way.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Built for a bath remodeling franchise with locations across the country, where the franchisor needed
            the same process, the same numbers and the same phone experience everywhere, without chasing each owner.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {points.map((p) => (
            <div key={p.title} className="p-6 rounded-2xl border border-white/8 bg-white/2 hover:border-cyan-400/30 hover:bg-white/4 transition-all">
              <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.text}</p>
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
    "Leads from Angi, Modernize, Google LSA, Facebook and the website, called back within a minute",
    "An AI receptionist on the main line: booking, service, progress, complaints",
    "Automated job creation, assignment & tracking from signed estimates",
    "Live inventory with a nightly reorder queue",
    "Installer scheduling, availability & pay sheets",
    "Commissions on every signed contract",
    "Quotes signed on the platform, payments by card link",
    "Hiring, training and HR for every new salesperson",
    "Role-based access for every team member",
    "One platform, many franchise locations — a master setup applied to each",
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
      icon: "🏥",
      name: "Medical, dental & clinics",
      examples: "New-patient booking, reminders and confirmation calls, reschedules, intake forms signed by link, follow-up calls after a visit",
    },
    {
      icon: "🏗️",
      name: "Construction & remodeling",
      examples: "Estimates booked on the call, project-progress calls, service and warranty, installer schedules and pay",
    },
    {
      icon: "🔧",
      name: "Home services & trades",
      examples: "HVAC, plumbing, electrical, roofing: service calls, on-my-way calls and texts, campaigns to open quotes",
    },
    {
      icon: "🏬",
      name: "Franchise & multi-location",
      examples: "One platform per location, a master phone setup applied to each, a view across all of them",
    },
    {
      icon: "🚚",
      name: "Field operations",
      examples: "Who is available when, schedules, time off, pay sheets with approvals",
    },
    {
      icon: "📅",
      name: "Any appointment business",
      examples: "Salons, auto shops, cleaners, advisers: the phone answered, appointments booked, confirmed and chased",
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The pattern is universal</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every industry has a phone that rings, appointments to book and confirm, customers to look
            after, and people to hire and pay. We automate all of it, in your industry&apos;s own terms.
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
    "Your inbound line answered by the AI receptionist",
    "New leads called and texted within a minute",
    "Appointment booking, confirmation calls and night-before allocation",
    "Quotes signed on the platform, change orders, payment links",
    "Live inventory, installer pay sheets and commissions",
    "Your CompanyCam, ServiceMinder or One Click history imported",
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@automateitall.ai?subject=14-Day Free Trial — Bath Remodeling"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-400 transition-colors"
              >
                Claim your free trial →
              </a>
              <a
                href="tel:+13207034271"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-emerald-400/30 text-emerald-400 font-bold text-lg hover:bg-emerald-400/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (320) 703-4271
              </a>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Call our AI anytime · Email us and we&apos;ll reply within one business day
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13207034271"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-cyan-500 text-[#020817] font-bold text-lg hover:bg-cyan-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (320) 703-4271
            </a>
            <a
              href="mailto:hello@automateitall.ai"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-white/15 text-slate-300 font-bold text-lg hover:border-white/30 hover:text-white transition-colors"
            >
              hello@automateitall.ai
            </a>
          </div>
          <p className="text-xs text-slate-500 mt-4">Available 24/7 · Our team replies within one business day</p>
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
