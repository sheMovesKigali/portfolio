"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function NavLink({ href, label, onClick, mobile }: { href: string; label: string; onClick?: () => void; mobile?: boolean }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    if (mobile) {
        return (
            <Link
                href={href}
                onClick={onClick}
                className={`block px-4 py-3 rounded-lg text-base font-medium hover:bg-white/10 transition-colors ${
                    isActive ? "bg-white/10 text-amber-400" : ""
                }`}
            >
                {label}
            </Link>
        );
    }

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors ${isActive ? "bg-white/10" : ""}`}
        >
            {label}
        </Link>
    );
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 backdrop-blur bg-neutral-950/70 border-b border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <Link href="/" className="font-semibold text-lg">SheMoves</Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <NavLink href="/" label="Home" />
                        <NavLink href="/about" label="About" />
                        <NavLink href="/book" label="Book Ride" />
                        <NavLink href="/donate" label="Donate" />
                        <NavLink href="/contact" label="Contact" />
                        <NavLink href="/drive" label="Drive" />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden pb-4 pt-3 border-t border-white/10 animate-in slide-in-from-top-2 duration-200">
                        <div className="flex flex-col space-y-1">
                            <NavLink href="/" label="Home" onClick={() => setMobileMenuOpen(false)} mobile />
                            <NavLink href="/about" label="About" onClick={() => setMobileMenuOpen(false)} mobile />
                            <NavLink href="/book" label="Book Ride" onClick={() => setMobileMenuOpen(false)} mobile />
                            <NavLink href="/donate" label="Donate" onClick={() => setMobileMenuOpen(false)} mobile />
                            <NavLink href="/contact" label="Contact" onClick={() => setMobileMenuOpen(false)} mobile />
                            <NavLink href="/drive" label="Drive" onClick={() => setMobileMenuOpen(false)} mobile />
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}

