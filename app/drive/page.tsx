"use client";
import { useState } from "react";

export default function DrivePage() {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h1 className="text-3xl sm:text-4xl font-bold">Drive with SheMoves</h1>
            <p className="mt-3 text-white/80">Earn on your schedule with a supportive women-led community and dedicated safety tools.</p>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="rounded-xl border border-white/10 p-5 bg-white/5"><h3 className="font-semibold">Flexible earnings</h3><p className="mt-1 text-sm text-white/70">Set your hours and grow your income.</p></div>
                <div className="rounded-xl border border-white/10 p-5 bg-white/5"><h3 className="font-semibold">Training & support</h3><p className="mt-1 text-sm text-white/70">Onboarding, safe driving, and customer care.</p></div>
                <div className="rounded-xl border border-white/10 p-5 bg-white/5"><h3 className="font-semibold">Safety-first platform</h3><p className="mt-1 text-sm text-white/70">SOS, trip sharing, and vetted riders.</p></div>
            </div>
            <form onSubmit={async (e) => {
                e.preventDefault();
                setSubmitted(false);
                setIsLoading(true);
                const form = e.currentTarget as HTMLFormElement;
                const formData = new FormData(form);
                const name = String(formData.get("name") || "").trim();
                const phone = String(formData.get("phone") || "").trim();
                const email = String(formData.get("email") || "").trim();
                const vehicle = String(formData.get("vehicle") || "").trim();

                try {
                    const response = await fetch('/api/drive-application', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, phone, email, vehicle }),
                    });

                    const result = await response.json();

                    if (!response.ok) {
                        throw new Error(result.error || 'Failed to submit application');
                    }

                    setSubmitted(true);
                    form.reset();
                } catch (err) {
                    console.error('Application error:', err);
                    alert(err instanceof Error ? err.message : 'Failed to submit application');
                } finally {
                    setIsLoading(false);
                }
            }} className="mt-10 space-y-4 rounded-xl border border-white/10 p-6 bg-white/5">
                <h2 className="text-xl font-semibold">Apply now</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium">Full name</label><input name="name" required className="mt-1 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 outline-none" /></div>
                    <div><label className="block text-sm font-medium">Phone</label><input name="phone" required className="mt-1 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 outline-none" /></div>
                    <div className="sm:col-span-2"><label className="block text-sm font-medium">Email</label><input type="email" name="email" required className="mt-1 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 outline-none" /></div>
                    <div className="sm:col-span-2"><label className="block text-sm font-medium">Vehicle info</label><input name="vehicle" placeholder="Make, model, year" className="mt-1 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 outline-none" /></div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-md bg-white text-black px-5 py-2.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Submitting...
                        </>
                    ) : (
                        'Submit application'
                    )}
                </button>
                {submitted && <p className="text-sm text-green-400">Thanks! We’ll be in touch.</p>}
            </form>
        </div>
    );
}

