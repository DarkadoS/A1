"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRealtimePrices } from "../hooks/useRealtimePrices";
import AxiomTable from "./axiom-table/AxiomTable";
import TableSkeleton from "./skeletons/TableSkeleton";
import ErrorBoundaryClient from "./ErrorBoundaryClient";

async function fetchTokens() {
  // Simulate API delay and possible intermittent error
  await new Promise((r) => setTimeout(r, 900));
  // Uncomment next line to simulate server error for testing:
  // if (Math.random() < 0.2) throw new Error("Simulated API failure");
  return [
    { symbol: "ABC", name: "Alpha Beta Coin", category: "New pairs" },
    { symbol: "DEF", name: "Delta Finance", category: "Final Stretch" },
    { symbol: "GHI", name: "Gamma Hold", category: "Migrated" },
    // add more if you want to test progressive reveals
    { symbol: "JKL", name: "Juno Link", category: "New pairs" },
    { symbol: "MNO", name: "Mono Token", category: "Final Stretch" },
    { symbol: "PQR", name: "PQR Coin", category: "Migrated" },
  ];
}

export default function TokenTablePage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["tokens"],
    queryFn: fetchTokens,
    retry: 2,
    staleTime: 1000 * 30,
  });

  const prices = useRealtimePrices();

  // progressive reveal state: show tokens in steps to simulate streaming
  const [visibleMap, setVisibleMap] = useState<Record<string, boolean>>({});

  // When data arrives, progressively reveal tokens per category with small delay
  useEffect(() => {
    if (!data) return;
    // reset visible map
    setVisibleMap({});
    const tokens = data;
    const revealOrder = tokens.map((t) => t.symbol);
    let i = 0;
    const timers: number[] = [];
    const next = () => {
      if (i >= revealOrder.length) return;
      setVisibleMap((m) => ({ ...m, [revealOrder[i]]: true }));
      i += 1;
      // progressively reveal one token every 150ms (tweakable)
      timers.push(window.setTimeout(next, 150));
    };
    // start first reveal after 150ms
    timers.push(window.setTimeout(next, 150));
    return () => timers.forEach((t) => clearTimeout(t));
  }, [data]);

  // derive visible tokens for feed into AxiomTable (respecting category)
  const visibleTokens = useMemo(() => {
    if (!data) return [];
    return data.filter((t) => visibleMap[t.symbol]);
  }, [data, visibleMap]);

  return (
    <main className="p-6 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Token Discovery (Axiom Clone)</h1>

        <ErrorBoundaryClient fallback={<div className="p-4">UI failed to render.</div>}>
          {isLoading && <TableSkeleton />}

          {isError && (
            <div className="p-6 bg-white rounded shadow-sm">
              <div className="text-red-600 font-semibold mb-3">Failed to load tokens</div>
              <div className="flex gap-2">
                <button
                  onClick={() => refetch()}
                  className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Retry
                </button>
                <button onClick={() => window.location.reload()} className="px-3 py-1 rounded bg-slate-100">
                  Reload
                </button>
              </div>
            </div>
          )}

          {!isLoading && data && (
            // pass visibleTokens to AxiomTable so tokens appear progressively
            <AxiomTable tokens={visibleTokens} prices={prices} />
          )}
        </ErrorBoundaryClient>
      </div>
    </main>
  );
}
