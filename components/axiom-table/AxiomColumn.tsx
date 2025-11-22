"use client";

import React from "react";
import AxiomRow from "./AxiomRow";

export type Token = {
  symbol: string;
  name: string;
  category: string;
};

export default function AxiomColumn({
  title,
  tokens,
  prices,
}: {
  title: string;
  tokens: Token[];
  prices: Record<string, { price: number; change: number }>;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <div className="divide-y">
        {tokens.length === 0 ? (
          <div className="text-slate-400 py-6 text-center">No tokens</div>
        ) : (
          tokens.map((t) => (
            <AxiomRow key={t.symbol} token={t} price={prices[t.symbol]} />
          ))
        )}
      </div>
    </div>
  );
}
