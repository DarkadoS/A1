"use client";

import React, { useMemo } from "react";
import AxiomColumn from "./AxiomColumn";

type Token = {
  symbol: string;
  name: string;
  category: string;
};

export default function AxiomTable({
  tokens,
  prices,
}: {
  tokens: Token[];
  prices: Record<string, { price: number; change: number }>;
}) {
  const newPairs = useMemo(
    () => tokens.filter((t) => t.category === "New pairs"),
    [tokens]
  );
  const finalStretch = useMemo(
    () => tokens.filter((t) => t.category === "Final Stretch"),
    [tokens]
  );
  const migrated = useMemo(
    () => tokens.filter((t) => t.category === "Migrated"),
    [tokens]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <AxiomColumn title="New Pairs" tokens={newPairs} prices={prices} />
      <AxiomColumn title="Final Stretch" tokens={finalStretch} prices={prices} />
      <AxiomColumn title="Migrated" tokens={migrated} prices={prices} />
    </div>
  );
}
