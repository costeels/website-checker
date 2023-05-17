// Use this route like as client.
"use client";
import React, { useEffect, useState } from "react";
import testsList from "../../../../testsList.json";

export default function Analysis({ params }) {
  // Prepare state for data from API.
  const [res, setRes] = useState({});
  // Send response to our backend.
  async function getBaseAnalysis() {
    const data = await fetch(
      `/api/v1.1.0/analysis/base?domain=${params.domain}`
    );
    setRes(await data.json());
  }
  async function startBaseAnalysis() {
    const data = await fetch(
      `/api/v1.1.0/analysis/base?domain=${params.domain}`,
      { method: "POST" }
    );
    setRes(await data.json());
  }

  // Check analysis status
  async function checkBaseAnalysisStatus() {
    const data = await fetch(
      `/api/v1.1.0/analysis/status/base?domain=${params.domain}`
    );
    setRes(await data.json());
    // If data isn't updating and no errors, we get analysis
    if (!data.isUpdating && !data.error) {
      getBaseAnalysis();
    }
  }
  // After loading the page on the client, we send a request to the server.
  useEffect(() => {
    getBaseAnalysis();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold text-3xl mb-4">{params.domain} analysis</h1>
      {/* If there are no errors and there is data, then we show them */}
      {!res.error && !res.started && (
        <>
          <div>List of possible tests and their results</div>
          <button
            onClick={checkBaseAnalysisStatus}
            className="text-white ml-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
          >
            Update Analysis
          </button>
          <button
            onClick={() => {
              window.location.pathname = "/";
            }}
            className="text-blue-700 ml-1 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-4"
          >
            Check other domain
          </button>
          <div className="snap-x w-full">
            <ol className="list-decimal list-inside">
              {testsList.map((testName) => (
                <React.Fragment key={testName}>
                  <li>{testName}</li>
                  <div className="bg-gray-100 p-4 rounded-md text-gray-700 text-sm overflow-x-auto">
                    <code>
                      {JSON.stringify(res[testName]) ||
                        "The server did not provide data for this test"}
                    </code>
                  </div>
                </React.Fragment>
              ))}
            </ol>
          </div>
        </>
      )}

      {/* We show a separate error 404 in order to be able to run the analysis */}
      {res.error && res.statusCode === 404 && (
        <div className="bg-red-500 text-white p-3 rounded-md flex w-2/3 flex-wrap">
          {res.error}
          <br />
          <br />
          <button
            onClick={startBaseAnalysis}
            className="text-white ml-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Start Analysis
          </button>
        </div>
      )}

      {/* Show all errors except 404 */}
      {res.error && res.statusCode !== 404 && (
        <div className="bg-red-500 text-white p-3 rounded-md flex w-2/3 flex-wrap">
          {res.error}
        </div>
      )}

      {/* If we started the analysis, we need to periodically poll the server for data readiness */}
      {res.started && (
        <div>
          Analysis for {params.domain} is updating
          <button
            onClick={checkBaseAnalysisStatus}
            className="text-white ml-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Check
          </button>
        </div>
      )}
    </main>
  );
}
