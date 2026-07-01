import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import { getPartners, getProducts, getSpecials } from "@/lib/data";
import type { ProductRow } from "@/lib/supabase/types";

const navLinks = [
  { label: "Танилцуулга", href: "#about" },
  { label: "Бүтээгдэхүүн", href: "#products" },
  { label: "Онцлох", href: "#specials" },
  { label: "Түншүүд", href: "#partners" },
  { label: "Холбоо барих", href: "#contact" },
];

function ProductCard({ product }: { product: ProductRow }) {
  return (
    <div className="group bg-surface-container-low border border-transparent hover:border-on-primary-container/20 hover:translate-y-[-4px] transition-all duration-500 reveal">
      <div className="relative overflow-hidden aspect-square bg-surface-container-high">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="p-6">
        <h3 className="font-headline-md text-headline-md text-primary mb-4 leading-snug">
          {product.name}
        </h3>
        <ul className="font-body-md text-on-surface-variant space-y-1 text-[15px]">
          {product.weight && <li>1. Нэгж жин: {product.weight}</li>}
          {product.packaging && <li>2. Савлагааны төрөл: {product.packaging}</li>}
          {product.storage && <li>3. Хадгалах нөхцөл: {product.storage}</li>}
          {product.shelf_life && <li>4. Хадгалах хугацаа: {product.shelf_life}</li>}
          {product.thawing && <li>5. Гэсгээх заавар: {product.thawing}</li>}
        </ul>
      </div>
    </div>
  );
}

function SimpleThumb({ image, name }: { image: string; name: string }) {
  return (
    <div className="text-center">
      <div className="relative aspect-square bg-surface/90 mb-3 overflow-hidden">
        <Image src={image} alt={name} fill sizes="25vw" className="object-cover" />
      </div>
      <p className="font-body-md text-on-primary-container font-medium">{name}</p>
    </div>
  );
}

