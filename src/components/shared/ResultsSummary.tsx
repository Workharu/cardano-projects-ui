import { Box, Typography, Stack, Chip } from '@mui/material';

interface FilterChip {
  key: string;
  label: string;
  color?: 'primary' | 'secondary' | 'info' | 'error' | 'warning' | 'success';
  onDelete?: () => void;
}

interface ResultsSummaryProps {
  itemsShown: number;
  totalItems: number;
  itemType: string; // e.g., "projects", "users"
  searchTerm?: string;
  sortChip: FilterChip;
  filterChips: FilterChip[];
}

export default function ResultsSummary({ itemsShown, totalItems, itemType, searchTerm, sortChip, filterChips }: ResultsSummaryProps) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
      <Typography variant="subtitle1" color="text.secondary">
        Showing <strong>{itemsShown}</strong> of <strong>{totalItems}</strong> {itemType}
        {searchTerm && (
          <span>
            {' '}
            for "<strong>{searchTerm}</strong>"
          </span>
        )}
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip label={sortChip.label} color={sortChip.color || 'primary'} variant="outlined" size="small" />
        {filterChips.map((chip) => (
          <Chip
            key={chip.key}
            label={chip.label}
            color={chip.color || 'secondary'}
            variant="outlined"
            size="small"
            onDelete={chip.onDelete}
          />
        ))}
      </Stack>
    </Box>
  );
}
