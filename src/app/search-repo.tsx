"use client";

import { CornerDownLeft, LinkIcon } from "lucide-react";
import { useAction } from "next-safe-action/hook";
import React from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "./loader";

import type { searchRepositories } from "@/app/actions";

interface SearchRepo {
  searchRepositories: typeof searchRepositories;
}

export function SearchRepo({ searchRepositories }: SearchRepo) {
  const formRef = React.useRef<React.ElementRef<"form">>(null);
  const { execute, result, status } = useAction(searchRepositories, {
    onError: (error) => {
      console.log("🚀 ~ SearchRepo ~ error:", error);
      if (error.serverError) {
        toast.error(error.serverError);
        return;
      }
      toast.error("Failed to search repositories.");
    },
  });

  React.useEffect(() => {
    if (result.data && "error" in result.data) {
      toast.error(result.data.error);
    }
  }, [result.data]);

  const repositories =
    result.data && Array.isArray(result.data) ? result.data : [];

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const input = Object.fromEntries(formData);

          if (!input.dependencies) {
            toast.error("Please enter some dependencies.");
            return;
          }

          execute({ query: input.dependencies as string });
        }}
        className="bg-stone-900 rounded-xl shadow-lg h-fit flex flex-row px-2 items-center w-full"
      >
        <input
          type="text"
          name="dependencies"
          placeholder="next @supabase/supabase-js @uppy/core"
          className="bg-transparent text-white placeholder:text-stone-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
        />

        <button
          type="submit"
          disabled={status === "executing"}
          aria-disabled={status === "executing"}
          className="text-white rounded-lg hover:bg-white/25 focus:bg-white/25 w-8 h-8 aspect-square flex items-center justify-center ring-0 outline-0"
        >
          {status === "executing" ? (
            <LoaderIcon />
          ) : (
            <CornerDownLeft size={16} className="-ml-px" />
          )}
        </button>
      </form>

      {repositories.length > 0 && (
        <ul className="pt-6 flex gap-y-3 flex-col">
          {repositories.map((repository) => (
            <li key={repository.id}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={repository.html_url}
                className="borders shadow-md ring-1 ring-gray-200 hover:-translate-y-0.5 transition-transform duration-150  flex flex-row flex-nowrap py-1 px-1.5 items-center rounded-xl gap-x-2.5 bg-white w-full relative group"
              >
                <Avatar className="w-8 h-8 rounded-[calc(12px-3px)] overflow-hidden">
                  <AvatarImage
                    src={repository.owner?.avatar_url}
                    className="h-8 w-8 "
                  />
                  <AvatarFallback className="h-8 w-8">
                    {repository.full_name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>

                <p
                  className="font-mono text-sm truncate"
                  title={repository.full_name}
                >
                  {repository.full_name}
                </p>

                <div
                  className={cn(
                    "w-8 h-8 aspect-square flex items-center justify-center absolute right-1"
                  )}
                >
                  <span className="sr-only">Go to repository</span>
                  <LinkIcon className="w-4 h-4" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
