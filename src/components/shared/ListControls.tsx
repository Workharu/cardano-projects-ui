import { Box, Stack } from '@mui/material';
import SearchBar from './SearchBar';
import SortMenu from './SortMenu';
import FilterMenu from './FilterMenu';

interface ListControlsProps {
  // Search
  searchValue: string;
  onSearch: (value: string) => void;
  onSearchClear: () => void;
  searchPlaceholder?: string;
  // Sort
  sortOptions: Array<{ value: string; label: string }>;
  currentSort: string;
  currentSortDir: 'asc' | 'desc';
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
  // Filter
  filterProps: React.ComponentProps<typeof FilterMenu>;
}

export default function ListControls({
  searchValue,
  onSearch,
  onSearchClear,
  searchPlaceholder,
  sortOptions,
  currentSort,
  currentSortDir,
  onSortChange,
  filterProps
}: ListControlsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
        mb: 3,
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 1
      }}
    >
      <SearchBar value={searchValue} onSearch={onSearch} onClear={onSearchClear} placeholder={searchPlaceholder} />

      <Stack direction="row" spacing={2}>
        <FilterMenu {...filterProps} />
        <SortMenu options={sortOptions} currentSort={currentSort} currentDirection={currentSortDir} onSortChange={onSortChange} />
      </Stack>
    </Box>
  );
}
