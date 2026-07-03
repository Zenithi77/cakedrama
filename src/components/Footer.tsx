export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-16 border-t border-outline-variant/30">
      <div className="flex flex-col items-center justify-center gap-8 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <div className="font-headline-md text-headline-md text-primary">Cake Drama</div>
        <p className="font-label-sm text-label-sm text-secondary tracking-widest">
          SINCE 2000 — АМТАТ МӨЧҮҮДИЙГ УРЛАНА
        </p>
        <div className="w-16 h-px bg-outline-variant" />
        <p className="font-body-md text-body-md text-on-surface-variant italic opacity-80">
          Лаят Энд Солт ХХК © 2024 Cake Drama.
        </p>
      </div>
    </footer>
  );
}
