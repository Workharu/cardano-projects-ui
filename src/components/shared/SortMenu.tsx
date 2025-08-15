import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { ArrowDown, ArrowUp, Sort } from 'iconsax-react';

interface SortOption {
  value: string;
  label: string;
}

interface SortMenuProps {
  options: SortOption[];
  currentSort: string;
  currentDirection: 'asc' | 'desc';
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
}

export default function SortMenu({ options, currentSort, currentDirection, onSortChange }: SortMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSortChange = (field: string) => {
    const newDirection = currentSort === field ? (currentDirection === 'asc' ? 'desc' : 'asc') : 'desc';
    onSortChange(field, newDirection);
    handleClose();
  };

  const currentLabel = options.find((opt) => opt.value === currentSort)?.label || 'Sort';

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        startIcon={<Sort size="20px" />}
        endIcon={currentDirection === 'asc' ? <ArrowUp size="18px" /> : <ArrowDown size="18px" />}
        sx={{ minWidth: 180 }}
      >
        {currentLabel}
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option.value} onClick={() => handleSortChange(option.value)} selected={currentSort === option.value}>
            {option.label} {currentSort === option.value && (currentDirection === 'asc' ? '↑' : '↓')}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
