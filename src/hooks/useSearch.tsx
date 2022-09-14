import { useRouter } from "next/router";
import useSWR from "swr";
import { getSearch } from "utils/api";

export default function useSearch(searchTerm: string, language?: string) {
  const router = useRouter();
  const { locale } = router;
  const { data } = useSWR(
    ["getSearch", searchTerm, language, locale],
    (_, search_term) =>
      getSearch({
        starts_with: "registry",
        search_term,
        language: locale,
        filter_query: {
          languages: {
            in_array: language,
          },
        },
      })
  );
  return { data };
}
