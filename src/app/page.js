// Use this route like as client.
"use client";
import { useState } from "react";
import isValidDomain from "@/utils/isValidDomain";

export default function Home() {
  const [domain, setDomain] = useState("");
  async function goToAnalysis() {
    if (isValidDomain(domain)) {
      window.location.pathname = `/analysis/${domain}`;
    }
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      PR-CY Website-checker DEMO
      <br />
      <br />
      <form
        className="w-6/12"
        onSubmit={(e) => {
          e.preventDefault();
          goToAnalysis();
        }}
      >
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            type="search"
            id="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="website.com"
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Check
          </button>
        </div>
        <div>
          {Boolean(domain.length) && !isValidDomain(domain) && (
            <div className="text-red-500">{domain} - isn't valid domain!</div>
          )}
        </div>
      </form>
    </main>
  );
}
