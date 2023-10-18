import { SearchRepo } from "@/app/search-repo";
import { searchReposAction } from "./actions";

export default function Home() {
  return <SearchRepo searchReposAction={searchReposAction} />;
}
