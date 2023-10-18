"use client";

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

export function Providers() {
  return (
    <>
      <Analytics />
      <Toaster position="top-center" />
    </>
  );
}
