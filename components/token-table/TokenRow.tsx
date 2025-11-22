"use client";

import React from "react";
import clsx from "clsx";

type Token = {
  symbol: string;
  name: string;
  category: string;
};

export default function TokenRow({
  token,
  price,
}: {
  token: Token;
  price: { price: number; change: number } | undefined;
}) {
  return (
    <div className="grid grid-cols-[160px_1fr_180px_140px] gap-0 items-center px-4 py-3 border-b table-row">
      <div className="font-medium">{token.symbol}</div>

      <div className="text-slate-600">{token.name}</div>

      <div
        className={clsx(
          "font-medium",
          price?.change > 0 && "text-green-600",
          price?.change < 0 && "text-red-600"
        )}
      >
        {price ? price.price.toFixed(4) : "--"}
      </div>

      <button className="px-3 py-1 text-sm rounded bg-slate-100 hover:bg-slate-200">
        Trade
      </button>
    </div>
  );
}
