import { NextResponse } from "next/server";

export async function GET(req) {
  const { nextUrl } = req;
  // Get domain from url params.
  const domain = nextUrl.searchParams.get("domain") || "";
  // Create request to PR-CY API.
  const route = `${process.env.BASE_URL}/status/base/${domain}?key=${process.env.API_KEY}`;
  // Get response from PR-CY API.
  const res = await fetch(route);
  // Prepare response to send our client.
  const data = await res.json();
  // if we get error, return this error to client, with status code.
  if (res.status !== 200) {
    return NextResponse.json({ error: data.error, statusCode: res.status });
  }
  // Send response to our client.
  return NextResponse.json(data);
}
