import { NextResponse } from "next/server";

/* GitHub contribution graph proxy.
   The public REST/GraphQL APIs need a token for contribution data, so we
   fetch the community contributions API server-side and let the client hit
   us instead (no CORS, no token, cached). */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("u") ?? "foxlancerr";
  const username = raw.replace(/[^a-zA-Z0-9-]/g, "").slice(0, 39);
  if (!username) {
    return NextResponse.json({ error: "invalid username" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 21600 } }
    );
    if (!res.ok) {
      return NextResponse.json({ error: "upstream unavailable" }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 502 });
  }
}
