"use client";

import React, { memo } from "react";
import clsx from "clsx";
import { usePriceFlash } from "../../hooks/usePriceFlash";

export default memo(function AnimatedPrice({
  price,
  change,
}: {
  price: number | undefined;
  change: number | undefined;
}) {
  const flash = usePriceFlash(price);

  return (
    <div
      className={clsx(
        "px-2 py-1 rounded transition-all duration-300",
        flash === "up" && "bg-green-100 text-green-700",
        flash === "down" && "bg-red-100 text-red-700"
      )}
    >
      {price !== undefined ? price.toFixed(4) : "--"}
    </div>
  );
}, (prev, next) => {
  return (
    prev.price === next.price &&
    prev.change === next.change
  );
});
