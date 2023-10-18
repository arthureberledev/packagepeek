"use client";

import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <div className="text-center">
        <p className="mt-6 text-base leading-7 text-stone-600">
          Something went wrong! Please try again later.
        </p>
      </div>
    </div>
  );
}
