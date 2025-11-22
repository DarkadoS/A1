"use client";

import React, { useState } from "react";
import Modal from "../ui/Modal";

export type Token = {
  symbol: string;
  name: string;
  category: string;
};

export default function AxiomRow({
  token,
  price,
}: {
  token: Token;
  price: { price: number; change: number } | undefined;
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between py-3 px-1">
        <div className="flex flex-col">
          <span className="font-semibold">{token.symbol}</span>
          <span className="text-slate-600 text-sm">{token.name}</span>
        </div>

        <div className="text-right font-medium">
          {price ? price.price.toFixed(4) : "--"}
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="px-3 py-1 text-sm rounded bg-slate-100 hover:bg-slate-200"
        >
          Details
        </button>
      </div>

      <div className="border-b"></div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div>
          <h2 className="text-lg font-semibold mb-2">{token.symbol}</h2>
          <p className="text-slate-600 mb-4">{token.name}</p>

          <div className="flex justify-between mb-3">
            <span className="font-medium">Latest Price:</span>
            <span>{price ? price.price.toFixed(4) : "--"}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span className="font-medium">Change:</span>
            <span
              className={
                price?.change > 0
                  ? "text-green-600"
                  : price?.change < 0
                  ? "text-red-600"
                  : ""
              }
            >
              {price ? price.change.toFixed(4) : "--"}
            </span>
          </div>

          <button
            onClick={() => setOpenModal(false)}
            className="w-full mt-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
