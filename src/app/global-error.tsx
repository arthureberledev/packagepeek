"use client";

export default function GlobalError() {
  return (
    <html>
      <body>
        <div className="text-center">
          <p className="mt-6 text-base leading-7 text-stone-600">
            Something went wrong! Please try again later.
          </p>
        </div>
      </body>
    </html>
  );
}
