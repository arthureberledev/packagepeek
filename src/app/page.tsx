import { SearchRepo } from "@/app/search-repo";
import { searchReposAction } from "./actions";

export const runtime = "edge";

export default function Home() {
  return <SearchRepo searchReposAction={searchReposAction} />;
}
