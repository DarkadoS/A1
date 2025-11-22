"use client";

import { useEffect, useState } from "react";

export function useRealtimePrices() {
  const [prices, setPrices] = useState<
    Record<string, { price: number; change: number }>
  >({});

  useEffect(() => {
    const symbols = ["ABC", "DEF", "GHI"];

    // Initialize starting prices if empty
    if (Object.keys(prices).length === 0) {
      const initial: any = {};
      symbols.forEach((s) => {
        const base = 1 + Math.random() * 5;
        initial[s] = { price: base, change: 0 };
      });
      setPrices(initial);
    }

    const interval = setInterval(() => {
      setPrices((prev) => {
        const next: any = {};

        symbols.forEach((sym) => {
          const old = prev[sym]?.price ?? 2;
          const delta = (Math.random() - 0.5) * 0.05; // gentle movement
          const newPrice = old + delta;

          next[sym] = {
            price: newPrice,
            change: newPrice - old,
          };
        });

        return next;
      });
    }, 1500); // update every 1.5s

    return () => clearInterval(interval);
  }, []);

  return prices;
}
