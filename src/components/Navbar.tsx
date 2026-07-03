"use client";

import { useState } from "react";
import AuthNav from "@/components/AuthNav";

const navLinks = [
  { label: "Танилцуулга", href: "/about" },
  { label: "Бүтээгдэхүүн", href: "/#products" },
  { label: "Онцлох", href: "/#specials" },
  { label: "Түншүүд", href: "/#partners" },
  { label: "Холбоо барих", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full top-0 sticky z-50">
      {/* Thin utility strip */}
      <div className="bg-primary text-surface/80">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-1.5 text-center">
          <span className="font-label-sm text-label-sm tracking-[0.25em]">
            SINCE 2000 · АМТАТ МӨЧҮҮДИЙГ УРЛАНА
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="w-full bg-surface/90 backdrop-blur-sm border-b border-outline-variant/30">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-16 md:h-18">
          <a
            href="/"
            className="font-handwriting text-3xl md:text-4xl text-primary leading-none pt-1"
            onClick={() => setOpen(false)}
          >
            Cake Drama
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                className="nav-underline relative font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-all duration-400"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <AuthNav />
            <a
              href="/#contact"
              className="bg-primary text-on-primary px-7 py-2.5 font-label-sm text-label-sm hover:bg-on-background transition-all duration-400"
            >
              Захиалга өгөх
            </a>
          </div>

          {/* Mobile: profile icon + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <AuthNav />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Цэсийг хаах" : "Цэсийг нээх"}
              aria-expanded={open}
              className="flex items-center justify-center w-10 h-10 text-primary"
            >
              <span className="material-symbols-outlined text-3xl">{open ? "close" : "menu"}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out border-t border-outline-variant/30 bg-surface ${
            open ? "max-h-[28rem]" : "max-h-0 border-t-0"
          }`}
        >
          <div className="px-margin-mobile py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-body-lg text-on-surface-variant hover:text-primary py-3 border-b border-outline-variant/20"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-4 text-center bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm hover:bg-on-background transition-all duration-400"
            >
              Захиалга өгөх
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
