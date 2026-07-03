// Cloudinary delivery URL-с public_id-г ялган авна.
// Жишээ: https://res.cloudinary.com/demo/image/upload/v1699999999/cake-drama/abc123.jpg
//        -> "cake-drama/abc123"
export function extractPublicId(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : null;
}
