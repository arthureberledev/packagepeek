import { SearchRepo } from "@/app/search-repo";
import { searchRepositories } from "./actions";

export default function Home() {
  return <SearchRepo searchRepositories={searchRepositories} />;
}
