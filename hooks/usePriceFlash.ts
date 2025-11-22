"use client";

import { useEffect, useState } from "react";

export function usePriceFlash(value: number | undefined) {
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const [prev, setPrev] = useState(value);

  useEffect(() => {
    if (prev === undefined || value === undefined) return;

    if (value > prev) setFlash("up");
    else if (value < prev) setFlash("down");

    setPrev(value);

    const t = setTimeout(() => setFlash(null), 500);
    return () => clearTimeout(t);
  }, [value, prev]);

  return flash;
}
