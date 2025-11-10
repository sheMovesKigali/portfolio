import Link from "next/link";
import Image from "next/image";
import { MoneyIcon, ShieldIcon, CommunityIcon, LicenseIcon, PhoneIcon, CarIcon, CheckIcon } from "@/components/icons";
import AnimatedHeroText from "@/components/AnimatedHeroText";

export default function Home() {
  return (
    <>
      <section className="section-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12 sm:pb-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <AnimatedHeroText
                staticText="Safe rides that"
                rotatingWords={["Empower", "Protect", "Inspire", "Connect"]}
                endingText="women"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              />
              <p className="text-black/70 dark:text-white/80 text-base sm:text-lg max-w-prose">SheMoves connects riders with trained women drivers. Safety, respect, and reliability day or night.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/book" className="inline-flex items-center justify-center rounded-lg bg-black text-white px-6 py-3 text-sm font-medium hover:bg-black/90">Book a Ride</Link>
                <Link href="/drive" className="inline-flex items-center justify-center rounded-lg border border-black/15 dark:border-white/20 px-6 py-3 text-sm font-medium hover:bg-white/5">Drive with SheMoves</Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <Image src="/images/happy young Rwandan woman seated on driver's seat in a car.jpg" alt="Woman driver in car" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Numbers that matter</h2>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">Trusted by thousands of riders and drivers across Kigali</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">250+</p>
                <span className="text-xs text-green-400">+8% m/m</span>
              </div>
              <p className="mt-1 text-sm text-white/70">Active women drivers</p>
              <svg className="mt-4 h-12 w-full" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(34,197,94,0.6)" />
                    <stop offset="100%" stopColor="rgba(34,197,94,0)" />
                  </linearGradient>
                </defs>
                <path d="M0 15 L10 14 L20 13 L30 12 L40 11 L50 10 L60 9 L70 8 L80 7 L90 6 L100 5" stroke="#22c55e" strokeWidth="2" fill="url(#g1)" />
              </svg>
            </div>
            {/* Card 2 */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">120k</p>
                <span className="text-xs text-green-400">+12% y/y</span>
              </div>
              <p className="mt-1 text-sm text-white/70">Safe rides completed</p>
              <svg className="mt-4 h-12 w-full" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
                <path d="M0 18 L10 17 L20 15 L30 16 L40 14 L50 12 L60 13 L70 11 L80 9 L90 10 L100 8" stroke="#60a5fa" strokeWidth="2" fill="none" />
              </svg>
            </div>
            {/* Card 3 */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">4.9★</p>
                <span className="text-xs text-emerald-400">+0.1</span>
              </div>
              <p className="mt-1 text-sm text-white/70">Average rider rating</p>
              <svg className="mt-4 h-12 w-full" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
                <path d="M0 8 L10 9 L20 8 L30 7 L40 8 L50 7 L60 6 L70 7 L80 6 L90 7 L100 6" stroke="#facc15" strokeWidth="2" fill="none" />
              </svg>
            </div>
            {/* Card 4 */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">24/7</p>
                <span className="text-xs text-white/70">support</span>
              </div>
              <p className="mt-1 text-sm text-white/70">Human phone support</p>
              <svg className="mt-4 h-12 w-full" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
                <rect x="0" y="5" width="100" height="10" rx="2" fill="#334155" />
                <rect x="5" y="7" width="12" height="6" rx="1" fill="#22c55e" />
                <rect x="22" y="7" width="12" height="6" rx="1" fill="#22c55e" />
                <rect x="39" y="7" width="12" height="6" rx="1" fill="#22c55e" />
                <rect x="56" y="7" width="12" height="6" rx="1" fill="#22c55e" />
                <rect x="73" y="7" width="12" height="6" rx="1" fill="#22c55e" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* No Surcharges Section */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5 backdrop-blur-sm p-8 sm:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-2 mb-6">
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">Transparent Pricing</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                  No Surcharges{" "}
                  <span className="text-amber-600 dark:text-amber-400">Ever</span>
                </h2>
                <p className="text-lg text-black/70 dark:text-white/80 mb-6">
                  What you see is what you pay. No peak hour charges, no hidden fees, no surprises. Just fair, transparent pricing every single ride.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Same price, always</p>
                      <p className="text-sm text-black/60 dark:text-white/70">No surge pricing during rush hours or events</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">No booking fees</p>
                      <p className="text-sm text-black/60 dark:text-white/70">The price you see upfront is your final cost</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Fair for everyone</p>
                      <p className="text-sm text-black/60 dark:text-white/70">Riders save money, drivers earn fairly</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl sm:text-7xl font-bold text-amber-600 dark:text-amber-400 mb-4">
                      0%
                    </div>
                    <p className="text-xl font-semibold text-black/80 dark:text-white/90">Surge Pricing</p>
                    <p className="text-sm text-black/60 dark:text-white/70 mt-2">Rain or shine, day or night</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl" />
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning & Messaging Section */}
      <section className="section-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Our Mission & Vision
            </h2>
            <p className="mt-6 text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
              More than just transport we are building trust, empowerment, and community in Kigali.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {/* Positioning */}
            <div className="group relative h-full">
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.08] backdrop-blur-xl p-8 transition-all duration-300 hover:bg-white/[0.12] hover:border-white/20 hover:shadow-2xl h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                  <ShieldIcon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white">Our Positioning</h3>
                <div className="space-y-5 flex-grow">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-sm font-semibold text-white mb-2">Core Promise</p>
                    <p className="text-white/90 leading-relaxed">Safe, respectful, and reliable rides by women drivers, for everyone with emphasis on women&apos;s comfort & empowerment.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-sm font-semibold text-white mb-2">Differentiator</p>
                    <p className="text-white/90 leading-relaxed">Unlike Uber/Bolt/Yego, SheMoves isn&apos;t just about transport it&apos;s about trust + empowerment.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messaging Pillars */}
            <div className="group relative h-full">
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.08] backdrop-blur-xl p-8 transition-all duration-300 hover:bg-white/[0.12] hover:border-white/20 hover:shadow-2xl h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                  <CommunityIcon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white">Messaging Pillars</h3>
                <div className="space-y-4 flex-grow">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                    <div>
                      <p className="font-semibold text-white mb-1">Safety</p>
                      <p className="text-white/90 text-sm leading-relaxed">Vetted drivers, respectful rides, peace of mind day & night.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                    <div>
                      <p className="font-semibold text-white mb-1">Women&apos;s Empowerment</p>
                      <p className="text-white/90 text-sm leading-relaxed">Every ride supports women drivers earning fair income.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                    <div>
                      <p className="font-semibold text-white mb-1">Community</p>
                      <p className="text-white/90 text-sm leading-relaxed">Built for Kigali, by Kigali women, rooted in local culture.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Audiences */}
            <div className="group relative h-full">
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.08] backdrop-blur-xl p-8 transition-all duration-300 hover:bg-white/[0.12] hover:border-white/20 hover:shadow-2xl h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                  <MoneyIcon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white">Target Audiences</h3>
                <div className="space-y-4 flex-grow">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-white/60"></div>
                      <p className="font-semibold text-white">Riders</p>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">Women (especially students, professionals, expats) who want a safer option, plus allies who support the mission.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-white/60"></div>
                      <p className="font-semibold text-white">Drivers</p>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">Women who want flexible, dignified, and fair-paying work.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-white/60"></div>
                      <p className="font-semibold text-white">Partners/Investors</p>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">Feminist orgs, local government, women&apos;s economic empowerment donors.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Why drive with SheMoves?</h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">Join hundreds of women earning on their own schedule while making Kigali safer for everyone.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Flexible earnings", desc: "Set your own hours and earn up per day. Keep 80% of every fare.", icon: MoneyIcon },
              { title: "Safety first", desc: "Rigorous background checks, in-app SOS, and 24/7 support for your peace of mind.", icon: ShieldIcon },
              { title: "Supportive community", desc: "Join a network of women drivers with training, mentorship, and peer support.", icon: CommunityIcon },
            ].map((c) => (
              <div key={c.title} className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 transition-all hover:bg-white/10 hover:shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <c.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-white/70">{c.desc}</p>
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Real driver stories</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-white pl-6">
                  <p className="text-white/80 italic">&ldquo;SheMoves gave me the freedom to work around my children&apos;s schedule while earning more than my previous job. The safety features give me confidence every day.&rdquo;</p>
                  <p className="mt-2 font-semibold">— Grace M., Driver since 2023</p>
                </div>
                <div className="border-l-4 border-white pl-6">
                  <p className="text-white/80 italic">&ldquo;I love being part of a community that empowers women. The training and support helped me become a confident driver.&rdquo;</p>
                  <p className="mt-2 font-semibold">— Alice K., Driver since 2022</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <Image src="/images/happy young Rwandan woman seated on driver's seat in a car driving clients.jpg" alt="Woman driver at work" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ready to start driving?</h2>
            <p className="mt-3 text-white/70">Join SheMoves today and start earning on your schedule.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h3 className="text-2xl font-semibold mb-5">Requirements</h3>
              <ul className="space-y-3 text-white/80">
                {[
                  { text: "Valid driver's license (2+ years experience)", icon: LicenseIcon },
                  { text: "Clean driving record", icon: CheckIcon },
                  { text: "Reliable vehicle (2010 or newer)", icon: CarIcon },
                  { text: "Smartphone with data plan", icon: PhoneIcon },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-green-500 text-white">
                      <item.icon className="w-4 h-4" />
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-sm text-white/60">Onboarding</p>
                  <p className="font-semibold">1–3 days</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-sm text-white/60">Payouts</p>
                  <p className="font-semibold">Weekly</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-sm text-white/60">Support</p>
                  <p className="font-semibold">24/7</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-green-500/20 to-emerald-500/10 blur-xl rounded-3xl" aria-hidden />
              <div className="relative rounded-3xl p-8 ring-1 ring-white/10 shadow-lg bg-white/5 backdrop-blur">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Driver Benefits</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-600 text-white">Premium</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Competitive Earnings</p>
                      <p className="text-xs text-white/70">Keep 80% of every fare you earn</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Flexible Schedule</p>
                      <p className="text-xs text-white/70">Work when you want, as much as you want</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Weekly Payouts</p>
                      <p className="text-xs text-white/70">Get paid every week, no delays</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">24/7 Support</p>
                      <p className="text-xs text-white/70">Always here when you need us</p>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Link href="/drive" className="inline-flex items-center justify-center rounded-lg bg-white text-black px-6 py-3 font-medium hover:bg-white/90 shadow">
                    Apply to drive
                  </Link>
                  <Link href="/about" className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 font-medium hover:bg-white/5">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
