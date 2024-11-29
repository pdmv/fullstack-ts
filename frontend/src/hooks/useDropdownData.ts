import * as React from "react";

interface DropdownData<T> {
  items: T[];
  selectedItem: T | null;
  loading: boolean;
  error: boolean;
  setSelectedItem: React.Dispatch<React.SetStateAction<T | null>>;
  fetchData: () => Promise<void>;
}

export const useDropdownData = <T>(
  fetchItems: () => Promise<T[]>
): DropdownData<T> => {
  const [items, setItems] = React.useState<T[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const fetchedItems = await fetchItems();
      console.log(fetchedItems);
      setItems(fetchedItems);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [fetchItems]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { items, selectedItem, loading, error, setSelectedItem, fetchData };
};
