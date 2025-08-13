import { useState } from 'react';
import { Box, TextField, InputAdornment, Button } from '@mui/material';
import { SearchNormal1 } from 'iconsax-react';

interface SearchBarProps {
  value: string; // This is the applied search value from URL
  onSearch: (value: string) => void; // Called when search should be performed
  onClear: () => void;
  placeholder?: string;
  width?: number | string | object;
}

export default function SearchBar({
  value: appliedValue,
  onSearch,
  onClear,
  placeholder = 'Search...',
  width = { xs: '100%', sm: 300 }
}: SearchBarProps) {
  // Local state for the input field
  const [inputValue, setInputValue] = useState(appliedValue);

  // Sync input with applied value when it changes (e.g., when cleared externally)
  useState(() => {
    setInputValue(appliedValue);
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue('');
    onClear();
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchNormal1 size="20px" />
            </InputAdornment>
          ),
          endAdornment: inputValue && (
            <InputAdornment position="end">
              <Button
                size="small"
                onClick={handleClear}
                sx={{
                  minWidth: 'auto',
                  p: 0.5,
                  color: 'text.secondary',
                  '&:hover': { color: 'text.primary' }
                }}
              >
                ✕
              </Button>
            </InputAdornment>
          ),
          sx: { borderRadius: 2, width }
        }}
      />
      <Button variant="outlined" onClick={handleSearchClick} sx={{ minWidth: 'auto', px: 2, borderRadius: 2 }}>
        Search
      </Button>
    </Box>
  );
}
