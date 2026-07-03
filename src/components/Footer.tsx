// Доорх холбоосуудыг Cake Drama-гийн бодит Facebook/Instagram хуудасны URL-аар сольж өгнө үү.
const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61586221517775",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
        <path
          d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.5-1.46H16.5V4.35C16.2 4.31 15.19 4.22 14.02 4.22c-2.44 0-4.11 1.49-4.11 4.22V10.5H7.4v3H9.91V21h3.59Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/cakedrama_mn/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-16 border-t border-outline-variant/30">
      <div className="flex flex-col items-center justify-center gap-8 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <div className="font-headline-md text-headline-md text-primary">Cake Drama</div>
        <p className="font-label-sm text-label-sm text-secondary tracking-widest">
          SINCE 2000 — АМТАТ МӨЧҮҮДИЙГ УРЛАНА
        </p>

        <div className="flex items-center gap-3">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              title={s.name}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all duration-300"
            >
              {s.icon}
            </a>
          ))}
        </div>

        <div className="w-16 h-px bg-outline-variant" />
        <p className="font-body-md text-body-md text-on-surface-variant italic opacity-80">
          Лаят Энд Солт ХХК © 2024 Cake Drama.
        </p>
      </div>
    </footer>
  );
}
