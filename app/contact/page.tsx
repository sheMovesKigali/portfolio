"use client";
import { useState } from "react";

export default function ContactPage() {
    const [status, setStatus] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <header className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl font-bold">Contact us</h1>
                <p className="mt-3 text-white/80">We’d love to hear from you. Fill in the form or reach us via phone and email.</p>
            </header>

            <div className="mt-10 grid lg:grid-cols-3 gap-8 items-start">
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setError(null);
                        setStatus(null);
                        setIsLoading(true);

                        const form = e.currentTarget as HTMLFormElement;
                        const formData = new FormData(form);
                        const name = String(formData.get("name") || "").trim();
                        const email = String(formData.get("email") || "").trim();
                        const message = String(formData.get("message") || "").trim();

                        if (!name || !email || !message) {
                            setError("Please complete all fields.");
                            setIsLoading(false);
                            return;
                        }

                        try {
                            const response = await fetch('/api/contact', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ name, email, message }),
                            });

                            const result = await response.json();

                            if (!response.ok) {
                                throw new Error(result.error || 'Failed to send message');
                            }

                            setStatus("Thanks! We'll get back to you soon.");
                            form.reset();
                        } catch (err) {
                            setError(err instanceof Error ? err.message : 'Failed to send message');
                        } finally {
                            setIsLoading(false);
                        }
                    }}
                    className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input name="name" required className="mt-1 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input type="email" name="email" required className="mt-1 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Message</label>
                        <textarea name="message" rows={6} required className="mt-1 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 outline-none" />
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
                                Sending...
                            </>
                        ) : (
                            'Send message'
                        )}
                    </button>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    {status && <p className="text-sm text-green-400">{status}</p>}
                </form>

                <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-lg font-semibold">Get in touch</h2>
                    <div className="mt-4 space-y-3 text-sm text-white/80">
                        <p><span className="font-medium text-white">Email:</span> shemoveskigali@gmail.com</p>
                        <p><span className="font-medium text-white">Phone:</span> +250 793 146 889</p>
                        <p><span className="font-medium text-white">Address:</span> KG 7 Ave, Kigali, Rwanda</p>
                    </div>
                    <div className="mt-6 h-40 rounded-lg overflow-hidden border border-white/10">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5!2d30.0588!3d-1.9441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258c8f8b8b%3A0x8f8b8b8b8b8b8b8b!2sKG%207%20Ave%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2srw!4v1234567890123!5m2!1sen!2srw"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="SheMoves Location - KG 7 Ave, Kigali, Rwanda"
                        />
                    </div>
                    <div className="mt-6">
                        <h3 className="font-medium">Support hours</h3>
                        <p className="mt-1 text-sm text-white/70">24/7 phone support. In‑app chat 08:00–21:00.</p>
                    </div>
                </aside>
            </div>
        </div>
    );
}

