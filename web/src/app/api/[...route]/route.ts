// app/api/[...route]/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname.replace("/api/", "");
  const query = req.nextUrl.search;

  const response = await fetch(`${BACKEND_URL}/${path}${query}`, {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  return NextResponse.json(await response.json(), {
    status: response.status,
  });
}

export async function POST(req: NextRequest) {
  const path = req.nextUrl.pathname.replace("/api/", "");
  const body = await req.json();

  const response = await fetch(`${BACKEND_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: req.headers.get("cookie") || "",
    },
    body: JSON.stringify(body),
  });

  return NextResponse.json(await response.json(), {
    status: response.status,
  });
}

// ... PATCH, DELETE, etc
