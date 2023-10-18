"use server";

import { z } from "zod";

import { action } from "@/lib/safe-action";
import type { Octokit } from "@octokit/rest";

const schema = z.object({
  query: z.string(),
});

export const searchRepositories = action(schema, async ({ query }) => {
  try {
    const q = query + " filename:package.json";
    const response = await fetch(
      `https://api.github.com/search/code?q=${encodeURIComponent(q)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
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

    const repositories = data.items.map((item) => item.repository);
    const uniqueRepositories = repositories.filter(
      (repo, index, self) => index === self.findIndex((t) => t.id === repo.id)
    );

    return uniqueRepositories;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
});
