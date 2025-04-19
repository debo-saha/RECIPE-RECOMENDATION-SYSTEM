import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  const authHeader = "Basic " + Buffer.from(API_KEY + ":").toString("base64");

  try {
    const response = await fetch(`https://api.imagekit.io/v1/files?path=image-folder`, {
      headers: { Authorization: authHeader },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch images from ImageKit");
    }

    const images = await response.json();
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
