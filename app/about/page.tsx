export const metadata = { title: "About" };
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <header className="max-w-3xl">
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">About SheMoves</h1>
                <p className="mt-4 text-white/80">SheMoves is a Kigali‑born mobility platform led by women, for women. We create dignified income for women drivers and safer rides for everyone, day or night.</p>
            </header>

            {/* Hero Card */}
            <section className="mt-10 grid lg:grid-cols-2 gap-8 items-stretch">
                <div className="rounded-2xl border border-white/10 p-6 bg-white/5">
                    <h2 className="text-xl font-semibold">What we do</h2>
                    <p className="mt-3 text-sm text-white/80">We connect riders with trained, verified women drivers through a simple app. Our approach blends rigorous screening and training with live GPS, trip sharing, 24/7 phone support, and cashless payments.</p>
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                        <div className="rounded-lg bg-white/5 p-4">
                            <p className="font-medium">Safety first</p>
                            <p className="mt-1 text-sm text-white/70">Screening, training, SOS, and trip‑sharing.</p>
                        </div>
                        <div className="rounded-lg bg-white/5 p-4">
                            <p className="font-medium">Economic empowerment</p>
                            <p className="mt-1 text-sm text-white/70">Flexible earnings, weekly payouts, and mentorship.</p>
                        </div>
                        <div className="rounded-lg bg-white/5 p-4">
                            <p className="font-medium">Respect & dignity</p>
                            <p className="mt-1 text-sm text-white/70">Service culture built on trust and accountability.</p>
                        </div>
                        <div className="rounded-lg bg-white/5 p-4">
                            <p className="font-medium">Community impact</p>
                            <p className="mt-1 text-sm text-white/70">Safer mobility for Kigali’s neighborhoods.</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                    <div className="relative aspect-[4/3]">
                        <Image src="/images/Você sabia que existe um seguro para qualquer….jpeg" alt="Women drivers" fill className="object-cover" />
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold">Powered by women</h3>
                        <p className="mt-2 text-sm text-white/80">From operations to the road, our team centers women’s leadership and safety expertise every day.</p>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="mt-12 grid lg:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6">
                    <h2 className="text-xl font-semibold">Vision</h2>
                    <p className="mt-3 text-sm text-white/80">
                        We envision a Rwanda where every woman moves freely, works confidently, and leads with purpose.
                        A future where women drive change, redefining mobility, safety, and empowerment in every community they touch.
                    </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6">
                    <h2 className="text-xl font-semibold">Mission</h2>
                    <p className="mt-3 text-sm text-white/80">
                        At SheMoves, our mission is to empower women through safe mobility, meaningful employment, and community-driven opportunities.
                        We train and employ women from diverse backgrounds to become professional drivers, giving them skills, independence, and dignity on and off the road.
                    </p>
                </div>
            </section>


            {/* Timeline */}
            <section className="mt-12">
                <h2 className="text-xl font-semibold">Our journey</h2>
                <ol className="mt-6 relative border-l border-white/15 pl-6 space-y-6">
                    <li>
                        <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-white/80" />
                        <p className="text-sm"><span className="font-semibold">2021:</span> Pilot launched in Gasabo with 25 trained drivers.</p>
                    </li>
                    <li>
                        <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-white/80" />
                        <p className="text-sm"><span className="font-semibold">2022:</span> Safety hotline, trip sharing, and emergency partners added.</p>
                    </li>
                    <li>
                        <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-white/80" />
                        <p className="text-sm"><span className="font-semibold">2023:</span> Expanded city‑wide; introduced weekly payouts and benefits.</p>
                    </li>
                    <li>
                        <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-white/80" />
                        <p className="text-sm"><span className="font-semibold">Today:</span> Building the safest ride experience for Kigali.</p>
                    </li>
                </ol>
            </section>

            {/* Leadership */}
            <section className="mt-12">
                <h2 className="text-xl font-semibold">Leadership</h2>
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: "Delice Iremane", role: "CEO & Co‑founder" },
                        { name: "Aline Umuhoza", role: "Head of Safety" },
                        { name: "Viviane Uwera", role: "Operations Lead" },
                    ].map((p) => (
                        <div key={p.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                            <div className="h-32 rounded-lg bg-gradient-to-br from-white/10 to-white/0" />
                            <p className="mt-3 font-medium">{p.name}</p>
                            <p className="text-sm text-white/70">{p.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQs */}
            <section className="mt-12">
                <h2 className="text-xl font-semibold">FAQs</h2>
                <div className="mt-6 grid sm:grid-cols-2 gap-6">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                        <p className="font-medium">How do you vet drivers?</p>
                        <p className="mt-2 text-sm text-white/75">Background checks, license verification, defensive driving training, and in‑app onboarding with live trip monitoring.</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                        <p className="font-medium">Is SheMoves only for women riders?</p>
                        <p className="mt-2 text-sm text-white/75">No. Anyone can ride. Our focus is building a safe, respectful service led by women professionals.</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                        <p className="font-medium">How do payouts work?</p>
                        <p className="mt-2 text-sm text-white/75">Weekly bank/mobile‑money payouts with clear earnings statements and in‑app support.</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                        <p className="font-medium">I want to drive. What are the steps?</p>
                        <p className="mt-2 text-sm text-white/75">Apply on the Drive page, submit documents, attend training, and start earning once verified.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

