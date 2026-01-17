import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface SearchHistoryItem {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchedAt: number;
}

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useLocalStorage<
    SearchHistoryItem[]
  >("search-history", []);

  const historyQuery = useQuery({
    queryKey: ["search-history"],
    queryFn: () => searchHistory,
    initialData: searchHistory,
  });
  const queryClient = useQueryClient();
  const addToHistory = useMutation({
    mutationFn: async (
      search: Omit<SearchHistoryItem, "id" | "searchedAt">,
    ) => {
      const newSearch: SearchHistoryItem = {
        ...search,
        id: `${search.lat}-${search.lon}-${Date.now()}`,
        searchedAt: Date.now(),
      };
      const filterHistory = searchHistory.filter(
        (item) => !(item.lat === search.lat && item.lon === search.lon),
      );
      const updatedHistory = [newSearch, ...filterHistory].slice(0, 10);
      setSearchHistory(updatedHistory);
    },
    onSuccess: () => {
      queryClient.setQueryData(["search-history"], searchHistory);
    },
  });

  const clearHistory = useMutation({
    mutationFn: async () => {
      setSearchHistory([]);
      return [];
    },
    onSuccess: (newHistory) => {
      queryClient.setQueryData(["search-history"], newHistory);
    },
  });
  return {
    historyQuery,
    addToHistory,
    clearHistory,
  };
}
