"use client";

import { useEffect } from "react";
import { captureUtmFromUrl } from "@/lib/utm";

/** Client-only side effect: persist UTM params to sessionStorage on mount. */
export default function UtmCapture() {
  useEffect(() => {
    captureUtmFromUrl();
  }, []);
  return null;
}
