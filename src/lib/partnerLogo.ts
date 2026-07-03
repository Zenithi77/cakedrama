// Хуучин түншүүд нь /public/images/partners/<slug>.png дотор, шинээр Cloudinary-руу
// байршуулсан лого бол `logo` баганад бүтэн URL хадгалагдана. Аль алиныг дэмжинэ.
export function partnerLogoSrc(logo: string): string {
  if (logo.startsWith("http://") || logo.startsWith("https://")) return logo;
  return `/images/partners/${logo}.png`;
}
