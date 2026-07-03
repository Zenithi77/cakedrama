export const DEFAULT_HERO_IMAGE =
  "https://res.cloudinary.com/zafglzry/image/upload/v1783020440/cake-drama/hero_tiramisu.jpg";

export function formatMNT(price: number | null | undefined): string {
  if (price == null) return "Үнэ асууна уу";
  return `${price.toLocaleString("mn-MN")}₮`;
}
