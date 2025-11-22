// app/error.tsx
"use client";

import { useEffect } from "react";

export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  // log the error to the console (or to a remote error logger)
  useEffect(() => {
    console.error("Root error:", error);
  }, [error]);

  return (
    <main className="p-6 min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold mb-4">Something went wrong</h1>
        <p className="text-slate-600 mb-6">
          The app encountered an unexpected error. You can try reloading the page.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Try again
          </button>

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200"
          >
            Reload
          </button>
        </div>

        <pre className="mt-6 text-xs text-left max-h-40 overflow-auto bg-slate-50 p-3 rounded text-red-600">
          {String(error?.message ?? "No message")}
        </pre>
      </div>
    </main>
  );
}
