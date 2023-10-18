import { BoxesIcon, GithubIcon } from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";

import { Providers } from "@/app/providers";
import { cn } from "@/lib/utils";

import "./globals.css";
import type { Metadata } from "next";

export const runtime = "edge";

const BODY_PADDING = "px-4 sm:px-6";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "package peek",
  description:
    "Search and discover GitHub repositories based on the specific dependencies listed in their package.json file",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased bg-gray-100")}>
        <header
          className={cn(
            "top-0 sticky z-20 w-full py-3 bg-gray-100 flex flex-row flex-nowrap justify-between max-w-5xl mx-auto h-14 items-stretch animate-in fade-in slide-in-from-top-4 duration-1000 ease-in-out",
            BODY_PADDING
          )}
        >
          <Link
            className="text-stone-900 text-lg font-medium flex flex-row flex-nowrap items-center justify-center gap-x-2 leading-none rounded-lg"
            href="/"
          >
            <BoxesIcon className="stroke-1 w-5 h-5" />
            <span className="font-mono">package peek</span>
          </Link>

          <div className="flex flex-row flex-nowrap gap-x-1.5 items-center">
            <Link
              href="https://github.com/arthureberledev/packagepeek"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <span className="sr-only">Github Repository</span>
              <GithubIcon className="w-5 h-5" />
            </Link>
          </div>
        </header>
        <main
          className={cn(
            "flex items-stretch flex-col pb-28 max-w-5xl mx-auto",
            BODY_PADDING
          )}
        >
          <div className="py-[15vh] sm:py-[20vh] flex flex-col items-center justify-center">
            <h1 className="font-medium text-4xl max-w-md text-center text-stone-900 mb-3 animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-in-out">
              Search Repositories
            </h1>

            <p className="text-gray-500 mb-8 text-base animate-in max-w-lg text-center fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
              Search and discover GitHub repositories based on the specific
              dependencies listed in their package.json file
            </p>

            <div className="max-w-md space-y-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
              {children}
            </div>
          </div>
        </main>
        <Providers />
      </body>
    </html>
  );
}
