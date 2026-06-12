import Link from "next/link";

export default function PrideMantraHub() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">PrideMantra Menu</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Dynamic Minis</h2>
        <div className="flex flex-col gap-2">
          <Link href="/find-your-right-time" className="text-blue-500 hover:underline">Find Your Right Time</Link>
          <Link href="/gentle-check-in" className="text-blue-500 hover:underline">Gentle Check-In</Link>
          <Link href="/identity-exploration" className="text-blue-500 hover:underline">Identity Exploration</Link>
          <Link href="/identity-reflection" className="text-blue-500 hover:underline">Identity Reflection</Link>
          <Link href="/identity-journey" className="text-blue-500 hover:underline">Identity Journey</Link>
          <Link href="/pride-journal" className="text-blue-500 hover:underline">Pride Journal</Link>
          <Link href="/pride-mirror-moments" className="text-blue-500 hover:underline">Pride Mirror Moments</Link>
          <Link href="/pride-spectrum" className="text-blue-500 hover:underline">Pride Spectrum</Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Static Minis</h2>
        <div className="flex flex-col gap-2">
          <Link href="/bi-identity-affirmations" className="text-blue-500 hover:underline">Bi Identity Affirmations</Link>
          <Link href="/bi-family-friends-convo" className="text-blue-500 hover:underline">Bisexual Conversations</Link>
          <Link href="/bisexual-stories" className="text-blue-500 hover:underline">Bisexual Stories</Link>
          <Link href="/bi-mental-health" className="text-blue-500 hover:underline">Bisexual Wellbeing Compass</Link>
          <Link href="/bi-coming-out" className="text-blue-500 hover:underline">Coming Out Bisexual</Link>
          <Link href="/dealing-with-dysphoria" className="text-blue-500 hover:underline">Dealing With Dysphoria</Link>
          <Link href="/joy-pride-trans" className="text-blue-500 hover:underline">Joy Pride Trans</Link>
          <Link href="/medical-transition" className="text-blue-500 hover:underline">Navigating Medical Transition</Link>
          <Link href="/trans-and-mental-health" className="text-blue-500 hover:underline">Trans And Mental Health</Link>
          <Link href="/trans-coming-out" className="text-blue-500 hover:underline">Trans Coming Out</Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Claude HTML Minis</h2>
        <div className="flex flex-col gap-2">
          <Link href="/content/celebrate-wlw" className="text-blue-500 hover:underline">Celebrate WLW</Link>
          <Link href="/content/coming-out-practice" className="text-blue-500 hover:underline">Coming Out Practice</Link>
          <Link href="/content/confidence-mirror" className="text-blue-500 hover:underline">Confidence Mirror</Link>
          <Link href="/content/when-they-react" className="text-blue-500 hover:underline">Handle Reactions of Others</Link>
          <Link href="/content/gay-and-proud" className="text-blue-500 hover:underline">Gay And Proud</Link>
          <Link href="/content/gay-coming-out" className="text-blue-500 hover:underline">Gay Coming Out</Link>
          <Link href="/content/dealing-with-homophobia" className="text-blue-500 hover:underline">Dealing with Homophobia</Link>
          <Link href="/content/lesbian-power-booster" className="text-blue-500 hover:underline">Lesbian Power Booster</Link>
          <Link href="/content/real-stories-of-lesbian-women" className="text-blue-500 hover:underline">Lesbian Real Stories</Link>
          <Link href="/content/masculinity-on-your-own-terms" className="text-blue-500 hover:underline">Masculinity on Your Own Terms</Link>
          <Link href="/content/lgbtq-stories" className="text-blue-500 hover:underline font-bold">LGBTQ+ Stories (Main)</Link>
        </div>
      </section>
    </div>
  );
}
