import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

// Generated from the evrapps repo's templates/legal_privacy.html by scratchpad/legal_to_tsx.py: change the text there.
export const metadata: Metadata = {
  title: "Privacy policy — AutomateItAll",
  description: "What AutomateItAll collects on its website and in its software, whom it is shared with, and the choices you have.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="October 30, 2026">
      <p>AutomateItAll builds and runs business software. This policy covers our website at automateitall.ai, the EvrApps platform at evrapps.com (including company-branded addresses that point to it), the hiring site at myhiringprocess.com, and the texts, emails and phone lines we run for the companies that use them. It explains what we collect, what we do with it and the choices you have.</p>

      <h2>Two kinds of people this policy covers</h2>
      <p><strong>People at a company that uses our software.</strong> A remodeling company, clinic or other business (the &quot;Company&quot;) subscribes to the platform and its staff sign in to run the business: leads, appointments, quotes, jobs, payments, hiring and payroll.</p>
      <p><strong>The Company&apos;s customers and applicants.</strong> The Company enters its customers&apos; details, or pulls them in from systems it connects, and may use the platform to text, email and call them. Job applicants use the hiring site. For this information the Company decides what is collected and why; we process it on the Company&apos;s instructions. If you are a customer or applicant of a Company, questions about your information go to that Company first, and we help them answer.</p>

      <h2>What we collect</h2>
      <table>
        <tbody>
          <tr><th scope="row" style={{ width: "11rem" }}>Platform users</th>
              <td>Name, username, work email and phone, role; a hashed password; an authenticator secret and recovery codes when two-step sign-in is on; a record of sign-ins and of what was changed, with the IP address and browser used.</td></tr>
          <tr><th scope="row">A Company&apos;s customers</th>
              <td>Name, address, phone and email; project details, measurements and photos; quotes and signed agreements; appointment times and notes; payment records (amount, date, the processor&apos;s reference, and the card brand and last four digits only: the full card number never reaches us); texts and emails exchanged through the platform; recordings and transcripts of calls the Company makes or receives through it.</td></tr>
          <tr><th scope="row">Job applicants</th>
              <td>When a Company uses the hiring tools: application answers, résumé, assessment results, recordings of phone interviews, documents the applicant signs, and background-check results where the applicant consented to a check.</td></tr>
          <tr><th scope="row">Visitors to automateitall.ai</th>
              <td>What you type into the contact or demo forms, your messages to the site&apos;s chat assistant, and calls to the demo phone line, which are recorded and transcribed.</td></tr>
        </tbody>
      </table>

      <h2>How we use it</h2>
      <ul>
        <li>To provide, support and secure the service: signing you in, showing the Company its own data, sending the texts, emails and calls the Company asks for, taking payments through the processor the Company chose, and keeping backups.</li>
        <li>For the AI features the Company turns on: call summaries, drafted replies, phone assistants that answer or place calls, and transcription. To produce a result we send the relevant text or audio to an AI provider listed below.</li>
        <li>To answer your enquiry when you contact us through the website, the chat assistant or the demo line.</li>
        <li>To find and fix problems, prevent abuse and meet legal obligations.</li>
      </ul>
      <p>We do not sell personal information and we do not use it for advertising.</p>

      <h2>Who we share it with</h2>
      <p>Service providers that do a job for us, under contracts that limit what they can do with the data. Today they are:</p>
      <ul>
        <li>Hosting and storage: Render, Vercel, Amazon Web Services.</li>
        <li>Email: Resend, Google Workspace. Texts and phone calls: Twilio. AI phone assistants: Vapi. Transcription: AssemblyAI.</li>
        <li>AI text features: Anthropic on the platform; Google on the website&apos;s chat assistant.</li>
        <li>Calendar sync: Google Calendar. Bot protection on web forms: Cloudflare.</li>
        <li>Card processing, whichever the Company chose: Zift, Intuit (QuickBooks Payments) or Square. Electronic signing: DocuSign, where a Company uses it.</li>
        <li>Systems a Company connects to bring its own data in or out: CompanyCam, ServiceMinder, One Click Contractor, Hatch, Drop Cowboy, Checkr (background checks).</li>
      </ul>
      <p>A Company connects most of these itself and can disconnect them in its admin pages. Providers change from time to time; we keep this list current. We also share information when the law requires it, to protect people or our rights, and, if the business is sold or merged, with the new owner under this same policy.</p>

      <h2>QuickBooks Online</h2>
      <p>A Company can connect its own QuickBooks Online account so that payment links are QuickBooks invoices paid through QuickBooks Payments. When it does, we store the access tokens Intuit gives us, and in that Company&apos;s QuickBooks we create or look up the customer, create a service item and the invoice, and read the invoice&apos;s status and the payment that settled it. We do not read the rest of the Company&apos;s books. Disconnecting on the Company&apos;s Admin › Payments page revokes the token with Intuit and deletes it from our systems. Intuit&apos;s own terms and privacy policy apply to the QuickBooks side.</p>

      <h2>Texting, calling and recording</h2>
      <p>Texts sent through the platform go to people who gave the Company their number. Reply STOP to any text to stop receiving texts from that Company; the platform honors it automatically. Mobile phone numbers and texting opt-in are not shared with third parties or affiliates for marketing or promotional purposes.</p>
      <p>Calls made or received through the platform, including calls answered by an AI assistant, may be recorded and transcribed so the Company can review them. The Company is responsible for giving callers the notice its state requires.</p>

      <h2>Security</h2>
      <p>Connections are encrypted with HTTPS. Passwords are stored hashed, never in plain text. Two-step sign-in is available to every Company and is required for our own platform administrators. Each Company&apos;s data is separated by company, access to production systems is limited to the people who need it, and we keep backups. No system is perfectly secure; if you believe your information has been exposed, write to us at the address below.</p>

      <h2>How long we keep it</h2>
      <p>We keep a Company&apos;s data for as long as its account is open and the data is needed for the purpose it was collected for. When an account closes, the Company can ask for an export of its data; after that we delete or anonymize it within a reasonable time, normally 90 days, except for records we must keep by law, such as payment and signed-agreement records and security logs.</p>

      <h2>Your choices and rights</h2>
      <p>You can ask to see, correct or delete personal information we hold about you, and to know how it is used. Depending on where you live, state law may give you these rights formally; we honor them for everyone. Platform users can edit their own profile in the app. Customers and applicants of a Company should ask the Company, which can make the change itself or ask us to. Write to us at the address below and we will respond within 30 days. We will not treat you differently for exercising these rights.</p>

      <h2>Cookies</h2>
      <p>The platform sets a session cookie so you stay signed in, and the demo form on our website uses Cloudflare&apos;s bot check, which sets its own cookie. We use no advertising cookies and no third-party analytics.</p>

      <h2>Children</h2>
      <p>Our services are for businesses and their adult customers and applicants. They are not directed at anyone under 18, and we do not knowingly collect information from children.</p>

      <h2>Where the data lives</h2>
      <p>Our systems and providers run in the United States. If you use the service from elsewhere, your information is processed in the United States.</p>

      <h2>Changes to this policy</h2>
      <p>When we change this policy we update the date at the top. If a change materially affects how we use personal information, we tell Companies by email or in the app before it takes effect.</p>

      <h2>Contact</h2>
      <p>AutomateItAll, <a href="mailto:hello@automateitall.ai">hello@automateitall.ai</a>.</p>
    </LegalPage>
  );
}
