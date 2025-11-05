"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, label }: { href: string; label: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link href={href} className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 ${isActive ? "bg-white/10" : ""}`}>
            {label}
        </Link>
    );
}

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur bg-neutral-950/70 border-b border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <Link href="/" className="font-semibold">SheMoves</Link>
                    <nav className="flex items-center gap-1">
                        <NavLink href="/" label="Home" />
                        <NavLink href="/about" label="About" />
                        <NavLink href="/book" label="Book Ride" />
                        <NavLink href="/donate" label="Donate" />
                        <NavLink href="/contact" label="Contact" />
                        <NavLink href="/drive" label="Drive" />
                    </nav>
                </div>
            </div>
        </header>
    );
}

