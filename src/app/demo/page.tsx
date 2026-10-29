import type { Metadata } from "next";
import Link from "next/link";
import DemoForm from "@/components/DemoForm";
import { stamp } from "@/lib/human";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a demo — AutomateItAll",
  description:
    "Tell us about your business and pick a time. Our founder shows you the platform running for a business like yours: the phone answered, appointments booked and confirmed, customer service, hiring and payments in one place.",
};

export default async function DemoPage({ searchParams }: { searchParams: Promise<{ trial?: string }> }) {
  const params = await searchParams;
  const trial = Boolean(params?.trial);
  // The signed timestamp is made when the page is served (the form is refused if it comes back within 3 seconds).
  const formStamp = stamp();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  return (
    <div className="flex flex-col min-h-screen bg-[#020817] text-slate-100">
      <header className="border-b border-white/5 bg-[#020817]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <span className="text-white">automate</span>
            <span className="text-cyan-400">it</span>
            <span className="text-white">all</span>
            <span className="text-cyan-400">.ai</span>
          </Link>
          <a href="tel:+13207034271" className="text-sm text-slate-300 hover:text-white transition-colors">
            Or call (320) 703-4271
          </a>
        </div>
      </header>
      <main className="flex-1 px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {trial ? "Start your 14-day free trial" : "Book a demo with our founder"}
          </h1>
          <p className="text-slate-400 text-lg mb-10">
            {trial
              ? "Tell us about your bath remodeling company and pick a time for the onboarding call: thirty minutes by phone or video, and your platform is set up on the call."
              : "The same questions our AI asks when you call, in a form. Pick a time at the end and the demo is on our calendar; you get a text and an email with your next steps straight away."}
          </p>
          <DemoForm formStamp={formStamp} turnstileSiteKey={siteKey} trial={trial} />
        </div>
      </main>
      <footer className="border-t border-white/5 py-8 px-6 text-sm text-slate-500 text-center">
        We call, text and email you only about your demo. Reply STOP to any text to end them.
      </footer>
    </div>
  );
}
