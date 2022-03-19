import useSWR from "swr";
import { getSearch } from "utils/api";

export default function useSearch(searchTerm: string) {
  const { data } = useSWR(["getSearch", searchTerm], (_, search_term) =>
    getSearch({ starts_with: "team", search_term })
  );

  return { data };
}