export default async function Home() {
  const [products, specials, partners] = await Promise.all([
    getProducts(),
    getSpecials(),
    getPartners(),
  ]);

  const castellaProducts = products.filter((p) => p.category === "castella");
  const bigCakes = products.filter((p) => p.category === "big_cake");
  const rollsAndSnacks = products.filter((p) => p.category === "roll_snack");
  const donuts = products.filter((p) => p.category === "donut");
  const miniDonuts = products.filter((p) => p.category === "mini_donut");
  const fatCarons = products.filter((p) => p.category === "fatcaron");

  return (
    <>
      <ScrollReveal />
      {/* Top Navigation */}
      <nav className="w-full top-0 sticky bg-surface/90 backdrop-blur-sm z-50 border-b border-outline-variant/30">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-20">
          <div className="flex flex-col leading-none">
            <span className="font-headline-md text-headline-md font-semibold text-primary">
              Cake Drama
            </span>
            <span className="font-label-sm text-label-sm text-secondary tracking-widest">
              SINCE 2000
            </span>
          </div>
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
          <a
            href="#contact"
            className="bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm hover:bg-on-background transition-all duration-400"
          >
            Захиалга өгөх
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[820px] flex items-center justify-center overflow-hidden bg-on-background">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_tiramisu.jpg"
            alt="Cake Drama tiramisu"
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105"
          />
          <div className="absolute inset-0 bg-on-background/60" />
        </div>
        <div
          id="hero-content"
          className="relative z-10 text-center max-w-4xl px-margin-mobile reveal"
        >
          <span className="font-label-sm text-label-sm text-secondary-fixed tracking-[0.3em] mb-4 block">
            SINCE 2000
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-surface mb-6 leading-tight drop-shadow-md">
            CAKE DRAMA
          </h1>
          <div className="w-24 h-px bg-surface/60 mx-auto mb-8" />
          <p className="font-body-lg text-body-lg text-surface/90 max-w-xl mx-auto italic">
            Амтат мөчүүдийг урлана.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="reveal order-2 md:order-1">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] mb-4 block">
              Компанийн танилцуулга
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-8">
              25 жилийн уламжлалт амт
            </h2>
            <div className="space-y-6 text-on-surface-variant font-body-lg leading-relaxed">
              <p>
                Cake Drama Co., Ltd. нь 2000 онд үүсэн байгуулагдаж 25 жилийн турш амт, чанар,
                инновацийг төгс хослуулсан дээд зэрэглэлийн нарийн боов, амттаныг бүтээж ирсэн
                Өмнөд Солонгосын тэргүүлэгч брэнд юм.
              </p>
              <p>
                Cake Drama нь Солонгос улсын 50 гаруй томоохон кофе шоп, сүлжээ дэлгүүрүүдэд
                бүтээгдэхүүнээ тогтмол нийлүүлж, дотоодын зах зээлд баттай байр суурь эзэлээд
                зогсохгүй олон улсын зах зээлд ч итгэл хүлээсэн, үнэ цэнэтэй амттаны брэнд болон
                амжилттай өргөжин тэлж байна.
              </p>
              <p>
                Тус компани нь HACCP, FSSC 22000, ISO 22000 зэрэг олон улсын хүнсний аюулгүй
                байдлын стандарт, гэрчилгээг бүрэн хангасан бөгөөд түүхий эдийн сонголтоос эхлэн
                үйлдвэрлэл, сав баглаа боодол хүртэлх бүх шатанд хатуу чанарын хяналт хэрэгжүүлдэг.
              </p>
            </div>
          </div>
          <div className="relative reveal order-1 md:order-2">
            <div className="absolute -top-4 -left-4 w-full h-full border border-outline-variant/30 z-0" />
            <div className="relative z-10 aspect-4/5 bg-surface-container-high shadow-xl overflow-hidden">
              <Image
                src="/images/building.jpg"
                alt="Cake Drama HQ building"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 reveal">
          <h3 className="font-headline-md text-headline-md text-primary mb-8 text-center">
            Яагаад Cake Drama гэж?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              "25 жилийн туршлага, баталгаатай үйлдвэрлэл",
              "Дэлхийн стандартад нийцсэн хүнсний аюулгүй байдал",
              "Дээд зэрэглэлийн амт, зөөлөн бүтэц, тансаг мэдрэмж",
              "Тасралтгүй судалгаа, инноваци, орчин үеийн технологи",
              "Олон улсын зах зээлд бүрэн нийцсэн бүтээгдэхүүн",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary shrink-0">check_circle</span>
                <p className="font-body-md text-on-surface-variant italic">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="fleur-de-lis" />

      {/* Products Section */}
      <section
        id="products"
        className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
      >
        <div className="text-center mb-16 reveal">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
            Бүтээгдэхүүн
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-lg mx-auto">
            Castella, cheese cake, roll cake, macaron, donut зэрэг өргөн сонголттой бүтээгдэхүүнүүд.
          </p>
        </div>

        <h3 className="font-headline-md text-headline-md text-primary mb-8">Castella цуврал</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {castellaProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <h3 className="font-headline-md text-headline-md text-primary mb-8">
          Cheese Cake &amp; Chocolate Cake (5 порц)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {bigCakes.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <h3 className="font-headline-md text-headline-md text-primary mb-8">
          Roll Cake &amp; Snacks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rollsAndSnacks.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Macarons & Donuts Banner */}
      <section className="w-full bg-primary-container py-16 reveal">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-primary-container mb-10 text-center">
            Macarons &amp; Donuts
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {donuts.map((d) => (
              <SimpleThumb key={d.id} image={d.image} name={d.name} />
            ))}
          </div>

          <h4 className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest mb-6 border-b border-on-primary-container/30 pb-2">
            Mini Donuts
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {miniDonuts.map((d) => (
              <SimpleThumb key={d.id} image={d.image} name={d.name} />
            ))}
          </div>

          <h4 className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest mb-6 border-b border-on-primary-container/30 pb-2">
            Fat-Carons
          </h4>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {fatCarons.map((f) => (
              <div key={f.id} className="relative aspect-square bg-surface/90 overflow-hidden">
                <Image src={f.image} alt={f.name} fill sizes="16vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specials Section */}
      <section
        id="specials"
        className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-on-background"
      >
        <div className="text-center mb-16 reveal">
          <span className="font-label-sm text-label-sm text-secondary-fixed-dim tracking-widest">
            A Romantic Taste — Since 2000
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface mt-4">
            Онцлох бүтээгдэхүүн
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {specials.map((s) => (
            <div key={s.id} className="reveal text-center border border-surface/10 p-8">
              <div className="relative aspect-square mb-6 overflow-hidden">
                <Image src={s.image} alt={s.title} fill sizes="33vw" className="object-cover" />
              </div>
              <h3 className="font-headline-md text-headline-md text-surface mb-6">{s.title}</h3>
              {s.tags.length > 0 && (
                <div className="flex justify-center gap-2 mb-6 flex-wrap">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-error text-error font-label-sm text-label-sm px-3 py-2 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="font-body-md text-surface/70 italic">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section
        id="partners"
        className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
      >
        <div className="text-center mb-16 reveal">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
            Partners
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-lg mx-auto">
            Солонгосын томоохон кофе шоп, дэлгүүрийн сүлжээнүүдэд бүтээгдэхүүнээ тогтмол
            нийлүүлдэг.
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 reveal">
          {partners.map((p) => (
            <div
              key={p.id}
              className="relative aspect-3/2 border border-outline-variant/60 bg-white flex items-center justify-center p-2 hover:border-primary transition-colors duration-400"
            >
              <Image
                src={`/images/partners/${p.logo}.png`}
                alt={p.name}
                fill
                sizes="150px"
                className="object-contain p-2"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div className="reveal">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-10">
              Бидэнтэй холбогдох
            </h2>
            <div className="space-y-8 mb-10">
              <div>
                <h4 className="font-label-sm text-label-sm text-secondary uppercase mb-3">
                  Компани
                </h4>
                <p className="font-body-lg text-on-surface">Лаят Энд Солт ХХК</p>
              </div>
              <div>
                <h4 className="font-label-sm text-label-sm text-secondary uppercase mb-3">
                  И-мэйл
                </h4>
                <p className="font-body-lg text-on-surface">
                  <a href="mailto:temka1202@gmail.com" className="hover:text-primary">
                    temka1202@gmail.com
                  </a>
                </p>
              </div>
              <div>
                <h4 className="font-label-sm text-label-sm text-secondary uppercase mb-3">
                  Захиалгын утас
                </h4>
                <p className="font-body-lg text-on-surface">
                  <a href="tel:+97680909609" className="hover:text-primary">
                    +976 8090-9609
                  </a>
                  {" / "}
                  <a href="tel:+97699922335" className="hover:text-primary">
                    +976 9992-2335
                  </a>
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
          <div className="relative reveal h-[400px]">
            <div className="w-full h-full border border-outline-variant/50 p-4 flex items-center justify-center bg-surface-container-high">
              <div className="text-center">
                <span className="material-symbols-outlined text-on-primary-container/40 text-8xl block mb-4">
                  qr_code_2
                </span>
                <p className="font-body-md text-on-surface-variant italic">
                  Дэлгэрэнгүй мэдээллийг манай QR кодоор уншуулж авна уу
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </>
  );
}
