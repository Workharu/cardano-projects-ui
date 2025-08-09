import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/** MUI **/
import {
  Grid,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Chip,
  InputAdornment,
  TextField,
  CircularProgress
} from '@mui/material';
import { ArrowDown, ArrowUp, SearchNormal1, Sort } from 'iconsax-react';

/** Components **/
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import ListProjectsCard from 'components/cards/projects/ListProjectsCard';

/** Configuration **/
import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';

/** Skeleton **/
import SkeletonListProjectsCard from 'components/skeletons/SkeletonListProjectsCard';

/** APIs **/
import { useUniquenessMetrics } from 'api/metrics';

// Sort options with display labels
const SORT_OPTIONS = [
  { value: 'uniqueness_score', label: 'Uniqueness Score' },
  { value: 'id', label: 'ID' },
  { value: 'title', label: 'Title' },
  { value: 'created_at', label: 'Date Created' },
  { value: 'updated_at', label: 'Last Updated' }
];

type SortField = 'id' | 'title' | 'created_at' | 'updated_at';
type SortDir = 'asc' | 'desc';

export default function UniquenessPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Helpers to read params with fallbacks
  const getNumber = (key: string, def: number) => {
    const v = Number(searchParams.get(key));
    return Number.isFinite(v) && v > 0 ? v : def;
  };
  const getString = (key: string, def: string) => searchParams.get(key) ?? def;

  const page = getNumber('page', 1);
  const limit = getNumber('limit', 10);
  const order_by = (getString('order_by', 'uniqueness_score') as SortField) ?? 'uniqueness_score';
  const order_dir = (getString('order_dir', 'desc') as SortDir) ?? 'desc';
  const search = getString('search', '');

  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);

  // Local UI state - separate from URL state
  const [searchQuery, setSearchQuery] = useState(search); // Local input value
  const [activeSearch, setActiveSearch] = useState(search); // Actually used for API calls
  const [sortField, setSortField] = useState<SortField>(order_by);
  const [sortDirection, setSortDirection] = useState<SortDir>(order_dir);

  const updateQuery = useCallback(
    (patch: Record<string, any>, replace = true) => {
      const next = new URLSearchParams(searchParams);

      let resetPage = false;
      const fieldsThatResetPage = ['search', 'status', 'order_by', 'order_dir'];

      for (const [k, v] of Object.entries(patch)) {
        if (fieldsThatResetPage.includes(k)) {
          const current = next.get(k);
          if (String(v ?? '') !== (current ?? '')) {
            resetPage = true;
          }
        }

        if (v === undefined || v === '' || v === 'all') {
          next.delete(k);
        } else {
          next.set(k, String(v));
        }
      }

      if (resetPage) {
        next.set('page', '1');
      }

      setSearchParams(next, { replace });
    },
    [searchParams, setSearchParams]
  );

  // Only handle sort changes automatically
  useEffect(() => {
    updateQuery({
      order_by: sortField,
      order_dir: sortDirection
    });
  }, [sortField, sortDirection, updateQuery]);

  // Sync URL search param to activeSearch (when URL changes externally)
  useEffect(() => {
    setActiveSearch(search);
    setSearchQuery(search);
  }, [search]);

  const { projectsData, isLoading, error, totalProjects, total_pages, mutate } = useUniquenessMetrics({
    page,
    limit,
    order_by: sortField,
    order_dir: sortDirection,
    search: activeSearch || undefined
  });

  // Handlers for sort menu
  const handleSortMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };
  const handleSortMenuClose = () => setSortAnchorEl(null);
  const handleSortChange = (field: SortField) => {
    setSortField(field);
    setSortDirection((prev) => (sortField === field ? (prev === 'asc' ? 'desc' : 'asc') : 'desc'));
    handleSortMenuClose();
  };

  // Search handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    setActiveSearch(searchQuery);
    updateQuery({
      search: searchQuery
    });
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveSearch('');
    updateQuery({
      search: ''
    });
  };

  // Pagination
  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    updateQuery({ page: newPage }, true);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveSearch('');
    setSortField('id');
    setSortDirection('desc');
    updateQuery({
      search: '',
      order_by: 'uniqueness_score',
      order_dir: 'desc'
    });
  };

  const breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Metrics' }, { title: 'Uniqueness' }];

  if (isLoading || (!projectsData && !error)) {
    return (
      <>
        <Breadcrumbs custom heading="Uniqueness Projects" links={breadcrumbLinks} />
        <Grid container spacing={GRID_COMMON_SPACING}>
          {[...Array(2)].map((_, idx) => (
            <Grid key={idx} item xs={12}>
              <SkeletonListProjectsCard />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Breadcrumbs custom heading="Uniqueness Projects" links={breadcrumbLinks} />
        <Box
          textAlign="center"
          mt={4}
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 1
          }}
        >
          <Typography color="error" variant="h6" gutterBottom>
            Failed to load projects
          </Typography>
          <Typography variant="body2" gutterBottom mb={3}>
            {error?.message || 'Something went wrong. Please try again later.'}
          </Typography>
          <Button variant="contained" onClick={() => mutate()} startIcon={<CircularProgress size={20} color="inherit" />}>
            Retry
          </Button>
        </Box>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs custom heading="Uniqueness Projects" links={breadcrumbLinks} />

      {/* Search and Filter Bar */}
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
        <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            variant="outlined"
            placeholder="Search projects... (Press Enter)"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchNormal1 size="20px" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    onClick={handleClearSearch}
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
              sx: {
                borderRadius: 2,
                width: { xs: '100%', sm: 300 }
              }
            }}
          />
          <Button variant="outlined" onClick={handleSearchSubmit} sx={{ minWidth: 'auto', px: 2, borderRadius: 2 }}>
            Search
          </Button>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={handleSortMenuClick}
            startIcon={<Sort size="20px" />}
            endIcon={sortDirection === 'asc' ? <ArrowUp size="18px" /> : <ArrowDown size="18px" />}
            sx={{ minWidth: 180 }}
          >
            {SORT_OPTIONS.find((opt) => opt.value === sortField)?.label}
          </Button>
          <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={handleSortMenuClose}>
            {SORT_OPTIONS.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => handleSortChange(option.value as SortField)}
                selected={sortField === option.value}
              >
                {option.label} {sortField === option.value && (sortDirection === 'asc' ? '↑' : '↓')}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Box>

      {/* Results Summary */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="subtitle1" color="text.secondary">
          Showing <strong>{projectsData.length}</strong> of <strong>{totalProjects}</strong> projects
          {activeSearch && (
            <span>
              {' '}
              for "<strong>{activeSearch}</strong>"
            </span>
          )}
        </Typography>
        <Chip
          label={`Sorted by: ${SORT_OPTIONS.find((opt) => opt.value === sortField)?.label} ${sortDirection === 'asc' ? '↑' : '↓'}`}
          color="primary"
          variant="outlined"
        />
      </Box>

      {/* Projects List */}
      <Grid container spacing={GRID_COMMON_SPACING}>
        <Grid item xs={12}>
          <Stack spacing={GRID_COMMON_SPACING}>
            {projectsData.length > 0 ? (
              projectsData.map((project) => (
                <ListProjectsCard key={project.id} project={project} fund={project.fund} campaign={project.campaign} />
              ))
            ) : (
              <Box textAlign="center" p={4} borderRadius={2} bgcolor="background.paper" boxShadow={1}>
                <Typography variant="h6" gutterBottom>
                  No projects found
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {activeSearch ? `No results found for "${activeSearch}"` : 'There are currently no projects matching your filters'}
                </Typography>
                <Button variant="outlined" onClick={handleClearFilters}>
                  Clear filters
                </Button>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>

      {/* Pagination */}
      {total_pages > 1 && (
        <Box display="flex" justifyContent="center" mt={4} p={3} borderRadius={2} bgcolor="background.paper" boxShadow={1}>
          <Pagination
            count={total_pages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 1,
                fontWeight: 600
              }
            }}
          />
        </Box>
      )}
    </>
  );
}
