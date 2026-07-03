import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Танилцуулга | Cake Drama",
  description:
    "Cake Drama Co., Ltd. — 2000 оноос хойш 25 жилийн турш амт, чанар, инновацийг хослуулсан дээд зэрэглэлийн нарийн боов, амттан үйлдвэрлэдэг Өмнөд Солонгосын тэргүүлэгч брэнд.",
};

export default function AboutPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />

      {/* Hero */}
      <section className="relative h-[420px] flex items-center justify-center overflow-hidden bg-on-background">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/zafglzry/image/upload/v1783020439/cake-drama/building.jpg"
            alt="Cake Drama HQ building"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-on-background/70" />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-margin-mobile reveal active">
          <span className="font-label-sm text-label-sm text-secondary-fixed tracking-[0.3em] mb-4 block">
            SINCE 2000
          </span>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface">
            Танилцуулга
          </h1>
          <div className="w-24 h-px bg-surface/60 mx-auto mt-8" />
        </div>
      </section>

      {/* About */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
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
                Хэрэглэгч бүрийн амт, мэдрэмж, сонголтод нийцсэн өргөн сонголттой Cake
                Drama-гийн бүтээгдэхүүн бүр нь зөвхөн амттан бус, харин дурсамж, баяр хөөр,
                мартагдашгүй мөчийг бүтээхэд зориулагдсан юм.
              </p>
              <p>
                Тус компани нь HACCP, FSSC 22000, ISO 22000 зэрэг олон улсын хүнсний аюулгүй
                байдлын стандарт, гэрчилгээг бүрэн хангасан бөгөөд түүхий эдийн сонголтоос эхлэн
                үйлдвэрлэл, сав баглаа боодол хүртэлх бүх шатанд хатуу чанарын хяналт хэрэгжүүлдэг.
                Иймээс хэрэглэгчдэдээ үргэлж аюулгүй, тогтвортой, найдвартай амт чанарыг
                итгэлтэйгээр хүргэж чаддаг.
              </p>
            </div>
          </div>
          <div className="relative reveal order-1 md:order-2">
            <div className="absolute -top-4 -left-4 w-full h-full border border-outline-variant/30 z-0" />
            <div className="relative z-10 aspect-4/5 bg-surface-container-high shadow-xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/zafglzry/image/upload/v1783020439/cake-drama/building.jpg"
                alt="Cake Drama HQ building"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="fleur-de-lis my-20" />

        <div className="reveal">
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
                <span className="material-symbols-outlined text-secondary shrink-0">
                  check_circle
                </span>
                <p className="font-body-md text-on-surface-variant italic">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
