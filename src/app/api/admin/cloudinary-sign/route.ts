import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCloudinaryFolder, isCloudinaryConfigured, signUploadParams } from "@/lib/cloudinary";

export async function POST() {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary тохируулагдаагүй байна. .env.local файлыг үзнэ үү." },
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

  const timestamp = Math.round(Date.now() / 1000);
  const folder = getCloudinaryFolder();
  const paramsToSign = { timestamp, folder };
  const signature = signUploadParams(paramsToSign);

  return NextResponse.json({
    timestamp,
    folder,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  });
}
