"use client";

import React from "react";

interface ToastProps {
  toastMsg: string | null;
}

export default function Toast({ toastMsg }: ToastProps) {
  if (!toastMsg) return null;

  return (
    <div
      className="fixed bottom-6 right-6 bg-[#2A1621] text-white px-5 py-3 rounded-lg text-body-sm font-semibold shadow-2xl z-[80] flex items-center gap-2.5 border border-white/10 animate-fade-up"
      role="status"
    >
      <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse shrink-0" />
      <span>{toastMsg}</span>
    </div>
  );
}
