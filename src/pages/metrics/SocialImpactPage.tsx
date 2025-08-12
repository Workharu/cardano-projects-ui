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
  CircularProgress,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Divider
} from '@mui/material';
import { ArrowDown, ArrowUp, SearchNormal1, Sort, Filter } from 'iconsax-react';

/** Components **/
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import ListProjectsCard from 'components/cards/projects/ListProjectsCard';

/** Configuration **/
import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';

/** Skeleton **/
import SkeletonListProjectsCard from 'components/skeletons/SkeletonListProjectsCard';

/** APIs **/
import { useSocialImpactMetrics } from 'api/metrics';

// Sort options with display labels
const SORT_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'title', label: 'Title' }
];

// Funding status filter options
const FUNDING_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Funded', label: 'Funded' },
  { value: 'NotFunded', label: 'Not Funded' }
];

type SortField = 'id' | 'title';
type SortDir = 'asc' | 'desc';
type FundingStatus = 'all' | 'Funded' | 'NotFunded';

export default function SocialImpactPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Helpers to read params with fallbacks
  const getNumber = (key: string, def: number) => {
    const v = Number(searchParams.get(key));
    return Number.isFinite(v) && v > 0 ? v : def;
  };
  const getString = (key: string, def: string) => searchParams.get(key) ?? def;

  const page = getNumber('page', 1);
  const limit = getNumber('limit', 10);
  const order_by = (getString('order_by', 'id') as SortField) ?? 'id';
  const order_dir = (getString('order_dir', 'desc') as SortDir) ?? 'desc';
  const search = getString('search', '');
  const funding_status = (getString('funding_status', 'all') as FundingStatus) ?? 'all';

  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  // Local UI state - separate from URL state
  const [searchQuery, setSearchQuery] = useState(search);
  const [sortField, setSortField] = useState<SortField>(order_by);
  const [sortDirection, setSortDirection] = useState<SortDir>(order_dir);
  const [selectedFundingStatus, setSelectedFundingStatus] = useState<FundingStatus>(funding_status);

  const updateQuery = useCallback(
    (patch: Record<string, any>, replace = true) => {
      const next = new URLSearchParams(searchParams);

      let resetPage = false;
      const fieldsThatResetPage = ['search', 'funding_status', 'order_by', 'order_dir'];

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

  // Handle sort changes automatically
  useEffect(() => {
    updateQuery({ order_by: sortField, order_dir: sortDirection });
  }, [sortField, sortDirection, updateQuery]);

  // Sync URL params to local state (when URL changes externally)
  useEffect(() => {
    setSearchQuery(search);
    setSelectedFundingStatus(funding_status);
    setSortField(order_by);
    setSortDirection(order_dir);
  }, [search, funding_status, order_by, order_dir]);

  const { projectsData, isLoading, error, totalProjects, total_pages, mutate } = useSocialImpactMetrics({
    page,
    limit,
    order_by: sortField,
    order_dir: sortDirection,
    search: search || undefined,
    funding_status: funding_status !== 'all' ? funding_status : undefined
  });

  // Handlers for sort menu
  const handleSortMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };
  const handleSortMenuClose = () => setSortAnchorEl(null);

  const handleSortChange = (field: SortField) => {
    const newDirection = sortField === field ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'desc';
    setSortField(field);
    setSortDirection(newDirection);
    handleSortMenuClose();
  };

  // Handlers for filter menu
  const handleFilterMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };
  const handleFilterMenuClose = () => setFilterAnchorEl(null);

  const handleFundingStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFundingStatus(event.target.value as FundingStatus);
  };

  const handleApplyFilter = () => {
    // Close menu first to avoid animation conflicts
    setFilterAnchorEl(null);
    // Use setTimeout to ensure menu closes before updating URL
    setTimeout(() => {
      updateQuery({ funding_status: selectedFundingStatus });
    }, 50);
  };

  const handleCancelFilter = () => {
    // Reset to current URL state
    setSelectedFundingStatus(funding_status);
    handleFilterMenuClose();
  };

  // Search handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    updateQuery({ search: searchQuery });
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateQuery({ search: '' });
  };

  // Pagination
  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    updateQuery({ page: newPage }, true);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSortField('id');
    setSortDirection('desc');
    setSelectedFundingStatus('all');
    updateQuery({ search: '', order_by: 'id', order_dir: 'desc', funding_status: 'all' });
  };

  const breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Metrics' }, { title: 'Social Impact' }];

  // Get active filters count for display
  const activeFiltersCount = [search && 'search', funding_status !== 'all' && 'funding_status'].filter(Boolean).length;

  if (isLoading || (!projectsData && !error)) {
    return (
      <>
        <Breadcrumbs custom heading="Social Impact Projects" links={breadcrumbLinks} />
        <Grid container spacing={GRID_COMMON_SPACING}>
          {[...Array(2)].map((_, idx) => (
            <Grid key={idx} size={{ xs: 12 }}>
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
        <Breadcrumbs custom heading="Social Impact Projects" links={breadcrumbLinks} />
        <Box textAlign="center" mt={4} sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1 }}>
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
      <Breadcrumbs custom heading="Social Impact Projects" links={breadcrumbLinks} />

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
                    sx={{ minWidth: 'auto', p: 0.5, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                  >
                    ✕
                  </Button>
                </InputAdornment>
              ),
              sx: { borderRadius: 2, width: { xs: '100%', sm: 300 } }
            }}
          />
          <Button variant="outlined" onClick={handleSearchSubmit} sx={{ minWidth: 'auto', px: 2, borderRadius: 2 }}>
            Search
          </Button>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={handleFilterMenuClick}
            startIcon={<Filter size="20px" />}
            sx={{
              minWidth: 140,
              color: activeFiltersCount > 0 ? 'primary.main' : 'text.primary',
              borderColor: activeFiltersCount > 0 ? 'primary.main' : 'divider'
            }}
          >
            Filter {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>

          <Button
            variant="outlined"
            onClick={handleSortMenuClick}
            startIcon={<Sort size="20px" />}
            endIcon={sortDirection === 'asc' ? <ArrowUp size="18px" /> : <ArrowDown size="18px" />}
            sx={{ minWidth: 180 }}
          >
            {SORT_OPTIONS.find((opt) => opt.value === sortField)?.label}
          </Button>

          {/* Filter Menu */}
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterMenuClose}
            slotProps={{ paper: { sx: { minWidth: 250, p: 2 } } }}
          >
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                Filter by Funding Status
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <FormControl component="fieldset">
                <RadioGroup value={selectedFundingStatus} onChange={handleFundingStatusChange}>
                  {FUNDING_STATUS_OPTIONS.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio size="small" />}
                      label={option.label}
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Box sx={{ display: 'flex', gap: 1, mt: 3, justifyContent: 'flex-end' }}>
                <Button size="small" onClick={handleCancelFilter} color="inherit">
                  Cancel
                </Button>
                <Button size="small" variant="contained" onClick={handleApplyFilter}>
                  Apply
                </Button>
              </Box>
            </Paper>
          </Menu>

          {/* Sort Menu */}
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
          {search && (
            <span>
              {' '}
              for "<strong>{search}</strong>"
            </span>
          )}
          {funding_status !== 'all' && (
            <span>
              {' '}
              with status "<strong>{FUNDING_STATUS_OPTIONS.find((opt) => opt.value === funding_status)?.label}</strong>"
            </span>
          )}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip
            label={`Sorted by: ${SORT_OPTIONS.find((opt) => opt.value === sortField)?.label} ${sortDirection === 'asc' ? '↑' : '↓'}`}
            color="primary"
            variant="outlined"
            size="small"
          />
          {funding_status !== 'all' && (
            <Chip
              label={`Status: ${FUNDING_STATUS_OPTIONS.find((opt) => opt.value === funding_status)?.label}`}
              color="secondary"
              variant="outlined"
              size="small"
              onDelete={() => {
                setSelectedFundingStatus('all');
                updateQuery({ funding_status: 'all' });
              }}
            />
          )}
        </Stack>
      </Box>

      {/* Projects List */}
      <Grid container spacing={GRID_COMMON_SPACING}>
        <Grid size={{ xs: 12 }}>
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
                  {search || funding_status !== 'all' ? `No results found with current filters` : 'There are currently no projects'}
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
            sx={{ '& .MuiPaginationItem-root': { borderRadius: 1, fontWeight: 600 } }}
          />
        </Box>
      )}
    </>
  );
}
