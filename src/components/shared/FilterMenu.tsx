import { useState } from 'react';
import {
  Button,
  Menu,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Divider,
  CircularProgress
} from '@mui/material';
import { Filter } from 'iconsax-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterItem {
  id: number;
  name: string;
  total?: number;
}

interface FilterMenuProps {
  activeFiltersCount: number;
  hasUnappliedChanges: boolean;
  // Status filter
  statusOptions: FilterOption[];
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  // Items filter (e.g., funds)
  itemsLabel: string;
  items: FilterItem[];
  itemsLoading?: boolean;
  selectedItemIds: number[];
  onItemChange: (itemId: number, checked: boolean) => void;
  // Actions
  onApply: () => void;
  onReset: () => void;
  onClearAll: () => void;
}

export default function FilterMenu({
  activeFiltersCount,
  hasUnappliedChanges,
  statusOptions,
  selectedStatus,
  onStatusChange,
  itemsLabel,
  items,
  itemsLoading,
  selectedItemIds,
  onItemChange,
  onApply,
  onReset,
  onClearAll
}: FilterMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleApply = () => {
    onApply();
    handleClose();
  };

  const handleClearAll = () => {
    onClearAll();
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        startIcon={<Filter size="20px" />}
        sx={{
          minWidth: 140,
          color: activeFiltersCount > 0 ? 'primary.main' : 'text.primary',
          borderColor: activeFiltersCount > 0 ? 'primary.main' : 'divider',
          bgcolor: hasUnappliedChanges ? 'warning.light' : 'transparent'
        }}
      >
        Filter {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        {hasUnappliedChanges && ' *'}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              minWidth: 400,
              maxHeight: 600,
              overflowY: 'auto'
            }
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
            Filter Items
          </Typography>

          {/* Status Filter */}
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Status
          </Typography>

          <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
            <RadioGroup value={selectedStatus} onChange={(e) => onStatusChange(e.target.value)} sx={{ gap: 1 }}>
              {statusOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio size="small" />}
                  label={option.label}
                  sx={{
                    '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                    m: 0
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Divider sx={{ my: 3 }} />

          {/* Items Filter */}
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            {itemsLabel} {selectedItemIds.length > 0 && `(${selectedItemIds.length} selected)`}
          </Typography>

          {itemsLoading ? (
            <Box display="flex" alignItems="center" gap={1} py={3}>
              <CircularProgress size={16} />
              <Typography variant="body2" color="text.secondary">
                Loading {itemsLabel.toLowerCase()}...
              </Typography>
            </Box>
          ) : (
            <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
              <FormGroup sx={{ gap: 1, maxHeight: 200, overflowY: 'auto' }}>
                {items.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    control={
                      <Checkbox
                        size="small"
                        checked={selectedItemIds.includes(item.id)}
                        onChange={(e) => onItemChange(item.id, e.target.checked)}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" component="span">
                          {item.name}
                        </Typography>
                        {item.total !== undefined && (
                          <Typography variant="caption" color="text.secondary">
                            ({item.total})
                          </Typography>
                        )}
                      </Box>
                    }
                    sx={{
                      '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                      m: 0
                    }}
                  />
                ))}
              </FormGroup>
            </FormControl>
          )}

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'flex-end',
              pt: 2,
              borderTop: 1,
              borderColor: 'divider'
            }}
          >
            <Button size="small" onClick={onReset} color="inherit" disabled={!hasUnappliedChanges}>
              Reset
            </Button>
            <Button size="small" onClick={handleClearAll} color="error" variant="outlined">
              Clear All
            </Button>
            <Button size="small" onClick={handleApply} variant="contained" disabled={!hasUnappliedChanges}>
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Menu>
    </>
  );
}
