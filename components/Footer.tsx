import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <p className="text-sm font-semibold">SheMoves Kigali</p>
                        <p className="text-xs text-white/60">Safe, reliable rides by women, for women.</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">Contact</h3>
                        <ul className="mt-3 space-y-1 text-xs text-white/70">
                            <li>Email: <a href="mailto:nshutikarake.nk@gmail.com" className="underline decoration-white/30 hover:decoration-white">shemoveskigali@gmail.com</a></li>
                            <li>Phone: <a href="tel:+250 793 146 889" className="underline decoration-white/30 hover:decoration-white">+250 793 146 889</a></li>
                            <li>Address: KG 7 Ave, Kigali, Rwanda</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">Follow</h3>
                        <div className="mt-3 flex gap-3 text-xs">
                            <Link href="https://x.com/shemoveskigali" target="_blank" className="rounded-md border border-white/15 px-3 py-1 hover:bg-white/5">X</Link>
                            <Link href="https://www.instagram.com/shemoveskigali" target="_blank" className="rounded-md border border-white/15 px-3 py-1 hover:bg-white/5">Instagram</Link>
                            <Link href="https://www.facebook.com/shemoveskigali" target="_blank" className="rounded-md border border-white/15 px-3 py-1 hover:bg-white/5">Facebook</Link>
                            <Link href="https://www.linkedin.com/company/shemoveskigali" target="_blank" className="rounded-md border border-white/15 px-3 py-1 hover:bg-white/5">LinkedIn</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                    <nav className="flex flex-wrap gap-4 text-sm text-white/80">
                        <Link href="/about" className="hover:underline">About</Link>
                        <Link href="/book" className="hover:underline">Book Ride</Link>
                        <Link href="/donate" className="hover:underline">Donate</Link>
                        <Link href="/contact" className="hover:underline">Contact</Link>
                        <Link href="/drive" className="hover:underline">Drive with us</Link>
                    </nav>
                    <p className="text-xs text-white/50">© {new Date().getFullYear()} SheMoves.</p>
                </div>
            </div>
        </footer>
    );
}

