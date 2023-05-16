// Use this route like as client.
"use client";
import { useEffect, useState } from "react";

export default function Analysis({ params }) {
  // Prepare state for data from API.
  const [res, setRes] = useState({});
  // Send response to our backend.
  async function getBaseAnalysis() {
    const data = await fetch(`/api/v1.1.0/analysis/base?domain=${params.domain}`)
    setRes(await data.json());
  }
  // After loading the page on the client, we send a request to the server.
  useEffect(() => {
    getBaseAnalysis();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{params.domain} analysis</div>
      <br />
      <div>{JSON.stringify(res)}</div>
    </main>
  )
}
