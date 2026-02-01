import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: "core-team" }, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    }).end(buffer);
  });

  return NextResponse.json({ url: result.secure_url });
}
