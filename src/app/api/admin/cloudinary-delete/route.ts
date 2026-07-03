import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { destroyImage, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST(request: Request) {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary тохируулагдаагүй байна." },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Нэвтэрсэн байх шаардлагатай." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const publicId = typeof body?.publicId === "string" ? body.publicId : "";
  if (!publicId) {
    return NextResponse.json({ error: "publicId шаардлагатай." }, { status: 400 });
  }

  try {
    await destroyImage(publicId);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Устгах үед алдаа гарлаа." }, { status: 500 });
  }
}
