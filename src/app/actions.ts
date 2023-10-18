"use server";

import { z } from "zod";

import { action } from "@/lib/safe-action";

import type { Octokit } from "@octokit/rest";

const schema = z.object({
  query: z.string(),
});

export const searchReposAction = action(schema, async ({ query }) => {
  try {
    // https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax
    const q = query + ' filename:"package.json"';
    const response = await fetch(
      `https://api.github.com/search/code?q=${encodeURIComponent(q)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github.text-match+json",
          Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
        },
      }
    );

    if (response.status !== 200) {
      return { error: "Internal Server Error" };
    }

    const remainingRequests = response.headers.get("x-ratelimit-remaining");
    if (remainingRequests && parseInt(remainingRequests) < 1) {
      return { error: "Rate limit exceeded. Please try again later." };
    }

    const data = (await response.json()) as Awaited<
      ReturnType<Octokit["search"]["code"]>
    >["data"];

    const repositories = data.items.map((repo) => {
      const matchedIndex = repo.text_matches?.[0].matches?.[0].indices?.[0];
      return {
        repository: repo.repository,
        metadata: {
          package_json_url: repo.html_url,
          matched_fragment: matchedIndex
            ? repo.text_matches?.[0].fragment?.substring(
                matchedIndex - 1 // include the quote
              )
            : "",
        },
      };
    });

    return repositories;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
});
