import type { PartnerRow, ProductRow, SpecialRow } from "@/lib/supabase/types";

// Supabase холбогдоогүй үед ашиглагдах нөөц (fallback) агуулга.
// `supabase/seed.sql` файлтай агуулгын хувьд ижил байх ёстой.

let idCounter = 0;
function id() {
  idCounter += 1;
  return `static-${idCounter}`;
}

function product(partial: Omit<ProductRow, "id" | "created_at" | "sort_order">, sort_order: number): ProductRow {
  return { ...partial, id: id(), created_at: new Date(0).toISOString(), sort_order };
}

export const staticProducts: ProductRow[] = [
  product({ category: "castella", name: "Monster Castella Tiramisu", image: "/images/products/monster_castella_tiramisu.jpg", weight: "130 грамм", packaging: "Нэг бүрийн савлагаа (1 ширхэг / хайрцаг)", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 0),
  product({ category: "castella", name: "Monster Castella Chocolate", image: "/images/products/monster_castella_chocolate.jpg", weight: "130 грамм", packaging: "Нэг бүрийн савлагаа (1 ширхэг / хайрцаг)", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 1),
  product({ category: "castella", name: "Monster Castella Cream Cheese", image: "/images/products/monster_castella_creamcheese.jpg", weight: "130 грамм", packaging: "Нэг бүрийн савлагаа (1 ширхэг / хайрцаг)", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 2),
  product({ category: "castella", name: "Milk Cream Castella", image: "/images/products/milk_cream_castella.jpg", weight: "130 грамм", packaging: "Нэг бүрийн савлагаа (1 ширхэг / хайрцаг)", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 3),
  product({ category: "castella", name: "Cookie & Cream Castella", image: "/images/products/cookie_cream_castella.jpg", weight: "130 грамм", packaging: "Нэг бүрийн савлагаа (1 ширхэг / хайрцаг)", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 4),

  product({ category: "big_cake", name: "New York Cheese Cake 5P", image: "/images/products/newyork_cheesecake.jpg", weight: "650 грамм / баг", packaging: "Нэг хайрцагт 4 баг", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 5),
  product({ category: "big_cake", name: "Chocolate Mud Cake 5P", image: "/images/products/chocolate_mud_cake.jpg", weight: "500 грамм / баг", packaging: "Нэг хайрцаганд 16 баг", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 6),
  product({ category: "big_cake", name: "Chocolate Rocher Cake 5P", image: "/images/products/chocolate_rocher_cake.jpg", weight: "400 грамм / баг", packaging: "Нэг хайрцаганд 24 баг", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 7),
  product({ category: "big_cake", name: "Souffle Cheese Cake 5P", image: "/images/products/souffle_cheesecake.jpg", weight: "425 грамм / баг", packaging: "Нэг хайрцаганд 24 баг", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 8),
  product({ category: "big_cake", name: "Oreo Cream Cheese Cake 5P", image: "/images/products/oreo_creamcheese_cake.jpg", weight: "625 грамм / баг (570 х 480 х 250 мм)", packaging: "Нэг хайрцаганд 16 баг", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 9),
  product({ category: "big_cake", name: "Dolce Tiramisu Cake 5P", image: "/images/products/dolce_tiramisu_cake.jpg", weight: "650 грамм / баг (570 х 480 х 250 мм)", packaging: "Нэг хайрцаганд 16 баг", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 10),

  product({ category: "roll_snack", name: "Fresh Cream Roll Cake", image: "/images/products/fresh_cream_roll_cake.jpg", weight: "260 грамм", packaging: "Нэг бүрийн савлагаа (1 ширхэг / хайрцаг)", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 11),
  product({ category: "roll_snack", name: "Chocolate Roll Cake", image: "/images/products/chocolate_roll_cake.jpg", weight: "260 грамм", packaging: "Нэг бүрийн савлагаа (1 ширхэг / хайрцаг)", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 12),
  product({ category: "roll_snack", name: "Bagel Chip Honey Butter", image: "/images/products/bagel_chip_honey_butter.jpg", weight: "50 грамм", packaging: "Нэг бүрийн савлагаа (1 ширхэг / хайрцаг)", storage: "Өрөөний температурт хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: null }, 13),
  product({ category: "roll_snack", name: "Bagel Chip Garlic Butter", image: "/images/products/bagel_chip_garlic_butter.jpg", weight: "50 грамм", packaging: "Нэг бүрийн савлагаа (1 ширхэг / хайрцаг)", storage: "Өрөөний температурт хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: null }, 14),
  product({ category: "roll_snack", name: "Zero Tiramisu", image: "/images/products/zero_tiramisu.jpg", weight: "100 грамм", packaging: "Нэг бүрийн савлагаа (1 ширхэг / хайрцаг)", storage: "Хөлдөөсөн хэлбэрээр хадгална", shelf_life: "Үйлдвэрлэсэн өдрөөс хойш 12 сар", thawing: "Хөргөгчинд 2 цаг байлгаж гэсгээнэ" }, 15),

  product({ category: "donut", name: "Glazed", image: "/images/products/donut_glazed.jpg", weight: null, packaging: null, storage: null, shelf_life: null, thawing: null }, 16),
  product({ category: "donut", name: "Choco-Frost", image: "/images/products/donut_choco_frost.jpg", weight: null, packaging: null, storage: null, shelf_life: null, thawing: null }, 17),
  product({ category: "donut", name: "Choco-Ring", image: "/images/products/donut_choco_ring.jpg", weight: null, packaging: null, storage: null, shelf_life: null, thawing: null }, 18),
  product({ category: "donut", name: "Berliner", image: "/images/products/donut_berliner.jpg", weight: null, packaging: null, storage: null, shelf_life: null, thawing: null }, 19),

  product({ category: "mini_donut", name: "Maple-Ring", image: "/images/products/minidonut_maple_ring.jpg", weight: null, packaging: null, storage: null, shelf_life: null, thawing: null }, 20),
  product({ category: "mini_donut", name: "Choco-Ring", image: "/images/products/minidonut_choco_ring.jpg", weight: null, packaging: null, storage: null, shelf_life: null, thawing: null }, 21),
  product({ category: "mini_donut", name: "Strawberry Flavored-Ring", image: "/images/products/minidonut_strawberry.jpg", weight: null, packaging: null, storage: null, shelf_life: null, thawing: null }, 22),
  product({ category: "mini_donut", name: "White Rainbow", image: "/images/products/minidonut_white_rainbow.jpg", weight: null, packaging: null, storage: null, shelf_life: null, thawing: null }, 23),

  ...[1, 2, 3, 4, 5, 6].map((n, i) =>
    product({ category: "fatcaron", name: `Fat-Caron ${n}`, image: `/images/products/fatcaron_${n}.jpg`, weight: null, packaging: null, storage: null, shelf_life: null, thawing: null }, 24 + i)
  ),
];

export const staticSpecials: SpecialRow[] = [
  {
    id: id(),
    created_at: new Date(0).toISOString(),
    sort_order: 0,
    title: "Zero Sugar Tiramisu",
    image: "/images/special_zero_sugar_tiramisu.jpg",
    tags: ["NO SUGAR", "NO GLUTEN", "NO COMPROMISE"],
    description:
      "Элсэн чихэр, гурилын талаар санаа зовохгүй. Тирамисутийн баялаг амт, зөөлөн бүтэц, төгс мэдрэмжийг хэвээр хадгалсан Zero Sugar Tiramisu.",
  },
  {
    id: id(),
    created_at: new Date(0).toISOString(),
    sort_order: 1,
    title: "Croffle",
    image: "/images/special_croffle.jpg",
    tags: [],
    description:
      "Кроасантны зуурмагийг вафль хэлбэрт шарж бэлтгэсэн, гаднаа шарзгинуур, дотроо зөөлөн Croffle.",
  },
  {
    id: id(),
    created_at: new Date(0).toISOString(),
    sort_order: 2,
    title: "Condensed Milk Butter Roll",
    image: "/images/special_condensed_milk_roll.jpg",
    tags: [],
    description:
      "Өтгөрүүлсэн сүүтээр зөөлрүүлэн хөвсийлгөсөн, дотроо өтгөн цөцгийтэй зөөлөн мока талх.",
  },
];

const partnerNames: [string, string][] = [
  ["Homeplus", "homeplus"], ["CU (Coop)", "cu_coop"], ["CU", "cu"], ["CJ Freshway", "cj_freshway1"],
  ["CJ Freshway", "cj_freshway2"], ["KORAIL", "korail"], ["NongHyup", "nonghyup"], ["Hanwha", "hanwha"],
  ["Ourhome", "ourhome"], ["Emart", "emart"], ["Lotte Mart Maxx", "lottemart_maxx"], ["Starbucks", "starbucks"],
  ["Ediya Coffee", "ediya_coffee"], ["Hollys Coffee", "hollys_coffee"], ["Paul Bassett", "paul_bassett"],
  ["Twosome Place", "twosome_place"], ["Coffee Bene", "coffeebene"], ["The Venti", "theventi"],
  ["Knotted", "knotted"], ["Sulbing", "sulbing"], ["Gong Cha", "gongcha"], ["Mammoth Coffee", "mammoth_coffee"],
  ["Juicy", "juicy"], ["Yogerpresso", "yogerpresso"], ["Sangdo Foodmoment", "sangdo_foodmoment"],
  ["SRC", "src"], ["The Slow Made", "the_slow_made"], ["KTSC", "ktsc"], ["Mega Coffee", "mega_coffee"],
  ["B Coffee", "b_coffee"], ["Dallyeun Coffee", "dallyeun_coffee"], ["Hands Coffee", "hands_coffee"],
  ["Baekgeumdang", "baekgeumdang"], ["U:Dally", "u_dally"], ["About Coffee", "about_coffee"],
  ["Caffe Tiamo", "caffe_tiamo"], ["Port Can Coffee", "port_can_coffee"], ["Bavin's Coffee", "bavins_coffee"],
  ["Cafe Heeda", "cafe_heeda"], ["Fodist", "fodist"], ["Sushiro", "sushiro"], ["Silla Myeongkwa", "silla_myeongkwa"],
];

export const staticPartners: PartnerRow[] = partnerNames.map(([name, logo], i) => ({
  id: id(),
  created_at: new Date(0).toISOString(),
  sort_order: i,
  name,
  logo,
}));
