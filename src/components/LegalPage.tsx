import Link from "next/link";

const CONTACT = "hello@automateitall.ai";

/** The frame for /privacy and /terms: the same text as evrapps.com's pages, in the site's own look. */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#020817] text-slate-100">
      <header className="border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">
            automateitall<span className="text-cyan-400">.ai</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm text-slate-400" aria-label="Legal pages">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of service</Link>
            <Link href="/demo" className="hover:text-white transition-colors">Book a demo</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated {updated}</p>
        <div className="legal mt-8">{children}</div>
        <hr className="my-10 border-white/10" />
        <p className="text-sm text-slate-500">
          Questions about this page:{" "}
          <a href={`mailto:${CONTACT}`} className="text-cyan-400 hover:text-cyan-300">
            {CONTACT}
          </a>
          . The same policy applies to our software at evrapps.com.
        </p>
      </main>

      <footer className="border-t border-white/5 py-8 px-6 text-sm text-slate-500 text-center">
        © {new Date().getFullYear()} AutomateItAll
      </footer>
    </div>
  );
}
