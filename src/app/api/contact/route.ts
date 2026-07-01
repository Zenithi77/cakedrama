import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase тохируулагдаагүй байна. .env.local файлыг үзнэ үү." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !message) {
    return NextResponse.json({ error: "Нэр болон мессежээ бөглөнө үү." }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name,
    phone: phone || null,
    email: email || null,
    message,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
