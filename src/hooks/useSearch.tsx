import useSWR from "swr";
import { getSearch } from "utils/api";

export default function useSearch(searchTerm: string, language?: string) {
  const { data } = useSWR(
    ["getSearch", searchTerm, language],
    (_, search_term, lang) =>
      getSearch({
        starts_with: "team",
        search_term,
        filter_query: lang
          ? {
              __or: [{ languages: { any_in_array: lang } }],
            }
          : null,
      })
  );

  return { data };
}
