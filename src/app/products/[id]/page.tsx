import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ProductGallery from "@/components/ProductGallery";
import { getProductById } from "@/lib/data";
import { formatMNT } from "@/lib/constants";

const categoryLabel: Record<string, string> = {
  castella: "Castella",
  big_cake: "Cheese / Chocolate Cake",
  roll_snack: "Roll & Snack",
  donut: "Donut",
  mini_donut: "Mini Donut",
  fatcaron: "Fat-Caron",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const details = [
    { label: "Нэгж жин", value: product.weight },
    { label: "Савлагааны төрөл", value: product.packaging },
    { label: "Хадгалах нөхцөл", value: product.storage },
    { label: "Хадгалах хугацаа", value: product.shelf_life },
    { label: "Гэсгээх заавар", value: product.thawing },
  ].filter((d) => d.value);

  return (
    <>
      <ScrollReveal />
      <Navbar />

      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-6">
        <Link
          href="/#products"
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          ← Бүтээгдэхүүн рүү буцах
        </Link>
      </div>

      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <ProductGallery images={product.images} name={product.name} />

          <div className="reveal active">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] mb-3 block">
              {categoryLabel[product.category] ?? product.category}
            </span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
              {product.name}
            </h1>
            <p className="font-headline-md text-2xl md:text-headline-md text-secondary mb-8">
              {formatMNT(product.price)}
            </p>

            {details.length > 0 && (
              <div className="border-t border-outline-variant/60">
                {details.map((d) => (
                  <div
                    key={d.label}
                    className="flex justify-between gap-6 py-4 border-b border-outline-variant/60"
                  >
                    <span className="font-label-sm text-label-sm text-secondary uppercase shrink-0">
                      {d.label}
                    </span>
                    <span className="font-body-md text-on-surface text-right">{d.value}</span>
                  </div>
                ))}
              </div>
            )}

            <a
              href="/#contact"
              className="inline-block mt-10 bg-primary text-on-primary px-10 py-4 font-label-sm text-label-sm hover:bg-on-background transition-all duration-400"
            >
              Захиалга өгөх
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
